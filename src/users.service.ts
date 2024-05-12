import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    return 'get users';
  }

  login(): string {
    return 'trying to login...';
  }
}
