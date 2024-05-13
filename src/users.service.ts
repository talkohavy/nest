import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UsersService {
  // eslint-disable-next-line
  async login(req: Request): Promise<string> {
    return 'trying to login...';
  }

  // eslint-disable-next-line
  async register(req: Request): Promise<string> {
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
