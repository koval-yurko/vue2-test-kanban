<template>
  <div class="my-sidebar" :class="{ 'my-sidebar__hidden': !sidebarVisible }">
    <div class="my-sidebar_content">
      SIDEBAR <br />
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
import type { PropType } from "vue";

type Size = "small" | "large";

type Color = "primary" | "secondary" | "destructive";

type MyButtonProps = {
  size?: Size;
  color?: Color;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MySidebar",
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
  border: solid 1px black;

  transition: left 0.3s ease;
}

.my-sidebar_spacer {
  width: var(--sidebar-width);

  transition: width 0.3s ease;
}

.my-sidebar__hidden .my-sidebar_content {
  left: var(--sidebar-width-n);
}

.my-sidebar__hidden .my-sidebar_spacer {
  width: 0;
}
</style>
