import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { StatusEntity } from '../../database/enums.num';
import { User } from 'src/database/models/user.entity';
import { Repository } from 'typeorm';
import { EasyconfigService } from 'nestjs-easyconfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private config: EasyconfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:config.get('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { user_name } = payload;
    const user = await this._userRepository.findOne({
      where: { user_name, status: StatusEntity.ACTIVE },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
