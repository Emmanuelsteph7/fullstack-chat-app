import { useChatStore } from "../../../../../store/useChatStore";
import ChatEmptyMessage from "./chatEmptyMessage";
import ChatSelectedUser from "./chatSelectedUser";

const ChatMessageContent = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="lg:flex-1">
      {!selectedUser && <ChatEmptyMessage />}
      {selectedUser && <ChatSelectedUser />}
    </div>
  );
};

export default ChatMessageContent;
