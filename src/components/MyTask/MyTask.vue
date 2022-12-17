<template>
  <div class="my-task" @click="onShowClick">
    <div class="my-task_title h3">{{ task.title }}</div>
    <div class="my-task_text h4">{{ completedText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { MODAL_TASK_SHOW } from "@/store/constants";
import type { PropType } from "vue";
import type { Task } from "@/store/types";

type MyTaskProps = {
  task: Task;

  completedText: string;

  showModal: (opts: { name: string; data?: Task }) => void;

  onShowClick: () => void;
};

export default defineComponent<MyTaskProps, MyTaskProps>({
  name: "MyTask",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: false,
    },
  },
  computed: {
    completedText() {
      const total = this.task.subtasks.length;
      const completed = this.task.subtasks.filter(
        (el) => el.isCompleted
      ).length;
      return `${completed} of ${total} subtasks`;
    },
  },
  methods: {
    ...mapActions({
      showModal: "modals/showModal",
    }),
    onShowClick() {
      this.showModal({
        name: MODAL_TASK_SHOW,
        data: this.task,
      });
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
