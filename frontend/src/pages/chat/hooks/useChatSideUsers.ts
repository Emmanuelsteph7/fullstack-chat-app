import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  IUsersListProperties,
  IUsersWithMessages,
  useChatStore,
} from "../../../store/useChatStore";
import { getMessageUsersService } from "../../../services/message-service";
import { USERS_LIMIT } from "../constants";

export interface IUseChatSideUsersResponse {
  users: IUsersWithMessages[];
  areUsersLoading: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
  usersListProperties: IUsersListProperties | null;
}

const useChatSideUsers = (): IUseChatSideUsersResponse => {
  const [areUsersLoading, setAreUsersLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  const { usersListProperties, handleSetChatUsers, usersWithMessages } =
    useChatStore();

  const users = useMemo(() => {
    return usersWithMessages || [];
  }, [usersWithMessages]);

  const handleFetchMessageUsers = useCallback(async () => {
    if (
      areUsersLoading ||
      (usersListProperties && !usersListProperties?.hasNextPage)
    )
      return;

    try {
      setAreUsersLoading(true);
      const res = await getMessageUsersService({
        limit: USERS_LIMIT,
        page: (usersListProperties?.currentPage || 0) + 1,
      });

      handleSetChatUsers(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setAreUsersLoading(false);
    }
  }, [areUsersLoading, usersListProperties, handleSetChatUsers]);

  const handleInfiniteScroll = useCallback(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && usersListProperties?.hasNextPage) {
            handleFetchMessageUsers();
          }
        },
        { threshold: 1.0 }
      );

      if (observerRef.current) observer.observe(observerRef.current);

      return () => observer.disconnect();
    }
  }, [handleFetchMessageUsers, usersListProperties?.hasNextPage]);

  useEffect(() => {
    handleFetchMessageUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return handleInfiniteScroll();
  }, [handleInfiniteScroll, usersListProperties?.hasNextPage]);

  return { users, areUsersLoading, usersListProperties, observerRef };
};

export default useChatSideUsers;
