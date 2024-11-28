import { create } from "zustand";
import { THEME_STORAGE_KEY } from "../constants";

export interface IThemeStore {
  theme: string;
}

interface IThemeStoreAction {
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<IThemeStore & IThemeStoreAction>((set) => ({
  theme: localStorage.getItem(THEME_STORAGE_KEY) || "coffee",
  setTheme: (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    set({ theme });
  },
}));
