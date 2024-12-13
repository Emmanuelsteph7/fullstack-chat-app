import ChatSideUsers from "./chatSideUsers";
import ChatUserSearch from "./chatUserSearch";

const ChatAside = () => {
  return (
    <aside className="h-full w-[300px] pr-3">
      <ChatUserSearch />
      <ChatSideUsers />
    </aside>
  );
};

export default ChatAside;
