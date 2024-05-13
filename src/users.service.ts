import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UsersService {
  login(req: Request): string {
    console.log('req is:', req);
    return 'trying to login...';
  }

  register(req: Request): string {
    console.log('req is:', req);
    return 'registered user successfully!';
  }

  // eslint-disable-next-line
  getUsers(req: Request): string {
    return 'get users';
  }

  // eslint-disable-next-line
  getUserById(req: Request): string {
    return 'get user by id';
  }
}
