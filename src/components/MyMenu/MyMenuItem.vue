<template>
  <div class="my-menu-item" :class="classObj">
    <button class="my-menu-item_button" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type Color = "primary" | "destructive";

type MyMenuItemProps = {
  title?: () => void;
  color?: Color;

  classObj: Record<string, string>;
};

export default defineComponent<MyMenuItemProps, MyMenuItemProps>({
  name: "MyMenuItem",
  props: {
    color: {
      type: String as PropType<Color>,
      required: false,
    },
  },
  computed: {
    classObj() {
      return `my-menu-item__color-${this.color}`;
    },
  },
});
</script>

<style>
.my-menu-item {
  white-space: nowrap;
}

.my-menu-item_button {
  display: block;
  width: 100%;
  padding: 8px 17px;
  appearance: none;
  background: none;
  border: none;
  text-align: left;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--menu-color);
  font-size: var(--font-size);
  line-height: var(--line-height);

  transition: background 0.3s ease;
}
.my-menu-item_button:hover {
  background: var(--menu-bg-color-hover);
}

.my-menu-item__color-destructive .my-menu-item_button {
  color: var(--menu-color-destructive);
}
</style>
