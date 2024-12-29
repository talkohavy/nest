import { Injectable } from '@nestjs/common';
import { GetUsersDto, LoginDto, RegisterDto } from './dto/users.dto';

// type IRepository = {
//   name: string;
// };

@Injectable()
export class UsersService {
  // constructor(private readonly database: IRepository) {}

  async login(body: LoginDto): Promise<string> {
    console.log('body is:', body);
    return 'you are logged in!';
  }

  async register(body: RegisterDto): Promise<string> {
    console.log('body is:', body);
    return 'registered user successfully!';
  }

  async getUsers(query: GetUsersDto): Promise<string> {
    console.log('query is:', query);
    return 'get users';
  }

  async getUserById(id: string): Promise<string> {
    console.log('id is:', id);
    return 'get user by id';
  }
}
