import useMedia from "../../../../hooks/useMedia";
import useChatSideUsers from "../../hooks/useChatSideUsers";
import useLoadUserFromQuery from "../../hooks/useLoadUserFromQuery";
import useSocketSubscribe from "../../hooks/useSocketSubscribe";
import DashboardScreen from "../dashboardScreen";
import MobileScreen from "../mobileScreen";

const ChatContent = () => {
  const { isMobile, isDesktop, isTablet } = useMedia();

  useSocketSubscribe();
  const { chatId } = useLoadUserFromQuery();
  const chatSideUsersLogic = useChatSideUsers();

  return (
    <>
      {isDesktop && <DashboardScreen chatSideUsersLogic={chatSideUsersLogic} />}
      {(isMobile || isTablet) && (
        <MobileScreen chatId={chatId} chatSideUsersLogic={chatSideUsersLogic} />
      )}
    </>
  );
};

export default ChatContent;
