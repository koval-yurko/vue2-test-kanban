<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type MyRadioGroupProps = {
  value: string;
  name?: string;
};

export default defineComponent<MyRadioGroupProps, MyRadioGroupProps>({
  name: "MyRadioGroup",
  props: {
    name: {
      type: String as PropType<string>,
      required: false,
    },
  },
  data() {
    return {
      value: this.$attrs.value,
    };
  },
  provide() {
    return {
      $radioGroup: this,
    };
  },
  methods: {
    toggle(value: string) {
      this.value = value;
    },
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    "$attrs.value"() {
      // notify children (done)
      this.value = this.$attrs.value;
    },
  },
});
</script>

<style scoped>
.radio-group {
}
</style>
