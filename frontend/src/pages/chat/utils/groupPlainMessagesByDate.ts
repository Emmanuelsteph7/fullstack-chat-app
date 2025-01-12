import { Api } from "../../../types";

export const groupPlainMessagesByDate = (
  messages: Api.General.Message[]
): Api.General.Message[] => {
  const sortedMessages = messages.sort(
    (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
  );
  return sortedMessages;
};
