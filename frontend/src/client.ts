import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import gql from "graphql-tag";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;

export const getAllPokemon = gql`
  query GetAllPokemon($type: String, $isFavorite: Boolean, $search: String) {
    pokemons(
      query: {
        limit: 1000
        offset: 0
        filter: { type: $type, isFavorite: $isFavorite }
        search: $search
      }
    ) {
      edges {
        name
        id
        types
        isFavorite
        image
      }
    }
  }
`;

export const getAllPokemonTypes = gql`
  query GetAllPokemonTypes {
    pokemonTypes
  }
`;

export const getPokemonDetails = gql`
  query GetPokemonDetails($name: String!) {
    pokemonByName(name: $name) {
      name
      id
      types
      isFavorite
      image
      sound
    }
  }
`;

export const unFavoritePokemon = gql`
  mutation unFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      name
      id
      types
      isFavorite
      image
    }
  }
`;

export const favoritePokemon = gql`
  mutation favoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      name
      id
      types
      isFavorite
      image
    }
  }
`;
