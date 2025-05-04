import { Api } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutService } from "@/services/auth-service";
import { useToastStore } from "./useToastStore";
import { resolveAxiosError } from "@/utils/resolveAxiosError";

export interface IAuthStore {
  isAuthenticated: boolean;
  user: Api.General.User | null;
  token: string | null;
  logoutLoading: boolean;
}

interface IAuthStoreAction {
  handleLoginSuccess: (data: Api.General.LoginSuccess) => void;
  handleLogout: () => Promise<void>;
}

const AUTH_PERSIST_NAME = "auth_store";

export const useAuthStore = create<IAuthStore & IAuthStoreAction>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      logoutLoading: false,
      handleLoginSuccess: (data: Api.General.LoginSuccess) => {
        set({
          isAuthenticated: true,
          token: data.token,
          user: data.user,
        });
      },
      handleLogout: async () => {
        const { handleSuccessToast, handleErrorToast } =
          useToastStore.getState();
        try {
          set({
            logoutLoading: true,
          });

          const res = await logoutService();

          set({
            isAuthenticated: false,
            token: null,
            user: null,
          });
          handleSuccessToast({ description: res.message });
        } catch (error) {
          const { message } = resolveAxiosError(error);
          handleErrorToast({ description: message });
        } finally {
          set({
            logoutLoading: false,
          });
        }
      },
    }),
    {
      name: AUTH_PERSIST_NAME,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
