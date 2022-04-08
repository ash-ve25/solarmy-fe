import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';
import {Config} from './Config';
import {Transport} from '@nestjs/microservices';
import {AMQServerTransporter} from "@solar/service-provider";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: Config.tcp
    }, {inheritAppConfig: true});

    app.connectMicroservice({
        strategy: <any>new AMQServerTransporter({
            urls: [`${Config.amq.protocol}://${Config.amq.username}:${Config.amq.password}@${Config.amq.host}:${Config.amq.port}/${Config.amq.vhost}`],
            queue: Config.amq.serviceQueue,
            queueOptions: {
                durable: true
            },
            exchange: Config.amq.eventExchange,
            exchangeOptions: {
                durable: true,
                type: 'topic'
            },
            prefetchCount: Config.amq.prefetchCount,
            noAck: true,
        })
    }, {inheritAppConfig: true});

    await app.startAllMicroservices();
    await app.listen(Config.http.port);
}

bootstrap();
