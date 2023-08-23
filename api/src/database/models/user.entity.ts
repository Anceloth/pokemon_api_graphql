import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';
import { Content } from './content.entity';

@Entity('users')
@ObjectType()
@Unique(['user_name'])
export class User extends Content {
  @Field(() => String)
  @Column({ type: 'varchar', length: 50 })
  user_name!: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 250 })
  password!: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  is_active!: boolean;

  @Field(() => [Pokemon])
  @ManyToMany(
    () => Pokemon,
    pokemon => pokemon.users,
    { eager: true },
  )
  @JoinTable()
  pokemons: Pokemon[];
}
@InputType()
export class InputUserType {
  @Field()
  user_name!: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Field()
  password!: string;
}

@InputType()
export class UpdateUser {
  @Field(() => Boolean)
  is_active?: boolean;

  @Field()
  password!: string;
}
