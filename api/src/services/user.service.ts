import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { StatusEntity } from 'src/database/enums.num';
import { InputUserType, User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { validateOrReject } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async get(userName: string): Promise<User> {
    console.info(' In service: ', userName);
    if (!userName) {
      throw new BadRequestException('user name must be sent');
    }

    let user: User | undefined;

    try {
      user = await this._userRepository.findOne({
        where: { user_name: userName, status: StatusEntity.ACTIVE },
      });
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error}`;
      throw new InternalServerErrorException({ message });
    }

    if (!user) {
      throw new NotFoundException(`User ${userName} does'nt exist`);
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    try {
      return await this._userRepository.find({
        where: { status: StatusEntity.ACTIVE },
      });
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error}`;
      throw new InternalServerErrorException({ message });
    }
  }

  async create(user: InputUserType): Promise<User> {
    let newUser = plainToClass(User, user);
    const salt = await genSalt(10);
    newUser.password = await hash(user.password, salt);
    try {
      newUser = await this._userRepository.save(newUser);
      return newUser;
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error}`;
      throw new InternalServerErrorException({ message });
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      return await this._userRepository.save(user);
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error}`;
      throw new InternalServerErrorException({ message });
    }
  }

  
}
