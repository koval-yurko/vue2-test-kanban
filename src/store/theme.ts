import Vuex from "vuex";
import type { ActionContext } from "vuex";

const MUTATION_TOGGLE_THEME = "MUTATION_TOGGLE_THEME";

const THEME_WHITE = "white";
const THEME_BLACK = "black";

type ThemeState = {
  theme: typeof THEME_WHITE | typeof THEME_BLACK;
};

type ThemeContext = ActionContext<ThemeState, ThemeState>;

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
