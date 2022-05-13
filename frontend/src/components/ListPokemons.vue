<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { RouterLink } from "vue-router";
import { ViewLayout } from "@/components/ViewLayoutControl.vue";
import { unFavoritePokemon, favoritePokemon } from "@/client";

type Pokemon = {
  name: string;
  id: string;
  types: Array<string>;
  isFavorite: boolean;
  image: string;
};

export default defineComponent({
  components: { RouterLink },
  props: {
    viewLayout: Object as PropType<ViewLayout>,
    pokemons: {
      type: Object as PropType<Array<Pokemon>>,
    },
  },
  computed: {
    view(): string {
      return this.viewLayout === ViewLayout.List ? "list" : "grid";
    },
  },
  methods: {
    toggleFavorite(pokemon: Pokemon) {
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
        .then(() => this.$emit("toggleFavorite"));
    },
  },
});
</script>

<template>
  <div :class="['list-container', view]">
    <div v-for="(pokemon, i) in pokemons" :key="i" class="list-item">
      <div class="list-item-image-container">
        <router-link :to="{ name: 'detail', params: { name: pokemon.name } }">
          <img :src="pokemon.image" class="list-item-image" />
        </router-link>
      </div>
      <div class="list-item-data-container">
        <div>
          <router-link
            :to="{ name: 'detail', params: { name: pokemon.name } }"
            class="list-item-data-name"
          >
            {{ pokemon.name }}
          </router-link>

          <div class="list-item-data-details">
            {{ pokemon.types.join(", ") }}
          </div>
        </div>
        <font-awesome-icon
          :icon="[pokemon.isFavorite ? 'fas' : 'far', 'heart']"
          size="lg"
          class="heart"
          @click="toggleFavorite(pokemon)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.heart {
  cursor: pointer;
  color: indianred;
  margin: 5px;
}
.list-container {
  padding: 10px;
  &.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    & > * {
      flex: 1 0 100%;
    }
    .list-item {
      border: 1px solid lightgrey;
      height: 60px;
      margin: 10px 0;
      display: flex;
      flex-direction: row;
      flex-wrap: none;
    }
    .list-item-image-container {
      width: 60px;
      flex: none;
    }
    .list-item-image {
      width: 40px;
      height: 40px;
      margin: 10px;
      object-fit: contain;
    }
    .list-item-data-container {
      flex: 1 0 auto;
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
.list-item {
  border: 1px solid lightgrey;
  height: 260px;
  width: 200px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: none;
}
.list-item-data-container {
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  padding: 5px;
  & > * {
    height: 30px;
  }
}
.list-item-data-name {
  font-weight: bold;
  text-decoration: none;
  color: black;
  font-size: 16px;
}
.list-item-data-details {
  font-weight: normal;
  font-size: 14px;
}
.list-item-image-container {
  width: 200px;
  height: 200px;
}
.list-item-image {
  width: 180px;
  height: 200px;
  margin: 0 10px;
  object-fit: contain;
}
</style>
