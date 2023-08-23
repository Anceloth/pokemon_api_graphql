# graphql-nestjs

This proyect is a graphql using NestJs framework, implementing clean architecture (onion architecture)
in NodeJs.
It consumes some REST API from pokemon.co and expose the same functionalities in the resolver

It saves in a DB pokemons for some users

<div><img src="https://graphql.org/img/logo.svg" width="250" height="250"> <img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" width="250" height="250"></div>

---

## Components

1. Data layer:
   This layer contains all classes and modules in charge of consuming data
   generally here stay services, DAO's and Repositories.

2. Core layer:
   Here entities or models and use-cases, .

3. Resolver's layer:
   Here are the resolver's and another web components, which expose the services.

---

## To Run

1. To start postgres container, execute in ./

   `npm run docker:init` or `docker-compose up -d`

2. To run Graphql API, go to ./api/

   `cd api/`

   and execute

   `npm run start:dev`

At first time it's going to create all the tables.

3. To populate DB (Just First time), inside ./api/ folder, execute in other terminal

   `npm run migration:run`

note: It is just when you need to fill the DB with data, if you had executed migration before, skip this step

---

## Support

For support contact jonathan.marin.c@gmail.com

## Stay in touch

- Autor - [Jonathan Marin](https://fr.wikipedia.org/wiki/Jonathan_Mar%C3%ADn)
- Repos: [GitLab](https://gitlab.com/Taufiq)
  [GitHub](https://github.com/Anceloth)
