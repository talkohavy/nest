import { Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Req() req: Request): Promise<string> {
    const response = await this.usersService.getUsers(req);

    return response;
  }

  @Post('login')
  async login(@Req() req: Request): Promise<string> {
    const response = await this.usersService.login(req);

    return response;
  }

  @Post('register')
  async register(@Req() req: Request): Promise<string> {
    const response = await this.usersService.login(req);

    return response;
  }

  @Get(':id')
  async getUserById(@Req() req: Request): Promise<string> {
    const response = await this.usersService.getUserById(req);

    return response;
  }
}
