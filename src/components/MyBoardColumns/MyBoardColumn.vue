<template>
  <div class="my-board-column">
    <div class="my-board-column_title h4">
      <span class="my-board-column_title_color"></span>
      {{ column.name }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Column } from "@/store/types";

import type { PropType } from "vue";

type MyBoardColumnProps = {
  column: Column;
};

export default defineComponent<MyBoardColumnProps, MyBoardColumnProps>({
  name: "MyBoardColumn",
  props: {
    column: {
      type: Object as PropType<Column>,
      required: false,
    },
  },
});
</script>

<style>
.my-board-column {
  width: 304px;
  padding: 24px 12px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.my-board-column_title {
  min-height: 15px;
  margin-bottom: 24px;
  text-transform: uppercase;
  color: var(--task-description-color);
}

.my-board-column_title_color {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 6px -3px 0;
  border-radius: 50%;
  background: var(--color-primary);
}
</style>
