import { ImagePlus, LoaderCircle, Minus, Send } from "lucide-react";
import FormInput from "../../../../../components/formInput";
import cs from "classnames";
import useChatMessageFooter from "../../../hooks/useChatMessageFooter";
import ChatBtnDown from "../chatBtnDown";

interface Props {
  showArrowBtn: boolean;
  handleScrollToBottom: () => void;
}

const ChatMessageFooter = ({ showArrowBtn, handleScrollToBottom }: Props) => {
  const {
    handleBlur,
    handleChange,
    handleRemoveImage,
    handleSelectImage,
    handleSubmit,
    isSendMessageLoading,
    isUserTyping,
    selectedUser,
    imageBase64,
    message,
  } = useChatMessageFooter();

  return (
    <div className="relative">
      {showArrowBtn && (
        <ChatBtnDown handleScrollToBottom={handleScrollToBottom} />
      )}
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
    </div>
  );
};

export default ChatMessageFooter;
