import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';

async function bootstrap() {
   await NestFactory.createApplicationContext(AppModule);
}

bootstrap();
