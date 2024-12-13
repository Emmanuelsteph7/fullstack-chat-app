import ChatMessageContent from "../chatMessageContent";
import ChatAside from "../chatAside";
import { useSearchParams } from "react-router-dom";
import { CHAT_QUERY_KEY } from "../chatAside/chatUserItem";
import { useEffect } from "react";
import { useChatStore } from "../../../../store/useChatStore";

const ChatContent = () => {
  const [searchParams] = useSearchParams();

  const { handleSelectedUserById, selectedUser, messageUsers } = useChatStore();

  const chatId = searchParams.get(CHAT_QUERY_KEY);

  useEffect(() => {
    if (selectedUser || !chatId) return;

    handleSelectedUserById(chatId);
  }, [handleSelectedUserById, chatId, selectedUser, messageUsers]);

  return (
    <div>
      <div className="flex h-[calc(100vh-115px)]">
        <ChatAside />
        <ChatMessageContent />
      </div>
    </div>
  );
};

export default ChatContent;
