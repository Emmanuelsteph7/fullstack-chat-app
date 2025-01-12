import ChatUserItem from "../chatUserItem";
import ChatUserItemLoader from "../chatUserItemLoader";
import { MessageSquare } from "lucide-react";
import { IUseChatSideUsersResponse } from "../../../hooks/useChatSideUsers";

interface Props {
  chatSideUsersLogic: IUseChatSideUsersResponse;
}

const ChatSideUsers = ({ chatSideUsersLogic }: Props) => {
  const { users, areUsersLoading, messageUsersData, observerRef } =
    chatSideUsersLogic;

  return (
    <div className="flex lg:overflow-y-auto h-[calc(100%-75px)] flex-col gap-1">
      {users.length ? (
        <>
          {users.map((user) => (
            <ChatUserItem key={user._id} user={user} />
          ))}
        </>
      ) : null}
      {areUsersLoading && (
        <>
          {[...Array(5)].map((_, index) => (
            <ChatUserItemLoader key={index} />
          ))}
        </>
      )}

      {!users.length && !areUsersLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-[50px] h-[50px] mb-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
            <MessageSquare className="text-primary" />
          </div>
          <h4>No user found</h4>
        </div>
      ) : null}
      {messageUsersData?.hasNextPage && <div ref={observerRef} />}
    </div>
  );
};

export default ChatSideUsers;
