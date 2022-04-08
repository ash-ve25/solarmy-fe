import {ServerRMQ} from '@nestjs/microservices';
import {
    CONNECT_EVENT,
    DISCONNECT_EVENT,
    DISCONNECTED_RMQ_MESSAGE,
    RQM_DEFAULT_NOACK
} from "@nestjs/microservices/constants";

export class AMQServerTransporter extends ServerRMQ {
    // @ts-ignore
    public readonly transportId = 'AMQServerTransporter';

    public async setupChannel(channel: any, callback: Function) {
        // @ts-ignore
        const {exchange = '', exchangeOptions = {}} = this.options;
        const {durable = false, type = 'topic'} = exchangeOptions;
        // @ts-ignore
        const noAck = this.getOptionsProp(this.options, 'noAck', RQM_DEFAULT_NOACK);
        // @ts-ignore
        await channel.assertQueue(this.queue, this.queueOptions);
        // @ts-ignore
        await channel.prefetch(this.prefetchCount, this.isGlobalPrefetchCount);
        // @ts-ignore
        await channel.assertExchange(exchange, type, {
            durable
        });
        await Promise.all([
            // @ts-ignore
            [...this.getHandlers().keys()].map(val => channel.bindQueue(this.queue, exchange, val))
        ]);

        channel.consume(
            // @ts-ignore
            this.queue,
            (msg: Record<string, any>) => this.handleMessage(msg, channel),
            {
                noAck,
            },
        );

        callback();
    }

    public async start(callback?: () => void) {
        // @ts-ignore
        this.server = this.createClient();
        // @ts-ignore
        this.server.on(CONNECT_EVENT, () => {
            // @ts-ignore
            if (this.channel) {
                return;
            }
            // @ts-ignore
            this.channel = this.server.createChannel({
                json: false,
                setup: (channel: any) => this.setupChannel(channel, callback),
            });
        });
        // @ts-ignore
        this.server.on(DISCONNECT_EVENT, (err: any) => {
            this.logger.error(DISCONNECTED_RMQ_MESSAGE);
            this.logger.error(err);
        });
    }
}
