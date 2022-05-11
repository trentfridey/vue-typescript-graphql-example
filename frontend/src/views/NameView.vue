<script>
import { defineComponent } from "vue";
import { getPokemonDetails } from "@/client.ts";

export default defineComponent({
  apollo: {
    pokemonByName: {
      query: getPokemonDetails,
      variables() {
        return { name: this.name };
      },
    },
  },
  data: function () {
    return {
      pokemonByName: {},
    };
  },
  computed: {
    name() {
      return this.$route.params.name;
    },
  },
});
</script>

<template>
  <div class="about">
    <h1>{{ pokemonByName.name }}</h1>
    <img :src="pokemonByName.image" />
    <audio controls :src="pokemonByName.sound" />
  </div>
</template>

<style></style>
