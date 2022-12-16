<template>
  <div
    class="my-checkbox-group"
    :class="{ 'my-checkbox-group__full-width': fullWidth }"
  >
    <div class="my-checkbox-group_label-wrapper">
      <label v-if="label" class="my-checkbox-group_label">{{ label }}</label>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type MyCheckboxGroupProps = {
  value: string[];
  name: string;
  label?: string;
  fullWidth?: boolean;
};

export default defineComponent<MyCheckboxGroupProps, MyCheckboxGroupProps>({
  name: "MyCheckboxGroup",
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    label: {
      type: String as PropType<string>,
      required: false,
    },
    fullWidth: {
      type: Boolean as PropType<boolean>,
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

.my-checkbox-group__full-width {
  display: flex;
}

.my-checkbox-group_label-wrapper {
  padding-bottom: 4px;
}

.my-checkbox-group_label {
  font-size: 12px;
  line-height: 17px;
  color: var(--input-color-label);
}
</style>
