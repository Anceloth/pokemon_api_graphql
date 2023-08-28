import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { GQLAuthGuard } from 'src/auth/guards/GQLAuth.guard';
import { IJwtPayloadDTO } from 'src/database/models/auth.entity';
import {
  AddPokemonToUser,
  PokemonJSON,
  PokemonType,
} from 'src/database/models/pokemon.entity';
import { PokemonUseCase } from 'src/useCases/pokemon.usecases';
import { Logger } from 'winston';

@Resolver(() => PokemonType)
export class PokemonResolver {
  constructor(
    private readonly _pokemonUseCase: PokemonUseCase,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  //@UseGuards(GQLAuthGuard)
  @Query(() => PokemonJSON)
  async getPokemonDetail(
    @GetUser() user: IJwtPayloadDTO,
    @Args('name', { type: () => String }) name: string,
  ): Promise<PokemonJSON> {
    try {
      console.info(user);
      console.info('idPokemon: ', name);
      return await this._pokemonUseCase.getPokemonFromAPI(name);
    } catch (error) {
      this.logger.error(`user: ${user} | ${error.message}`);
      throw error;
    }
  }

  //@UseGuards(GQLAuthGuard)
  @Query(() => [PokemonType])
  async getAllPokemon(@GetUser() user: IJwtPayloadDTO): Promise<PokemonType[]> {
    try {
      console.log('User: ', user);
      return await this._pokemonUseCase.getAllPokemonsFromAPI();
    } catch (error) {
      this.logger.error(`getting all users | ${error.message}`);
      throw error;
    }
  }
}
