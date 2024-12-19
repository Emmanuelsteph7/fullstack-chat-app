import { ImagePlus, LoaderCircle, Minus, Send } from "lucide-react";
import FormInput from "../../../../../components/formInput";
import { useState } from "react";
import { useChatStore } from "../../../../../store/useChatStore";
import { useSearchParams } from "react-router-dom";
import { CHAT_QUERY_KEY } from "../../chatAside/chatUserItem";
import { resolveFileReader } from "../../../../../utils/resolveFileReader";
import { useSocketStore } from "../../../../../store/useSocketStore";
import cs from "classnames";

const ChatMessageFooter = () => {
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const [searchParams] = useSearchParams();
  const { sendMessage, isSendMessageLoading, selectedUser, typingUsers } =
    useChatStore();
  const { emitTypingEvent, emitTypingStopEvent } = useSocketStore();

  const receiverId = searchParams.get(CHAT_QUERY_KEY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMessage(value);

    if (value) {
      emitTypingEvent();
    } else {
      emitTypingStopEvent();
    }
  };

  const handleBlur = () => {
    emitTypingStopEvent();
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    resolveFileReader(file, (base64String) => {
      setImageBase64(base64String);
    });
  };

  const handleRemoveImage = () => {
    setImageBase64("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendMessage({
        receiverId: receiverId || selectedUser?._id || "",
        image: imageBase64,
        text: message.trim(),
      });

      setImageBase64("");
      setMessage("");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {}
  };

  const isUserTyping = typingUsers.includes(selectedUser?._id || "");

  return (
    <div
      className={cs("pt-3 px-2 lg:px-10 bg-base-200/50", {
        "opacity-60": isSendMessageLoading,
      })}
    >
      {isUserTyping && (
        <p className="text-[12px] text-primary mb-1">
          {selectedUser?.name} Typing...
        </p>
      )}
      {isSendMessageLoading && (
        <div className="flex items-center text-primary gap-2">
          <span className="text-[12px]">Sending...</span>{" "}
          <LoaderCircle className="animate-spin" size={14} />
        </div>
      )}
      {imageBase64 && (
        <div className="relative bg-primary-content/10 rounded-2xl w-[100px] h-[100px]">
          <button
            onClick={handleRemoveImage}
            className="w-[20px] absolute rounded top-0 right-[-5px] h-[20px] bg-error text-white flex items-center justify-center"
          >
            <Minus />
          </button>
          <img src={imageBase64} className="w-[100px] h-[100px]" />
        </div>
      )}
      <form
        className="flex py-1 pb-3 items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <FormInput
            name="message"
            removeMargin
            placeholder="Type a message..."
            onChange={handleChange}
            value={message}
            onBlur={handleBlur}
          />
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            onChange={handleSelectImage}
            accept="image/*"
            className="hidden"
          />
          <ImagePlus />
        </label>
        <button disabled={isSendMessageLoading} type="submit">
          <Send />
        </button>
      </form>
    </div>
  );
};

export default ChatMessageFooter;
