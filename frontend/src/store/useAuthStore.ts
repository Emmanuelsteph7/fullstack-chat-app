import { create } from "zustand";
import { Api } from "../types";
import {
  getUserProfileService,
  uploadPictureService,
} from "../services/user-service";
import { logoutService } from "../services/auth-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../utils/resolveAxiosError";
import { TOKEN_KEY } from "../constants";
import { useChatStore } from "./useChatStore";
import { useSocketStore } from "./useSocketStore";

export interface IAuthStore {
  isAuthenticated: boolean;
  isGetProfileLoading: boolean;
  profileData: Api.General.User | null;
  isLogoutLoading: boolean;
  isUploadPictureLoading: boolean;
  token: string | null;
  onlineUsers: string[];
}

interface IAuthStoreAction {
  fetchProfile: () => Promise<void>;
  handleLoginSuccess: (data: Api.General.LoginSuccess, message: string) => void;
  logout: () => Promise<void>;
  updatePicture: (payload: Api.User.UploadPicture.Request) => Promise<
    | {
        public_id: string;
        url: string;
      }
    | undefined
  >;
}

export const useAuthStore = create<IAuthStore & IAuthStoreAction>(
  (set, get) => ({
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
    isGetProfileLoading: true,
    profileData: null,
    isLogoutLoading: false,
    isLoginLoading: false,
    isUploadPictureLoading: false,
    token: null,
    onlineUsers: [],
    fetchProfile: async () => {
      try {
        const { isAuthenticated } = get();

        if (!isAuthenticated) return;

        const res = await getUserProfileService();
        set({
          isAuthenticated: true,
          profileData: res.data.user,
        });

        const { connectSocket } = useSocketStore.getState();
        connectSocket();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (error: any) {
        set({
          isAuthenticated: false,
        });
      } finally {
        setTimeout(() => {
          set({
            isGetProfileLoading: false,
          });
        }, 1000);
      }
    },
    logout: async () => {
      try {
        set({
          isLogoutLoading: true,
        });

        const { isAuthenticated } = get();
        if (isAuthenticated) {
          await logoutService();
        }
        localStorage.removeItem(TOKEN_KEY);

        const { handleResetChatState } = useChatStore.getState();

        handleResetChatState();

        set({
          isAuthenticated: false,
          isLogoutLoading: false,
          profileData: null,
          token: null,
          onlineUsers: [],
        });

        const { disconnectSocket } = useSocketStore.getState();
        useSocketStore.setState({
          socket: null,
        });

        disconnectSocket();

        toast.success("Logout successful");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        set({
          isLogoutLoading: false,
        });
        toast.error(resolveAxiosError(error).message);
      }
    },
    updatePicture: async (payload: Api.User.UploadPicture.Request) => {
      try {
        set({
          isUploadPictureLoading: true,
        });
        const res = await uploadPictureService(payload);

        const profileData = get().profileData as Api.General.User;
        set({
          isUploadPictureLoading: false,
          profileData: {
            ...profileData,
            profilePic: res.data.profilePic,
          },
        });
        toast.success("Profile picture updated");

        return res.data.profilePic;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        set({
          isUploadPictureLoading: false,
        });
        toast.error(resolveAxiosError(error).message);
      }
    },
    handleLoginSuccess: (data: Api.General.LoginSuccess, message: string) => {
      set({
        isAuthenticated: true,
        profileData: data.user,
        token: data.token,
      });

      const { connectSocket } = useSocketStore.getState();
      connectSocket();

      localStorage.setItem(TOKEN_KEY, data.token);
      toast.success(message);
    },
  })
);
