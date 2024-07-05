import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errorHandling/httpException.filter';

// import { loggerMiddleware } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: true, // abortOnError defaults to `true`. By default, if any error happens while creating the application your app will exit with the code 1. If you want to make it throw an error instead disable the option abortOnError (e.g., NestFactory.create(AppModule, { abortOnError: false })).
  });

  // app.use(loggerMiddleware); // <--- If we want to bind middleware to every registered route at once, we can use the use() method that is supplied by the INestApplication instance.
  app.useGlobalFilters(new HttpExceptionFilter()); // <--- WARNING! The useGlobalFilters() method does not set up filters for gateways or hybrid applications.

  await app.listen(8000, () => console.log('server started on port 8000'));
}

bootstrap();
