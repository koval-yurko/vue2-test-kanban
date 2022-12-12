<template>
  <div class="field" :class="{ 'has-error': error }">
    <div class="header">
      <label :for="forId" v-if="label" class="label">{{ label }}</label>
      <span v-if="error" class="error">{{ error }}</span>
    </div>
    <input
      :id="forId"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @input="
        (newValue) => {
          value = newValue.target.value;
        }
      "
      class="input"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type MyButtonProps = {
  id?: boolean;
  label?: string;
  error?: string;
  value: string;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MyInput",
  props: {
    id: {
      type: String as PropType<string>,
      required: false,
    },
    label: {
      type: String as PropType<string>,
      required: false,
    },
    error: {
      type: String as PropType<string>,
      required: false,
    },
  },
  data() {
    return {
      value: this.$attrs.value,
    };
  },
  computed: {
    forId() {
      return this.id || this.label;
    },
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
    "$attrs.value"() {
      this.value = this.$attrs.value;
    },
  },
});
</script>

<style scoped>
.field {
  font-size: 14px;
  margin-bottom: 23px;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 4px;
}

.label {
  margin-right: 10px;
  color: var(--my-c-primary-1);
}

.error {
  font-weight: 700;
  color: var(--my-c-primary-5);
}

.input {
  display: block;
  width: 100%;
  line-height: 45px;
  margin: 0;
  padding: 0 15px;
  border-radius: 8px;
  color: var(--my-c-primary-1);
  border: solid 1px var(--my-c-gray-4);
  box-sizing: border-box;

  font-size: 16px;
  font-family: var(--font-family-main);
  font-weight: 500;
}
.input:hover {
  border-color: var(--my-c-primary-2);
}
.input:focus-visible {
  border-color: var(--my-c-primary-2);
  outline: solid 1px var(--my-c-primary-2);
}

.field.has-error .input {
  border-color: var(--my-c-primary-5);
}
</style>
