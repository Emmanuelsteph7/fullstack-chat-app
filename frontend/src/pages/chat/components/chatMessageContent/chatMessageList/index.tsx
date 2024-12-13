import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../../../store/useChatStore";
import ChatSingleMessage from "../chatSingleMessage";
import { useEffect } from "react";
import { CHAT_QUERY_KEY } from "../../chatAside/chatUserItem";
import Loader from "../../../../../components/loader";
import ChatEmptyMessage from "../chatEmptyMessage";

const ChatMessageList = () => {
  const [searchParams] = useSearchParams();
  const { messages, getMessages, isMessagesLoading } = useChatStore();

  const receiverId = searchParams.get(CHAT_QUERY_KEY);

  useEffect(() => {
    if (receiverId) {
      getMessages({ receiverId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  return (
    <div className="flex-1 px-10 relative overflow-y-auto">
      {isMessagesLoading && (
        <div className="py-20 flex items-center justify-center w-full h-full bg-base-100/50 z-[2] top-0">
          <div className="sticky top-0 h-full">
            <Loader />
          </div>
        </div>
      )}
      {!isMessagesLoading && (
        <>
          {messages.length ? (
            messages.map((message) => (
              <ChatSingleMessage key={message._id} message={message} />
            ))
          ) : (
            <ChatEmptyMessage
              header="No message yet"
              paragraph="Start a conversation by saying hi"
            />
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessageList;
