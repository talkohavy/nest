import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUsersDto, LoginDto, RegisterDto } from './dto/users.dto';
import { Sequelize } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async login(body: LoginDto): Promise<string> {
    const { email, password } = body;

    const user = await this.userModel.findOne({ where: { email } });

    if (!user || user.password !== password) {
      throw new NotFoundException('Invalid credentials');
    }

    console.log('body is:', body);
    console.log('user is:', user);
    return 'you are logged in!';
  }

  async register(body: RegisterDto): Promise<User> {
    const { name, age } = body;
    const user = await this.userModel.create({ name, age });

    console.log('User created:', user);

    return user;
  }

  async findOne(id: string): Promise<User | null> {
    console.log('id is:', id);

    return this.userModel.findOne({ where: { id } });
  }

  async findAll(query: GetUsersDto): Promise<Array<User>> {
    console.log('query is:', query);

    return this.userModel.findAll();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    const result = await user.destroy();
    console.log('User removed:', result);
  }
}
