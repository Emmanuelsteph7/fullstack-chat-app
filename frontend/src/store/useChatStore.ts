import { create } from "zustand";
import { Api } from "../types";
import { useSocketStore } from "./useSocketStore";
import { MESSAGE_BOTTOM_ID } from "../pages/chat/constants";

type MessagesByUserIdType = Record<
  string,
  {
    messagesData: Api.Message.GetMessages.Response["data"] | null;
    user: Api.General.User | null;
  }
>;

export interface IChatStore {
  messages: Api.General.Message[];
  messageUsersData: Api.Message.GetMessageUsers.Response["data"] | null;
  messagesByUserId: MessagesByUserIdType;
  selectedUser: Api.General.User | null;
  isMessageUsersLoading: boolean;
  isMessagesLoading: boolean;
  typingUsers: string[];
}

interface IChatStoreAction {
  handleSelectedUser: (user: Api.General.User) => void;
  handleSelectedUserById: (id: string) => void;
  handleSetMessages: (
    res: Api.Message.GetMessages.Response,
    receiverId: string
  ) => void;
  handleSetMessagesUsers: (res: Api.Message.GetMessageUsers.Response) => void;
  handleSendMessage: (
    res: Api.Message.SendMessage.Response,
    receiverId: string
  ) => void;
  handleSetMessageFromSocket: (
    message: Api.General.Message,
    receiverId: string
  ) => void;
}

export const useChatStore = create<IChatStore & IChatStoreAction>(
  (set, get) => ({
    messages: [],
    messageUsersData: null,
    messagesByUserId: {},
    selectedUser: null,
    isMessageUsersLoading: false,
    isMessagesLoading: false,
    typingUsers: [],
    handleSetMessagesUsers: (res: Api.Message.GetMessageUsers.Response) => {
      const { messageUsersData, messagesByUserId } = get();
      const updatedUsers = [
        ...new Map(
          [...(messageUsersData?.users || []), ...res.data.users].map((obj) => [
            JSON.stringify(obj),
            obj,
          ])
        ).values(),
      ];

      const updatedMessagesByUserId: MessagesByUserIdType = {
        ...messagesByUserId,
      };

      res.data.users.forEach((user) => {
        updatedMessagesByUserId[user._id] = messagesByUserId[user._id] || {
          messagesData: null,
          user,
        };
      });

      set({
        messageUsersData: {
          ...res.data,
          users: updatedUsers,
        },
        messagesByUserId: updatedMessagesByUserId,
      });
    },
    handleSetMessages: (
      res: Api.Message.GetMessages.Response,
      receiverId: string
    ) => {
      const { messagesByUserId } = get();

      const copiedMessages = { ...messagesByUserId };
      const previousMessagesFromReceiver = copiedMessages[receiverId];
      const previousMessagesData = previousMessagesFromReceiver.messagesData;
      const previousMessages = previousMessagesData?.messages || [];
      const updatedMessages =
        previousMessagesData?.currentPage === res.data.currentPage
          ? previousMessages
          : [...previousMessages, ...res.data.messages];

      copiedMessages[receiverId] = {
        ...previousMessagesFromReceiver,
        messagesData: { ...res.data, messages: updatedMessages },
      };

      set({
        messages: res.data.messages || [],
        messagesByUserId: copiedMessages,
      });
    },
    handleSetMessageFromSocket: (
      message: Api.General.Message,
      receiverId: string
    ) => {
      const { messagesByUserId } = get();

      const copiedMessages = { ...messagesByUserId };
      const previousMessagesFromReceiver = copiedMessages[receiverId];
      const previousMessagesData = previousMessagesFromReceiver.messagesData;
      const previousMessages = previousMessagesData?.messages || [];
      const updatedMessages = [...previousMessages, message];

      copiedMessages[receiverId] = {
        ...previousMessagesFromReceiver,
        messagesData: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(previousMessagesData as any),
          messages: updatedMessages,
        },
      };

      set({
        messagesByUserId: copiedMessages,
      });

      setTimeout(() => {
        const messageBottom = document.querySelector(`#${MESSAGE_BOTTOM_ID}`);
        messageBottom?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    },
    handleSelectedUser: (user: Api.General.User) => {
      set({
        selectedUser: user,
      });
    },
    handleSelectedUserById: (id: string) => {
      const messageUsers = get().messageUsersData?.users || [];
      const selectedUser = messageUsers.find((item) => item._id === id);

      if (selectedUser) {
        set({
          selectedUser,
        });
      }
    },
    handleSendMessage: (
      res: Api.Message.SendMessage.Response,
      receiverId: string
    ) => {
      const { emitTypingStopEvent } = useSocketStore.getState();
      emitTypingStopEvent();

      const { messagesByUserId } = get();

      const copiedMessagesByUserId = { ...messagesByUserId };
      const receiverMessagesData = copiedMessagesByUserId[receiverId];
      const messagesWithReceiver =
        receiverMessagesData.messagesData?.messages || [];
      const updatedMessages = [...messagesWithReceiver, res.data.message];

      (
        copiedMessagesByUserId[receiverId]
          .messagesData as Api.Message.GetMessages.Response["data"]
      ).messages = updatedMessages;

      set({
        messagesByUserId: copiedMessagesByUserId,
      });
    },
  })
);
