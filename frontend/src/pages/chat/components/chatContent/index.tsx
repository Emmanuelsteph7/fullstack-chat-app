import { useEffect } from "react";
import useMedia from "../../../../hooks/useMedia";
import { useSocketStore } from "../../../../store/useSocketStore";
import useChatSideUsers from "../../hooks/useChatSideUsers";
import useLoadUserFromQuery from "../../hooks/useLoadUserFromQuery";
import useSocketSubscribe from "../../hooks/useSocketSubscribe";
import DashboardScreen from "../dashboardScreen";
import MobileScreen from "../mobileScreen";
import { useChatStore } from "../../../../store/useChatStore";
import DeleteUndo from "../deleteUndo";

const ChatContent = () => {
  const { isMobile, isDesktop, isTablet } = useMedia();

  useSocketSubscribe();
  const { chatId } = useLoadUserFromQuery();
  const chatSideUsersLogic = useChatSideUsers();

  const { selectedUser, handleClearSelectedUser } = useChatStore();
  const { emitEnterRoom, emitLeaveRoom } = useSocketStore();

  useEffect(() => {
    if (!chatId) {
      handleClearSelectedUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (selectedUser && chatId) {
      emitEnterRoom(chatId);
    } else {
      emitLeaveRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, chatId]);

  return (
    <>
      {isDesktop && <DashboardScreen chatSideUsersLogic={chatSideUsersLogic} />}
      {(isMobile || isTablet) && (
        <MobileScreen chatId={chatId} chatSideUsersLogic={chatSideUsersLogic} />
      )}
      <DeleteUndo />
    </>
  );
};

export default ChatContent;
