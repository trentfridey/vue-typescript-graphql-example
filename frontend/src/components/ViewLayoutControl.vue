<script lang="ts">
import { defineComponent } from "vue";

export enum ViewLayout {
  List = "List",
  Grid = "Grid",
}

export default defineComponent({
  props: {
    view: ViewLayout,
  },
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
      @click="$emit('toggleView', ViewLayout.List)"
      :class="['view-control', { selected: view === ViewLayout.List }]"
    >
      <font-awesome-icon icon="list" />
    </div>
    <div
      @click="$emit('toggleView', ViewLayout.Grid)"
      :class="['view-control', { selected: view === ViewLayout.Grid }]"
    >
      <font-awesome-icon icon="border-all" />
    </div>
  </div>
</template>

<style>
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
</style>
