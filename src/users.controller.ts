import { Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Req() req: Request): string {
    debugger;
    const response = this.usersService.getUsers(req);

    return response;
  }

  @Post('login')
  login(@Req() req: Request): string {
    const response = this.usersService.login(req);

    return response;
  }

  @Post('register')
  register(@Req() req: Request): string {
    const response = this.usersService.login(req);

    return response;
  }

  @Get(':id')
  getUserById(@Req() req: Request): string {
    const response = this.usersService.getUserById(req);

    return response;
  }
}
