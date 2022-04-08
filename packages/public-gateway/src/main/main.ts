import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';
import {Config} from './Config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.startAllMicroservices();
    await app.listen(Config.http.port);
}

bootstrap();
