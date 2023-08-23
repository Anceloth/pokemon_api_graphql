import { Injectable, NotFoundException } from '@nestjs/common';

import {
  User,
  InputUserType,
  UpdateUser,
} from 'src/database/models/user.entity';
import { UserService } from 'src/services/user.service';

@Injectable()
export class UserManagerUseCase {
  constructor(private readonly _userService: UserService) {}

  async get(user_name: string): Promise<User> {
    console.info(' In usecase: ', user_name);
    return await this._userService.get(user_name);
  }

  async getAll(): Promise<User[]> {
    return await this._userService.getAll();
  }

  async createUser(newUser: InputUserType): Promise<User> {
    return this._userService.create(newUser);
  }

  async updateUser(user_name: string, updates: UpdateUser): Promise<User> {
    const user = await this._userService.get(user_name);

    if (!user) {
      throw new NotFoundException(`User ${user_name} doesn't exist`);
    }

    if (updates.is_active != undefined) {
      user.is_active = updates.is_active;
    }

    return await this._userService.updateUser(user);
  }

  
}
