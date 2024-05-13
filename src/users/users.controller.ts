import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  GetUsersDto,
  LoginDto,
  RegisterDto,
  UpdateUserDto,
} from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() query: GetUsersDto): Promise<string> {
    const response = await this.usersService.getUsers(query);

    return response;
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<string> {
    const response = await this.usersService.login(body);

    return response;
  }

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<string> {
    const response = await this.usersService.register(body);

    return response;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<string> {
    const response = await this.usersService.getUserById(id);

    return response;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('updateUserDto is:', updateUserDto);
    return `This action updates a user of id ${id}`;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return `This action removes a user with an id of ${id}`;
  }
}
