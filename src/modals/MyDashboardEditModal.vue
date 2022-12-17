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
import type {
  Dashboard,
  DashboardCreateDTO,
  DashboardEditDTO,
} from "@/store/types";
import type { MyInputsListValue } from "@/components/form/MyInputsList";

type MyDashboardEditModalProps = {
  name: string;
  columns: MyInputsListValue[];
  isEdit?: boolean;

  modalData: Dashboard | undefined;
  isShowed: boolean;

  setActiveDashboard: (id: string) => void;
  createDashboard: (dashboard: DashboardCreateDTO) => Dashboard;
  editDashboard: (payload: { id: string; data: DashboardEditDTO }) => Dashboard;
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
      createDashboard: "dashboards/createDashboard",
      setActiveDashboard: "dashboards/setActiveDashboard",
      editDashboard: "dashboards/editDashboard",
    }),
    onClose() {
      this.modalHide();
      this.name = "";
      this.columns = [];
      this.isEdit = false;
    },
    async onSubmit() {
      if (this.modalData) {
        // edit
        const dashboard: DashboardEditDTO = {
          name: this.name,
          columns: this.columns,
        };
        const newDashboard = await this.editDashboard({
          id: this.modalData.id,
          data: dashboard,
        });
        this.setActiveDashboard(newDashboard.id);
      } else {
        // create
        const dashboard: DashboardCreateDTO = {
          name: this.name,
          columns: this.columns,
        };
        const newDashboard = await this.createDashboard(dashboard);
        this.setActiveDashboard(newDashboard.id);
      }
      this.onClose();
    },
  },
  watch: {
    modalData() {
      if (this.modalData) {
        this.isEdit = true;
        this.name = this.modalData.name;
        this.columns = (this.modalData.columns || []).map((column) => {
          return {
            id: column.id,
            label: column.name,
          };
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
