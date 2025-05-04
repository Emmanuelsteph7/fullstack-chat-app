import {
  runOnJS,
  SharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { EdgeInsets } from "react-native-safe-area-context";
import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info" | null;
interface ToastOptions {
  title?: string;
  description: string;
}

export interface IToastStore {
  isShown: boolean;
  title: string;
  description: string;
  type: ToastType;
  toastTopAnimation: SharedValue<number> | null;
  insets: EdgeInsets | null;
}

interface IToastStoreAction {
  handleUpdateSharedValue: (
    value: SharedValue<number>,
    insets: EdgeInsets
  ) => void;
  handleShowToast: (arg: {
    type: ToastType;
    title?: string;
    description: string;
    duration?: number;
  }) => void;
  handleSuccessToast: (arg: ToastOptions) => void;
  handleWarningToast: (arg: ToastOptions) => void;
  handleErrorToast: (arg: ToastOptions) => void;
  handleInfoToast: (arg: ToastOptions) => void;
}

export const useToastStore = create<IToastStore & IToastStoreAction>(
  (set, get) => ({
    description: "",
    isShown: false,
    insets: null,
    title: "",
    type: null,
    toastTopAnimation: null,
    handleUpdateSharedValue: (
      value: SharedValue<number>,
      insets: EdgeInsets
    ) => {
      set({ toastTopAnimation: value, insets });
    },
    handleShowToast: ({
      description,
      duration = 3000,
      type,
      title,
    }: {
      type: ToastType;
      title?: string;
      description: string;
      duration?: number;
    }) => {
      const { toastTopAnimation, insets } = get();

      if (!toastTopAnimation) return;

      set({
        isShown: true,
        title,
        description,
        type,
      });

      toastTopAnimation.value = withSequence(
        withTiming(Math.max(Number(insets?.top), 45)),
        withDelay(
          duration,
          withTiming(-100, undefined, (finish) => {
            if (finish) {
              runOnJS(() => {
                set({
                  isShown: false,
                });
              });
            }
          })
        )
      );
    },
    handleErrorToast: (arg: ToastOptions) => {
      const { handleShowToast } = get();
      handleShowToast({ type: "error", title: "Error", ...arg });
    },
    handleInfoToast: (arg: ToastOptions) => {
      const { handleShowToast } = get();
      handleShowToast({ type: "info", title: "Info", ...arg });
    },
    handleSuccessToast: (arg: ToastOptions) => {
      const { handleShowToast } = get();
      handleShowToast({ type: "success", title: "Success", ...arg });
    },
    handleWarningToast: (arg: ToastOptions) => {
      const { handleShowToast } = get();
      handleShowToast({ type: "warning", title: "Warning", ...arg });
    },
  })
);
