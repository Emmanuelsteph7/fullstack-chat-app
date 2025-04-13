import { Api } from "../../../../../../types";
import cs from "classnames";
import { useAuthStore } from "../../../../../../store/useAuthStore";
import Avatar from "../../../../../../components/avatar";
import { getInitials } from "../../../../../../utils/getInitials";
import { formatTime } from "../../../utils/formatTime";
import { Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import MiniEmojiPicker from "./miniEmojiPicker";
import {
  addMessageReactionService,
  deleteMessageService,
} from "../../../../../../services/message-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../../../utils/resolveAxiosError";
import { useChatStore } from "../../../../../../store/useChatStore";
import ChatMessageDropdown from "./chatMessageDropdown";
import DeletedMessage from "./deletedMessage";
import ForwardMessage from "./forwardMessage";

interface Props {
  message: Api.General.Message;
  receiverUserData: Api.General.User | null;
}

const ChatSingleMessage = ({ message, receiverUserData }: Props) => {
  const {
    image,
    text,
    createdAt,
    senderId,
    status,
    _id,
    reactions,
    isDeleted,
    isEdited,
    isForwarded,
  } = message;

  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { profileData } = useAuthStore();
  const {
    handleSetSingleChatMessage,
    handleUpdateShowUndo,
    handleUpdatePendingMessage,
  } = useChatStore();

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

  const handleDeleteMessage = async () => {
    try {
      setIsDeleting(true);

      const res = await deleteMessageService({ messageId: _id });

      if (res) {
        handleSetSingleChatMessage(
          res.data.message,
          receiverUserData?._id || ""
        );
        handleUpdateShowUndo(true);
        handleUpdatePendingMessage(res.data.message);
      }
    } catch (error) {
      toast.error(resolveAxiosError(error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleted) {
    return <DeletedMessage isSender={isSender} />;
  }

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
      <div className="chat-header z-[2] relative flex items-center gap-3 justify-between opacity-50">
        <span className="text-[10px]">{chatUser?.name}</span>
        {isHovered && isSender && (
          <ChatMessageDropdown
            isSender={isSender}
            handleDeleteMessage={handleDeleteMessage}
            message={message}
            isDeleting={isDeleting}
          />
        )}
      </div>
      <div
        className={cs("chat-bubble relative", {
          "chat-bubble-info": !isSender,
          "": isSender,
        })}
      >
        {isHovered && (
          <>
            <ForwardMessage isSender={isSender} _id={_id} />
            <MiniEmojiPicker
              handleEmojiUpdate={handleEmojiUpdate}
              isSender={isSender}
            />
          </>
        )}
        {reactions.length ? (
          <div
            className={cs("absolute bottom-[-8px] flex items-center gap-1", {
              "right-0": isSender,
              "left-0": !isSender,
            })}
          >
            {reactions.map((item) => (
              <div key={item._id} className="text-[14px]">
                {item.emoji}
              </div>
            ))}
          </div>
        ) : null}
        {isForwarded && (
          <div>
            <p className="italic text-[10px]">Forwarded message</p>
          </div>
        )}
        {image && <img src={image.url} className="max-w-[200px] mb-1" />}
        <span>{text}</span>
      </div>
      <div className="chat-footer flex items-center text-[12px] opacity-50">
        {isEdited && (
          <span
            className={cs("capitalize flex items-center mr-2", {
              "text-primary": status === "read",
            })}
          >
            Edited
          </span>
        )}
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
