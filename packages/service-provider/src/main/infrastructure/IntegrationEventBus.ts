import {Injectable} from "@nestjs/common";
import {ClientRMQ, ReadPacket, RmqRecord, WritePacket} from "@nestjs/microservices";
import {RQM_DEFAULT_IS_GLOBAL_PREFETCH_COUNT, RQM_DEFAULT_PREFETCH_COUNT} from "@nestjs/microservices/constants";
import EventEmitter from "events";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";

@Injectable()
export class IntegrationEventBus extends ClientRMQ {
    public async setupChannel(channel: any, resolve: Function) {
        // @ts-ignore
        const {exchange = '', exchangeOptions = {}} = this.options;
        const {durable = false, type = 'topic'} = exchangeOptions;

        const prefetchCount =
            this.getOptionsProp(this.options, 'prefetchCount')
            || RQM_DEFAULT_PREFETCH_COUNT;

        const isGlobalPrefetchCount =
            this.getOptionsProp(this.options, 'isGlobalPrefetchCount')
            || RQM_DEFAULT_IS_GLOBAL_PREFETCH_COUNT;

        // @ts-ignore
        await channel.assertExchange(exchange, type, {
            durable
        });

        // await channel.assertQueue(this.queue, this.queueOptions);
        await channel.prefetch(prefetchCount, isGlobalPrefetchCount);

        this.responseEmitter = new EventEmitter();
        this.responseEmitter.setMaxListeners(0);

        await this.consumeChannel(channel);

        resolve();
    }

    public publish(
        message: ReadPacket,
        callback: (packet: WritePacket) => any,
    ): () => void {
        // @ts-ignore
        const {exchange = ''} = this.options;

        try {
            const correlationId = randomStringGenerator();
            const listener = ({ content }: { content: any }) =>
                this.handleMessage(JSON.parse(content.toString()), callback);

            Object.assign(message, { id: correlationId });
            const serializedPacket: ReadPacket & Partial<RmqRecord> = this.serializer.serialize(message);

            const options = serializedPacket.options;
            delete serializedPacket.options;

            this.responseEmitter.on(correlationId, listener);

            this.channel.publish(
                exchange,
                message.pattern,
                Buffer.from(JSON.stringify(serializedPacket)),
                {
                    replyTo: this.replyQueue,
                    persistent: this.persistent,
                    ...options,
                    headers: this.mergeHeaders(options?.headers),
                    correlationId,
                }
            );

            return () => this.responseEmitter.removeListener(correlationId, listener);
        } catch (err) {
            callback({ err });
        }
    }

    public dispatchEvent(packet: ReadPacket): Promise<any> {
        const serializedPacket: ReadPacket & Partial<RmqRecord> = this.serializer.serialize(packet);
        // @ts-ignore
        const {exchange = ''} = this.options;

        return this.channel.publish(
            exchange,
            packet.pattern,
            Buffer.from(JSON.stringify(serializedPacket)),
            {
                persistent: this.persistent,
                ...serializedPacket.options,
                headers: this.mergeHeaders(serializedPacket.options?.headers),
            }
        );
    }

    static provideClient(config) {
        const {
            protocol,
            username,
            password,
            host,
            port,
            vhost,
            eventExchange
        } = config;

        return {
            provide: IntegrationEventBus,
            useFactory: async () => {
                const bus = new IntegrationEventBus(     {
                    urls: [`${protocol}://${username}:${password}@${host}:${port}/${vhost}`],
                    exchange: eventExchange,
                    exchangeOptions: {
                        durable: true
                    }
                });

                await bus.connect();

                return bus;
            }
        }
    }
}
