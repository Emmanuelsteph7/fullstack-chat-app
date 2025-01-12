import ChatMessageContent from "../chatMessageContent";
import ChatAside from "../chatAside";
import { IUseChatSideUsersResponse } from "../../hooks/useChatSideUsers";

interface Props {
  chatSideUsersLogic: IUseChatSideUsersResponse;
}

const DashboardScreen = ({ chatSideUsersLogic }: Props) => {
  return (
    <div className="hidden lg:flex h-[calc(100vh-115px)]">
      <ChatAside chatSideUsersLogic={chatSideUsersLogic} />
      <ChatMessageContent />
    </div>
  );
};

export default DashboardScreen;
