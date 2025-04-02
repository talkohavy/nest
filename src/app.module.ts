import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { envVariablesSchema } from './config/validationSchema';
import { UsersModule } from './modules/users/users.module';
import { CallContextMiddleware } from './modules/call-context.middleware';
import { AuthMiddleware } from './common/middleware/auth/auth.middleware';
import { SplitTokenToHeadersMiddleware } from './common/middleware/split-token-to-headers/split-token-to-headers.middleware';
import { CallContextModule } from './modules/call-context.module';
import { LoggerModule } from './modules/logger/logger.module';
import { HealthCheckModule } from './modules/health-check';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // <--- defaults to '.env'
      ignoreEnvFile: false, // <--- defaults to false.
      isGlobal: true, // <--- defaults to false
      cache: true, // <--- defaults to false
      load: [configuration],
      validationSchema: envVariablesSchema,
    }),
    CallContextModule.forRoot({ isGlobal: true }),
    HttpModule,
    HealthCheckModule,
    LoggerModule,
    UsersModule,
  ],
})
export class AppModule {
  configure(middlewareConsumer: MiddlewareConsumer) {
    middlewareConsumer
      .apply(CallContextMiddleware)
      .exclude({ path: 'is-alive', method: RequestMethod.GET })
      .forRoutes('*')
      .apply(AuthMiddleware, SplitTokenToHeadersMiddleware)
      .forRoutes('users');
  }
}
