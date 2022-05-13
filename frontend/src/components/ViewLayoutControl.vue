<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export enum ViewLayout {
  List = "List",
  Grid = "Grid",
}

export default defineComponent({
  props: {
    modelValue: Object as PropType<ViewLayout>,
  },
  emits: ["update:modelValue"],
  computed: {
    ViewLayout() {
      return ViewLayout;
    },
  },
});
</script>

<template>
  <div class="view-controls">
    <div
      id="view-list"
      @click="$emit('update:modelValue', ViewLayout.List)"
      :class="['view-control', { selected: modelValue === ViewLayout.List }]"
    >
      <font-awesome-icon icon="list" />
    </div>
    <div
      id="view-grid"
      @click="$emit('update:modelValue', ViewLayout.Grid)"
      :class="['view-control', { selected: modelValue === ViewLayout.Grid }]"
    >
      <font-awesome-icon icon="border-all" />
    </div>
  </div>
</template>

<style lang="scss">
.view-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80px;
  height: 40px;
  line-height: 40px;
  & .view-control {
    flex: 1 0 30px;
    text-align: center;
    font-size: 19px;
    background-color: lightgrey;
    cursor: pointer;
    color: #42b883;
    &.selected {
      background-color: #42b883;
      color: white;
    }
  }
}
</style>
