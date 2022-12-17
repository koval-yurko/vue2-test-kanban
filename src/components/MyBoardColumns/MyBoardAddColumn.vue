<template>
  <div class="my-board-column my-board-column__add">
    <div class="my-board-column_title h4"></div>
    <button class="my-board-column_button h1">
      <span class="h1">+ New Column</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Column } from "@/store/types";

import type { PropType } from "vue";

type MyBoardAddColumnProps = {
  column: Column;
};

export default defineComponent<MyBoardAddColumnProps, MyBoardAddColumnProps>({
  name: "MyBoardAddColumn",
  props: {
    column: {
      type: Object as PropType<Column>,
      required: false,
    },
  },
});
</script>

<style>
.my-board-column__add {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  max-height: 90vh;
}

.my-board-column_button {
  flex-grow: 1;
  margin: 0;
  padding: 0;
  color: var(--add-column-color);
  background: var(--add-column-bg-color);
  border: none;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.my-board-column_button:hover {
  color: var(--add-column-color-hover);
}
</style>
