<template>
  <div class="my-header">
    <div class="my-header_content">
      <div class="my-header_logo-holder">
        <my-logo-icon class="my-header_logo" />
      </div>
      <div class="my-header_menu-holder">
        <div class="my-header_title h1">Platform Launch</div>
        <div class="my-header_btns">
          <my-button size="large">+ Add New Task</my-button>
          <button class="menu-button"><my-menu-icon /></button>
        </div>
      </div>
    </div>
    <div class="my-header_spacer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyLogoIcon from "@/components/icons/MyLogoIcon.vue";
import MyMenuIcon from "@/components/icons/MyMenuIcon.vue";
import { MyButton } from "@/components/form/MyButton";

import type { PropType } from "vue";

type Size = "small" | "large";

type Color = "primary" | "secondary" | "destructive";

type MyButtonProps = {
  size?: Size;
  color?: Color;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MyHeader",
  components: { MyLogoIcon, MyMenuIcon, MyButton },
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
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  background: var(--header-bg-color);
  border-bottom: solid 1px var(--header-border-color);
}

.my-header_spacer {
  height: var(--header-height);
}

.my-header_logo-holder {
  display: flex;
  align-items: center;
  width: var(--sidebar-width);
  border-right: solid 1px var(--header-border-color);
}

.my-header_menu-holder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.my-header_title {
  padding-left: 21px;
}

.my-header_btns {
  display: flex;
  align-items: center;
}

.menu-button {
  margin-left: 10px;
  padding: 13px 15px 10px;
  background: none;
  border: none;
  border-radius: 10px;
  color: var(--color-gray-4);
  cursor: pointer;

  transition: color 0.3s ease;
}
.menu-button:hover {
  color: var(--color-primary);
}
</style>
