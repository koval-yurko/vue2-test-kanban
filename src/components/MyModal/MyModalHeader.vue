<template>
  <div class="my-modal-header" :class="classObj">
    <div class="my-modal-header_title h2">{{ title }}</div>
    <div class="my-modal-header_rest"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type Color = "primary" | "destructive";

type MyModalHeaderProps = {
  title?: () => void;
  color?: Color;

  classObj: Record<string, string>;
};

export default defineComponent<MyModalHeaderProps, MyModalHeaderProps>({
  name: "MyModalHeader",
  props: {
    title: {
      type: String as PropType<string>,
      required: false,
    },
    color: {
      type: String as PropType<Color>,
      required: false,
    },
  },
  methods: {
    onClick() {
      //
    },
  },
  computed: {
    classObj() {
      return `my-modal-header__color-${this.color}`;
    },
  },
});
</script>

<style>
.my-modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.my-modal-header_title {
  color: var(--modal-box-title-color);
}
.my-modal-header_rest {
  flex-shrink: 0;
}

.my-modal-header__color-destructive .my-modal-header_title {
  color: var(--modal-box-title-color-delete);
}
</style>
