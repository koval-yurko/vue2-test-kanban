import type {
  THEME_WHITE,
  THEME_BLACK,
  MODAL_DASHBOARD_EDIT,
  MODAL_DASHBOARD_DELETE,
  MODAL_TASK_SHOW,
  MODAL_TASK_EDIT,
  MODAL_TASK_DELETE,
} from "./constants";

export type ModalsOpened =
  | typeof MODAL_DASHBOARD_EDIT
  | typeof MODAL_DASHBOARD_DELETE
  | typeof MODAL_TASK_SHOW
  | typeof MODAL_TASK_EDIT
  | typeof MODAL_TASK_DELETE;

export type SubTask = {
  id: string;
  title: string;
  isCompleted?: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
};

export type TaskCreateDTO = {
  title: string;
  description: string;
  subtasks: Array<{ id?: string; label: string }>;
  status: string;
};

export type TaskEditDTO = {
  title?: string;
  description?: string;
  subtasks?: Array<{ id?: string; label?: string; isCompleted?: boolean }>;
  status?: string;
};

export type Column = {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
};

export type Dashboard = {
  id: string;
  name: string;
  columns: Column[];
};

export type DashboardCreateDTO = {
  name: string;
  columns: Array<{ id?: string; label: string }>;
};

export type DashboardEditDTO = {
  name: string;
  columns: Array<{ id?: string; label: string }>;
};

export type ThemeState = {
  theme: typeof THEME_WHITE | typeof THEME_BLACK;
};

export type SidebarState = {
  desktopVisible: boolean;
  mobileVisible: boolean;
};

export type ModalsState = {
  opened: ModalsOpened | undefined;
  data: any;
};

export type DashboardsState = {
  dashboards: Dashboard[];
  activeDashboard: Dashboard | undefined;
};

export type RootState = {
  theme: ThemeState;
  sidebar: SidebarState;
  modals: ModalsState;
  dashboards: DashboardsState;
};
