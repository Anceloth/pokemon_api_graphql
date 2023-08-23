
import { TypeOrmModule } from '@nestjs/typeorm';
import { EasyconfigService } from 'nestjs-easyconfig';
import { ConnectionOptions } from 'typeorm';



export const databaseProviders = [
  
  TypeOrmModule.forRootAsync({
    inject: [EasyconfigService],
    async useFactory(config: EasyconfigService) {
      
      return {
        //ssl: true,
        type: 'postgres',
        host: config.get('POSTGRE_HOST'),
        username: config.get('POSTGRE_DBUSER'),
        password: config.get('POSTGRE_DBPSW'),
        database: config.get('POSTGRE_DBNAME'),
        port: parseInt(config.get('POSTGRE_DBPORT')),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: ['/src/database/migrations/*{.ts,.js}'],
        synchronize: true
      } as ConnectionOptions;
    },
  }),
];