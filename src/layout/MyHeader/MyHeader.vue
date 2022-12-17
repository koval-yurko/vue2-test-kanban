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
        <div class="my-header_title h1">
          <span v-if="activeDashboard">{{ activeDashboard.name }}</span>
        </div>
        <div class="my-header_btns">
          <my-button
            class="my-header_btn-add my-header_btn-add__desktop"
            size="large"
            :disabled="!activeColumn"
            @click="onAddTaskClick"
            >+ Add New Task</my-button
          >
          <my-button
            class="my-header_btn-add my-header_btn-add__mobile"
            @click="onAddTaskClick"
            :disabled="!activeColumn"
          >
            <my-plus-icon />
          </my-button>
          <my-menu class="my-header-menu-btn" ref="menu">
            <template v-slot:activator="{ onClick }">
              <my-menu-button
                class="my-header-menu-btn"
                @click.prevent="onClick"
                :disabled="!activeDashboard"
              />
            </template>

            <my-menu-list>
              <my-menu-item @click="onEditDashboardClick"
                >Edit Board</my-menu-item
              >
              <my-menu-item @click="onDeleteDashboardClick" color="destructive">
                Delete Board
              </my-menu-item>
            </my-menu-list>
          </my-menu>
        </div>
      </div>
    </div>
    <div class="my-header_spacer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { MyButton } from "@/components/form/MyButton";
import { MyMenuButton } from "@/components/MyMenuButton";
import { MyMenu, MyMenuList, MyMenuItem } from "@/components/MyMenu";
import MyLogoIcon from "@/components/icons/MyLogoIcon.vue";
import MyPlusIcon from "@/components/icons/MyPlusIcon.vue";
import {
  MODAL_DASHBOARD_EDIT,
  MODAL_DASHBOARD_DELETE,
  MODAL_TASK_EDIT,
} from "@/store/constants";
import type { Dashboard, Column } from "@/store/types";
import type { PropType, ComponentPublicInstance } from "vue";

type Size = "small" | "large";

type Color = "primary" | "secondary" | "destructive";

type MyHeaderProps = {
  size?: Size;
  color?: Color;

  sidebarVisible: boolean;
  activeColumn: Column | undefined;
  activeDashboard: Dashboard | undefined;

  showModal(opts: { name: string; data?: any }): void;

  onAddTaskClick: () => void;
  onEditDashboardClick: () => void;
  onDeleteDashboardClick: () => void;
};

export default defineComponent<MyHeaderProps, MyHeaderProps>({
  name: "MyHeader",
  components: {
    MyLogoIcon,
    MyPlusIcon,
    MyButton,
    MyMenuButton,
    MyMenu,
    MyMenuList,
    MyMenuItem,
  },
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
      activeColumn: "dashboards/activeColumn",
      activeDashboard: "dashboards/activeDashboard",
    }),
  },
  methods: {
    ...mapActions({
      showModal: "modals/show",
    }),
    onAddTaskClick() {
      this.showModal({
        name: MODAL_TASK_EDIT,
      });
    },
    onEditDashboardClick() {
      this.showModal({
        name: MODAL_DASHBOARD_EDIT,
        data: this.activeDashboard,
      });
      if (this.$refs.menu) {
        const menu = this.$refs.menu as ComponentPublicInstance<typeof MyMenu>;
        menu.onClose();
      }
    },
    onDeleteDashboardClick() {
      this.showModal({
        name: MODAL_DASHBOARD_DELETE,
      });
      if (this.$refs.menu) {
        const menu = this.$refs.menu as ComponentPublicInstance<typeof MyMenu>;
        menu.onClose();
      }
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
  flex-shrink: 0;
  width: 220px;
  padding: 0 33px;
  border-right: solid 1px var(--header-border-color);
  box-sizing: border-box;

  transition: width 0.3s ease;
}

.my-header_logo-holder__wide {
  width: calc(var(--sidebar-width) + 1px);
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

.my-header-menu-btn {
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

  .my-header-menu-btn {
    margin-left: 6px;
    margin-right: 5px;
    padding: 5px 10px 4px;
  }
}
</style>
