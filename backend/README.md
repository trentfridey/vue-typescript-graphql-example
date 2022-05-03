# GraphQL Pokémon server

## Start the server

```
$ npm install
$ npm start
```

## Access the playground

After starting the server, you can access the GraphQL Playground at https://localhost:4000/graphql and run queries and mutations like this:

```
query { pokemons(query: { limit: 10, offset: 0 }) { edges { name } } }
```

