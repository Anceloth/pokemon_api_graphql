import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1515769694450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      INSERT INTO public.users (id, status, create_at, update_at, user_name, "name", "password", is_active)
      VALUES(72275806, 'Activo'::public."users_status_enum", '2023-08-21 16:30:05.809', '2023-08-21 16:30:05.809', 'Jhon_wick', 'Jonathan', 'Password123', true);
      
      INSERT INTO public.pokemon (id, status, create_at, update_at, "name", url)
      VALUES(1, 'Activo'::public."pokemon_status_enum", '2023-08-21 17:58:28.833', '2023-08-21 17:58:28.833', 'bulbasaur', 'https://pokeapi.co/api/v2/pokemon/1/');
      
      INSERT INTO public.pokemon (id, status, create_at, update_at, "name", url)
      VALUES(2, 'Activo'::public."pokemon_status_enum", '2023-08-21 17:59:36.712', '2023-08-21 17:59:36.712', 'ivysaur', 'https://pokeapi.co/api/v2/pokemon/2/');
      
      INSERT INTO public.users_pokemons_pokemon ("usersId", "pokemonId") VALUES(72275806, 1);
      
      INSERT INTO public.users_pokemons_pokemon ("usersId", "pokemonId") VALUES(72275806, 2);
      `);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    // TODO document why this async method 'down' is empty
  }
}
