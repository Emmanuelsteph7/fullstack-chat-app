import { create } from "zustand";
import { API_BASE_URL } from "../constants";
import { io, Socket } from "socket.io-client";
import {
  ENTER_ROOM,
  LEAVE_ROOM,
  MESSAGE_DELIVERED,
  MESSAGE_DELIVERED_ACKNOWLEDGED,
  MESSAGE_READ,
  MESSAGE_READ_ACKNOWLEDGED,
  NEW_MESSAGE,
  ONLINE_USERS,
  UNREAD_COUNT,
  TYPING_MESSAGE,
  TYPING_MESSAGE_STOP,
  TYPING_USERS,
  UPDATE_MESSAGE,
} from "../constants/socket";
import { useAuthStore } from "./useAuthStore";
import { Api } from "../types";
import { useChatStore } from "./useChatStore";
import { useSoundStore } from "./useSoundStore";

export interface ISocketStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: Socket<any> | null;
}

interface ISocketStoreAction {
  connectSocket: () => void;
  disconnectSocket: () => void;
  socketSubscriptions: () => void;
  unsubscribeFromSocket: () => void;
  emitTypingEvent: () => void;
  emitTypingStopEvent: () => void;
  emitReadEvent: () => void;
  emitEnterRoom: (receiverId: string) => void;
  emitLeaveRoom: () => void;
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

      socket?.on(
        NEW_MESSAGE,
        ({
          unreadMessagesCount,
          message,
        }: {
          unreadMessagesCount: number;
          message: Api.General.Message;
        }) => {
          const { handleSetMessageFromSocket, selectedUser } =
            useChatStore.getState();
          const { handlePlayNewMessageSound, handlePlayNewMessageSound2 } =
            useSoundStore.getState();

          socket.emit(MESSAGE_DELIVERED, message._id, selectedUser?._id);
          handleSetMessageFromSocket(
            message,
            message.senderId,
            unreadMessagesCount
          );

          if (selectedUser && message.senderId === selectedUser._id) {
            handlePlayNewMessageSound2();
          } else {
            handlePlayNewMessageSound();
          }
        }
      );

      socket?.on(
        UPDATE_MESSAGE,
        ({
          message,
          receiverId,
        }: {
          message: Api.General.Message;
          receiverId: string;
        }) => {
          const { handleSetSingleChatMessage } = useChatStore.getState();

          handleSetSingleChatMessage(message, receiverId);
        }
      );

      socket?.on(
        MESSAGE_DELIVERED_ACKNOWLEDGED,
        ({
          unreadMessagesCount,
          message,
        }: {
          unreadMessagesCount: number;
          message: Api.General.Message;
        }) => {
          const { profileData } = useAuthStore.getState();
          if (message?.senderId !== profileData?._id) return;

          const { handleUpdateMessageFromSocket } = useChatStore.getState();
          handleUpdateMessageFromSocket(
            message,
            message.receiverId,
            unreadMessagesCount
          );
        }
      );

      socket?.on(
        MESSAGE_READ_ACKNOWLEDGED,
        ({
          unreadMessagesCount,
          message,
        }: {
          unreadMessagesCount: number;
          message: Api.General.Message;
        }) => {
          const { profileData } = useAuthStore.getState();
          if (message.senderId !== profileData?._id) return;

          const { handleUpdateMessageFromSocket } = useChatStore.getState();
          handleUpdateMessageFromSocket(
            message,
            message.receiverId,
            unreadMessagesCount
          );
        }
      );

      socket?.on(
        UNREAD_COUNT,
        ({
          unreadMessagesCount,
          receiverId,
          message,
        }: {
          message: Api.General.Message;
          unreadMessagesCount: number;
          receiverId: string;
        }) => {
          const { handleUpdateMessageFromSocket } = useChatStore.getState();
          handleUpdateMessageFromSocket(
            message,
            receiverId,
            unreadMessagesCount
          );
        }
      );

      socket?.on(TYPING_USERS, (typingUsers: string[]) => {
        useChatStore.setState({
          typingUsers,
        });
      });
    },
    unsubscribeFromSocket: () => {
      const { socket } = get();
      socket?.off(NEW_MESSAGE);
    },
    emitTypingEvent: () => {
      const { socket } = get();

      const { profileData } = useAuthStore.getState();
      const { selectedUser } = useChatStore.getState();
      socket?.emit(TYPING_MESSAGE, {
        sender: profileData?._id,
        receiver: selectedUser?._id,
      });
    },
    emitTypingStopEvent: () => {
      const { socket } = get();

      const { profileData } = useAuthStore.getState();
      const { selectedUser } = useChatStore.getState();
      socket?.emit(TYPING_MESSAGE_STOP, {
        sender: profileData?._id,
        receiver: selectedUser?._id,
      });
    },
    emitReadEvent: () => {
      const { socket } = get();

      const { profileData } = useAuthStore.getState();
      const { selectedUser } = useChatStore.getState();

      if (profileData?._id) socket?.emit(MESSAGE_READ, selectedUser?._id);
    },
    emitEnterRoom: (receiverId: string) => {
      const { socket } = get();
      socket?.emit(ENTER_ROOM, receiverId);
    },
    emitLeaveRoom: () => {
      const { socket } = get();
      socket?.emit(LEAVE_ROOM);
    },
  })
);
