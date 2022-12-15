<template>
  <my-modal-box>
    <my-modal-header title="Delete this board?" color="destructive" />

    <form @submit.prevent="onSubmit">
      <div class="my-text">
        <p>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
      </div>

      <div class="buttons-row">
        <my-button color="destructive" type="button" full-width
          >Delete</my-button
        >
        <my-button color="secondary" type="submit" full-width>Cancel</my-button>
      </div>
    </form>
  </my-modal-box>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyButton } from "@/components/form/MyButton";
import type { PropType } from "vue";

type MyDashboardEditModalProps = {
  onSubmit?: () => void;
};

export default defineComponent<
  MyDashboardEditModalProps,
  MyDashboardEditModalProps
>({
  name: "MyDashboardEditModal",
  components: {
    MyModalBox,
    MyModalHeader,
    MyButton,
  },
  props: {
    test: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  data() {
    return {
      inputList: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
    },
  },
});
</script>

<style>
.my-field {
  margin-bottom: 21px;
}
.my-text {
  margin-bottom: 24px;
}
.buttons-row {
  display: flex;
}

.buttons-row .my-button {
  width: 50%;
  flex-grow: 1;
  margin-left: 7px;
  margin-right: 7px;
}

.buttons-row .my-button:first-child {
  margin-left: 0;
}

.buttons-row .my-button:last-child {
  margin-right: 0;
}
</style>
