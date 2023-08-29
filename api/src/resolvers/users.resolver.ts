import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  InputUserType,
  User as UserType,
  UpdateUser,
} from '../database/models/user.entity';
import { User as UserMongoose } from 'src/database/models/user.schema';
import { UserManagerUseCase } from 'src/useCases/userManager.useCase';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { GQLAuthGuard } from 'src/auth/guards/GQLAuth.guard';
import { IJwtPayloadDTO } from 'src/database/models/auth.entity';
import { AddPokemonToUser } from 'src/database/models/pokemon.entity';

@Resolver()
export class UserResolver {
  constructor(
    private readonly _userCase: UserManagerUseCase,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Welcome to graphql API!';
  }

  //@UseGuards(GQLAuthGuard)
  @Query(() => UserType)
  async getUser(
    //@GetUser() user: IJwtPayloadDTO,
    @Args('userName', { type: () => String }) userName: string,
  ): Promise<UserType | UserMongoose> {
    try {
      //console.info(user);
      console.info('userName: ', userName);
      return await this._userCase.get(userName);
    } catch (error) {
      this.logger.error(`user: ${userName} | ${error.message}`);
      throw error;
    }
  }

  //@UseGuards(GQLAuthGuard)
  @Query(() => [UserType])
  async getAllUser(
    @GetUser() user: IJwtPayloadDTO,
  ): Promise<UserType[] | UserMongoose[]> {
    try {
      return await this._userCase.getAll();
    } catch (error) {
      this.logger.error(`getting all users | ${error.message}`);
      throw error;
    }
  }

  //@UseGuards(GQLAuthGuard)
  @Mutation(() => UserType)
  async addPokemonToUser(
    @GetUser() user: IJwtPayloadDTO,
    @Args('pokemonDTO') pokemoDTO: AddPokemonToUser,
  ): Promise<UserType | UserMongoose> {
    try {
      console.log('User: ', user);
      return await this._userCase.addPokemonToUser(pokemoDTO);
    } catch (error) {
      this.logger.error(`getting all users | ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => UserType)
  async createUser(
    @GetUser() user: IJwtPayloadDTO,
    @Args('newUser', { type: () => InputUserType }) newUser: InputUserType,
  ): Promise<UserType> {
    try {
      return await this._userCase.createUser(newUser);
    } catch (error) {
      this.logger.error(`user: ${user.userName} | ${error.message}`);
      throw error;
    }
  }

  //@UseGuards(GQLAuthGuard)
  @Mutation(() => UserType)
  async updateUser(
    @GetUser() user: IJwtPayloadDTO,
    @Args('userName', { type: () => String }) userName: string,
    @Args('updates', { type: () => UpdateUser }) updates: UpdateUser,
  ): Promise<UserType> {
    try {
      return await this._userCase.updateUser(userName, updates);
    } catch (error) {
      this.logger.error(`user: ${user.userName} | ${error.message}`);
      throw error;
    }
  }
}
