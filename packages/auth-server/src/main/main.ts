import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';
import {Config} from './Config';
import {Transport} from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.TCP,
        options: {...Config.tcp}
    }, {inheritAppConfig: true});

    await app.startAllMicroservices();
    await app.listen(Config.http.port);
}

bootstrap();
