import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../../../store/useChatStore";
import ChatSingleMessage from "../chatSingleMessage";
import { useEffect, useRef } from "react";
import { CHAT_QUERY_KEY } from "../../chatAside/chatUserItem";
import Loader from "../../../../../components/loader";
import ChatEmptyMessage from "../chatEmptyMessage";

const ChatMessageList = () => {
  const messageBottomRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const receiverId = searchParams.get(CHAT_QUERY_KEY);

  useEffect(() => {
    if (messageBottomRef?.current && messages.length) {
      messageBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (receiverId) {
      getMessages({ receiverId });
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [getMessages, receiverId, subscribeToMessages, unsubscribeFromMessages]);

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
            <div>
              {messages.map((message) => (
                <ChatSingleMessage key={message._id} message={message} />
              ))}
              <div ref={messageBottomRef} />
            </div>
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
