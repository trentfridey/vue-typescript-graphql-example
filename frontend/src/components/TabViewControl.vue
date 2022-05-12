<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean,
  },
});
</script>

<template>
  <div class="tabs">
    <div
      :class="{ selected: !modelValue }"
      @click="$emit('update:modelValue', false)"
    >
      All
    </div>
    <div
      :class="{ selected: modelValue }"
      @click="$emit('update:modelValue', true)"
    >
      Favorites
    </div>
  </div>
</template>

<style lang="scss">
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & > * {
    border: 1px solid #42b883;
    padding: 10px;
    flex: 1;
    text-align: center;
    background-color: white;
    color: #42b883;
    cursor: pointer;
    &.selected {
      background-color: #42b883;
      color: white;
    }
  }
}
</style>
