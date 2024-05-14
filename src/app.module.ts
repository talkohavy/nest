import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

// import { User } from './users/entities/user.entity';

class User {}

@Module({
  imports: [UsersModule, DatabaseModule.forRoot([User])],
})
export class AppModule {}
