import Loader from "../../../../../components/loader";
import ChatEmptyMessage from "../chatEmptyMessage";
import ChatGroupedMessages from "../chatGroupedMessages";
import { IUseChatMessageListResponse } from "../../../hooks/useChatMessageList";
import { MESSAGE_BOTTOM_ID } from "../../../constants";

interface Props {
  chatMessageListResponse: IUseChatMessageListResponse;
}

const ChatMessageList = ({ chatMessageListResponse }: Props) => {
  const {
    areMessagesLoading,
    groupedMessages,
    messageBottomRef,
    messageListRef,
    receiverUserData,
  } = chatMessageListResponse;

  return (
    <div
      ref={messageListRef}
      className="flex-1 px-2 lg:px-10 py-5 relative overflow-y-auto"
    >
      {groupedMessages.length ? (
        <div>
          {areMessagesLoading && (
            <div>
              <Loader />
            </div>
          )}
          {groupedMessages.map((grouped) => (
            <ChatGroupedMessages
              key={grouped.date}
              receiverUserData={receiverUserData}
              grouped={grouped}
            />
          ))}
          <div id={MESSAGE_BOTTOM_ID} ref={messageBottomRef} />
        </div>
      ) : null}
      {!groupedMessages.length && areMessagesLoading && (
        <div className="py-20 flex items-center justify-center w-full h-full bg-base-100/50 z-[2] top-0">
          <div className="sticky top-0 h-full">
            <Loader />
          </div>
        </div>
      )}
      {!areMessagesLoading && !groupedMessages.length && (
        <ChatEmptyMessage
          header="No message yet"
          paragraph="Start a conversation by saying hi"
        />
      )}
    </div>
  );
};

export default ChatMessageList;
