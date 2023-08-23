
import { AuthUseCase } from 'src/useCases/auth.usecases';
import { SigninDto, LoggedInDto } from 'src/database/models/auth.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@Resolver()
export class AuthResolver {
  constructor(private readonly _auth: AuthUseCase,@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  
  @Query(()=>LoggedInDto)
  async signin(@Args('signIn',{type:()=>SigninDto}) signIn: SigninDto): Promise<LoggedInDto> {
    
    try {
      return await this._auth.login(signIn);
    } catch (error) {
      this.logger.error(error.message)
      throw error 
    }
  }
  
}
