import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { LoginDto, RegisterDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Req() req: Request): Promise<string> {
    const response = await this.usersService.getUsers(req);

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
  async getUserById(@Req() req: Request): Promise<string> {
    const response = await this.usersService.getUserById(req);

    return response;
  }
}
