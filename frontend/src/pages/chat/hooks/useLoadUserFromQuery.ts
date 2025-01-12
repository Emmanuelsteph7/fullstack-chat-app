import { useSearchParams } from "react-router-dom";
import { useChatStore } from "../../../store/useChatStore";
import { useEffect } from "react";
import { CHAT_QUERY_KEY } from "../constants";

const useLoadUserFromQuery = () => {
  const [searchParams] = useSearchParams();

  const { handleSelectedUserById, selectedUser, messageUsersData } =
    useChatStore();

  const chatId = searchParams.get(CHAT_QUERY_KEY);

  useEffect(() => {
    if (selectedUser || !chatId) return;

    handleSelectedUserById(chatId);
  }, [handleSelectedUserById, chatId, selectedUser, messageUsersData]);

  return { chatId };
};

export default useLoadUserFromQuery;
