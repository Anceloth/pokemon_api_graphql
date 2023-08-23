import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/models/user.entity";
import { UserResolver } from "src/resolvers/users.resolver";
import { UserService } from "src/services/user.service";
import { UserManagerUseCase } from "src/useCases/userManager.useCase";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, UserManagerUseCase],
})
export class UserModule{}