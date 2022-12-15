<template>
  <div class="my-modal-box" @click.stop="onClick">
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
  name: "MyModalBox",
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
.my-modal-box {
  display: flex;
  flex-direction: column;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  background: var(--modal-box-bg-color);
  border-radius: 6px;
  box-sizing: border-box;
  color: var(--modal-box-text-color);
}
</style>
