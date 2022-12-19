<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box v-if="modalData">
      <my-modal-header title="Delete this board?" color="destructive" />

      <form @submit.prevent="onSubmit">
        <div class="my-modal-text">
          <p>
            Are you sure you want to delete the ‘{{ modalData.name }}’ board?
            This action will remove all columns and tasks and cannot be
            reversed.
          </p>
        </div>

        <div class="my-modal-controls">
          <my-button color="destructive" type="submit" full-width>
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

type MyDashboardEditModalProps = {
  modalData: Dashboard | undefined;
  isShowed: boolean;
  dashboards: Dashboard[];
  activeDashboard: Dashboard | undefined;

  hideModal: () => void;
  deleteDashboard: (id: string) => void;
  setActiveDashboard: (id: string) => void;

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
      hideModal: "modals/hideModal",
      deleteDashboard: "dashboards/deleteDashboard",
      setActiveDashboard: "dashboards/setActiveDashboard",
    }),
    onClose() {
      this.hideModal();
    },
    onSubmit() {
      if (!this.activeDashboard || !this.modalData) {
        return;
      }
      this.deleteDashboard(this.activeDashboard.id);
      this.setActiveDashboard(this.dashboards[0] ? this.dashboards[0].id : "");
      this.onClose();
    },
    onCancelClick() {
      this.onClose();
    },
  },
});
</script>

<style></style>
