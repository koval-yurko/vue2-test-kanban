<template>
  <div class="my-task">
    <div class="my-task_title">{{ task.title }}</div>
    <div class="my-task_text h4">{{ task.description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Task } from "@/store/types";

type MyBoardColumnsProps = {
  task: Task;
};

export default defineComponent<MyBoardColumnsProps, MyBoardColumnsProps>({
  name: "MyBoardColumns",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: false,
    },
  },
});
</script>

<style>
.my-task {
  padding: 24px 16px;
  margin-bottom: 20px;
  background: var(--task-bg-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(54, 78, 126, 0.101545);
}
.my-task:hover {
  cursor: pointer;
}

.my-task_title {
  margin-bottom: 6px;
  color: var(--task-title-color);

  transition: color 0.3s ease;
}

.my-task:hover .my-task_title {
  color: var(--task-title-color-hover);
}

.my-task_text.h4 {
  letter-spacing: initial;
  text-transform: none;
  color: var(--task-description-color);
}
</style>
