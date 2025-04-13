import { Api } from "../../../../types";
import { formatDate } from "./formatDate";

export interface IGroupedMessage {
  date: string;
  messages: Api.General.Message[];
}
export const groupMessagesByDate = (
  messages: Api.General.Message[]
): IGroupedMessage[] => {
  const sortedMessages = messages.sort(
    (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
  );

  const grouped = sortedMessages.reduce(
    (acc: Record<string, Api.General.Message[]>, obj) => {
      const date = new Date(obj.createdAt).toISOString().split("T")[0]; // Extract the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(obj);
      return acc;
    },
    {}
  );

  const groupedEntries = Object.entries(grouped);
  const groupedTransaction = groupedEntries.map(([date, messages]) => ({
    date: formatDate(date),
    messages,
  }));

  return groupedTransaction;
};
