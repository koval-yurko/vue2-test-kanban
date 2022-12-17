<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box>
      <my-modal-header title="Delete this task?" color="destructive" />

      <form @submit.prevent="onSubmit">
        <div class="my-modal-text">
          <p>
            Are you sure you want to delete the ‘Build settings UI’ task and its
            subtasks? This action cannot be reversed.
          </p>
        </div>

        <div class="my-modal-controls">
          <my-button color="destructive" type="submit" full-width>
            Delete
          </my-button>
          <my-button
            color="secondary"
            type="button"
            full-width
            @click="onCancelClick"
          >
            Cancel
          </my-button>
        </div>
      </form>
    </my-modal-box>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyButton } from "@/components/form/MyButton";
import { mapActions, mapGetters } from "vuex";
import { MODAL_TASK_DELETE } from "@/store/constants";
import type { Dashboard, Task } from "@/store/types";

type MyTaskDeleteModalProps = {
  modalData: Task | undefined;
  activeDashboard: Dashboard | undefined;

  isShowed: boolean;

  modalHide: () => void;
  deleteTask: (props: { dashboardId: string; id: string }) => void;
  setActiveDashboard: (id: string) => void;

  onClose: () => void;
  onSubmit: () => void;
  onCancelClick: () => void;
};

export default defineComponent<MyTaskDeleteModalProps, MyTaskDeleteModalProps>({
  name: "MyTaskDeleteModal",
  components: {
    MyModal,
    MyModalBox,
    MyModalHeader,
    MyButton,
  },
  props: {},
  computed: {
    ...mapGetters({
      modalData: "modals/data",
      activeDashboard: "dashboards/activeDashboard",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_TASK_DELETE;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
      deleteTask: "dashboards/deleteTask",
      setActiveDashboard: "dashboards/setActiveDashboard",
    }),
    onClose() {
      this.modalHide();
    },
    onSubmit() {
      if (!this.activeDashboard || !this.modalData) {
        return;
      }
      this.deleteTask({
        dashboardId: this.activeDashboard.id,
        id: this.modalData.id,
      });
      this.setActiveDashboard(this.activeDashboard.id);
      this.onClose();
    },
    onCancelClick() {
      this.onClose();
    },
  },
});
</script>

<style></style>
