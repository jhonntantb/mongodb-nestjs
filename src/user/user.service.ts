import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserById(_id: string): Promise<User> {
    return this.usersRepository.findOne({ _id });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(createUserData: CreateUserDto): Promise<User> {
    return this.usersRepository.create({
      email: createUserData.email,
      password: createUserData.password,
      age: createUserData.age,
      favoriteFoods: [],
    });
  }

  async updateUser(id: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id: id }, userUpdates);
  }

  async removeUser(userId: string) {
    return this.usersRepository.deleteMany({ id: userId });
  }
}
