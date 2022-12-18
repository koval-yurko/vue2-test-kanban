<template>
  <Teleport to="body">
    <transition name="my-modal">
      <div v-if="show" class="my-modal" key="my-modal">
        <div class="my-modal_overlay" @click.prevent="onClose"></div>
        <div class="my-modal_content" @click.prevent="onClose">
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Teleport from "vue2-teleport";
import type { PropType } from "vue";

type MyModalProps = {
  show: boolean;
  onClose: () => void;
};

export default defineComponent<MyModalProps, MyModalProps>({
  name: "MyModal",
  components: { Teleport },
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    },
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
  emits: ["close"],
});
</script>

<style>
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  opacity: 1;
  z-index: var(--z-index-modal);
}

.my-modal_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--modal-overlay-bg-color);
  opacity: 0.5;
}

.my-modal_content {
  position: relative;
  height: 100%;
  padding: 15px;
  outline: 0;
  overflow: hidden auto;
  text-align: center;
  z-index: var(--z-index-modal-content);
}
.my-modal_content:after {
  content: "";
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  width: 0;
}

.my-modal-enter-active {
  transition: opacity 0.1s ease-out;
  opacity: 0;
}
.my-modal-enter-active .my-modal_content {
  transition: transform 0.1s ease-out;
  transform: translateY(10px);
}

.my-modal-enter-to {
  opacity: 1;
}
.my-modal-enter-to .my-modal_content {
  transform: translateY(0px);
}

.my-modal-leave-active {
  transition: opacity 0.1s ease-out;
  opacity: 1;
}
.my-modal-leave-active .my-modal_content {
  transition: transform 0.1s ease-out;
  transform: translateY(0px);
}

.my-modal-leave-to {
  opacity: 0;
}
.my-modal-leave-to .my-modal_content {
  transform: translateY(-10px);
}
</style>
