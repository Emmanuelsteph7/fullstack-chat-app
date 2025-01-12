import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../store/useChatStore";
import { CHAT_QUERY_KEY, MESSAGES_LIMIT } from "../constants";
import {
  groupMessagesByDate,
  IGroupedMessage,
} from "../utils/groupMessagesByDate";
import { getMessagesService } from "../../../services/message-service";
import { Api } from "../../../types";

export interface IUseChatMessageListResponse {
  messageListRef: React.RefObject<HTMLDivElement>;
  groupedMessages: IGroupedMessage[];
  areMessagesLoading: boolean;
  receiverUserData: Api.General.User | null;
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
  const { messagesByUserId, handleSetMessages } = useChatStore();

  const receiverId = searchParams.get(CHAT_QUERY_KEY);

  const { groupedMessages, receiverUserData, receiverMessagesData } =
    useMemo(() => {
      const receiverData = messagesByUserId[receiverId || ""];
      const receiverMessagesData = receiverData?.messagesData;
      const receiverMessages = receiverMessagesData?.messages || [];
      const receiverUserData = receiverData?.user;
      return {
        groupedMessages: groupMessagesByDate(receiverMessages),
        receiverUserData,
        receiverMessagesData,
      };
    }, [messagesByUserId, receiverId]);

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

        handleSetMessages(res, receiverId);

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
  }, [handleSetMessages, receiverId, receiverMessagesData]);

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

  useEffect(() => {
    const messageList = messageListRef.current;
    messageList?.addEventListener("scroll", handleScroll);
    return () => messageList?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    messageBottomRef?.current?.scrollIntoView({ behavior: "instant" });
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
