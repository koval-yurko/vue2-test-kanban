<template>
  <div
    class="my-textarea"
    :class="{
      'my-textarea__error': error,
      'my-textarea__full-width': fullWidth,
    }"
  >
    <div class="my-textarea_label-wrapper">
      <label :for="forId" v-if="label" class="my-textarea_label">{{
        label
      }}</label>
    </div>
    <div class="my-textarea_input-wrapper">
      <textarea
        :id="forId"
        v-bind="$attrs"
        v-on="$listeners"
        :rows="rows"
        :value="value"
        @input="onChange"
        class="my-textarea_input"
        ref="input"
      />
      <span v-if="error" class="my-textarea_error">{{ error }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type MyTextareaProps = {
  id?: boolean;
  label?: string;
  error?: string;
  rows?: number;
  fullWidth?: boolean;
  value: string;

  onChange(events: Event): void;
  focus(): void;
  forId: string;
};

export default defineComponent<MyTextareaProps, MyTextareaProps>({
  name: "MyTextarea",
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
    rows: {
      type: Number as PropType<number>,
      required: false,
      default: 3,
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
  methods: {
    onChange(event: Event) {
      const el = event.target as HTMLInputElement;
      this.value = el.value;
    },
    focus() {
      if (this.$refs.input) {
        const input = this.$refs.input as HTMLInputElement;
        input.focus();
      }
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
.my-textarea {
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
}

.my-textarea_label-wrapper {
  padding-bottom: 4px;
}

.my-textarea_label {
  font-size: 12px;
  line-height: 17px;
  color: var(--input-color-label);
}

.my-textarea_input-wrapper {
  position: relative;
  max-width: 100%;
}

.my-textarea_input {
  appearance: none;
  resize: none;
  background: none;
  max-width: 100%;
  padding: 7px 38px 8px 16px;
  box-sizing: border-box;
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: var(--line-height);
  color: var(--input-color);
  border: solid 1px var(--input-color-border);
  border-radius: 4px;
}
.my-textarea_input:focus {
  border-color: var(--input-color-border-focus);
}
.my-textarea_input:focus-visible {
  outline: none;
  border-color: var(--input-color-border-focus);
}

.my-textarea_error {
  position: absolute;
  top: 8px;
  right: 16px;
  color: var(--input-color-error);
}

.my-textarea__error .my-textarea_input {
  border: solid 1px var(--input-color-border-error);
}

.my-textarea__full-width {
  width: 100%;
}
.my-textarea__full-width .my-textarea_input {
  width: 100%;
}
</style>
