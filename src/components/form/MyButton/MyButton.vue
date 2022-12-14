<template>
  <button class="my-button" :class="classObj" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type Size = "small" | "large";

type Color = "primary" | "secondary" | "destructive";

type MyButtonProps = {
  size?: Size;
  color?: Color;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MyButton",
  props: {
    size: {
      type: String as PropType<Size>,
      required: false,
      default: "small",
    },
    color: {
      type: String as PropType<Color>,
      required: false,
      default: "primary",
    },
  },
  computed: {
    classObj() {
      return `my-button__size-${this.size} my-button__color-${this.color}`;
    },
  },
});
</script>

<style>
.my-button {
  margin: 0;
  padding: 11px 20px;
  border: none;
  border-radius: 20px;
  color: var(--buttom-primary-color);
  background: var(--buttom-primary-bg-color);
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;

  font-family: var(--font-family);
  /*font-weight: bold;*/

  transition: background-color 0.3s ease;
}

.my-button:hover {
  background: var(--buttom-primary-bg-color-hover);
}

.my-button:focus-visible {
  outline-width: 1px;
}

.my-button__size-large {
  padding: 14px 30px 15px;
  font-size: 15px;
  line-height: 19px;
  border-radius: 24px;
}

.my-button__color-secondary {
  color: var(--buttom-secondary-color);
  background: var(--buttom-secondary-bg-color);
}
.my-button__color-secondary:hover {
  background: var(--buttom-secondary-bg-color-hover);
}

.my-button__color-destructive {
  color: var(--buttom-destructive-color);
  background: var(--buttom-destructive-bg-color);
}
.my-button__color-destructive:hover {
  background: var(--buttom-destructive-bg-color-hover);
}
</style>
