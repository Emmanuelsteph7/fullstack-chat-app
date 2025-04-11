import cs from "classnames";
import ShareIcon from "../../../../../../assets/svgs/share.svg?react";
import { useRef, useState } from "react";
import Dialog from "../../../../../../components/dialog";
import {
  IUsersWithMessages,
  useChatStore,
} from "../../../../../../store/useChatStore";
import ForwardMessageContent from "../forwardMessageContent";
import { forwardMessageService } from "../../../../../../services/message-service";
import { toast } from "react-toastify";
import { resolveAxiosError } from "../../../../../../utils/resolveAxiosError";
import { Api } from "../../../../../../types";

interface Props {
  isSender: boolean;
  _id: string;
}

const ForwardMessage = ({ isSender, _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<IUsersWithMessages[]>([]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { usersWithMessages, handleSendMessage } = useChatStore();

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleToggleSelectedUsers = (user: IUsersWithMessages) => {
    const userIndex = selectedUsers.findIndex((item) => item._id === user._id);

    if (userIndex > -1) {
      setSelectedUsers((prev) => prev.filter((item) => item._id !== user._id));
    } else {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const handleForwardMessage = async () => {
    try {
      setIsLoading(true);
      console.log(selectedUsers, "selectedUsers");
      console.log(
        selectedUsers.map((user) => user._id),
        "selectedUsers"
      );

      const res = await forwardMessageService({
        receiverIds: selectedUsers.map((user) => user._id),
        messageId: _id,
      });

      if (res) {
        setSelectedUsers([]);
        dialogRef.current?.close();

        const messages = res.data.messages;
        messages.forEach(({ message, receiverId }) => {
          handleSendMessage(
            {
              data: {
                message,
              },
            } as Api.Message.SendMessage.Response,
            receiverId
          );
        });
      }
    } catch (error) {
      toast.error(resolveAxiosError(error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={cs("absolute top-[50%] translate-y-[-50%]", {
          "left-[-60px]": isSender,
          "right-[-60px]": !isSender,
        })}
      >
        <div className="relative">
          <button type="button" onClick={handleDialogOpen}>
            <ShareIcon className="w-[20px] h-[20px] text-base-content" />
          </button>
        </div>
      </div>
      <Dialog ref={dialogRef}>
        <ForwardMessageContent
          handleToggleSelectedUsers={handleToggleSelectedUsers}
          selectedUsers={selectedUsers}
          usersWithMessages={usersWithMessages}
          handleForwardMessage={handleForwardMessage}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};

export default ForwardMessage;
