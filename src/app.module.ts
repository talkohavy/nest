import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { loggerMiddleware } from './logger.middleware';
import { getConfiguration } from './config';
import { envVariablesSchema } from './config/validationSchema';

// import { UsersController } from './users/users.controller';
// import { User } from './users/entities/user.entity';

class User {}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // <--- defaults to '.env'
      ignoreEnvFile: false, // <--- defaults to false.
      isGlobal: true, // <--- defaults to false
      cache: true, // <--- defaults to false
      load: [getConfiguration],
      validationSchema: envVariablesSchema,
    }),
    UsersModule,
    DatabaseModule.forRoot([User]),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // You can even use async code here and await it!

    // Option 1: comma separated strings
    consumer.apply(loggerMiddleware).forRoutes('users');

    // Option 2: comma separated RouteInfo's
    // consumer.apply(loggerMiddleware).forRoutes({
    //   path: '/users/login',
    //   method: RequestMethod.POST,
    //   // version: '1',
    // });

    // Option 3: passing a single Controller
    // consumer.apply(loggerMiddleware).forRoutes(UsersController);

    // Option 4: excluding routes
    // consumer
    //   .apply(loggerMiddleware)
    //   .exclude(
    //     { path: 'cats', method: RequestMethod.GET },
    //     { path: 'cats', method: RequestMethod.POST },
    //     'cats/(.*)',
    //   )
    //   .forRoutes(UsersController);
  }
}
