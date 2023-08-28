import { Field, ObjectType } from '@nestjs/graphql';
import { Pokemon, PokemonType } from './pokemon.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  @Prop({ required: true })
  _id!: string;

  @Field(() => String)
  @Prop({ required: true })
  id!: string;

  @Field(() => String)
  @Prop({ required: true, name: 'userName' })
  userName!: string;

  @Field(() => String)
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Field(() => [PokemonType])
  @Prop({ type: Array })
  pokemons: PokemonType[];
}

export const UserSchema = SchemaFactory.createForClass(User);
