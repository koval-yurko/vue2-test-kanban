import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import Demo from "./pages/Demo.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: import.meta.env.VITE_BASE_PATH,
  routes: [
    { path: "/", component: Home },
    { path: "/demo", component: Demo },
    { path: "*", redirect: "/" },
  ],
});
