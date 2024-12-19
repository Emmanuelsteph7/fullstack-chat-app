import { useSearchParams } from "react-router-dom";
import Avatar from "../../../../../components/avatar";
import { useChatStore } from "../../../../../store/useChatStore";
import { Api } from "../../../../../types";
import { getInitials } from "../../../../../utils/getInitials";
import cs from "classnames";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { ChevronRight } from "lucide-react";

interface Props {
  user: Api.General.User;
}

export const CHAT_QUERY_KEY = "id";

const ChatUserItem = ({ user }: Props) => {
  const { name, profilePic, _id } = user;

  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSelectedUser, selectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const handleClick = () => {
    handleSelectedUser(user);
    searchParams.set(CHAT_QUERY_KEY, user._id);
    setSearchParams(searchParams);
  };

  const initials = getInitials(name);
  const isSelected = _id === selectedUser?._id;
  const isOnline = onlineUsers.includes(_id);
  const isUserTyping = typingUsers.includes(_id);

  const msg = "This is a message from john doe about the football match";
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cs(
        "flex w-full justify-between focus:outline-2 gap-2 border-b border-primary/10 focus:outline-primary px-3 py-2 rounded-lg items-center",
        {
          "bg-primary/10 hover:bg-primary/10": isSelected,
          "hover:bg-primary/5": !isSelected,
        }
      )}
    >
      <div className="relative">
        <Avatar
          initials={initials}
          size={50}
          textSize={25}
          src={profilePic?.url || ""}
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 bg-success w-3 h-3 rounded-full" />
        )}
      </div>
      <div className="w-[calc(100%-100px)] lg:w-[calc(100%-60px)]">
        <h6 className="font-semibold text-[16px] text-left capitalize">
          {name}
        </h6>
        <p className="truncate text-[12px] w-full text-left" title={msg}>
          {isUserTyping && <span className="text-primary">Typing...</span>}
          {!isUserTyping && msg}
        </p>
      </div>
      <div className="ml-3">
        <ChevronRight />
      </div>
    </button>
  );
};

export default ChatUserItem;
