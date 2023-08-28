/*import { Injectable } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
  'mongodb+srv://jonathanmarinc:T2MyO96IWaiwK72n@cluster0.ipolg10.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

@Injectable()
export class MongoDBConn {
  constructor() {
    /* TODO document why this constructor is empty */
/*  }

  async getUsers() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db('pokemon').command({ ping: 1 });
      let users = client.db('pokemon').collection('users');
      console.log(users);
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!',
      );
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
}*/
