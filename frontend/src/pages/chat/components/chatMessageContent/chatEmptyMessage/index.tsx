import { MessageSquare } from "lucide-react";

interface Props {
  header?: string;
  paragraph?: string;
}

const ChatEmptyMessage = ({
  header = "Welcome to Eming Chat",
  paragraph = "Select a conversation from the sidebar to start chatting",
}: Props) => {
  return (
    <div className="h-full w-full rounded-2xl flex flex-col justify-center bg-base-200/50 items-center">
      <div className="w-[50px] h-[50px] mb-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
        <MessageSquare className="text-primary" />
      </div>
      <h2 className="text-[26px] text-primary font-semibold text-center">
        {header}
      </h2>
      <p className="text-[18px] opacity-50 text-center mb-5">{paragraph}</p>
    </div>
  );
};

export default ChatEmptyMessage;
