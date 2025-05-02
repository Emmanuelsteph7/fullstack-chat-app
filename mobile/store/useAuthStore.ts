import { create } from "zustand";

export interface IAuthStore {
  isAuthenticated: boolean;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  isAuthenticated: false,
}));
