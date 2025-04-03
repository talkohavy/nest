import { Injectable } from '@nestjs/common';
import { GetUsersDto, LoginDto, RegisterDto, SingleUserResponseDto, UsersResponseDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  async login(body: LoginDto): Promise<string> {
    console.log('body is:', body);
    return 'you are logged in!';
  }

  async register(body: RegisterDto): Promise<string> {
    console.log('body is:', body);
    return 'registered user successfully!';
  }

  async getUsers(query: GetUsersDto): Promise<UsersResponseDto> {
    console.log('query is:', query);
    return [
      { id: '1', name: 'tal' },
      { id: '2', name: 'daniel' },
    ];
  }

  async getUserById(id: string): Promise<SingleUserResponseDto> {
    console.log('id is:', id);
    return { id: '1', name: 'tal' };
  }
}
