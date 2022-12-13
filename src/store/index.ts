import Vue from "vue";
import Vuex from "vuex";
import theme from "./theme";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production",
  modules: {
    theme,
  },
});
