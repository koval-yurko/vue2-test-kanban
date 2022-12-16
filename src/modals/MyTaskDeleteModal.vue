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
          <my-button color="destructive" type="button" full-width
            >Delete</my-button
          >
          <my-button color="secondary" type="submit" full-width
            >Cancel</my-button
          >
        </div>
      </form>
    </my-modal-box>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyButton } from "@/components/form/MyButton";
import type { PropType } from "vue";
import { mapActions, mapGetters } from "vuex";
import { MODAL_TASK_DELETE } from "@/store/constants";

type MyDashboardEditModalProps = {
  modalData: any;
  isShowed: boolean;

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
    MyButton,
  },
  props: {},
  computed: {
    ...mapGetters({
      modalData: "modals/data",
    }),
    isShowed() {
      return this.$store.state.modals.opened === MODAL_TASK_DELETE;
    },
  },
  methods: {
    ...mapActions({
      modalHide: "modals/hide",
    }),
    onClose() {
      this.modalHide();
    },
    onSubmit() {
      console.log("submit");
    },
  },
});
</script>

<style></style>
