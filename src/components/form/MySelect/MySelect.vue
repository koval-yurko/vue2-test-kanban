<template>
  <div class="my-select" :class="{ 'has-error': error }">
    <div class="my-select_label-wrapper">
      <label :for="forId" v-if="label" class="my-select_label">{{
        label
      }}</label>
    </div>
    <div class="my-select_input-wrapper">
      <select
        :id="forId"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        @input="onChange"
        class="my-select_input"
      >
        <option v-for="option of options" :value="option.id" :key="option.id">
          {{ option.label }}
        </option>
      </select>
      <my-select-icon class="my-select_input-icon"></my-select-icon>
      <span v-if="error" class="my-select_error">{{ error }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import MySelectIcon from "@/components/icons/MySelectIcon.vue";

export type MySelectOption = {
  id: string;
  label: string;
};

type MySelectProps = {
  id?: boolean;
  label?: string;
  error?: string;
  value: string;
  options: MySelectOption[];

  onChange(events: Event): void;
  forId: string;
};

export default defineComponent<MySelectProps, MySelectProps>({
  name: "MySelect",
  components: { MySelectIcon },
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
    options: {
      type: Array as PropType<MySelectOption[]>,
      required: true,
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
.my-select {
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
}

.my-select_label-wrapper {
  padding-bottom: 4px;
}

.my-select_label {
  font-size: 12px;
  line-height: 17px;
  color: var(--input-color-label);
}

.my-select_input-wrapper {
  position: relative;
  max-width: 100%;
}

.my-select_input {
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
  cursor: pointer;
  text-overflow: ellipsis;
}
.my-select_input::-ms-expand {
  display: none;
}

.my-select_input-icon {
  position: absolute;
  top: 17px;
  right: 16px;
  display: block;
  color: var(--input-color-border-focus);
  cursor: pointer;
}

.my-select_input:focus {
  border-color: var(--input-color-border-focus);
}
.my-select_input:focus-visible {
  outline: none;
  border-color: var(--input-color-border-focus);
}
</style>
