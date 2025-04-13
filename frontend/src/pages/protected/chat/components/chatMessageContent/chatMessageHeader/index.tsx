import { ChevronLeft, EllipsisVertical, PhoneCall, Search } from "lucide-react";
import { useChatStore } from "../../../../../../store/useChatStore";
import Avatar from "../../../../../../components/avatar";
import { getInitials } from "../../../../../../utils/getInitials";
import { useAuthStore } from "../../../../../../store/useAuthStore";
import { useSearchParams } from "react-router-dom";
import { CHAT_QUERY_KEY } from "../../../constants";
import cs from "classnames";

const ChatMessageHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const { typingUsers } = useChatStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGoBack = () => {
    searchParams.delete(CHAT_QUERY_KEY);
    setSearchParams(searchParams);
  };

  const isOnline = onlineUsers.includes(selectedUser?._id || "");
  const initials = getInitials(selectedUser?.name);
  const isUserTyping = typingUsers?.includes(selectedUser?._id || "");
  return (
    <div className="flex items-center shadow shadow-base-200 px-2 lg:px-10 pt-2 bg-base-200/50 pb-5 justify-between">
      <div className="flex items-center gap-3">
        <button onClick={handleGoBack} className="lg:hidden">
          <ChevronLeft />
        </button>
        <div className="relative">
          <Avatar
            size={30}
            initials={initials}
            src={selectedUser?.profilePic?.url || ""}
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 bg-success w-3 h-3 rounded-full" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="capitalize text-[16px] lg:text-[26px] font-semibold">
            {selectedUser?.name}
          </h3>
          <p
            className={cs("text-[12px] opacity-60", {
              italic: isUserTyping,
            })}
          >
            {isUserTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 lg:gap-5">
        <button className="focus:outline focus:outline-primary/30 p-1 rounded">
          <Search size={20} className="text-primary" />
        </button>
        <button className="focus:outline focus:outline-primary/30 p-1 rounded">
          <PhoneCall size={20} className="text-primary" />
        </button>
        <button className="focus:outline focus:outline-primary/30 p-1 rounded">
          <EllipsisVertical size={20} className="text-primary" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessageHeader;
