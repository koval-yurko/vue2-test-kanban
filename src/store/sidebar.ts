import type { ActionContext } from "vuex";
import type { SidebarState, RootState } from "./types";

const MUTATION_TOGGLE_SIDEBAR_DESK = "MUTATION_TOGGLE_SIDEBAR_DESK";
const MUTATION_TOGGLE_SIDEBAR_MOB = "MUTATION_TOGGLE_SIDEBAR_MOB";

type SidebarContext = ActionContext<SidebarState, RootState>;

const saveSidebarState = (state: SidebarState): void => {
  const desktopVisible = JSON.stringify(state.desktopVisible);
  window.localStorage["kanbanState-sidebar"] = desktopVisible;
};

const getSidebarState = (): boolean => {
  const desktopVisibleStr =
    window.localStorage["kanbanState-sidebar"] || "true";
  try {
    const desktopVisible = JSON.parse(desktopVisibleStr);
    return desktopVisible;
  } catch (err) {
    return true;
  }
};

export default {
  namespaced: true,
  state() {
    return {
      desktopVisible: getSidebarState(),
      mobileVisible: false,
    };
  },
  mutations: {
    [MUTATION_TOGGLE_SIDEBAR_DESK](state: SidebarState, force?: boolean) {
      if (typeof force === "boolean") {
        state.desktopVisible = force;
      } else {
        state.desktopVisible = !state.desktopVisible;
      }
      state.mobileVisible = false;
      saveSidebarState(state);
    },
    [MUTATION_TOGGLE_SIDEBAR_MOB](state: SidebarState, force?: boolean) {
      if (typeof force === "boolean") {
        state.mobileVisible = force;
      } else {
        state.mobileVisible = !state.mobileVisible;
      }
    },
  },
  actions: {
    toggleDesktopSidebar(context: SidebarContext, force?: boolean) {
      context.commit(MUTATION_TOGGLE_SIDEBAR_DESK, force);
    },
    toggleMobileSidebar(context: SidebarContext, force?: boolean) {
      context.commit(MUTATION_TOGGLE_SIDEBAR_MOB, force);
    },
  },
  getters: {
    isDesktopSidebarVisible(store: SidebarState) {
      return store.desktopVisible;
    },
    isMobileSidebarVisible(store: SidebarState) {
      return store.mobileVisible;
    },
  },
};
