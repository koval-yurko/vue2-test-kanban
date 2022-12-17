<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box v-if="modalData">
      <my-modal-header :title="modalData.title">
        <my-menu ref="menu">
          <template v-slot:activator="{ onClick }">
            <my-menu-button @click.prevent="onClick" />
          </template>

          <my-menu-list>
            <my-menu-item @click="onEditTaskClick">Edit Task</my-menu-item>
            <my-menu-item @click="onDeleteTaskClick" color="destructive">
              Delete Task
            </my-menu-item>
          </my-menu-list>
        </my-menu>
      </my-modal-header>

      <div class="my-modal-text" v-show="modalData.description">
        <p>{{ modalData.description }}</p>
      </div>

      <div class="my-modal-field" v-show="modalData.subtasks.length">
        <MyCheckboxGroup
          name="tasks"
          v-model="selectedSubtasks"
          :label="completedText"
          full-width
        >
          <MyCheckbox
            v-for="subtask of modalData.subtasks"
            :key="subtask.id"
            :value="subtask.id"
            >{{ subtask.title }}</MyCheckbox
          >
        </MyCheckboxGroup>
      </div>

      <div class="my-modal-field">
        <MySelect
          :options="statusOptions"
          v-model="status"
          label="Current Status"
          full-width
        />
      </div>
    </my-modal-box>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MySelect } from "@/components/form/MySelect";
import { MyCheckboxGroup, MyCheckbox } from "@/components/form/MyCheckboxGroup";
import { MyMenuButton } from "@/components/MyMenuButton";
import { MyMenu, MyMenuList, MyMenuItem } from "@/components/MyMenu";
import {
  MODAL_TASK_EDIT,
  MODAL_TASK_SHOW,
  MODAL_TASK_DELETE,
} from "@/store/constants";
import type { MySelectOption } from "@/components/form/MySelect";
import type { Dashboard, Task, TaskEditDTO } from "@/store/types";
import type { ComponentPublicInstance, PropType } from "vue";

type MyTaskShowModalProps = {
  selectedSubtasks: string[];

  status: string;
  statusOptions: MySelectOption[];

  modalData: Task | undefined;
  activeDashboard: Dashboard | undefined;
  isShowed: boolean;

  modalHide: () => void;
  showModal: (opts: { name: string; data?: Task }) => void;
  setActiveDashboard: (id: string) => void;
  editTask: (props: {
    dashboardId: string;
    id: string;
    data: TaskEditDTO;
  }) => void;

  onClose: () => void;
  onEditTaskClick: () => void;
  onDeleteTaskClick: () => void;
  saveChanges: () => void;
};

export default defineComponent<MyTaskShowModalProps, MyTaskShowModalProps>({
  name: "MyTaskShowModal",
  components: {
    MyModal,
    MyModalBox,
    MyModalHeader,
    MyMenuButton,
    MyMenu,
    MyMenuList,
    MyMenuItem,
    MyCheckboxGroup,
    MyCheckbox,
    MySelect,
  },
  props: {},
  created() {
    const firstId = this.statusOptions.length ? this.statusOptions[0].id : "";
    this.status = this.status ? this.status : firstId;
  },
  data() {
    return {
      selectedSubtasks: [],
      status: "",
    };
  },
  computed: {
    ...mapGetters({
      modalData: "modals/data",
      activeDashboard: "dashboards/activeDashboard",
    }),
    statusOptions() {
      return this.activeDashboard
        ? this.activeDashboard.columns.map((column) => {
            return {
              id: column.name,
              label: column.name,
            };
          })
        : [];
    },
    completedText() {
      const total = this.modalData ? this.modalData.subtasks.length : 0;
      const completed = this.selectedSubtasks.length;
      return `Subtasks (${completed} of ${total})`;
    },
    isShowed() {
      return this.$store.state.modals.opened === MODAL_TASK_SHOW;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
      showModal: "modals/show",
      setActiveDashboard: "dashboards/setActiveDashboard",
      editTask: "dashboards/editTask",
    }),
    onClose() {
      this.modalHide();
    },
    onEditTaskClick() {
      if (this.$refs.menu) {
        const menu = this.$refs.menu as ComponentPublicInstance<typeof MyMenu>;
        menu.onClose();
      }
      this.$nextTick(() => {
        this.showModal({
          name: MODAL_TASK_EDIT,
          data: this.modalData,
        });
      });
    },
    onDeleteTaskClick() {
      if (this.$refs.menu) {
        const menu = this.$refs.menu as ComponentPublicInstance<typeof MyMenu>;
        menu.onClose();
      }
      this.$nextTick(() => {
        this.showModal({
          name: MODAL_TASK_DELETE,
          data: this.modalData,
        });
      });
    },
    saveChanges() {
      if (!this.activeDashboard || !this.modalData) {
        return;
      }
      this.editTask({
        dashboardId: this.activeDashboard.id,
        id: this.modalData.id,
        data: {
          status: this.status,
          subtasks: (this.modalData.subtasks || []).map((subtask) => {
            return {
              id: subtask.id,
              isCompleted: this.selectedSubtasks.indexOf(subtask.id) !== -1,
            };
          }),
        },
      });
      this.setActiveDashboard(this.activeDashboard.id);
    },
  },
  watch: {
    modalData() {
      if (this.modalData) {
        this.status = this.modalData.status;
        this.selectedSubtasks = (this.modalData.subtasks || [])
          .map((subtasks) => (subtasks.isCompleted ? subtasks.id : ""))
          .filter((el) => el);
      }
    },
    activeDashboard() {
      const firstId = this.statusOptions.length ? this.statusOptions[0].id : "";
      this.status = this.status ? this.status : firstId;
    },
    status() {
      this.saveChanges();
    },
    selectedSubtasks() {
      this.saveChanges();
    },
  },
});
</script>

<style></style>
