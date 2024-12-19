import ChatSideUsers from "./chatSideUsers";
import ChatUserSearch from "./chatUserSearch";

const ChatAside = () => {
  return (
    <aside className="lg:h-full w-full lg:w-[300px] lg:pr-3">
      <ChatUserSearch />
      <ChatSideUsers />
    </aside>
  );
};

export default ChatAside;
