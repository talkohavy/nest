import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: true, // abortOnError defaults to `true`. By default, if any error happens while creating the application your app will exit with the code 1. If you want to make it throw an error instead disable the option abortOnError (e.g., NestFactory.create(AppModule, { abortOnError: false })).
  });

  await app.listen(3000);
}

bootstrap();
