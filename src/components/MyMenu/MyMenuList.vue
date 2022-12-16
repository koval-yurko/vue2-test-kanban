<template>
  <div class="my-menu-list" @click.stop="onClick">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type MyModalBoxProps = {
  onClick?: () => void;
};

export default defineComponent<MyModalBoxProps, MyModalBoxProps>({
  name: "MyMenuList",
  props: {
    test: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  methods: {
    onClick() {
      //
    },
  },
});
</script>

<style>
.my-menu-list {
  padding: 10px 0;
  width: 100%;
  min-width: 192px;
  max-width: 480px;
  background: var(--menu-bg-color);
  border-radius: 6px;
  box-sizing: border-box;

  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
}
</style>
