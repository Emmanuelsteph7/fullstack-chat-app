import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IUsersWithMessages,
  useChatStore,
} from "../../../../store/useChatStore";
import { CHAT_QUERY_KEY, MESSAGES_LIMIT } from "../constants";
import {
  groupMessagesByDate,
  IGroupedMessage,
} from "../utils/groupMessagesByDate";
import { getMessagesService } from "../../../../services/message-service";
import { useSocketStore } from "../../../../store/useSocketStore";

export interface IUseChatMessageListResponse {
  messageListRef: React.RefObject<HTMLDivElement>;
  groupedMessages: IGroupedMessage[];
  areMessagesLoading: boolean;
  receiverUserData: IUsersWithMessages | null;
  messageBottomRef: React.RefObject<HTMLDivElement>;
  showArrowBtn: boolean;
  handleScrollToBottom: () => void;
}

const useChatMessageList = (): IUseChatMessageListResponse => {
  const [areMessagesLoading, setAreMessagesLoading] = useState(false);
  const [showArrowBtn, setShowArrowBtn] = useState(false);

  const messageBottomRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const prevHeightRef = useRef(0);

  const [searchParams] = useSearchParams();
  const { usersWithMessages, handleSetChatMessages } = useChatStore();
  const { emitEnterRoom } = useSocketStore();

  const receiverId = searchParams.get(CHAT_QUERY_KEY);

  const { groupedMessages, receiverUserData, receiverMessagesData } =
    useMemo(() => {
      const receiverUserData =
        usersWithMessages.find((user) => user._id === receiverId) || null;
      const receiverMessagesData = receiverUserData?.messagesData;
      const receiverMessages = receiverMessagesData?.messages || [];
      return {
        groupedMessages: groupMessagesByDate(receiverMessages),
        receiverUserData,
        receiverMessagesData,
      };
    }, [receiverId, usersWithMessages]);

  const handleFetchMessages = useCallback(async () => {
    if (receiverMessagesData && !receiverMessagesData?.hasNextPage) return;
    if (receiverId) {
      try {
        setAreMessagesLoading(true);
        const res = await getMessagesService({
          limit: MESSAGES_LIMIT,
          page: (receiverMessagesData?.currentPage || 0) + 1,
          receiverId,
        });

        const messageList = messageListRef.current;
        prevHeightRef.current = messageList?.scrollHeight || 0;

        handleSetChatMessages(res, receiverId);

        if (messageList) {
          setTimeout(() => {
            const heightDiff =
              (messageList?.scrollHeight || 0) - prevHeightRef.current;
            messageList.scrollTop += heightDiff;
          }, 0);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        /* empty */
      } finally {
        setAreMessagesLoading(false);
      }
    }
  }, [handleSetChatMessages, receiverId, receiverMessagesData]);

  const handleScroll = useCallback(() => {
    const messageList = messageListRef.current;

    const isScrolledToBottom =
      (messageList?.scrollTop || 0) + (messageList?.clientHeight || 0) + 100 >=
      (messageList?.scrollHeight || 0);

    setShowArrowBtn(!isScrolledToBottom);

    if (
      messageList?.scrollTop === 0 &&
      receiverMessagesData?.hasNextPage &&
      !areMessagesLoading
    ) {
      handleFetchMessages();
    }
  }, [
    areMessagesLoading,
    handleFetchMessages,
    receiverMessagesData?.hasNextPage,
  ]);

  // useEffect(() => {
  //   emitReadEvent();
  // }, [emitReadEvent, receiverId, groupedMessages]);

  useEffect(() => {
    const messageList = messageListRef.current;
    messageList?.addEventListener("scroll", handleScroll);
    return () => messageList?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (receiverId) {
      emitEnterRoom(receiverId);
    }

    messageBottomRef?.current?.scrollIntoView({ behavior: "instant" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  useEffect(() => {
    if (receiverMessagesData?.currentPage === 1) {
      messageBottomRef?.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [receiverId, receiverMessagesData?.currentPage]);

  useEffect(() => {
    if (receiverId && !receiverMessagesData) {
      handleFetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId, receiverMessagesData?.currentPage]);

  const handleScrollToBottom = () => {
    messageBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    messageListRef,
    groupedMessages,
    areMessagesLoading,
    receiverUserData,
    messageBottomRef,
    showArrowBtn,
    handleScrollToBottom,
  };
};

export default useChatMessageList;
