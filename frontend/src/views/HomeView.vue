<script lang="ts">
import { defineComponent } from "vue";
import ListItem from "@/components/ListItem.vue";
import ViewLayoutControl, {
  ViewLayout,
} from "@/components/ViewLayoutControl.vue";
import {
  getAllPokemonTypes,
  getAllPokemon,
  unFavoritePokemon,
  favoritePokemon,
} from "@/client.ts";

export default defineComponent({
  components: {
    ListItem,
    ViewLayoutControl,
  },
  apollo: {
    pokemonTypes: {
      query: getAllPokemonTypes,
    },
    pokemons: {
      query: getAllPokemon,
      variables() {
        return {
          type: this.typeFilterSelected,
          search: this.search,
          isFavorite: this.favoriteViewSelected,
        };
      },
      update: (data) => data.pokemons.edges,
    },
  },
  data() {
    return {
      search: "",
      viewLayoutSelected: ViewLayout.List,
      favoriteViewSelected: false,
      typeFilterSelected: "",
      pokemons: [],
      pokemonTypes: [],
    };
  },
  computed: {
    ViewLayout() {
      return ViewLayout;
    },
  },
  methods: {
    toggleFavorite(pokemon) {
      const mutations = { unFavoritePokemon, favoritePokemon };
      const mutationType = pokemon.isFavorite
        ? "unFavoritePokemon"
        : "favoritePokemon";
      this.$apollo
        .mutate({
          mutation: mutations[mutationType],
          variables: {
            id: pokemon.id,
          },
        })
        .then(() => this.$apollo.queries.pokemons.refetch());
    },
  },
});
</script>

<template>
  <main>
    <h1>
      Vue Pokedex
      {{ this.$apollo.queries.pokemons.loading ? "...loading" : "" }}
    </h1>
    <div class="controls">
      <div>
        <label for="search">Search by Name:</label>
        <input type="text" name="search" v-model="search" width="100" />
      </div>
      <div>
        <label for="filter">Filter by Type:</label>
        <select name="filter" v-model="typeFilterSelected" width="100">
          <option v-for="(typeFilter, i) in pokemonTypes" :key="i">
            {{ typeFilter }}
          </option>
        </select>
        <button @click="typeFilterSelected = ''">X</button>
      </div>
      <view-layout-control
        :view="viewLayoutSelected"
        @toggle-view="viewLayoutSelected = $event"
      />
    </div>
    <div class="tabs">
      <div
        :class="{ selected: !favoriteViewSelected }"
        @click="favoriteViewSelected = false"
      >
        All
      </div>
      <div
        :class="{ selected: favoriteViewSelected }"
        @click="favoriteViewSelected = true"
      >
        Favorites
      </div>
    </div>
    <div
      :class="[
        'list-container',
        viewLayoutSelected === ViewLayout.List ? 'list' : 'grid',
      ]"
    >
      <list-item
        v-for="(pokemon, i) in pokemons"
        :key="i"
        :pokemon="pokemon"
        @toggleFavorite="toggleFavorite"
      />
    </div>
  </main>
</template>

<style lang="scss">
.controls {
  border: 1px solid lightgreen;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  label {
    margin-right: 5px;
    color: grey;
  }
  [name="filter"] {
    width: 200px;
  }
}
.view-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 120px;
  & .view-control {
    flex: 0 0 60px;
    text-align: center;
    font-size: 19px;
    background-color: lightgrey;
    cursor: pointer;
    border: 1px solid black;
    color: grey;
    &.selected {
      background-color: darkgrey;
      border: 3px solid black;
      color: black;
    }
  }
}
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & > * {
    border: 1px solid black;
    padding: 10px;
    flex: 1;
    text-align: center;
    background-color: lightgrey;
    cursor: pointer;
    &.selected {
      background-color: darkgrey;
    }
  }
}
.list-container {
  &.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    & > * {
      flex: 1 0 100%;
    }
  }
  &.grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    & > * {
      flex: none;
    }
  }
}
</style>
