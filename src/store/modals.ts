import type { ActionContext } from "vuex";
import type { ModalsState, RootState, ModalsOpened } from "./types";

const MUTATION_SHOW_MODAL = "MUTATION_SHOW_MODAL";
const MUTATION_CLOSE_MODAL = "MUTATION_CLOSE_MODAL";

type ThemeContext = ActionContext<ModalsState, RootState>;

export default {
  namespaced: true,
  state() {
    return {
      opened: undefined,
      data: undefined,
    };
  },
  mutations: {
    [MUTATION_SHOW_MODAL](
      state: ModalsState,
      payload: { name: ModalsOpened; data: any }
    ) {
      state.opened = payload.name;
      state.data = payload.data;
    },
    [MUTATION_CLOSE_MODAL](state: ModalsState) {
      state.opened = undefined;
      state.data = undefined;
    },
  },
  actions: {
    show(context: ThemeContext, payload: { name: ModalsOpened; data: any }) {
      context.commit(MUTATION_SHOW_MODAL, payload);
    },
    hide(context: ThemeContext) {
      context.commit(MUTATION_CLOSE_MODAL);
    },
  },
  getters: {
    opened(store: ModalsState) {
      return store.opened;
    },
    data(store: ModalsState) {
      return store.data;
    },
  },
};
