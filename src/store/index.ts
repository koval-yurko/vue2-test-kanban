import Vue from "vue";
import Vuex from "vuex";
import theme from "./theme";
import sidebar from "./sidebar";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production",
  modules: {
    theme,
    sidebar,
  },
});
