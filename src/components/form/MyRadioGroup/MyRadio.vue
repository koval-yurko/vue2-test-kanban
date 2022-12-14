<template>
  <div class="my-radio" :class="{ 'is-checked': isChecked }">
    <input
      class="my-radio-input"
      :class="inputClass"
      type="radio"
      :id="forId"
      :name="name"
      v-bind="$attrs"
      v-on="$listeners"
      :checked="isChecked"
      @change="onChange"
    />
    <label class="my-radio-label" :for="forId">
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type MyRadioGroup from "./MyRadioGroup.vue";
import type { PropType } from "vue";

type MyRadioProps = {
  value: string;
  inputClass?: string;
  labelClass?: string;
  $radioGroup?: typeof MyRadioGroup;

  onChange(): void;
  forId: string;
  name: string;
  isChecked: boolean;
};

export default defineComponent<MyRadioProps, MyRadioProps>({
  name: "MyRadio",
  props: {
    id: {
      type: String as PropType<string>,
      required: false,
    },
    label: {
      type: String as PropType<string>,
      required: false,
    },
    inputClass: {
      type: String as PropType<string>,
      required: false,
    },
    labelClass: {
      type: String as PropType<string>,
      required: false,
    },
  },
  data() {
    return {
      value: this.$attrs.value,
    };
  },
  inject: {
    $radioGroup: {
      from: "$radioGroup",
      default: {},
    },
  },
  methods: {
    onChange() {
      if (!this.$radioGroup) {
        return;
      }
      // notify parent
      return this.$radioGroup.toggle(this.value);
    },
  },
  computed: {
    forId() {
      let prefix = "";
      if (this.$radioGroup) {
        prefix = this.$radioGroup.name;
      }
      return `${prefix}-${this.value}`;
    },
    name() {
      if (!this.$radioGroup) {
        return "";
      }
      return this.$radioGroup.name;
    },
    isChecked() {
      if (!this.$radioGroup) {
        return false;
      }
      return this.$radioGroup.value === this.value;
    },
  },
  watch: {
    "$attrs.value"() {
      this.value = this.$attrs.value;
    },
  },
});
</script>

<style scoped>
.my-radio {
}

.my-radio-input {
}

.my-radio-label {
}
</style>
