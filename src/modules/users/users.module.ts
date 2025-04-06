import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService], // <--- Every module is automatically a shared module. Once created it can be reused by any module. Let's imagine that we want to share an instance of the UsersService between several other modules. In order to do that, we first need to export the UsersService provider by adding it to the module's exports array, as shown here. Now any module that imports the UsersModule has access to the UsersService and will share the same instance with all other modules that import it as well.
})
export class UsersModule {}
