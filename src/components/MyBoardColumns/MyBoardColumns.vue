<template>
  <div class="my-board-columns">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type MyBoardColumnsProps = {
  //
};

export default defineComponent<MyBoardColumnsProps, MyBoardColumnsProps>({
  name: "MyBoardColumns",
});
</script>

<style>
.my-board-columns {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-left: 12px;
}
</style>
