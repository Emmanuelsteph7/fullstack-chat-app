import { ChevronDown } from "lucide-react";

interface Props {
  handleScrollToBottom: () => void;
}

const ChatBtnDown = ({ handleScrollToBottom }: Props) => {
  return (
    <button
      onClick={handleScrollToBottom}
      className="absolute top-[-40px] w-[40px] h-[40px] bg-base-300 hover:bg-base-200 duration-200 rounded-xl flex justify-center items-center shadow-lg right-0"
    >
      <ChevronDown />
    </button>
  );
};

export default ChatBtnDown;
