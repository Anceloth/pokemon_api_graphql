import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  Pokemon,
  PokemonJSON,
  PokemonType,
} from 'src/database/models/pokemon.entity';
import { EasyconfigService } from 'nestjs-easyconfig';
import fetch from 'node-fetch';

@Injectable()
export class PokemonService {
  constructor(private config: EasyconfigService) {}

  async get(name: string): Promise<PokemonJSON> {
    try {
      console.info(' In service name: ', name);
      const pokemonUrl = this.config.get('POKEMON_URL');
      console.log(pokemonUrl);

      const response = await fetch(`${pokemonUrl}/${name}`);
      const data = await response.json();
      let pokemon: PokemonJSON = new PokemonJSON();
      pokemon.data = data;
      console.log('pokemon.data :', pokemon.data);
      return pokemon;
    } catch (e) {
      console.error('Error in getting the pokemons from external API: ', e);
      throw new InternalServerErrorException(
        'Error in getting the pokemons from external API',
        e,
      );
    }
  }

  async getAll(): Promise<PokemonType[]> {
    try {
      const pokemonUrl = this.config.get('POKEMON_URL');
      console.log(pokemonUrl);

      const response = await fetch(`${pokemonUrl}/?offset=0&limit=1281`);
      const data = await response.json();

      console.log(data);
      return data.results;
    } catch (e) {
      console.log('Error getting all pokemons: ', e);
      throw new InternalServerErrorException('Error getting all pokemons :', e);
    }
  }
}
