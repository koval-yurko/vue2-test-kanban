export const THEME_WHITE = "white";
export const THEME_BLACK = "black";

export type ThemeState = {
  theme: typeof THEME_WHITE | typeof THEME_BLACK;
};

export type SidebarState = {
  visible: boolean;
};

export type RootState = {
  theme: ThemeState;
  sidebar: SidebarState;
};
