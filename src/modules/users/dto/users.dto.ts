export type GetUsersDto = {};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  age: number;
};

export type UpdateUserDto = {};

export type User = {
  id: string;
  name: string;
};

export type SingleUserResponseDto = User;

export type UsersResponseDto = Array<User>;
