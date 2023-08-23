import { Injectable } from '@nestjs/common';
import {
  Pokemon,
  PokemonJSON,
  PokemonType,
} from 'src/database/models/pokemon.entity';
import { PokemonService } from 'src/services/pokemon.service';

@Injectable()
export class PokemonUseCase {
  constructor(private readonly _pokemonService: PokemonService) {}

  async getPokemonFromAPI(name: string): Promise<PokemonJSON> {
    return this._pokemonService.get(name);
  }

  async getAllPokemonsFromAPI(): Promise<PokemonType[]> {
    return this._pokemonService.getAll();
  }
}
