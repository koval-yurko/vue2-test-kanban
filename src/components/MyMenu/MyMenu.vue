<template>
  <span ref="root" class="my-menu-wrapper">
    <slot name="activator" v-bind:onClick="onClick"></slot>
    <Teleport to="body">
      <transition name="my-menu">
        <div v-if="show" class="my-menu" key="my-menu">
          <div class="my-menu_overlay" @click.prevent="onClose"></div>
          <div
            ref="content"
            class="my-menu_content"
            :style="style"
            @click.prevent="onClose"
          >
            <slot></slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Teleport from "vue2-teleport";
import type { PropType } from "vue";

type MyMenuProps = {
  offset: number;

  show: boolean;
  style: {
    top: string | undefined;
    left: string | undefined;
    right: string | undefined;
  };

  onClose(): () => void;
  onClick(): () => void;
};

export default defineComponent<MyMenuProps, MyMenuProps>({
  name: "MyMenu",
  components: { Teleport },
  props: {
    offset: {
      type: Number as PropType<number>,
      required: false,
      default: 15,
    },
  },
  data() {
    return {
      show: false,
      style: {
        left: "0",
        top: "0",
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("close");
      this.show = false;
    },
    onClick() {
      const anchorEl = this.$refs.root as HTMLSpanElement;
      if (!anchorEl) {
        return;
      }
      const anchorRect = anchorEl.getBoundingClientRect();
      this.style.top = anchorRect.top + anchorRect.height + this.offset + "px";
      this.show = true;

      this.$nextTick(() => {
        const contentEl = this.$refs.content as HTMLSpanElement;
        if (!contentEl) {
          return;
        }
        const contentRect = contentEl.getBoundingClientRect();

        const anchorCenter = anchorRect.left + anchorRect.width / 2;
        let left: number | undefined = anchorCenter - contentRect.width / 2;
        let right: number | undefined = undefined;

        // check left
        if (left < this.offset) {
          left = this.offset;
        }

        // check right
        if (left + contentRect.width + this.offset > window.innerWidth) {
          left = undefined;
          right = this.offset;
        }

        this.style.left = typeof left !== "undefined" ? left + "px" : undefined;
        this.style.right =
          typeof right !== "undefined" ? right + "px" : undefined;
      });
    },
  },
  emits: ["close"],
});
</script>

<style>
.my-menu-wrapper {
  display: inline;
  padding: 0;
  margin: 0;
}

.my-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;

  opacity: 1;
  z-index: var(--z-index-modal);
}

.my-menu_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.my-menu_content {
  position: absolute;
  z-index: var(--z-index-modal-content);
}

.my-menu-enter-active {
  transition: opacity 0.1s ease-out;
  opacity: 0;
}
.my-menu-enter-active .my-menu_content {
  transition: transform 0.1s ease-out;
  transform: translateY(5px);
}

.my-menu-enter-to {
  opacity: 1;
}
.my-menu-enter-to .my-menu_content {
  transform: translateY(0px);
}

.my-menu-leave-active {
  transition: opacity 0.1s ease-out;
  opacity: 1;
}
.my-menu-leave-active .my-menu_content {
  transition: transform 0.1s ease-out;
  transform: translateY(0px);
}

.my-menu-leave-to {
  opacity: 0;
}
.my-menu-leave-to .my-menu_content {
  transform: translateY(-5px);
}
</style>
