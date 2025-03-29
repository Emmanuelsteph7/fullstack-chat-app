import { IUsersWithMessages } from "../store/useChatStore";
import { Api } from "../types";

export const mergeUserArrays = (
  oldArray: IUsersWithMessages[],
  newArray: Api.General.User[]
): IUsersWithMessages[] => {
  // Convert oldArray to a Map for quick lookup by id
  const oldMap = new Map(oldArray.map((user) => [user._id, user]));

  // Merge newArray into oldMap, keeping existing messages
  newArray.forEach((user) => {
    if (oldMap.has(user._id)) {
      oldMap.set(user._id, {
        ...user,
        messagesData: oldMap.get(user._id)?.messagesData || null,
        mostRecentMessage: oldMap.get(user._id)?.mostRecentMessage || null,
      });
    } else {
      oldMap.set(user._id, {
        ...user,
        messagesData: null,
        mostRecentMessage: null,
      }); // New user with empty messages
    }
  });

  const mergedUsers = Array.from(oldMap.values());
  const sortedMergedUsers = sortUserArrayByMessage(mergedUsers);

  // Convert Map back to an array
  return sortedMergedUsers;
};

export const sortUserArrayByMessage = (users: IUsersWithMessages[]) => {
  return users.sort((a, b) => {
    const aMessagesLength = a.messagesData?.messages?.length || 0;
    const aRecentMessage = a.mostRecentMessage;
    const bMessagesLength = b.messagesData?.messages?.length || 0;
    const bRecentMessage = b.mostRecentMessage;

    const lastMessageA =
      aMessagesLength > 0
        ? new Date(aRecentMessage?.createdAt || "").getTime()
        : 0;
    const lastMessageB =
      bMessagesLength > 0
        ? new Date(bRecentMessage?.createdAt || "").getTime()
        : 0;
    return lastMessageB - lastMessageA; // Sort in descending order (most recent first)
  });
};

export const getMostRecentMessage = (messages: Api.General.Message[]) => {
  if (messages.length === 0) return null; // Return null if no messages

  return messages.reduce((latest, current) => {
    const latestTime = new Date(latest.createdAt).getTime();
    const currentTime = new Date(current.createdAt).getTime();
    return currentTime > latestTime ? current : latest;
  });
};
