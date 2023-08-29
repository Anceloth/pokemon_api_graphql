import { Injectable, NotFoundException } from '@nestjs/common';
import { AddPokemonToUser } from 'src/database/models/pokemon.entity';

import {
  User,
  InputUserType,
  UpdateUser,
} from 'src/database/models/user.entity';
import { User as UserMongoose } from 'src/database/models/user.schema';
import { UserService } from 'src/services/user.service';

@Injectable()
export class UserManagerUseCase {
  constructor(private readonly _userService: UserService) {}

  async get(userName: string): Promise<User | UserMongoose> {
    console.info(' In usecase: ', userName);
    // const user = await this._userService.get(user_name);
    const userMongoose = await this._userService.getFromMongo(userName);
    return userMongoose;
  }

  async getAll(): Promise<User[] | UserMongoose[]> {
    // const user = await this._userService.getAll();
    const user = await this._userService.getAllFromMongo();
    return await user;
  }

  async addPokemonToUser(
    pokemonDTO: AddPokemonToUser,
  ): Promise<User | UserMongoose> {
    const user = await this._userService.getFromMongo(pokemonDTO.userName);
    const finded = user.pokemons.find(
      pokemon =>
        pokemon.name.toLocaleLowerCase() ===
        pokemonDTO.pokemonName.toLocaleLowerCase(),
    );
    if (finded) {
      throw new Error('This pokemon is already in your collection');
    }
    user.pokemons.push({
      name: pokemonDTO.pokemonName,
      url: pokemonDTO.urlPokemon,
    });
    const userUpdated = await this._userService.updateUserMongo(user);
    console.debug('User Updated from UseCase:  ', userUpdated);
    return userUpdated;
  }

  async createUser(newUser: InputUserType): Promise<User> {
    return this._userService.create(newUser);
  }

  async updateUser(user_name: string, updates: UpdateUser): Promise<User> {
    const user = await this._userService.get(user_name);

    if (!user) {
      throw new NotFoundException(`User ${user_name} doesn't exist`);
    }

    if (updates.isActive != undefined) {
      user.isActive = updates.isActive;
    }

    return await this._userService.updateUser(user);
  }
}
