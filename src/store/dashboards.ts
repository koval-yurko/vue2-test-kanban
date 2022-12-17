import type { ActionContext } from "vuex";
import type { DashboardsState, RootState, Dashboard } from "./types";

const MUTATION_DASHBOARDS_LOAD = "MUTATION_DASHBOARDS_LOAD";
const MUTATION_DASHBOARD_ADD = "MUTATION_DASHBOARD_ADD";
const MUTATION_DASHBOARD_EDIT = "MUTATION_DASHBOARD_EDIT";
const MUTATION_DASHBOARD_DELETE = "MUTATION_DASHBOARD_DELETE";
const MUTATION_DASHBOARD_SET_ACTIVE = "MUTATION_DASHBOARD_SET_ACTIVE";

type DashboardsContext = ActionContext<DashboardsState, RootState>;

const saveState = (state: DashboardsState): void => {
  const dashboardsStr = JSON.stringify(state.dashboards);
  window.localStorage["kanbanState"] = dashboardsStr;
};

export default {
  namespaced: true,
  state() {
    return {
      dashboards: [],
      activeDashboard: undefined,
    };
  },
  mutations: {
    [MUTATION_DASHBOARDS_LOAD](state: DashboardsState, payload: Dashboard[]) {
      state.dashboards = payload;
    },
    [MUTATION_DASHBOARD_SET_ACTIVE](
      state: DashboardsState,
      payload: Dashboard | undefined
    ) {
      state.activeDashboard = payload;
    },
    [MUTATION_DASHBOARD_ADD](state: DashboardsState, payload: Dashboard) {
      state.dashboards = [...state.dashboards, payload];
      saveState(state);
    },
    [MUTATION_DASHBOARD_EDIT](
      state: DashboardsState,
      { name, board }: { name: string; board: Dashboard }
    ) {
      state.dashboards = state.dashboards.map((dashboard) => {
        if (dashboard.name === name) {
          return {
            ...dashboard,
            name: board.name,
          };
        }
        return dashboard;
      });
      saveState(state);
    },
    [MUTATION_DASHBOARD_DELETE](state: DashboardsState, payload: string) {
      state.dashboards = state.dashboards.filter((dashboard) => {
        return dashboard.name !== payload;
      });
      saveState(state);
    },
  },
  actions: {
    loadDashboards(context: DashboardsContext) {
      const dashboardsStr = window.localStorage["kanbanState"] || "[]";
      const dashboards = JSON.parse(dashboardsStr);
      context.commit(MUTATION_DASHBOARDS_LOAD, dashboards);
      if (dashboards.length) {
        context.commit(MUTATION_DASHBOARD_SET_ACTIVE, dashboards[0]);
      }
    },
    setActive(context: DashboardsContext, payload: string) {
      const dashboard = context.state.dashboards.find(
        (item) => item.name === payload
      );
      context.commit(MUTATION_DASHBOARD_SET_ACTIVE, dashboard);
    },
    addDashboard(context: DashboardsContext, payload: Dashboard) {
      context.commit(MUTATION_DASHBOARD_ADD, payload);
    },
    editDashboard(
      context: DashboardsContext,
      payload: { name: string; board: Dashboard }
    ) {
      context.commit(MUTATION_DASHBOARD_EDIT, payload);
    },
    deleteDashboard(context: DashboardsContext, payload: string) {
      context.commit(MUTATION_DASHBOARD_DELETE, payload);
    },
  },
  getters: {
    dashboards(store: DashboardsState) {
      return store.dashboards;
    },
    activeDashboard(store: DashboardsState) {
      return store.activeDashboard;
    },
    activeColumn(store: DashboardsState) {
      return store.activeDashboard
        ? store.activeDashboard.columns[0]
        : undefined;
    },
  },
};
