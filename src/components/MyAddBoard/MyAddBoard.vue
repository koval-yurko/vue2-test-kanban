<template>
  <div class="my-add-board">
    <div class="my-add-board_title h2">
      This board is empty. Create a new column to get started.
    </div>
    <my-button class="my-add-board_button" size="large">
      + Add New Column
    </my-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MyButton } from "@/components/form/MyButton";

type MyAddBoardProps = {
  //
};

export default defineComponent<MyAddBoardProps, MyAddBoardProps>({
  name: "MyAddBoard",
  components: { MyButton },
});
</script>

<style>
.my-add-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
  color: var(--add-board-color);
}

.my-add-board_title {
  margin-bottom: 32px;
}

.my-add-board_button {
}
</style>
