<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box>
      <my-modal-header :title="isEdit ? 'Edit Task' : 'Add New Task'" />

      <form @submit.prevent="onSubmit">
        <div class="my-modal-field">
          <my-input
            v-model="title"
            :error="titleError"
            name="title"
            label="Title"
            placeholder="e.g. Take coffee break"
            full-width
          />
        </div>

        <div class="my-modal-field">
          <my-textarea
            v-model="description"
            name="description"
            label="Description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            full-width
          />
        </div>

        <div class="my-modal-field">
          <my-inputs-list
            v-model="subtasks"
            :errors="subtasksError"
            name="subtasks"
            label="Subtasks"
            add-text="+ Add New Subtask"
          />
        </div>

        <div class="my-modal-field">
          <MySelect
            :options="statusOptions"
            v-model="status"
            name="status"
            label="Status"
            full-width
          />
        </div>

        <my-button type="submit" full-width>{{
          isEdit ? "Save Changes" : "Create Task"
        }}</my-button>
      </form>
    </my-modal-box>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyButton } from "@/components/form/MyButton";
import { MySelect } from "@/components/form/MySelect";
import { MyInput } from "@/components/form/MyInput";
import { MyTextarea } from "@/components/form/MyTextarea";
import { MyInputsList } from "@/components/form/MyInputsList";
import { MODAL_TASK_EDIT, MODAL_TASK_SHOW } from "@/store/constants";
import type { MySelectOption } from "@/components/form/MySelect";
import type { MyInputsListValue } from "@/components/form/MyInputsList";
import type {
  Dashboard,
  Task,
  TaskCreateDTO,
  TaskEditDTO,
} from "@/store/types";

type MyTaskEditModalProps = {
  title: string;
  titleError: string;
  description: string;
  subtasks: MyInputsListValue[];
  subtasksError: string[];
  status: string;

  isEdit?: boolean;

  modalData: Task | undefined;
  activeDashboard: Dashboard | undefined;
  statusOptions: MySelectOption[];
  isShowed: boolean;

  hideModal: () => void;
  showModal: (opts: { name: string; data?: Task }) => void;
  setActiveDashboard: (id: string) => void;
  createTask: (data: { dashboardId: string; data: TaskCreateDTO }) => void;
  editTask: (data: {
    dashboardId: string;
    id: string;
    data: TaskEditDTO;
  }) => Task;
  onClose: () => void;
  onSubmit: () => void;
  isValid: () => boolean;
};

export default defineComponent<MyTaskEditModalProps, MyTaskEditModalProps>({
  name: "MyTaskEditModal",
  components: {
    MyModal,
    MyModalBox,
    MyModalHeader,
    MyButton,
    MySelect,
    MyInput,
    MyTextarea,
    MyInputsList,
  },
  props: {},
  updated() {
    const firstId = this.statusOptions.length ? this.statusOptions[0].id : "";
    this.status = this.status ? this.status : firstId;
  },
  data() {
    return {
      title: "",
      titleError: "",
      description: "",
      subtasks: [{ label: "" }],
      subtasksError: [""],
      status: "",
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters({
      modalData: "modals/data",
      activeDashboard: "dashboards/activeDashboard",
      statusOptions: "dashboards/statusOptions",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_TASK_EDIT;
    },
  },
  methods: {
    ...mapActions({
      hideModal: "modals/hideModal",
      showModal: "modals/showModal",
      setActiveDashboard: "dashboards/setActiveDashboard",
      createTask: "dashboards/createTask",
      editTask: "dashboards/editTask",
    }),
    onClose() {
      this.hideModal();
      this.title = "";
      this.titleError = "";
      this.description = "";
      this.subtasks = [{ label: "" }];
      this.subtasksError = [""];
      this.status = "";
      this.isEdit = false;
    },
    async onSubmit() {
      const isValid = this.isValid();
      if (!isValid) {
        return;
      }
      if (!this.activeDashboard) {
        return;
      }
      if (this.modalData) {
        // edit
        const data: TaskEditDTO = {
          title: this.title,
          description: this.description,
          status: this.status,
          subtasks: this.subtasks,
        };
        const newTask = await this.editTask({
          dashboardId: this.activeDashboard.id,
          id: this.modalData.id,
          data,
        });
        this.setActiveDashboard(this.activeDashboard.id);
        this.onClose();

        this.showModal({
          name: MODAL_TASK_SHOW,
          data: newTask,
        });
      } else {
        // create
        const data: TaskCreateDTO = {
          title: this.title,
          description: this.description,
          status: this.status,
          subtasks: this.subtasks,
        };
        this.createTask({ dashboardId: this.activeDashboard.id, data });
        this.setActiveDashboard(this.activeDashboard.id);
        this.onClose();
      }
    },
    isValid() {
      let isValid = true;
      if (!this.title) {
        this.titleError = "Can’t be empty";
        isValid = false;
      }

      const subtasksName: Record<string, boolean> = {};
      const subtasksError = this.subtasks.map((subtask) => {
        if (!subtask.label) {
          isValid = false;
          return "Can’t be empty";
        }
        if (subtasksName[subtask.label]) {
          isValid = false;
          return "Subtask is already exist";
        }
        subtasksName[subtask.label] = true;
        return "";
      });
      this.subtasksError = subtasksError;
      return isValid;
    },
  },
  watch: {
    modalData() {
      if (this.modalData) {
        this.isEdit = true;
        this.title = this.modalData.title;
        this.description = this.modalData.description;
        this.status = this.modalData.status;
        this.subtasks = (this.modalData.subtasks || []).map((subtask) => {
          return {
            id: subtask.id,
            label: subtask.title,
          };
        });
      } else {
        this.isEdit = false;
        this.title = "";
        this.description = "";
        this.subtasks = [{ label: "" }];
        const firstId = this.statusOptions.length
          ? this.statusOptions[0].id
          : "";
        this.status = firstId;
      }
    },
    title() {
      this.titleError = "";
    },
  },
});
</script>

<style></style>
