import { Api } from "../../../../../types";
import cs from "classnames";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { useChatStore } from "../../../../../store/useChatStore";
import Avatar from "../../../../../components/avatar";
import { getInitials } from "../../../../../utils/getInitials";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  message: Api.General.Message;
}

const ChatSingleMessage = ({ message }: Props) => {
  const { image, text, createdAt, senderId } = message;

  const { profileData } = useAuthStore();
  const { selectedUser } = useChatStore();

  const isSender = senderId === profileData?._id;
  const chatUser = isSender ? profileData : selectedUser;

  return (
    <div
      className={cs("chat", {
        "chat-end": isSender,
        "chat-start": !isSender,
      })}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Avatar
            initials={getInitials(chatUser?.name || "")}
            src={chatUser?.profilePic?.url || ""}
          />
        </div>
      </div>
      <div className="chat-header">
        {chatUser?.name}
        <time className="text-xs ml-1 opacity-50">{formatDate(createdAt)}</time>
      </div>
      <div className="chat-bubble">
        {image && <img src={image.url} className="max-w-[200px]" />}
        <span>{text}</span>
      </div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};

export default ChatSingleMessage;
