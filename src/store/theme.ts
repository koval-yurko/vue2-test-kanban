import type { ActionContext } from "vuex";
import { THEME_WHITE, THEME_BLACK } from "./constants";
import type { ThemeState, RootState } from "./types";

const MUTATION_TOGGLE_THEME = "MUTATION_TOGGLE_THEME";

type ThemeContext = ActionContext<ThemeState, RootState>;

export default {
  namespaced: true,
  state() {
    return {
      theme: THEME_WHITE,
    };
  },
  mutations: {
    [MUTATION_TOGGLE_THEME](state: ThemeState) {
      const currentTheme = state.theme;
      state.theme = currentTheme === THEME_WHITE ? THEME_BLACK : THEME_WHITE;
    },
  },
  actions: {
    toggleTheme(context: ThemeContext) {
      context.commit(MUTATION_TOGGLE_THEME);
    },
  },
  getters: {
    activeTheme(store: ThemeState) {
      return store.theme;
    },
  },
};
