<template>
  <div class="my-header">
    <div class="my-header_content">HEADER</div>
    <div class="my-header_spacer"></div>
  </div>
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
  name: "MyHeader",
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
.my-header {
}

.my-header_content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  border: solid 1px black;
}

.my-header_spacer {
  height: var(--header-height);
}
</style>
