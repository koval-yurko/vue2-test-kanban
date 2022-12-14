<template>
  <div class="my-checkbox" :class="{ 'my-checkbox__checked': isChecked }">
    <input
      class="my-checkbox_input"
      :class="inputClass"
      type="checkbox"
      :id="forId"
      :name="name"
      v-bind="$attrs"
      v-on="$listeners"
      :checked="isChecked"
      @change="onChange"
    />
    <label class="my-checkbox_label" :for="forId">
      <span class="my-checkbox_mark">
        <my-checkbox-icon class="my-checkbox_mark-icon" />
      </span>
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyCheckboxIcon from "@/components/icons/MyCheckboxIcon.vue";
import type MyCheckboxGroup from "./MyCheckboxGroup.vue";
import type { PropType } from "vue";

type MyCheckboxProps = {
  value: string;
  inputClass?: string;
  labelClass?: string;
  $checkboxGroup?: typeof MyCheckboxGroup;
};

export default defineComponent<MyCheckboxProps, MyCheckboxProps>({
  name: "MyCheckbox",
  components: { MyCheckboxIcon },
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
    $checkboxGroup: {
      from: "$checkboxGroup",
      default: {},
    },
  },
  methods: {
    onChange() {
      if (!this.$checkboxGroup) {
        return;
      }
      // notify parent
      return this.$checkboxGroup.toggle(this.value);
    },
  },
  computed: {
    forId() {
      let prefix = "";
      if (this.$checkboxGroup) {
        prefix = this.$checkboxGroup.name;
      }
      return `${prefix}-${this.value}`;
    },
    name() {
      if (!this.$checkboxGroup) {
        return "";
      }
      return this.$checkboxGroup.name;
    },
    isChecked() {
      if (!this.$checkboxGroup) {
        return false;
      }
      const index = this.$checkboxGroup.value.indexOf(this.value);
      return index !== -1;
    },
  },
  watch: {
    "$attrs.value"() {
      this.value = this.$attrs.value;
    },
  },
});
</script>

<style>
.my-checkbox {
  position: relative;
  display: flex;
  margin-bottom: 8px;
}

.my-checkbox_input {
  position: absolute;
  top: 0;
  opacity: 0;
}

.my-checkbox_label {
  position: relative;
  flex-grow: 1;
  padding: 12px 20px 13px 40px;
  background: var(--checkbox-bg-color);
  border-radius: 4px;
  font-size: 12px;
  line-height: 15px;
  font-weight: bold;
  color: var(--checkbox-color);
  cursor: pointer;

  transition: background 0.3s ease;
}
.my-checkbox_label:hover {
  background: var(--checkbox-bg-color-hover);
}

.my-checkbox_mark {
  position: absolute;
  top: 12px;
  left: 12px;
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: var(--checkbox-mark-bg-color);
  border: solid 1px var(--checkbox-mark-border-color);
  color: var(--checkbox-mark-color);
}

.my-checkbox_mark-icon {
  display: none;
  margin-left: 2px;
  margin-top: 4px;
  vertical-align: top;
}

.my-checkbox__checked .my-checkbox_label {
  color: var(--checkbox-color-checked);
  text-decoration-line: line-through;
}

.my-checkbox__checked .my-checkbox_mark {
  background: var(--checkbox-mark-bg-color-checked);
  border: solid 1px var(--checkbox-mark-border-color-checked);
}

.my-checkbox__checked .my-checkbox_mark-icon {
  display: inline;
}
</style>
