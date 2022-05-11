<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  components: { RouterLink },
  props: {
    pokemon: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<template>
  <div class="list-item">
    <div class="list-item-data-container">
      <div>
        <router-link :to="{ name: 'detail', params: { name: pokemon.name } }">
          <span class="list-item-data-name">{{ pokemon.name }}</span>
        </router-link>
        <font-awesome-icon
          :icon="['fas', 'heart']"
          size="lg"
          v-if="pokemon.isFavorite"
          class="heart"
          @click="$emit('toggleFavorite', pokemon)"
        />
        <font-awesome-icon
          :icon="['far', 'heart']"
          size="lg"
          v-else
          class="heart"
          @click="$emit('toggleFavorite', pokemon)"
        />
      </div>
      <span class="list-item-data-name">{{ pokemon.types.join(", ") }}</span>
    </div>
    <div class="list-item-image-container">
      <router-link :to="{ name: 'detail', params: { name: pokemon.name } }">
        <img :src="pokemon.image" class="list-item-image" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.heart {
  cursor: pointer;
  color: indianred;
  margin: 5px;
}
.list-item {
  border: 1px solid lightgrey;
  height: 300px;
  width: 200px;
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: none;
}
.list-item-data-container {
  background-color: lightgrey;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
