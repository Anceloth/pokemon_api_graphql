import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
} from 'typeorm';

import { StatusEntity } from '../enums.num';
@ObjectType()
export abstract class Content extends BaseEntity {
  @Field(()=> Int)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(()=> StatusEntity)
  @Column({ type: 'enum', enum: StatusEntity, default: StatusEntity.ACTIVE })
  status!: StatusEntity;

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt!: Date;
}
