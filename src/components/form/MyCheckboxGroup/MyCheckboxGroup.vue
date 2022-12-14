<template>
  <div class="my-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type MyCheckboxGroupProps = {
  value: string[];
  name: string;
};

export default defineComponent<MyCheckboxGroupProps, MyCheckboxGroupProps>({
  name: "MyCheckboxGroup",
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      value: this.$attrs.value,
    };
  },
  provide() {
    return {
      $checkboxGroup: this,
    };
  },
  methods: {
    toggle(value: string) {
      const index = this.value.indexOf(value);
      if (index === -1) {
        this.value = [...this.value, value];
      } else {
        this.value = this.value.filter((val) => val !== value);
      }
    },
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    "$attrs.value"() {
      // notify children (done)
      this.value = this.$attrs.value as unknown as string[];
    },
  },
});
</script>

<style>
.my-checkbox-group {
  display: inline-flex;
  flex-direction: column;
}
</style>
