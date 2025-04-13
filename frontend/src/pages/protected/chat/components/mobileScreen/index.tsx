import { useChatStore } from "../../../../../store/useChatStore";
import { IUseChatSideUsersResponse } from "../../hooks/useChatSideUsers";
import ChatAside from "../chatAside";
import ChatMessageContent from "../chatMessageContent";

interface Props {
  chatId: string | null;
  chatSideUsersLogic: IUseChatSideUsersResponse;
}

const MobileScreen = ({ chatId, chatSideUsersLogic }: Props) => {
  const { selectedUser } = useChatStore();

  return (
    <div className="lg:hidden">
      {(!chatId || !selectedUser) && (
        <ChatAside chatSideUsersLogic={chatSideUsersLogic} />
      )}
      {chatId && selectedUser && <ChatMessageContent />}
    </div>
  );
};

export default MobileScreen;
