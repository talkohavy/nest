import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto, RegisterDto } from './dto/users.dto';

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
  async getUsers(req: Request): Promise<string> {
    return 'get users';
  }

  // eslint-disable-next-line
  async getUserById(req: Request): Promise<string> {
    return 'get user by id';
  }
}
