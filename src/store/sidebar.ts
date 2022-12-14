import type { ActionContext } from "vuex";
import type { SidebarState, RootState } from "./types";

const MUTATION_TOGGLE_SIDEBAR = "MUTATION_TOGGLE_SIDEBAR";

type SidebarContext = ActionContext<SidebarState, RootState>;

export default {
  namespaced: true,
  state() {
    return {
      visible: true,
    };
  },
  mutations: {
    [MUTATION_TOGGLE_SIDEBAR](state: SidebarState) {
      state.visible = !state.visible;
    },
  },
  actions: {
    toggleSidebar(context: SidebarContext) {
      context.commit(MUTATION_TOGGLE_SIDEBAR);
    },
  },
  getters: {
    isVisible(store: SidebarState) {
      return store.visible;
    },
  },
};
