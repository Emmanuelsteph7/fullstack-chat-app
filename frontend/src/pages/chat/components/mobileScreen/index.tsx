import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../../store/useChatStore";
import { CHAT_QUERY_KEY } from "../chatAside/chatUserItem";
import { useEffect } from "react";
import ChatAside from "../chatAside";
import ChatMessageContent from "../chatMessageContent";

const MobileScreen = () => {
  const [searchParams] = useSearchParams();

  const { handleSelectedUserById, selectedUser, messageUsers } = useChatStore();

  const chatId = searchParams.get(CHAT_QUERY_KEY);

  useEffect(() => {
    if (selectedUser || !chatId) return;

    handleSelectedUserById(chatId);
  }, [handleSelectedUserById, chatId, selectedUser, messageUsers]);

  return (
    <div className="lg:hidden">
      {!chatId && <ChatAside />}
      {chatId && <ChatMessageContent />}
    </div>
  );
};

export default MobileScreen;
