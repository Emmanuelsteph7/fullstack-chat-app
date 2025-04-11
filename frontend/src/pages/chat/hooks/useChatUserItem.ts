import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IUsersWithMessages, useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { getMessagesService } from "../../../services/message-service";
import { getInitials } from "../../../utils/getInitials";
import { CHAT_QUERY_KEY, MESSAGES_LIMIT } from "../constants";

interface IUseChatUserItemOptions {
  user: IUsersWithMessages;
}

const useChatUserItem = ({ user }: IUseChatUserItemOptions) => {
  const { name, profilePic, _id, mostRecentMessage } = user;

  const [areMessagesLoading, setAreMessagesLoading] = useState(false);

  const { onlineUsers } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    handleSelectedUser,
    selectedUser,
    typingUsers,
    handleSetChatMessages,
    usersWithMessages,
    handleReturnUserById,
  } = useChatStore();

  const displayedMessage = useMemo(() => {
    const isForwarded = mostRecentMessage?.isForwarded;

    if (isForwarded) {
      return "Forwarded message...";
    }

    const justImage = mostRecentMessage?.image && !mostRecentMessage?.text;
    if (justImage) {
      return "Image...";
    }

    return mostRecentMessage?.text || "No message available";
  }, [
    mostRecentMessage?.image,
    mostRecentMessage?.isForwarded,
    mostRecentMessage?.text,
  ]);

  const shouldFetchMessages = useMemo(() => {
    const userMessages = usersWithMessages.find(
      (user) => user._id === _id
    )?.messagesData;
    if (!userMessages) return true;
    return false;
  }, [_id, usersWithMessages]);

  const handleFetchMessages = useCallback(async () => {
    if (areMessagesLoading) return;
    try {
      setAreMessagesLoading(true);
      const res = await getMessagesService({
        limit: MESSAGES_LIMIT,
        page: 1,
        receiverId: _id,
      });

      handleSetChatMessages(res, _id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setAreMessagesLoading(false);
    }
  }, [_id, areMessagesLoading, handleSetChatMessages]);

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
    handleReturnUserById(_id)?.user?.messagesData?.unreadMessagesCount || 0;

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
