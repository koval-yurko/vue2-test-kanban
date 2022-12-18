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
  display: inline-block;
  vertical-align: middle;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  overflow-y: auto;
  text-align: left;
  border-radius: 6px;
  color: var(--modal-box-text-color);
  background: var(--modal-box-bg-color);
  box-sizing: border-box;
}

.my-modal-field {
  margin-bottom: 21px;
}

.my-modal-text {
  margin-bottom: 24px;
}

.my-modal-controls {
  display: flex;
}

.my-modal-controls .my-button {
  width: 50%;
  flex-grow: 1;
  margin-left: 7px;
  margin-right: 7px;
}

.my-modal-controls .my-button:first-child {
  margin-left: 0;
}

.my-modal-controls .my-button:last-child {
  margin-right: 0;
}
</style>
