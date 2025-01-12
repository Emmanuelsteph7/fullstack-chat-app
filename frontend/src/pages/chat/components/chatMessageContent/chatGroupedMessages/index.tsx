import { Api } from "../../../../../types";
import { IGroupedMessage } from "../../../utils/groupMessagesByDate";
import ChatSingleMessage from "../chatSingleMessage";

interface Props {
  grouped: IGroupedMessage;
  receiverUserData: Api.General.User | null;
}

const ChatGroupedMessages = ({ grouped, receiverUserData }: Props) => {
  const { date, messages } = grouped;
  return (
    <div>
      <h6 className="py-2 px-5 bg-primary text-white w-max rounded-2xl capitalize mx-auto">
        {date}
      </h6>
      {messages.map((message) => (
        <ChatSingleMessage
          key={message._id}
          receiverUserData={receiverUserData}
          message={message}
        />
      ))}
    </div>
  );
};

export default ChatGroupedMessages;
