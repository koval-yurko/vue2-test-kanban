<template>
  <div class="my-header">
    <div class="my-header_content">
      <div
        class="my-header_logo-holder"
        :class="{ 'my-header_logo-holder__wide': sidebarVisible }"
      >
        <my-logo-icon class="my-header_logo" />
      </div>
      <div class="my-header_menu-holder">
        <div class="my-header_title h1">Platform Launch</div>
        <div class="my-header_btns">
          <my-button
            class="my-header_btn-add my-header_btn-add__desktop"
            size="large"
            disabled
            >+ Add New Task</my-button
          >
          <my-button
            class="my-header_btn-add my-header_btn-add__mobile"
            disabled
          >
            <my-plus-icon />
          </my-button>
          <button class="menu-button"><my-menu-icon /></button>
        </div>
      </div>
    </div>
    <div class="my-header_spacer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { MyButton } from "@/components/form/MyButton";
import MyLogoIcon from "@/components/icons/MyLogoIcon.vue";
import MyMenuIcon from "@/components/icons/MyMenuIcon.vue";
import MyPlusIcon from "@/components/icons/MyPlusIcon.vue";

import type { PropType } from "vue";

type Size = "small" | "large";

type Color = "primary" | "secondary" | "destructive";

type MyButtonProps = {
  size?: Size;
  color?: Color;

  sidebarVisible: boolean;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MyHeader",
  components: { MyLogoIcon, MyMenuIcon, MyPlusIcon, MyButton },
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
    }),
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
  flex-shrink: 0;
  width: 220px;
  padding: 0 33px;
  border-right: solid 1px var(--header-border-color);
  box-sizing: border-box;

  transition: width 0.3s ease;
}

.my-header_logo-holder__wide {
  width: var(--sidebar-width);
}

.my-header_menu-holder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
}

.my-header_title {
  white-space: nowrap;
  padding-left: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 20px;
}

.my-header_btns {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.my-header_btn-add__mobile {
  display: none;
  padding: 8px 19px;
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

/* Mobile */
@media (max-width: 700px) {
  .my-header_logo-holder,
  .my-header_logo-holder__wide {
    width: auto;
    padding: 0 16px;
    border-right: none;

    transition: width 0s ease;
  }

  .my-header_title {
    padding-left: 0;
  }

  .my-header_btn-add__desktop {
    display: none;
  }

  .my-header_btn-add__mobile {
    display: inline;
  }

  .menu-button {
    margin-left: 6px;
    margin-right: 5px;
    padding: 5px 10px 4px;
  }
}
</style>
