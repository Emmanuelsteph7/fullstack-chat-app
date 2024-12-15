import { create } from "zustand";
import { API_BASE_URL } from "../constants";
import { io, Socket } from "socket.io-client";
import {
  MESSAGE_DELIVERED,
  MESSAGE_DELIVERED_ACKNOWLEDGED,
  NEW_MESSAGE,
  ONLINE_USERS,
} from "../constants/socket";
import { useAuthStore } from "./useAuthStore";
import { Api } from "../types";
import { useChatStore } from "./useChatStore";

export interface ISocketStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: Socket<any> | null;
}

interface ISocketStoreAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  socketSubscriptions: () => void;
  unsubscribeFromSocket: () => void;
}

export const useSocketStore = create<ISocketStore & ISocketStoreAction>(
  (set, get) => ({
    socket: null,
    connectSocket: () => {
      const { profileData } = useAuthStore.getState();

      const { socket } = get();
      if (!profileData || socket?.connected) return;

      const socketInstance = io(API_BASE_URL, {
        query: {
          userId: profileData._id,
        },
      });
      socketInstance.connect();
      set({
        socket: socketInstance,
      });
    },
    disconnectSocket: () => {
      const { socket } = get();

      if (socket?.connected) {
        socket.disconnect();
      }
    },
    socketSubscriptions: () => {
      const { socket } = get();

      socket?.on(ONLINE_USERS, (userIds: string[]) => {
        useAuthStore.setState({
          onlineUsers: userIds,
        });
      });

      socket?.on(NEW_MESSAGE, (message: Api.General.Message) => {
        socket.emit(MESSAGE_DELIVERED, message._id);

        const { selectedUser, messages } = useChatStore.getState();

        if (message.senderId !== selectedUser?._id) return;

        useChatStore.setState({
          messages: [...messages, message],
        });
      });

      socket?.on(
        MESSAGE_DELIVERED_ACKNOWLEDGED,
        (message: Api.General.Message) => {
          const { profileData } = useAuthStore.getState();
          if (message.senderId !== profileData?._id) return;

          const { messages } = useChatStore.getState();
          const copiedMessages = [...messages];

          const messageIndex = copiedMessages.findIndex(
            (m) => m._id === message._id
          );

          if (messageIndex > -1) {
            copiedMessages[messageIndex] = message;
            useChatStore.setState({
              messages: copiedMessages,
            });
          }
        }
      );
    },
    unsubscribeFromSocket: () => {
      const { socket } = get();
      socket?.off(NEW_MESSAGE);
    },
  })
);
