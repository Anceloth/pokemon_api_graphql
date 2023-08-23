import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from 'src/database/models/pokemon.entity';
import { PokemonResolver } from 'src/resolvers/pokemon.resolver';
import { PokemonService } from 'src/services/pokemon.service';
import { PokemonUseCase } from 'src/useCases/pokemon.usecases';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [PokemonResolver, PokemonService, PokemonUseCase],
})
export class PokemonModule {}
