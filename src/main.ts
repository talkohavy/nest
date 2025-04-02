import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { handleCors } from './common/utils/handleCors';
import { configuration } from './config';
import { EnvOptions } from './config/types';
import { LoggerService } from './modules/logger/logger.service';
import { HttpExceptionFilter } from './errorHandling/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: true, // abortOnError defaults to `true`. By default, if any error happens while creating the application your app will exit with the code 1. If you want to make it throw an error instead disable the option abortOnError (e.g., NestFactory.create(AppModule, { abortOnError: false })).
    bufferLogs: true, // <--- defaults to false. Set bufferLogs to true to make sure all logs will be buffered until a custom logger is attached. The application's initialization process either completes or fails. If the initialization process fails, Nest will fallback to the original ConsoleLogger to print out any reported error messages.
    // rawBody: true, // <--- When running server as an API Gateway, this is a MUST. It does NOT replace body, it just adds rawBody.
  });

  const configService = app.get(ConfigService);

  const nodeEnv = configService.get<EnvOptions>('nodeEnv');

  app.enableCors({ origin: handleCors(nodeEnv), credentials: true });
  app.use(helmet());
  app.use(cookieParser());
  app.useLogger(new LoggerService(configService, undefined)); // <--- retrieve the singleton instance of the LoggerService. When supplying a custom logger via app.useLogger(), it will actually be used by Nest internally. That means that our code remains implementation agnostic. That way, the following calls to this.logger.log() from MyService would result in calls to the "log" method from LoggerService instance.
  app.getHttpAdapter().getInstance().disable('etag');
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const PORT = configuration().port;

  app.useGlobalFilters(new HttpExceptionFilter()); // <--- WARNING! The useGlobalFilters() method does not set up filters for gateways or hybrid applications.

  await app.listen(PORT, () => console.log(`server is running on port ${PORT} 🚀`));

  process.on('uncaughtException', () => {
    console.error('AVOID SERVER CRASH - uncaughtException');
  });

  process.on('unhandledRejection', () => {
    console.error('AVOID SERVER CRASH - unhandledRejection');
  });
}

bootstrap();
