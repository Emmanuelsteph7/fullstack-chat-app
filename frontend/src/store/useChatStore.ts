import { create } from "zustand";
import { Api } from "../types";
import { useSocketStore } from "./useSocketStore";
import { MESSAGE_BOTTOM_ID } from "../pages/chat/constants";
import { useSoundStore } from "./useSoundStore";
import {
  getMostRecentMessage,
  mergeUserArrays,
  sortUserArrayByMessage,
} from "../utils/userMessages";
import { mergeArrays } from "../utils/mergeArrays";

export interface IUsersWithMessages extends Api.General.User {
  messagesData: Api.Message.GetMessages.Response["data"] | null;
  mostRecentMessage: Api.General.Message | null;
}

export interface IUsersListProperties {
  hasNextPage: boolean;
  currentPage: number;
}

export interface IChatStore {
  selectedUser: Api.General.User | null;
  typingUsers: string[];
  usersWithMessages: IUsersWithMessages[];
  usersListProperties: IUsersListProperties | null;
  showUndo: boolean;
  pendingMessage: Api.General.Message | null;
}

interface IChatStoreAction {
  handleUpdateShowUndo: (arg: boolean) => void;
  handleUpdatePendingMessage: (arg: Api.General.Message | null) => void;
  handleSelectedUser: (user: Api.General.User) => void;
  handleClearSelectedUser: () => void;
  handleSelectedUserById: (id: string) => void;
  handleReturnUserById: (id: string) => {
    user: IUsersWithMessages | null;
    index: number;
  };
  handleSetChatUsers: (res: Api.Message.GetMessageUsers.Response) => void;
  handleSetChatMessages: (
    res: Api.Message.GetMessages.Response,
    receiverId: string
  ) => void;
  handleSetSingleChatMessage: (
    message: Api.General.Message,
    receiverId: string
  ) => void;
  handleSendMessage: (
    res: Api.Message.SendMessage.Response,
    receiverId: string
  ) => void;
  handleSetMessageFromSocket: (
    message: Api.General.Message,
    receiverId: string,
    unreadMessagesCount: number
  ) => void;
  handleUpdateMessageFromSocket: (
    message: Api.General.Message,
    receiverId: string,
    unreadMessagesCount: number
  ) => void;
}

export const useChatStore = create<IChatStore & IChatStoreAction>(
  (set, get) => ({
    selectedUser: null,
    usersListProperties: null,
    typingUsers: [],
    usersWithMessages: [],
    showUndo: false,
    pendingMessage: null,
    handleUpdateShowUndo: (arg: boolean) => {
      set({
        showUndo: arg,
      });
    },
    handleUpdatePendingMessage: (arg: Api.General.Message | null) => {
      set({
        pendingMessage: arg,
      });
    },
    handleSetChatUsers: (res: Api.Message.GetMessageUsers.Response) => {
      const { usersWithMessages } = get();
      const incomingUsers = res?.data?.users || [];

      const mergedUsers = mergeUserArrays(usersWithMessages, incomingUsers);

      set({
        usersWithMessages: mergedUsers,
        usersListProperties: {
          hasNextPage: res.data.hasNextPage,
          currentPage: res.data.currentPage,
        },
      });
    },
    handleSetChatMessages: (
      res: Api.Message.GetMessages.Response,
      receiverId: string
    ) => {
      const { usersWithMessages } = get();

      const userIndex = usersWithMessages.findIndex(
        (user) => user._id === receiverId
      );

      if (userIndex > -1) {
        const copiedUsersWithMessages = [...usersWithMessages];
        const userData = copiedUsersWithMessages[userIndex];
        const previousUserMessagesData = userData.messagesData;
        const previousMessages = previousUserMessagesData?.messages || [];
        const newMessagesData = res.data;

        const updatedMessages = mergeArrays(
          previousMessages,
          newMessagesData.messages,
          "_id"
        );

        const mostRecentMessage = getMostRecentMessage(updatedMessages);

        copiedUsersWithMessages[userIndex] = {
          ...userData,
          messagesData: {
            ...newMessagesData,
            messages: updatedMessages,
          },
          mostRecentMessage,
        };

        const sortedUserData = sortUserArrayByMessage(copiedUsersWithMessages);

        set({
          usersWithMessages: sortedUserData,
        });
      }
    },
    handleReturnUserById: (id: string) => {
      const { usersWithMessages } = get();

      const selectedUserIndex = usersWithMessages.findIndex(
        (user) => user._id === id
      );

      if (selectedUserIndex > -1) {
        const selectedUser = usersWithMessages[selectedUserIndex];
        return { user: selectedUser, index: selectedUserIndex };
      } else {
        return { user: null, index: -1 };
      }
    },
    handleSetMessageFromSocket: (
      message: Api.General.Message,
      receiverId: string,
      unreadMessagesCount
    ) => {
      const { handleReturnUserById, handleSetChatMessages } = get();

      const receiverUserIndex = handleReturnUserById(receiverId)?.index;

      if (receiverUserIndex < 0) return;

      const previousMessagesFromReceiver =
        handleReturnUserById(receiverId)?.user;
      const previousMessagesData =
        previousMessagesFromReceiver?.messagesData as Api.Message.GetMessages.Response["data"];
      const previousMessages = previousMessagesData?.messages || [];
      const updatedMessages = [...previousMessages, message];

      const updatedMessagesData: Api.Message.GetMessages.Response["data"] = {
        ...previousMessagesData,
        messages: updatedMessages,
        unreadMessagesCount,
      };

      handleSetChatMessages(
        { data: updatedMessagesData } as Api.Message.GetMessages.Response,
        receiverId
      );

      setTimeout(() => {
        const messageBottom = document.querySelector(`#${MESSAGE_BOTTOM_ID}`);
        messageBottom?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    },
    handleUpdateMessageFromSocket: (
      message: Api.General.Message,
      receiverId: string,
      unreadMessagesCount: number
    ) => {
      const { handleReturnUserById, handleSetChatMessages } = get();

      const receiverUserIndex = handleReturnUserById(receiverId).index;

      if (receiverUserIndex < 0) return;

      const previousMessagesFromReceiver =
        handleReturnUserById(receiverId)?.user;
      const previousMessagesData =
        previousMessagesFromReceiver?.messagesData as Api.Message.GetMessages.Response["data"];
      const previousMessages = previousMessagesData?.messages || [];

      const messageIndex = previousMessages.findIndex(
        (msg) => msg._id === message._id
      );
      if (messageIndex > -1) {
        previousMessages[messageIndex] = message;

        const updatedMessagesData: Api.Message.GetMessages.Response["data"] = {
          ...previousMessagesData,
          messages: previousMessages,
          unreadMessagesCount,
        };

        handleSetChatMessages(
          { data: updatedMessagesData } as Api.Message.GetMessages.Response,
          receiverId
        );
      }
    },
    handleSelectedUser: (user: Api.General.User) => {
      set({
        selectedUser: user,
      });
    },
    handleClearSelectedUser: () => {
      set({
        selectedUser: null,
      });
    },
    handleSelectedUserById: (id: string) => {
      const { handleReturnUserById } = get();
      const selectedUser = handleReturnUserById(id).user;

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
      const { handlePlaySendMessage } = useSoundStore.getState();
      const { emitTypingStopEvent } = useSocketStore.getState();

      emitTypingStopEvent();
      handlePlaySendMessage();

      const { handleReturnUserById, handleSetChatMessages } = get();

      const receiverUserIndex = handleReturnUserById(receiverId)?.index;

      if (receiverUserIndex < 0) return;

      const receiverMessagesData = handleReturnUserById(receiverId)?.user
        ?.messagesData as Api.Message.GetMessages.Response["data"];
      const messagesWithReceiver = receiverMessagesData?.messages || [];
      const updatedMessages = [...messagesWithReceiver, res.data.message];

      const updatedMessagesData: Api.Message.GetMessages.Response["data"] = {
        ...receiverMessagesData,
        messages: updatedMessages,
      };

      handleSetChatMessages(
        { data: updatedMessagesData } as Api.Message.GetMessages.Response,
        receiverId
      );
    },
    handleSetSingleChatMessage: (
      message: Api.General.Message,
      receiverId: string
    ) => {
      const { usersWithMessages } = get();

      const userIndex = usersWithMessages.findIndex(
        (user) => user._id === receiverId
      );

      if (userIndex > -1) {
        const copiedUsersWithMessages = [...usersWithMessages];
        const selectedUser = copiedUsersWithMessages[userIndex];
        const selectedUserMessageData =
          selectedUser.messagesData as Api.Message.GetMessages.Response["data"];
        const selectedUserMessages = selectedUserMessageData?.messages || [];

        const updatedMessages = mergeArrays(
          selectedUserMessages,
          [message],
          "_id"
        );
        const mostRecentMessage = getMostRecentMessage(updatedMessages);

        copiedUsersWithMessages[userIndex] = {
          ...selectedUser,
          messagesData: {
            ...selectedUserMessageData,
            messages: updatedMessages,
          },
          mostRecentMessage,
        };

        const sortedUserData = sortUserArrayByMessage(copiedUsersWithMessages);

        set({
          usersWithMessages: sortedUserData,
        });
      }
    },
  })
);
