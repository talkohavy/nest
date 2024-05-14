import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// import { loggerMiddleware } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: true, // abortOnError defaults to `true`. By default, if any error happens while creating the application your app will exit with the code 1. If you want to make it throw an error instead disable the option abortOnError (e.g., NestFactory.create(AppModule, { abortOnError: false })).
  });

  // app.use(loggerMiddleware); // <--- If we want to bind middleware to every registered route at once, we can use the use() method that is supplied by the INestApplication instance.

  await app.listen(8000);
}

bootstrap();
