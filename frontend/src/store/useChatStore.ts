import { create } from "zustand";
import { Api } from "../types";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../utils/resolveAxiosError";
import {
  getMessagesService,
  getMessageUsersService,
  sendMessageService,
} from "../services/message-service";
import { useSocketStore } from "./useSocketStore";

export interface IAuthStore {
  messages: Api.General.Message[];
  messageUsers: Api.General.User[];
  selectedUser: Api.General.User | null;
  isMessageUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSendMessageLoading: boolean;
  typingUsers: string[];
}

interface IAuthStoreAction {
  getMessageUsers: () => Promise<void>;
  getMessages: (payload: Api.Message.GetMessages.Request) => Promise<void>;
  handleSelectedUser: (user: Api.General.User) => void;
  handleSelectedUserById: (id: string) => void;
  sendMessage: (payload: Api.Message.SendMessage.Request) => Promise<void>;
}

export const useChatStore = create<IAuthStore & IAuthStoreAction>(
  (set, get) => ({
    messages: [],
    messageUsers: [],
    selectedUser: null,
    isMessageUsersLoading: false,
    isMessagesLoading: false,
    isSendMessageLoading: false,
    typingUsers: [],
    getMessageUsers: async () => {
      try {
        set({ isMessageUsersLoading: true });
        const res = await getMessageUsersService();

        set({
          messageUsers: res.data.users || [],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(resolveAxiosError(error));
      } finally {
        set({ isMessageUsersLoading: false });
      }
    },
    getMessages: async (payload: Api.Message.GetMessages.Request) => {
      try {
        set({ isMessagesLoading: true });
        const res = await getMessagesService(payload);

        set({
          messages: res.data.messages || [],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(resolveAxiosError(error));
      } finally {
        set({ isMessagesLoading: false });
      }
    },
    handleSelectedUser: (user: Api.General.User) => {
      set({
        selectedUser: user,
      });
    },
    handleSelectedUserById: (id: string) => {
      const messageUsers = get().messageUsers || [];
      const selectedUser = messageUsers.find((item) => item._id === id);

      if (selectedUser) {
        set({
          selectedUser,
        });
      }
    },
    sendMessage: async (payload: Api.Message.SendMessage.Request) => {
      try {
        set({ isSendMessageLoading: true });
        const res = await sendMessageService(payload);

        const { emitTypingStopEvent } = useSocketStore.getState();
        emitTypingStopEvent();

        const { messages = [] } = get();
        set({
          messages: [...messages, res.data.message],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(resolveAxiosError(error));
      } finally {
        set({ isSendMessageLoading: false });
      }
    },
  })
);
