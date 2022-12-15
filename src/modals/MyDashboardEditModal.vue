<template>
  <my-modal-box>
    <my-modal-header title="Add New Board" />

    <form @submit.prevent="onSubmit">
      <div class="my-field">
        <my-input
          name="name"
          label="Board Name"
          placeholder="e.g. Web Design"
          full-width
        />
      </div>

      <div class="my-field">
        <my-inputs-list
          name="columns"
          label="Some label"
          v-model="inputList"
          add-text="+ Add New Subtask"
        />
      </div>

      <my-button type="submit" full-width>Create New Board</my-button>
    </form>
  </my-modal-box>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyInput } from "@/components/form/MyInput";
import { MyInputsList } from "@/components/form/MyInputsList";
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
    MyInput,
    MyInputsList,
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
</style>
