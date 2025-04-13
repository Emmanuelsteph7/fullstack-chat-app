import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../../store/useChatStore";
import { useSocketStore } from "../../../../store/useSocketStore";
import { CHAT_QUERY_KEY, MESSAGE_BOTTOM_ID } from "../constants";
import { resolveFileReader } from "../../../../utils/resolveFileReader";
import { sendMessageService } from "../../../../services/message-service";

const useChatMessageFooter = () => {
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [isSendMessageLoading, setIsSendMessageLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const { handleSendMessage, selectedUser, typingUsers } = useChatStore();
  const { emitTypingEvent, emitTypingStopEvent } = useSocketStore();

  const receiverId =
    searchParams.get(CHAT_QUERY_KEY) || selectedUser?._id || "";

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

    if (!imageBase64 && !message.trim()) return;

    try {
      setIsSendMessageLoading(true);
      const res = await sendMessageService({
        receiverId,
        image: imageBase64,
        text: message.trim(),
      });

      setImageBase64("");
      setMessage("");
      handleSendMessage(res, receiverId);

      setTimeout(() => {
        const messageBottom = document.querySelector(`#${MESSAGE_BOTTOM_ID}`);
        messageBottom?.scrollIntoView({ behavior: "smooth" });
      }, 500);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setIsSendMessageLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (data: any) => {
    const emoji = data?.native;

    setMessage((prev) => prev + emoji);
  };

  const isUserTyping = typingUsers?.includes(selectedUser?._id || "");

  return {
    isUserTyping,
    handleBlur,
    handleChange,
    handleRemoveImage,
    handleSelectImage,
    handleSubmit,
    isSendMessageLoading,
    selectedUser,
    imageBase64,
    message,
    handleEmojiSelect,
  };
};

export default useChatMessageFooter;
