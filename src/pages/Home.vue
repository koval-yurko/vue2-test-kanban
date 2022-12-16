<template>
  <div class="my-layout">
    <my-header />

    <div class="my-layout_content">
      <my-sidebar />

      <div class="my-content">
        <div class="columns">
          <div class="column">
            <div class="row">Column 1 Row 1</div>
            <div class="row">Column 1 Row 2</div>
            <div class="row">Column 1 Row 3</div>
          </div>

          <div class="column">
            <div class="row">Column 2 Row 1</div>
            <div class="row">
              <button @click="onShowTaskClick">SHOW TASK</button>
            </div>
            <div class="row">Column 2 Row 3</div>
            <div class="row">Column 2 Row 1</div>
          </div>

          <div class="column">
            <div class="row">Column 3 Row 1</div>
            <div class="row">Column 3 Row 2</div>
            <div class="row">Column 3 Row 3</div>
          </div>

          <div class="column">
            <div class="row">Column 3 Row 1</div>
            <div class="row">Column 3 Row 2</div>
            <div class="row">Column 3 Row 3</div>
          </div>

          <div class="column">
            <div class="row">Column 3 Row 1</div>
            <div class="row">Column 3 Row 2</div>
            <div class="row">Column 3 Row 3</div>
          </div>
        </div>
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
import MyDashboardEditModal from "@/modals/MyDashboardEditModal.vue";
import MyDashboardDeleteModal from "@/modals/MyDashboardDeleteModal.vue";
import MyTaskShowModal from "@/modals/MyTaskShowModal.vue";
import MyTaskEditModal from "@/modals/MyTaskEditModal.vue";
import MyTaskDeleteModal from "@/modals/MyTaskDeleteModal.vue";
import { MODAL_TASK_SHOW } from "@/store/constants";

export default defineComponent({
  name: "HomePage",
  components: {
    MyHeader,
    MySidebar,
    MyDashboardEditModal,
    MyDashboardDeleteModal,
    MyTaskShowModal,
    MyTaskEditModal,
    MyTaskDeleteModal,
  },
  computed: {
    ...mapGetters({
      sidebarVisible: "sidebar/isVisible",
    }),
  },
  methods: {
    ...mapActions({
      toggleSidebar: "sidebar/toggleSidebar",
      showModal: "modals/show",
    }),
    onShowTaskClick() {
      this.showModal({
        name: MODAL_TASK_SHOW,
      });
    },
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

.columns {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.column {
  width: 300px;
  flex-shrink: 0;
  border: solid 1px green;
}
.row {
  height: 200px;
  border: solid 1px blue;
}
</style>
