import { useEffect } from "react";
import { useChatStore } from "../../../../store/useChatStore";
import ChatEmptyMessage from "./chatEmptyMessage";
import ChatSelectedUser from "./chatSelectedUser";
import { useSocketStore } from "../../../../store/useSocketStore";

const ChatMessageContent = () => {
  const { selectedUser } = useChatStore();
  const { socketSubscriptions, unsubscribeFromSocket, socket } =
    useSocketStore();

  useEffect(() => {
    socketSubscriptions();

    return () => unsubscribeFromSocket();
  }, [socketSubscriptions, socket?.connected, unsubscribeFromSocket]);

  return (
    <div className="lg:flex-1">
      {!selectedUser && <ChatEmptyMessage />}
      {selectedUser && <ChatSelectedUser />}
    </div>
  );
};

export default ChatMessageContent;
