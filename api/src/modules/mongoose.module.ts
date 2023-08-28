import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jonathanmarinc:T2MyO96IWaiwK72n@cluster0.ipolg10.mongodb.net/pokemon?retryWrites=true&w=majority',
    ),
  ],
})
export class MongoDBModule {}
