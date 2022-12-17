<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box>
      <my-modal-header :title="isEdit ? 'Edit Board' : 'Add New Board'" />

      <form @submit.prevent="onSubmit">
        <div class="my-modal-field">
          <my-input
            v-model="name"
            name="name"
            :label="isEdit ? 'Board Name' : 'Name'"
            placeholder="e.g. Web Design"
            full-width
          />
        </div>

        <div class="my-modal-field">
          <my-inputs-list
            v-model="columns"
            name="columns"
            :label="isEdit ? 'Board Columns' : 'Columns'"
            add-text="+ Add New Column"
          />
        </div>

        <my-button type="submit" full-width>{{
          isEdit ? "Save Changes" : "Create New Board"
        }}</my-button>
      </form>
    </my-modal-box>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyInput } from "@/components/form/MyInput";
import { MyInputsList } from "@/components/form/MyInputsList";
import { MyButton } from "@/components/form/MyButton";
import { MODAL_DASHBOARD_EDIT } from "@/store/constants";
import type { Dashboard } from "@/store/types";
import type { PropType } from "vue";

type MyDashboardEditModalProps = {
  name: string;
  columns: string[];
  isEdit?: boolean;

  modalData: Dashboard;
  isShowed: boolean;

  setActiveDashboard: (name: string) => void;
  addDashboard: (dashboard: Dashboard) => void;
  editDashboard: (payload: { name: string; board: Dashboard }) => void;
  modalHide: () => void;
  onClose: () => void;
  onSubmit: () => void;
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
    MyInput,
    MyInputsList,
    MyButton,
  },
  props: {},
  data() {
    return {
      name: "",
      columns: [],
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters({
      modalData: "modals/data",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_DASHBOARD_EDIT;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
      addDashboard: "dashboards/addDashboard",
      setActiveDashboard: "dashboards/setActive",
      editDashboard: "dashboards/editDashboard",
    }),
    onClose() {
      this.modalHide();
      this.name = "";
      this.columns = [];
      this.isEdit = false;
    },
    onSubmit() {
      const dashboard: Dashboard = {
        name: this.name,
        columns: this.columns.map((column) => {
          return {
            name: column,
            tasks: [],
          };
        }),
      };
      console.log();

      if (this.isEdit) {
        // edit
        this.editDashboard({ name: this.modalData.name, board: dashboard });
        this.setActiveDashboard(dashboard.name);
      } else {
        // create
        this.addDashboard(dashboard);
        this.setActiveDashboard(dashboard.name);
      }
      this.onClose();
    },
  },
  watch: {
    modalData() {
      if (this.modalData) {
        this.isEdit = true;
        this.name = this.modalData.name;
        this.columns = this.modalData.columns.map((column) => {
          return column.name;
        });
      } else {
        this.name = "";
        this.columns = [];
      }
    },
  },
});
</script>

<style></style>
