import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/database/models/user.entity';
import { EasyconfigService } from 'nestjs-easyconfig';
import { AuthUseCase } from 'src/useCases/auth.usecases';
import { AuthResolver } from 'src/resolvers/auth.resolver';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [EasyconfigService],
      useFactory(config: EasyconfigService) {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: 14400,
          },
        };
      },
    }),
  ],
  providers: [AuthService,  JwtStrategy, AuthUseCase, AuthResolver],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
