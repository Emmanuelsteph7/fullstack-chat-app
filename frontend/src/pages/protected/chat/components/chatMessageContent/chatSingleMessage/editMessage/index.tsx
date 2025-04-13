import { useEffect, useRef, useState } from "react";
import Dialog from "../../../../../../../components/dialog";
import { useChatStore } from "../../../../../../../store/useChatStore";
import FormInput from "../../../../../../../components/formInput";
import { useSocketStore } from "../../../../../../../store/useSocketStore";
import Button from "../../../../../../../components/button";
import { Api } from "../../../../../../../types";
import { editMessageService } from "../../../../../../../services/message-service";

interface Props {
  message: Api.General.Message;
}

const EditMessage = ({ message }: Props) => {
  const [messageText, setMessageText] = useState("");
  const [isSendMessageLoading, setIsSendMessageLoading] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { handleSendMessage } = useChatStore();
  const { emitTypingEvent, emitTypingStopEvent } = useSocketStore();

  useEffect(() => {
    if (message?.text) {
      setMessageText(message.text);
    }
  }, [message?.text]);

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMessageText(value);

    if (value) {
      emitTypingEvent();
    } else {
      emitTypingStopEvent();
    }
  };

  const handleBlur = () => {
    emitTypingStopEvent();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    try {
      setIsSendMessageLoading(true);
      const res = await editMessageService({
        receiverId: message.receiverId,
        messageId: message._id,
        text: messageText.trim(),
      });

      setMessageText("");
      handleSendMessage(res, message.receiverId);

      dialogRef.current?.close();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setIsSendMessageLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleDialogOpen} type="button">
        Edit
      </button>
      <Dialog ref={dialogRef}>
        <h3 className="text-[24px] font-semibold">Edit Message</h3>
        <form onSubmit={handleSubmit} className="mt-10">
          <FormInput
            name="message"
            removeMargin
            placeholder="Type a message..."
            onChange={handleChange}
            value={messageText}
            onBlur={handleBlur}
            autoComplete="off"
            autoFocus
            disabled={isSendMessageLoading}
          />
          <div className="flex justify-end mt-10">
            <Button
              label={isSendMessageLoading ? "Loading..." : "Edit"}
              type="submit"
              disabled={isSendMessageLoading}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default EditMessage;
