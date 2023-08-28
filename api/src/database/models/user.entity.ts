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
export class User extends Content {
  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 50,
    name: 'user_name',
    unique: true,
    nullable: true,
  })
  userName?: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 250 })
  password!: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false, name: 'is_active' })
  isActive!: boolean;

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
  @Field(() => String)
  userName!: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Field()
  password!: string;
}

@InputType()
export class UpdateUser {
  @Field(() => Boolean)
  isActive?: boolean;

  @Field()
  password!: string;
}
