import { Injectable } from "@nestjs/common";
import { LoggedInDto, SigninDto } from "src/database/models/auth.entity";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class AuthUseCase {
  constructor(private readonly _authService: AuthService) {}

  async login(signinDto:SigninDto): Promise<LoggedInDto>{
    return await  this._authService.signin(signinDto);
  }
}