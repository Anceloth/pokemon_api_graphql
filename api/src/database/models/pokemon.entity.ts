import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Content } from './content.entity';
import { User } from './user.entity';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';

@Entity('pokemon')
@ObjectType()
export class Pokemon extends Content {
  @Field(() => String)
  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 50, nullable: true })
  url!: string;

  @Field(() => [User])
  @ManyToMany(
    () => User,
    user => user.pokemons,
  )
  users: User[];
}

@ObjectType()
export class PokemonType {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  url!: string;
}

@ObjectType()
export class PokemonJSON {
  @Field(() => GraphQLJSON)
  data!: any;
}

@InputType()
export class AddPokemonToUser {
  @Field(() => String)
  pokemonName?: string;

  @Field(() => String)
  urlPokemon?: string;

  @Field(() => String)
  userName?: string;
}

@Exclude()
@InputType()
export class UpdatePokemon {
  @Expose()
  @Field(() => String, { nullable: true })
  name!: string;

  @Expose()
  @Field(() => String, { nullable: true })
  state!: string;
}
