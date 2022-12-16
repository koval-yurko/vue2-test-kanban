<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box>
      <my-modal-header
        title="Research pricing points of various competitors and trial different business models"
      >
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

      <div class="my-modal-text">
        <p>
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>
      </div>

      <div class="my-modal-field">
        <MyCheckboxGroup
          name="tasks"
          v-model="checkboxValue"
          label="Subtasks (2 of 3)"
          full-width
        >
          <MyCheckbox
            v-for="option of checkboxOptions"
            :key="option.id"
            :value="option.id"
            >{{ option.label }}</MyCheckbox
          >
        </MyCheckboxGroup>
      </div>

      <div class="my-modal-field">
        <MySelect
          :options="selectOptions"
          v-model="selectValue"
          label="Some label"
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
import type { ComponentPublicInstance, PropType } from "vue";

type Option = {
  id: string;
  label: string;
};

type MyDashboardEditModalProps = {
  checkboxOptions: Option[];
  checkboxValue: string;
  selectValue: string;
  selectOptions: Option[];

  modalData: any;
  isShowed: boolean;

  showModal: (opts: { name: string; data?: any }) => void;
  modalHide: () => void;
  onClose: () => void;
  onSubmit: () => void;
  onEditTaskClick: () => void;
  onDeleteTaskClick: () => void;
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
    MyMenuButton,
    MyMenu,
    MyMenuList,
    MyMenuItem,
    MyCheckboxGroup,
    MyCheckbox,
    MySelect,
  },
  props: {},
  data() {
    return {
      checkboxValue: "",
      checkboxOptions: [
        { id: "option 1", label: "Idle" },
        { id: "option 2", label: "Option 2 Option 2 Option 2" },
        { id: "option 3", label: "Option 3" },
      ],
      selectValue: "option 2",
      selectOptions: [
        { id: "option 1", label: "Option 1" },
        { id: "option 2", label: "Option 2 Option 2 Option 2" },
        { id: "option 3", label: "Option 3" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      modalData: "modals/data",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_TASK_SHOW;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
      showModal: "modals/show",
    }),
    onClose() {
      this.modalHide();
      // this.name = "";
      // this.columns = [];
      // this.isEdit = false;
    },
    onSubmit() {
      console.log("submit");
    },
    onEditTaskClick() {
      if (this.$refs.menu) {
        const menu = this.$refs.menu as ComponentPublicInstance<typeof MyMenu>;
        menu.onClose();
      }
      this.$nextTick(() => {
        this.showModal({
          name: MODAL_TASK_EDIT,
          data: {},
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
        });
      });
    },
  },
  watch: {
    modalData() {
      // if (this.modalData) {
      //   this.isEdit = true;
      //   this.name = this.modalData.name;
      //   this.columns = this.modalData.columns;
      // } else {
      //   this.name = "";
      //   this.columns = [];
      // }
    },
  },
});
</script>

<style></style>
