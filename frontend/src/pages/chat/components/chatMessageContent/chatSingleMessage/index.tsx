import { Api } from "../../../../../types";
import cs from "classnames";
import { useAuthStore } from "../../../../../store/useAuthStore";
import Avatar from "../../../../../components/avatar";
import { getInitials } from "../../../../../utils/getInitials";
import { formatTime } from "../../../utils/formatTime";
import { Check, CheckCheck } from "lucide-react";

interface Props {
  message: Api.General.Message;
  receiverUserData: Api.General.User | null;
}

const ChatSingleMessage = ({ message, receiverUserData }: Props) => {
  const { image, text, createdAt, senderId, status } = message;

  const { profileData } = useAuthStore();

  const isSender = senderId === profileData?._id;
  const chatUser = isSender ? profileData : receiverUserData;

  return (
    <div
      className={cs("chat", {
        "chat-end": isSender,
        "chat-start": !isSender,
      })}
    >
      <div className="chat-image avatar">
        <div className="rounded-full">
          <Avatar
            initials={getInitials(chatUser?.name || "")}
            src={chatUser?.profilePic?.url || ""}
            textSize={14}
          />
        </div>
      </div>
      <div className="chat-header text-[12px] opacity-50">{chatUser?.name}</div>
      <div
        className={cs("chat-bubble", {
          "chat-bubble-info": !isSender,
          "": isSender,
        })}
      >
        {image && <img src={image.url} className="max-w-[200px] mb-1" />}
        <span>{text}</span>
      </div>
      <div className="chat-footer flex items-center text-[12px] opacity-50">
        {isSender && (
          <span className="capitalize flex items-center">
            {status} {status === "sent" && <Check size={12} />}{" "}
            {status === "delivered" && <CheckCheck size={12} />}
          </span>
        )}
        <time className="text-xs ml-1 opacity-50">{formatTime(createdAt)}</time>
      </div>
    </div>
  );
};

export default ChatSingleMessage;
