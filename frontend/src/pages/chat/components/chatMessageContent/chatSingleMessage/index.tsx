import { Api } from "../../../../../types";
import cs from "classnames";
import { useAuthStore } from "../../../../../store/useAuthStore";
import Avatar from "../../../../../components/avatar";
import { getInitials } from "../../../../../utils/getInitials";
import { formatTime } from "../../../utils/formatTime";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import MiniEmojiPicker from "../miniEmojiPicker";
import { addMessageReactionService } from "../../../../../services/message-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../../utils/resolveAxiosError";
import { useChatStore } from "../../../../../store/useChatStore";

interface Props {
  message: Api.General.Message;
  receiverUserData: Api.General.User | null;
}

const ChatSingleMessage = ({ message, receiverUserData }: Props) => {
  const { image, text, createdAt, senderId, status, _id, reactions } = message;

  const [isHovered, setIsHovered] = useState(false);

  const { profileData } = useAuthStore();
  const { handleSetSingleChatMessage } = useChatStore();

  const isSender = senderId === profileData?._id;
  const chatUser = isSender ? profileData : receiverUserData;

  const handleEmojiUpdate = async (emoji: string) => {
    try {
      const res = await addMessageReactionService({
        receiverId: receiverUserData?._id || "",
        emoji,
        messageId: _id,
      });

      if (res) {
        handleSetSingleChatMessage(
          res.data.message,
          receiverUserData?._id || ""
        );
      }
    } catch (error) {
      toast.error(resolveAxiosError(error).message);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cs("chat relative", {
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
        className={cs("chat-bubble relative", {
          "chat-bubble-info": !isSender,
          "": isSender,
        })}
      >
        {isHovered && (
          <MiniEmojiPicker
            handleEmojiUpdate={handleEmojiUpdate}
            isSender={isSender}
          />
        )}
        {reactions.length ? (
          <div
            className={cs("absolute bottom-[-5px] flex items-center gap-1", {
              "right-0": isSender,
              "left-0": !isSender,
            })}
          >
            {reactions.map((item) => (
              <div key={item._id} className="text-[10px]">
                {item.emoji}
              </div>
            ))}
          </div>
        ) : null}
        {image && <img src={image.url} className="max-w-[200px] mb-1" />}
        <span>{text}</span>
      </div>
      <div className="chat-footer flex items-center text-[12px] opacity-50">
        {isSender && (
          <span
            className={cs("capitalize flex items-center", {
              "text-primary": status === "read",
            })}
          >
            {status} {status === "sent" && <Check size={12} />}{" "}
            {status === "delivered" && <CheckCheck size={12} />}
            {status === "read" && <CheckCheck size={12} />}
          </span>
        )}
        <time className="text-xs ml-1 opacity-50">{formatTime(createdAt)}</time>
      </div>
    </div>
  );
};

export default ChatSingleMessage;
