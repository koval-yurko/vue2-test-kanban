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

export type ThemeState = {
  theme: typeof THEME_WHITE | typeof THEME_BLACK;
};

export type SidebarState = {
  visible: boolean;
};

export type ModalsState = {
  opened: ModalsOpened | undefined;
  data: any;
};

export type RootState = {
  theme: ThemeState;
  sidebar: SidebarState;
  modals: ModalsState;
};
