<template>
  <button class="menu-button" v-bind="$attrs" v-on="$listeners">
    <my-menu-icon />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyMenuIcon from "@/components/icons/MyMenuIcon.vue";
import type { PropType } from "vue";

type Size = "small" | "big";

type MyMenuButtonProps = {
  size?: Size;
};

export default defineComponent<MyMenuButtonProps, MyMenuButtonProps>({
  name: "MyMenuButton",
  components: { MyMenuIcon },
  props: {
    size: {
      type: String as PropType<Size>,
      default: "small",
    },
  },
});
</script>

<style>
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
.menu-button:disabled {
  color: var(--color-gray-4);
  opacity: 0.5;
  cursor: default;
}

.menu-button:not(:disabled):hover {
  color: var(--color-primary);
}

/* Tablet */
@media (max-width: 900px) {
}

/* Mobile */
@media (max-width: 700px) {
  .my-logo-icon {
    width: 24px;
  }

  .my-logo-icon_text {
    display: none;
  }
}
</style>
