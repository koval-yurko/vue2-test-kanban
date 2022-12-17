<template>
  <div class="my-layout">
    <my-header />

    <div class="my-layout_content">
      <my-sidebar />

      <div class="my-content">
        <my-add-board v-if="!activeDashboard" />

        <my-empty-board
          v-if="activeDashboard && !activeDashboard.columns.length"
        />

        <my-board-columns
          v-if="activeDashboard && activeDashboard.columns.length"
        >
          <my-board-column
            v-for="column of activeDashboard.columns"
            :key="column.id"
            :column="column"
          >
            <my-task v-for="task of column.tasks" :key="task.id" :task="task" />
          </my-board-column>
          <my-board-add-column />
        </my-board-columns>
      </div>
    </div>

    <my-dashboard-edit-modal />
    <my-dashboard-delete-modal />
    <my-task-show-modal />
    <my-task-edit-modal />
    <my-task-delete-modal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyHeader } from "@/layout/MyHeader";
import { MySidebar } from "@/layout/MySidebar";
import { MyAddBoard } from "@/components/MyAddBoard";
import { MyEmptyBoard } from "@/components/MyEmptyBoard";
import {
  MyBoardColumns,
  MyBoardColumn,
  MyBoardAddColumn,
} from "@/components/MyBoardColumns";
import { MyTask } from "@/components/MyTask";
import MyDashboardEditModal from "@/modals/MyDashboardEditModal.vue";
import MyDashboardDeleteModal from "@/modals/MyDashboardDeleteModal.vue";
import MyTaskShowModal from "@/modals/MyTaskShowModal.vue";
import MyTaskEditModal from "@/modals/MyTaskEditModal.vue";
import MyTaskDeleteModal from "@/modals/MyTaskDeleteModal.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    MyHeader,
    MySidebar,

    MyAddBoard,
    MyEmptyBoard,
    MyBoardColumns,
    MyBoardColumn,
    MyBoardAddColumn,
    MyTask,

    MyDashboardEditModal,
    MyDashboardDeleteModal,
    MyTaskShowModal,
    MyTaskEditModal,
    MyTaskDeleteModal,
  },
  created() {
    this.loadDashboards();
  },
  computed: {
    ...mapGetters({
      activeDashboard: "dashboards/activeDashboard",
    }),
  },
  methods: {
    ...mapActions({
      loadDashboards: "dashboards/loadDashboards",
    }),
  },
});
</script>

<style>
.my-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
}
.my-layout_content {
  flex-grow: 1;
  flex-direction: row;
  display: flex;
  overflow: hidden;
}

.my-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}
</style>
