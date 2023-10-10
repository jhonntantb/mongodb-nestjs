import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(email: string, age: number): Promise<User> {
    return this.usersRepository.create({
      email,
      age,
      favoriteFoods: [],
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async removeUser(userId: string) {
    return this.usersRepository.deleteUser(userId);
  }
}
