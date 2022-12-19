import type { ActionContext } from "vuex";
import { THEME_WHITE, THEME_BLACK } from "./constants";
import type { ThemeState, RootState } from "./types";

const MUTATION_TOGGLE_THEME = "MUTATION_TOGGLE_THEME";

type ThemeContext = ActionContext<ThemeState, RootState>;

const saveThemeState = (state: ThemeState): void => {
  const themeStr = JSON.stringify(state.theme);
  window.localStorage["kanbanState-theme"] = themeStr;
};

const getThemeState = (): boolean => {
  const themeStr =
    window.localStorage["kanbanState-theme"] || `"${THEME_WHITE}"`;
  try {
    const theme = JSON.parse(themeStr);
    return theme;
  } catch (err) {
    return true;
  }
};

export default {
  namespaced: true,
  state() {
    return {
      theme: getThemeState(),
    };
  },
  mutations: {
    [MUTATION_TOGGLE_THEME](state: ThemeState) {
      const currentTheme = state.theme;
      state.theme = currentTheme === THEME_WHITE ? THEME_BLACK : THEME_WHITE;
      saveThemeState(state);
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
