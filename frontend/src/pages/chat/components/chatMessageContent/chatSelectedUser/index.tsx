import ChatMessageFooter from "../chatMessageFooter";
import ChatMessageHeader from "../chatMessageHeader";
import ChatMessageList from "../chatMessageList";

const ChatSelectedUser = () => {
  return (
    <div className="bg-base-200/50 flex flex-col rounded-2xl overflow-hidden h-full">
      <ChatMessageHeader />
      <ChatMessageList />
      <ChatMessageFooter />
    </div>
  );
};

export default ChatSelectedUser;
