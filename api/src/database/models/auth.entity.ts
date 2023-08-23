import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "./user.entity";


@InputType()
export class SigninDto {
  @Field(()=>String)
  @IsNotEmpty()
  @IsString()
  user_name!: string;

  @Field(()=>String)
  @IsNotEmpty()
  @IsString()
  password!: string;
}


@ObjectType()
export class LoggedInDto {
  @Field(()=>String)
  @IsString()
  token!: string;

  @Field(() => User)
  user!: User;
}

@ObjectType()
export class IJwtPayloadDTO {
  @Field()
  id: number;

  @Field()
  user_name: string;
  
  @Field()
  roles: string;
}