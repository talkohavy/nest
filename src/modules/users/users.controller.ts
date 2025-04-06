import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetUsersDto, LoginDto, RegisterDto } from './dto/users.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<string> {
    const response = await this.usersService.login(body);

    return response;
  }

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response): Promise<Response> {
    const user = await this.usersService.register(body);

    res.cookie('user_token', user.id, { httpOnly: true });

    return res.status(201).json(user);
  }

  @Get()
  async getUsers(@Query() query: GetUsersDto): Promise<Array<User>> {
    const response = await this.usersService.findAll(query);

    return response;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    const response = await this.usersService.findOne(id);

    return response;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: User) {
    console.log('updateUserDto is:', updateUserDto);
    return `This action updates a user of id ${id}`;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
