<script>
import { defineComponent } from "vue";
import { getPokemonDetails } from "@/client";

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
  methods: {
    play() {
      this.$refs.sound.play();
    },
  },
});
</script>

<template>
  <div class="container">
    <div v-if="$apollo.queries.pokemonByName.loading">Loading...</div>
    <div class="image-container">
      <img :src="pokemonByName.image" class="image" />
      <audio ref="sound" :src="pokemonByName.sound" />
      <button class="play" @click="play">
        <font-awesome-icon icon="volume-high" />
      </button>
    </div>
    <div class="data">
      <h1>{{ pokemonByName.name }}</h1>
      {{ pokemonByName.types.join(", ") }}
    </div>
    <router-link to="/">Go Back</router-link>
  </div>
</template>

<style scoped>
.container {
  width: 500px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 20px auto;
}
.data {
  background-color: lightgrey;
  padding: 10px;
}
.image-container {
  position: relative;
  display: flex;
}
img {
  margin: 0 auto;
}
.play {
  height: 40px;
  width: 40px;
  color: #42b883;
  background-color: white;
  border: none;
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  bottom: 10px;
}
</style>
