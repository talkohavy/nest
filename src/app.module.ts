import { Module } from '@nestjs/common';
import { UsersController, UsersService } from './users';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
