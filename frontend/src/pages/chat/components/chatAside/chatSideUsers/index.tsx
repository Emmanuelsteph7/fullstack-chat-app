import { useEffect } from "react";
import { useChatStore } from "../../../../../store/useChatStore";
import ChatUserItem from "../chatUserItem";
import ChatUserItemLoader from "../chatUserItemLoader";
import { MessageSquare } from "lucide-react";

const ChatSideUsers = () => {
  const { getMessageUsers, isMessageUsersLoading, messageUsers } =
    useChatStore();

  useEffect(() => {
    getMessageUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex overflow-y-auto h-[calc(100%-75px)] flex-col gap-1">
      {isMessageUsersLoading && (
        <>
          {[...Array(5)].map((_, index) => (
            <ChatUserItemLoader key={index} />
          ))}
        </>
      )}
      {!isMessageUsersLoading && (
        <>
          {messageUsers.length ? (
            messageUsers.map((user) => (
              <ChatUserItem key={user._id} user={user} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-[50px] h-[50px] mb-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <MessageSquare className="text-primary" />
              </div>
              <h4>No user found</h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatSideUsers;
