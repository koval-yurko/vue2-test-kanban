<template>
  <div class="my-sidebar" :class="{ 'my-sidebar__hidden': !sidebarVisible }">
    <div class="my-sidebar_content">
      <div class="my-sidebar_total h4">ALL BOARDS (3)</div>
      <ul class="my-sidebar_menu">
        <li class="my-sidebar_menu-item my-sidebar_menu-item__active">
          <my-board-icon class="my-sidebar_menu-item-icon" />
          <span class="my-sidebar_menu-item-text h3">Text</span>
        </li>
        <li class="my-sidebar_menu-item">
          <my-board-icon class="my-sidebar_menu-item-icon" />
          <span class="my-sidebar_menu-item-text h3">Text</span>
        </li>
        <li class="my-sidebar_menu-item">
          <my-board-icon class="my-sidebar_menu-item-icon" />
          <span class="my-sidebar_menu-item-text h3">Text</span>
        </li>
        <li class="my-sidebar_menu-item my-sidebar_menu-item__new">
          <my-board-icon class="my-sidebar_menu-item-icon" />
          <span class="my-sidebar_menu-item-text h3">+ Text</span>
        </li>
      </ul>
      <button @click="toggleSidebar">toggle</button>

      <br />
      <br />
      Theme {{ theme }}
      <button @click="toggleTheme">theme</button>
    </div>
    <div class="my-sidebar_spacer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import MyBoardIcon from "@/components/icons/MyBoardIcon.vue";
import type { PropType } from "vue";

type Size = "small" | "large";

type Color = "primary" | "secondary" | "destructive";

type MyButtonProps = {
  size?: Size;
  color?: Color;

  sidebarVisible: boolean;
  theme: string;
  toggleSidebar(): void;
  toggleTheme(): void;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MySidebar",
  components: { MyBoardIcon },
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
    ...mapGetters({
      sidebarVisible: "sidebar/isVisible",
      theme: "theme/activeTheme",
    }),
  },
  methods: {
    ...mapActions({
      toggleSidebar: "sidebar/toggleSidebar",
      toggleTheme: "theme/toggleTheme",
    }),
  },
});
</script>

<style>
.my-sidebar {
}

.my-sidebar_content {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  width: var(--sidebar-width);
  background: var(--sidebar-bg-color);

  transition: left 0.3s ease;
}

.my-sidebar_spacer {
  width: var(--sidebar-width);

  transition: width 0.3s ease;
}

.my-sidebar_total {
  padding: 19px 32px 19px 32px;
  color: var(--sidebar-menu-color);
}

.my-sidebar_menu {
  margin: 0 25px 0 0;
  padding: 0;
  list-style: none;
}

.my-sidebar_menu-item {
  display: flex;
  align-items: center;
  padding: 14px 20px 15px 32px;
  border-radius: 0 100px 100px 0;
  color: var(--sidebar-menu-color);
  cursor: pointer;

  transition: background 0.3s ease;
}
.my-sidebar_menu-item:hover {
  color: var(--sidebar-menu-color-hover);
  background: var(--sidebar-menu-bg-color-hover);
}
.my-sidebar_menu-item__active {
  cursor: default;
}
.my-sidebar_menu-item__active,
.my-sidebar_menu-item__active:hover {
  color: var(--sidebar-menu-color-active);
  background: var(--sidebar-menu-bg-color-active);
}
.my-sidebar_menu-item__new {
  color: var(--sidebar-menu-color-hover);
}
.my-sidebar_menu-item-icon {
  margin-right: 14px;
}

.my-sidebar_menu-item-text {
}

.my-sidebar__hidden .my-sidebar_content {
  left: var(--sidebar-width-n);
}

.my-sidebar__hidden .my-sidebar_spacer {
  width: 0;
}
</style>
