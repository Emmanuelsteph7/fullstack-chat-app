import { useCallback, useEffect, useState } from "react";
import { useChatStore } from "../../../../store/useChatStore";
import { undoMessageDeleteService } from "../../../../services/message-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../utils/resolveAxiosError";

const DeleteUndo = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number>();

  const {
    showUndo,
    handleUpdateShowUndo,
    handleUpdatePendingMessage,
    pendingMessage,
    handleSetSingleChatMessage,
  } = useChatStore();

  const handleStartTimer = useCallback(() => {
    const id = setTimeout(() => {
      handleUpdateShowUndo(false);
      handleUpdatePendingMessage(null);
    }, 4000);
    setTimeoutId(id);
  }, [handleUpdatePendingMessage, handleUpdateShowUndo]);

  const handleStopTimer = () => {
    clearTimeout(timeoutId);
  };

  const handleUndoMessage = async () => {
    try {
      setIsDeleting(true);
      const res = await undoMessageDeleteService({
        messageId: pendingMessage?._id || "",
      });

      if (res) {
        handleSetSingleChatMessage(
          res.data.message,
          pendingMessage?.receiverId || ""
        );
        handleUpdateShowUndo(false);
        handleUpdatePendingMessage(null);
      }
    } catch (error) {
      toast.error(resolveAxiosError(error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (showUndo) {
      handleStartTimer();
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUndo]);

  if (!showUndo) return;

  return (
    <div
      onMouseEnter={handleStopTimer}
      onMouseLeave={handleStartTimer}
      className="fixed flex px-4 py-1 rounded-xl items-center text-[12px] gap-3 bottom-[50px] left-[25px] bg-primary-content"
    >
      <p>Message deleted</p>
      <button
        type="button"
        onClick={handleUndoMessage}
        disabled={isDeleting}
        className="bg-base-content text-primary-content px-3 py-0.5 rounded-lg"
      >
        {isDeleting ? "Loading..." : "Undo"}
      </button>
    </div>
  );
};

export default DeleteUndo;
