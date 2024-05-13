import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GetUsersDto, LoginDto, RegisterDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line
  async login(body: LoginDto): Promise<string> {
    console.log('body is:', body);
    return 'you are logged in!';
  }

  // eslint-disable-next-line
  async register(body: RegisterDto): Promise<string> {
    console.log('body is:', body);
    return 'registered user successfully!';
  }

  // eslint-disable-next-line
  async getUsers(query: GetUsersDto): Promise<string> {
    console.log('query is:', query);
    return 'get users';
  }

  // eslint-disable-next-line
  async getUserById(req: Request): Promise<string> {
    return 'get user by id';
  }
}
