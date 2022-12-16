import type { THEME_WHITE, THEME_BLACK, MODAL_DASHBOARD } from "./constants";

export type ModalsOpened = typeof MODAL_DASHBOARD;

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
