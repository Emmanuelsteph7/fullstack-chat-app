import { useCallback, useEffect, useRef, useState } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { getMessageUsersService } from "../../../services/message-service";
import { USERS_LIMIT } from "../constants";
import { Api } from "../../../types";

export interface IUseChatSideUsersResponse {
  users: Api.General.User[];
  areUsersLoading: boolean;
  messageUsersData: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    users: Api.General.User[];
  } | null;
  observerRef: React.RefObject<HTMLDivElement>;
}

const useChatSideUsers = (): IUseChatSideUsersResponse => {
  const [areUsersLoading, setAreUsersLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const { messageUsersData, handleSetMessagesUsers } = useChatStore();

  const handleFetchMessageUsers = useCallback(async () => {
    if (areUsersLoading || (messageUsersData && !messageUsersData?.hasNextPage))
      return;

    try {
      setAreUsersLoading(true);
      const res = await getMessageUsersService({
        limit: USERS_LIMIT,
        page: (messageUsersData?.currentPage || 0) + 1,
      });

      handleSetMessagesUsers(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setAreUsersLoading(false);
    }
  }, [handleSetMessagesUsers, areUsersLoading, messageUsersData]);

  const handleInfiniteScroll = useCallback(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && messageUsersData?.hasNextPage) {
            handleFetchMessageUsers();
          }
        },
        { threshold: 1.0 }
      );

      if (observerRef.current) observer.observe(observerRef.current);

      return () => observer.disconnect();
    }
  }, [handleFetchMessageUsers, messageUsersData?.hasNextPage]);

  useEffect(() => {
    handleFetchMessageUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return handleInfiniteScroll();
  }, [handleInfiniteScroll, messageUsersData?.hasNextPage]);

  const users = messageUsersData?.users || [];

  return { users, areUsersLoading, messageUsersData, observerRef };
};

export default useChatSideUsers;
