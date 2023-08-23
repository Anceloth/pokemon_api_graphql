import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SigninDto, LoggedInDto } from '../database/models/auth.entity';
import { User } from 'src/database/models/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from '../auth/jwt-payload.interface';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { StatusEntity } from 'src/database/enums.num';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto): Promise<LoggedInDto> {
    const { user_name, password } = signinDto;
    const user: User | undefined = await this._userRepository.findOne({
      where: { user_name, status: StatusEntity.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException(`user ${user_name} does not exist`);
    }

    if (!user.is_active) {
      throw new PreconditionFailedException(
        `user ${user_name} need validate his emails`,
      );
    }

    console.info('password :', password);
    console.info('user.password :', user.password);
    //const isMatch = await compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user.id,
      user_name: user.user_name,
    };

    const token = this._jwtService.sign(payload);
    return plainToClass(LoggedInDto, { token, user });
  }
}
