import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { envVariablesSchema } from './config/validationSchema';
import { UsersModule } from './modules/users/users.module';
import { AuthMiddleware } from './common/middleware/auth/auth.middleware';
import { SplitTokenToHeadersMiddleware } from './common/middleware/split-token-to-headers/split-token-to-headers.middleware';
import { LoggerModule } from './modules/logger/logger.module';
import { HealthCheckModule } from './modules/health-check';
import { HttpModule } from '@nestjs/axios';
import { CallContextModule } from './modules/call-context/call-context.module';
import { CallContextMiddleware } from './modules/call-context/call-context.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/users/user.model';

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
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'talkohavy',
      password: '1234',
      database: 'talkohavy',
      models: [User],
      retryAttempts: 10, // <--- defaults to 10. Number of attempts to connect to the database.
      retryDelay: 3000, // <--- defaults to 3000. Delay between connection retry attempts (ms).
      autoLoadModels: false, // <--- defaults to false. If true, models will be loaded automatically.
      synchronize: false, // <--- defaults to false. If true, automatically loaded models will be synchronized.
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
