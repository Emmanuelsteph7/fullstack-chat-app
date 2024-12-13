import { create } from "zustand";
import { Api } from "../types";
import {
  getUserProfileService,
  uploadPictureService,
} from "../services/user-service";
import { loginService, signUpService } from "../services/auth-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../utils/resolveAxiosError";
import { TOKEN_KEY } from "../constants";

export interface IAuthStore {
  isAuthenticated: boolean;
  isGetProfileLoading: boolean;
  isSignupLoading: boolean;
  profileData: Api.General.User | null;
  isLogoutLoading: boolean;
  isLoginLoading: boolean;
  isUploadPictureLoading: boolean;
  token: string | null;
}

interface IAuthStoreAction {
  fetchProfile: () => Promise<void>;
  signup: (payload: Api.Auth.SignUp.Request) => Promise<void>;
  login: (payload: Api.Auth.Login.Request) => Promise<void>;
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
    isAuthenticated: false,
    isGetProfileLoading: true,
    isSignupLoading: false,
    profileData: null,
    isLogoutLoading: false,
    isLoginLoading: false,
    isUploadPictureLoading: false,
    token: null,
    fetchProfile: async () => {
      try {
        const res = await getUserProfileService();
        set({
          isAuthenticated: true,
          profileData: res.data.user,
        });

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
    signup: async (payload: Api.Auth.SignUp.Request) => {
      try {
        set({
          isSignupLoading: true,
        });
        const res = await signUpService(payload);

        set({
          isAuthenticated: true,
          isSignupLoading: false,
          profileData: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem(TOKEN_KEY, res.data.token);
        toast.success("Sign up successful");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        set({
          isAuthenticated: false,
          isSignupLoading: false,
        });
        toast.error(resolveAxiosError(error));
      }
    },
    login: async (payload: Api.Auth.Login.Request) => {
      try {
        set({
          isLoginLoading: true,
        });
        const res = await loginService(payload);

        set({
          isAuthenticated: true,
          isLoginLoading: false,
          profileData: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem(TOKEN_KEY, res.data.token);
        toast.success("Sign up successful");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        set({
          isAuthenticated: false,
          isLoginLoading: false,
        });
        toast.error(resolveAxiosError(error));
      }
    },
    logout: async () => {
      try {
        set({
          isLogoutLoading: true,
        });
        localStorage.removeItem(TOKEN_KEY);

        set({
          isAuthenticated: false,
          isLogoutLoading: false,
          profileData: null,
          token: null,
        });
        toast.success("Logout successful");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        set({
          isLogoutLoading: false,
        });
        console.log({ error });
        toast.error(resolveAxiosError(error));
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
        toast.error(resolveAxiosError(error));
      }
    },
  })
);
