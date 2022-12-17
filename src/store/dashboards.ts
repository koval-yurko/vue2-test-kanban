import { getUniqId, getUniqColor, updateTask } from "./helpers";
import type { ActionContext } from "vuex";
import type {
  DashboardsState,
  RootState,
  Dashboard,
  Column,
  Task,
  DashboardCreateDTO,
  DashboardEditDTO,
  TaskCreateDTO,
  TaskEditDTO,
} from "./types";

const MUTATION_DASHBOARDS_LOAD = "MUTATION_DASHBOARDS_LOAD";
const MUTATION_DASHBOARD_ADD = "MUTATION_DASHBOARD_ADD";
const MUTATION_DASHBOARD_EDIT = "MUTATION_DASHBOARD_EDIT";
const MUTATION_DASHBOARD_DELETE = "MUTATION_DASHBOARD_DELETE";
const MUTATION_DASHBOARD_SET_ACTIVE = "MUTATION_DASHBOARD_SET_ACTIVE";
const MUTATION_TASK_ADD = "MUTATION_TASK_ADD";

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
      { id, board }: { id: string; board: Dashboard }
    ) {
      state.dashboards = state.dashboards.map((dashboard) => {
        if (dashboard.id === id) {
          return board;
        }
        return dashboard;
      });
      saveState(state);
    },
    [MUTATION_DASHBOARD_DELETE](state: DashboardsState, id: string) {
      state.dashboards = state.dashboards.filter((dashboard) => {
        return dashboard.id !== id;
      });
      saveState(state);
    },
    [MUTATION_TASK_ADD](
      state: DashboardsState,
      { dashboardId, task }: { dashboardId: string; task: Task }
    ) {
      state.dashboards = state.dashboards.map((dashboard) => {
        if (dashboard.id === dashboardId) {
          const columns = dashboard.columns.map((column) => {
            if (column.name === task.status) {
              column.tasks.push(task);
            }
            return column;
          });

          return {
            ...dashboard,
            columns,
          };
        }
        return dashboard;
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
    setActiveDashboard(context: DashboardsContext, id: string) {
      const dashboard = context.state.dashboards.find((item) => item.id === id);
      context.commit(MUTATION_DASHBOARD_SET_ACTIVE, dashboard);
    },
    createDashboard(context: DashboardsContext, payload: DashboardCreateDTO) {
      const dashboard: Dashboard = {
        id: getUniqId(),
        name: payload.name,
        columns: payload.columns.map((column) => {
          return {
            id: getUniqId(),
            color: getUniqColor(),
            name: column.label,
            tasks: [],
          };
        }),
      };
      context.commit(MUTATION_DASHBOARD_ADD, dashboard);
      return dashboard;
    },
    editDashboard(
      context: DashboardsContext,
      { id, data }: { id: string; data: DashboardEditDTO }
    ) {
      const currentDashboard = context.state.dashboards.find(
        (d) => d.id === id
      );
      if (currentDashboard) {
        const board: Dashboard = {
          ...currentDashboard,
          name: data.name,
          columns: data.columns.map((column) => {
            let currentColumn;
            if (column.id) {
              currentColumn = currentDashboard.columns.find(
                (col) => col.id === column.id
              );
            }
            if (currentColumn) {
              return {
                ...currentColumn,
                name: column.label,
              };
            } else {
              return {
                id: getUniqId(),
                color: getUniqColor(),
                name: column.label,
                tasks: [],
              };
            }
          }),
        };
        context.commit(MUTATION_DASHBOARD_EDIT, { id, board });
        return board;
      }
    },
    deleteDashboard(context: DashboardsContext, id: string) {
      context.commit(MUTATION_DASHBOARD_DELETE, id);
    },
    createTask(
      context: DashboardsContext,
      { dashboardId, data }: { dashboardId: string; data: TaskCreateDTO }
    ) {
      const task: Task = {
        id: getUniqId(),
        title: data.title,
        description: data.description,
        status: data.status,
        subtasks: data.subtasks.map((subtask) => {
          return {
            id: getUniqId(),
            title: subtask.label,
            isCompleted: false,
          };
        }),
      };
      context.commit(MUTATION_TASK_ADD, { dashboardId, task });
    },
    editTask(
      context: DashboardsContext,
      {
        dashboardId,
        id,
        data,
      }: { dashboardId: string; id: string; data: TaskEditDTO }
    ) {
      let newTask;
      const currentDashboard = context.state.dashboards.find(
        (d) => d.id === dashboardId
      );
      if (currentDashboard) {
        let currentTask: Task | undefined;
        let currentColumn: Column | undefined;
        let nextColumn: Column | undefined;

        currentDashboard.columns.forEach((column) => {
          column.tasks.forEach((task) => {
            if (task.id === id) {
              currentColumn = column;
              currentTask = task;
            }
          });

          if (data.status && column.name === data.status) {
            nextColumn = column;
          }
        });

        if (nextColumn === currentColumn) {
          nextColumn = undefined;
        }

        const board: Dashboard = {
          ...currentDashboard,
          columns: currentDashboard.columns.map((column) => {
            let newTasks = column.tasks;
            if (currentTask && nextColumn && nextColumn === column) {
              // insert
              newTask = updateTask(currentTask, data);
              newTasks = [...newTasks, newTask];
            } else if (currentColumn && currentColumn === column) {
              // update
              newTasks = newTasks
                .map((task) => {
                  if (task.id === id) {
                    if (nextColumn) {
                      // remove
                      return {
                        ...task,
                        status: "",
                      };
                    } else {
                      // update
                      newTask = updateTask(task, data);
                      return newTask;
                    }
                  }
                  return task;
                })
                .filter((el) => el.status);
            } else {
              // skip
            }

            return {
              ...column,
              tasks: newTasks,
            };
          }),
        };
        context.commit(MUTATION_DASHBOARD_EDIT, { id: dashboardId, board });
        return newTask;
      }
    },
    deleteTask(
      context: DashboardsContext,
      { dashboardId, id }: { dashboardId: string; id: string }
    ) {
      const currentDashboard = context.state.dashboards.find(
        (d) => d.id === dashboardId
      );
      if (currentDashboard) {
        let currentColumn: Column | undefined;

        currentDashboard.columns.forEach((column) => {
          column.tasks.forEach((task) => {
            if (task.id === id) {
              currentColumn = column;
            }
          });
        });

        const board: Dashboard = {
          ...currentDashboard,
          columns: currentDashboard.columns.map((column) => {
            if (column === currentColumn) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== id),
              };
            }
            return column;
          }),
        };
        context.commit(MUTATION_DASHBOARD_EDIT, { id: dashboardId, board });
        return board;
      }
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
