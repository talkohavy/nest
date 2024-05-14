import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService], // <--- Every module is automatically a shared module. Once created it can be reused by any module. Let's imagine that we want to share an instance of the UsersService between several other modules. In order to do that, we first need to export the UsersService provider by adding it to the module's exports array, as shown here. Now any module that imports the UsersModule has access to the UsersService and will share the same instance with all other modules that import it as well.
  imports: [],
})
export class UsersModule {}
