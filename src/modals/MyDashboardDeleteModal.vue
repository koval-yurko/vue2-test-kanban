<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box>
      <my-modal-header title="Delete this board?" color="destructive" />

      <form @submit.prevent="onSubmit">
        <div class="my-modal-text">
          <p>
            Are you sure you want to delete the ‘Platform Launch’ board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
        </div>

        <div class="my-modal-controls">
          <my-button
            color="destructive"
            type="button"
            full-width
            @click="onDeleteClick"
          >
            Delete
          </my-button>
          <my-button
            color="secondary"
            type="submit"
            full-width
            @click="onCancelClick"
            >Cancel</my-button
          >
        </div>
      </form>
    </my-modal-box>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyButton } from "@/components/form/MyButton";
import { MODAL_DASHBOARD_DELETE } from "@/store/constants";
import type { Dashboard } from "@/store/types";
import type { PropType } from "vue";

type MyDashboardEditModalProps = {
  modalData: any;
  isShowed: boolean;
  dashboards: Dashboard[];
  activeDashboard: Dashboard | undefined;

  modalHide: () => void;
  deleteDashboard: (name: string) => void;
  setActiveDashboard: (name: string) => void;

  onClose: () => void;
  onSubmit: () => void;
  onCancelClick: () => void;
  onDeleteClick: () => void;
};

export default defineComponent<
  MyDashboardEditModalProps,
  MyDashboardEditModalProps
>({
  name: "MyDashboardEditModal",
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
      dashboards: "dashboards/dashboards",
      activeDashboard: "dashboards/activeDashboard",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_DASHBOARD_DELETE;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
      deleteDashboard: "dashboards/deleteDashboard",
      setActiveDashboard: "dashboards/setActive",
    }),
    onClose() {
      this.modalHide();
    },
    onSubmit() {
      console.log("submit");
    },
    onCancelClick() {
      this.onClose();
    },
    onDeleteClick() {
      if (this.activeDashboard) {
        this.deleteDashboard(this.activeDashboard.name);
        this.setActiveDashboard(
          this.dashboards[0] ? this.dashboards[0].name : ""
        );
      }
      this.onClose();
    },
  },
});
</script>

<style></style>
