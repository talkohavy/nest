import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { envVariablesSchema } from './config/validationSchema';
import { UsersModule } from './modules/users/users.module';

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
    UsersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // You can even use async code here and await it!
    // Option 1: comma separated strings
    // consumer.apply(loggerMiddleware).forRoutes('users');
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
