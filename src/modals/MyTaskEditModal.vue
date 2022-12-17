<template>
  <my-modal :show="isShowed" @close="onClose">
    <my-modal-box>
      <my-modal-header :title="isEdit ? 'Edit Task' : 'Add New Task'" />

      <form @submit.prevent="onSubmit">
        <div class="my-modal-field">
          <my-input
            v-model="title"
            name="title"
            label="Title"
            placeholder="e.g. Take coffee break"
            full-width
          />
        </div>

        <div class="my-modal-field">
          <my-inputs-list
            v-model="subtasks"
            name="subtasks"
            label="Subtasks"
            add-text="+ Add New Subtask"
          />
        </div>

        <div class="my-modal-field">
          <MySelect
            :options="selectOptions"
            v-model="selectValue"
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
import { MyInputsList } from "@/components/form/MyInputsList";
import { MODAL_TASK_EDIT } from "@/store/constants";
import type { PropType } from "vue";

type Option = {
  id: string;
  label: string;
};

type MyTaskEditModalProps = {
  title: string;
  subtasks: string[];
  selectValue: string;
  selectOptions: Option[];
  isEdit?: boolean;

  modalData: any;
  isShowed: boolean;

  modalHide: () => void;
  onClose: () => void;
  onSubmit: () => void;
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
    MyInputsList,
  },
  props: {},
  data() {
    return {
      title: "",
      subtasks: [],
      selectValue: "option 2",
      selectOptions: [
        { id: "option 1", label: "Option 1" },
        { id: "option 2", label: "Option 2 Option 2 Option 2" },
        { id: "option 3", label: "Option 3" },
      ],
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters({
      modalData: "modals/data",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_TASK_EDIT;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
    }),
    onClose() {
      this.modalHide();
      // this.name = "";
      // this.columns = [];
      this.isEdit = false;
    },
    onSubmit() {
      console.log("submit");
    },
  },
  watch: {
    modalData() {
      if (this.modalData) {
        this.isEdit = true;
        // this.name = this.modalData.name;
        // this.columns = this.modalData.columns;
      } else {
        // this.name = "";
        // this.columns = [];
      }
    },
  },
});
</script>

<style></style>
