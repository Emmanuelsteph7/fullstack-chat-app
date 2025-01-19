import { useCallback, useEffect, useMemo, useState } from "react";
import { Api } from "../../../types";
import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { groupPlainMessagesByDate } from "../utils/groupPlainMessagesByDate";
import { getMessagesService } from "../../../services/message-service";
import { getInitials } from "../../../utils/getInitials";
import { CHAT_QUERY_KEY, MESSAGES_LIMIT } from "../constants";

interface IUseChatUserItemOptions {
  user: Api.General.User;
}

const useChatUserItem = ({ user }: IUseChatUserItemOptions) => {
  const { name, profilePic, _id } = user;

  const [areMessagesLoading, setAreMessagesLoading] = useState(false);

  const { onlineUsers } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    handleSelectedUser,
    selectedUser,
    typingUsers,
    messagesByUserId,
    handleSetMessages,
  } = useChatStore();

  const userMessages = messagesByUserId[_id]?.messagesData;

  const displayedMessage = useMemo(() => {
    const sortedMessage = groupPlainMessagesByDate(
      userMessages?.messages || []
    );
    return (
      sortedMessage[sortedMessage.length - 1]?.text || "No message available"
    );
  }, [userMessages?.messages]);

  const shouldFetchMessages = useMemo(() => {
    if (!userMessages) return true;
    return false;
  }, [userMessages]);

  const handleFetchMessages = useCallback(async () => {
    if (areMessagesLoading) return;
    try {
      setAreMessagesLoading(true);
      const res = await getMessagesService({
        limit: MESSAGES_LIMIT,
        page: 1,
        receiverId: _id,
      });

      handleSetMessages(res, _id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setAreMessagesLoading(false);
    }
  }, [_id, areMessagesLoading, handleSetMessages]);

  useEffect(() => {
    if (shouldFetchMessages) {
      handleFetchMessages();
    }
  }, [handleFetchMessages, shouldFetchMessages]);

  const handleClick = () => {
    handleSelectedUser(user);
    searchParams.set(CHAT_QUERY_KEY, user._id);
    setSearchParams(searchParams);
  };

  const initials = getInitials(name);
  const isSelected = _id === selectedUser?._id;
  const isOnline = onlineUsers.includes(_id);
  const isUserTyping = typingUsers?.includes(_id);
  const unreadMessagesCount =
    messagesByUserId[user?._id || ""].messagesData?.unreadMessagesCount || 0;

  return {
    initials,
    isSelected,
    isOnline,
    isUserTyping,
    handleClick,
    profilePic,
    name,
    displayedMessage,
    areMessagesLoading,
    unreadMessagesCount,
  };
};

export default useChatUserItem;
