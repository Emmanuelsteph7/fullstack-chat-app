import { IUseChatSideUsersResponse } from "../../hooks/useChatSideUsers";
import ChatSideUsers from "./chatSideUsers";
import ChatUserSearch from "./chatUserSearch";

interface Props {
  chatSideUsersLogic: IUseChatSideUsersResponse;
}

const ChatAside = ({ chatSideUsersLogic }: Props) => {
  return (
    <aside className="lg:h-full w-full lg:w-[300px] lg:pr-3">
      <ChatUserSearch />
      <ChatSideUsers chatSideUsersLogic={chatSideUsersLogic} />
    </aside>
  );
};

export default ChatAside;
