<template>
  <div class="my-board-columns">
    <my-board-column
      v-for="column of columns"
      :key="column.id"
      :column="column"
      :data-name="column.name"
    >
      <draggable
        group="tasks"
        :move="onMove"
        :value="column.tasks"
        @input="onChange"
      >
        <my-task v-for="task of column.tasks" :key="task.id" :task="task" />
      </draggable>
    </my-board-column>
    <my-board-add-column />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
import MyBoardColumn from "./MyBoardColumn.vue";
import MyBoardAddColumn from "./MyBoardAddColumn.vue";
import { MyTask } from "@/components/MyTask";
import type { Dashboard, Column, Task, TaskEditDTO } from "@/store/types";
import type { MoveEvent } from "vuedraggable";
import type { PropType } from "vue";

type MyBoardColumnsProps = {
  columns: Column[];
  moveTask?: Task | undefined;
  moveToStatus: string;

  activeDashboard: Dashboard | undefined;

  setActiveDashboard: (id: string) => void;
  editTask: (data: {
    dashboardId: string;
    id: string;
    data: TaskEditDTO;
  }) => Task;

  onMove: (evt: MoveEvent<Task>) => void;
  onChange: () => Promise<void>;
};

export default defineComponent<MyBoardColumnsProps, MyBoardColumnsProps>({
  name: "MyBoardColumns",
  components: { draggable, MyBoardColumn, MyBoardAddColumn, MyTask },
  props: {
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },
  },
  data() {
    return {
      moveTask: undefined,
      moveToStatus: "",
    };
  },
  computed: {
    ...mapGetters({
      activeDashboard: "dashboards/activeDashboard",
    }),
  },
  methods: {
    ...mapActions({
      setActiveDashboard: "dashboards/setActiveDashboard",
      editTask: "dashboards/editTask",
    }),
    async onChange() {
      if (!this.moveTask || !this.activeDashboard) {
        return;
      }

      const data: TaskEditDTO = {
        status: this.moveToStatus,
      };
      await this.editTask({
        dashboardId: this.activeDashboard.id,
        id: this.moveTask.id,
        data,
      });
      this.setActiveDashboard(this.activeDashboard.id);
      this.moveTask = undefined;
      this.moveToStatus = "";
    },
    onMove(evt: MoveEvent<Task>) {
      this.moveTask = evt.draggedContext.element;
      if (evt.to.parentElement) {
        this.moveToStatus = evt.to.parentElement.dataset.name || "";
      }
    },
  },
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
