import { EllipsisVertical, PhoneCall, Search } from "lucide-react";
import { useChatStore } from "../../../../../store/useChatStore";
import Avatar from "../../../../../components/avatar";
import { getInitials } from "../../../../../utils/getInitials";
import { useAuthStore } from "../../../../../store/useAuthStore";

const ChatMessageHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser?._id || "");

  const initials = getInitials(selectedUser?.name);
  return (
    <div className="flex items-center px-10 pt-2 pb-5 justify-between">
      <div className="flex items-center gap-3">
        <Avatar
          size={35}
          initials={initials}
          src={selectedUser?.profilePic?.url || ""}
        />
        <div>
          <h3 className="capitalize text-[26px] font-semibold">
            {selectedUser?.name}
          </h3>
          <p className="text-[12px]">{isOnline ? "Online" : ""}</p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="focus:outline focus:outline-primary/30 p-1 rounded">
          <Search className="text-primary" />
        </button>
        <button className="focus:outline focus:outline-primary/30 p-1 rounded">
          <PhoneCall className="text-primary" />
        </button>
        <button className="focus:outline focus:outline-primary/30 p-1 rounded">
          <EllipsisVertical className="text-primary" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessageHeader;
