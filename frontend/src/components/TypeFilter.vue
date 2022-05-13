<script lang="ts">
import { defineComponent } from "vue";
import { getAllPokemonTypes } from "@/client";

export default defineComponent({
  props: {
    modelValue: String,
  },
  apollo: {
    pokemonTypes: {
      query: getAllPokemonTypes,
    },
  },
  data() {
    return {
      pokemonTypes: [],
    };
  },
  methods: {
    updateModelValue(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<template>
  <div>
    <select
      name="filter"
      :value="modelValue"
      @change="updateModelValue"
      width="100"
    >
      <option value="" disabled>Type</option>
      <option value="" disabled v-if="$apollo.queries.pokemonTypes.loading">
        Loading...
      </option>
      <option v-for="(typeFilter, i) in pokemonTypes" :key="i">
        {{ typeFilter }}
      </option>
    </select>
    <button @click="$emit('update:modelValue', '')">X</button>
  </div>
</template>

<style lang="scss">
[name="filter"] {
  width: 200px;
  & + button {
    height: 40px;
    width: 40px;
    padding: 0 10px;
    border: 1px solid #42b883;
    color: white;
    background-color: #42b883;
    cursor: pointer;
  }
}
</style>
