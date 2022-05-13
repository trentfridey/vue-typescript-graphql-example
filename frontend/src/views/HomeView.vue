<script lang="ts">
import { defineComponent } from "vue";
import ListPokemons from "@/components/ListPokemons.vue";
import ViewLayoutControl, {
  ViewLayout,
} from "@/components/ViewLayoutControl.vue";
import TabViewControl from "@/components/TabViewControl.vue";
import TypeFilter from "@/components/TypeFilter.vue";
import { getAllPokemon } from "@/client";

export default defineComponent({
  components: {
    ListPokemons,
    TabViewControl,
    ViewLayoutControl,
    TypeFilter,
  },
  apollo: {
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
  data: () => {
    return {
      search: "",
      viewLayoutSelected: ViewLayout.List,
      favoriteViewSelected: false,
      typeFilterSelected: "",
      pokemons: [],
    };
  },
  methods: {
    refetchList() {
      this.$apollo.queries.pokemons.refetch();
    },
  },
  watch: {
    favoriteViewSelected() {
      this.$nextTick(() => {
        this.refetchList();
      });
    },
  },
});
</script>

<template>
  <main>
    <header>
      <tab-view-control v-model="favoriteViewSelected" />
      <div class="controls">
        <input
          placeholder="Search"
          type="text"
          name="search"
          v-model="search"
        />
        <type-filter v-model="typeFilterSelected" />
        <view-layout-control v-model="viewLayoutSelected" />
      </div>
      <div v-if="$apollo.queries.pokemons.loading">Loading...</div>
    </header>
    <list-pokemons
      :pokemons="pokemons"
      :viewLayout="viewLayoutSelected"
      @toggle-favorite="refetchList"
    />
  </main>
</template>

<style lang="scss">
header {
  background-color: white;
  position: sticky;
  top: -1px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  z-index: 2;
  padding: 10px;
  min-height: 140px;
}
.controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: 50px;
  label {
    margin-right: 5px;
    color: grey;
  }
  select,
  input {
    height: 40px;
    border-radius: 0;
    border: none;
    background-color: lightgrey;
    padding: 10px;
  }
}
</style>
