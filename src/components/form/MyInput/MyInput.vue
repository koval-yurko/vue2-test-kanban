<template>
  <div class="my-input" :class="{ 'my-input__error': error }">
    <div class="my-input_label-wrapper">
      <label :for="forId" v-if="label" class="my-input_label">{{
        label
      }}</label>
    </div>
    <div class="my-input_input-wrapper">
      <input
        :id="forId"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        @input="onChange"
        class="my-input_input"
      />
      <span v-if="error" class="my-input_error">{{ error }}</span>
    </div>
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

  onChange(events: Event): void;
  forId: string;
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
  methods: {
    onChange(event: Event) {
      const el = event.target as HTMLInputElement;
      this.value = el.value;
    },
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

<style>
.my-input {
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
}

.my-input_label-wrapper {
  padding-bottom: 4px;
}

.my-input_label {
  font-size: 12px;
  line-height: 17px;
  color: var(--input-color-label);
}

.my-input_input-wrapper {
  position: relative;
  max-width: 100%;
}

.my-input_input {
  appearance: none;
  background: none;
  max-width: 100%;
  padding: 7px 38px 8px 16px;
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: var(--line-height);
  color: var(--input-color);
  border: solid 1px var(--input-color-border);
  border-radius: 4px;
}
.my-input_input:focus {
  border-color: var(--input-color-border-focus);
}
.my-input_input:focus-visible {
  outline: none;
  border-color: var(--input-color-border-focus);
}

.my-input_error {
  position: absolute;
  top: 8px;
  right: 16px;
  color: var(--input-color-error);
}

.my-input__error .my-input_input {
  border: solid 1px var(--input-color-border-error);
}
</style>
