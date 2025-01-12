import useChatMessageList from "../../../hooks/useChatMessageList";
import ChatMessageFooter from "../chatMessageFooter";
import ChatMessageHeader from "../chatMessageHeader";
import ChatMessageList from "../chatMessageList";

const ChatSelectedUser = () => {
  const chatMessageListResponse = useChatMessageList();
  const { showArrowBtn, handleScrollToBottom } = chatMessageListResponse;
  return (
    <div className="bg-base-200/50 flex flex-col rounded-2xl overflow-hidden h-[calc(100vh-100px)] lg:h-full">
      <ChatMessageHeader />
      <ChatMessageList chatMessageListResponse={chatMessageListResponse} />
      <ChatMessageFooter
        showArrowBtn={showArrowBtn}
        handleScrollToBottom={handleScrollToBottom}
      />
    </div>
  );
};

export default ChatSelectedUser;
