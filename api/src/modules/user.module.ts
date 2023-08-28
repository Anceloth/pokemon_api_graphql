import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/models/user.entity';
import { UserSchema } from 'src/database/models/user.schema';
import { UserResolver } from 'src/resolvers/users.resolver';
import { UserService } from 'src/services/user.service';
import { UserManagerUseCase } from 'src/useCases/userManager.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService, UserManagerUseCase],
})
export class UserModule {}
