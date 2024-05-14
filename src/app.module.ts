import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { loggerMiddleware } from './logger.middleware';

// import { UsersController } from './users/users.controller';
// import { User } from './users/entities/user.entity';

class User {}

@Module({
  imports: [UsersModule, DatabaseModule.forRoot([User])],
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
