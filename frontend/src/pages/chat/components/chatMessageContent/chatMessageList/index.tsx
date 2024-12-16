import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../../../store/useChatStore";
import { useEffect, useMemo, useRef } from "react";
import { CHAT_QUERY_KEY } from "../../chatAside/chatUserItem";
import Loader from "../../../../../components/loader";
import ChatEmptyMessage from "../chatEmptyMessage";
import { groupMessagesByDate } from "../../../utils/groupMessagesByDate";
import ChatGroupedMessages from "../chatGroupedMessages";

const ChatMessageList = () => {
  const messageBottomRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const { messages, getMessages, isMessagesLoading } = useChatStore();

  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages]
  );
  const receiverId = searchParams.get(CHAT_QUERY_KEY);

  useEffect(() => {
    if (messageBottomRef?.current && messages.length) {
      messageBottomRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  useEffect(() => {
    if (receiverId) {
      getMessages({ receiverId });
    }
  }, [getMessages, receiverId]);

  return (
    <div className="flex-1 px-10 py-5 relative overflow-y-auto">
      {isMessagesLoading && (
        <div className="py-20 flex items-center justify-center w-full h-full bg-base-100/50 z-[2] top-0">
          <div className="sticky top-0 h-full">
            <Loader />
          </div>
        </div>
      )}
      {!isMessagesLoading && (
        <>
          {groupedMessages.length ? (
            <div>
              {groupedMessages.map((grouped) => (
                <ChatGroupedMessages key={grouped.date} grouped={grouped} />
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
