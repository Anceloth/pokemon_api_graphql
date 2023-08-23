import { Module } from '@nestjs/common';
import { EasyconfigModule, EasyconfigService } from 'nestjs-easyconfig';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user.module';
import { DatabaseModule } from './modules/database.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import GraphQLJSON from 'graphql-type-json';
import { AuthModule } from './modules/auth.module';
import { PokemonModule } from './modules/pokemon.module';

@Module({
  imports: [
    EasyconfigModule.register({ path: './.env', safe: true }),
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/database/types/schema.gql'),
      sortSchema: true,
      //resolvers: { JSON: GraphQLJSON },
      context: ({ req }) => ({ req }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PokemonModule,
  ],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly config: EasyconfigService) {
    AppModule.port = this.config.get('API_PORT');
  }
}
