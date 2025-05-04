import { AxiosResponse } from "axios";
import { Api } from "../../types";
import { AxiosConfig } from "@/config/axios";

export const getMessageUsersService = async (
  payload: Api.Message.GetMessageUsers.Request
): Promise<Api.Message.GetMessageUsers.Response> => {
  return AxiosConfig.get<
    Api.Message.GetMessageUsers.Response,
    AxiosResponse<Api.Message.GetMessageUsers.Response>
  >("/message/users", {
    params: {
      ...payload,
    },
  }).then((res) => res.data);
};

export const getMessagesService = async (
  payload: Api.Message.GetMessages.Request
): Promise<Api.Message.GetMessages.Response> => {
  return AxiosConfig.get<
    Api.Message.GetMessages.Response,
    AxiosResponse<Api.Message.GetMessages.Response>
  >(`/message/${payload.receiverId}`, {
    params: {
      ...payload,
    },
  }).then((res) => res.data);
};

export const sendMessageService = async (
  payload: Api.Message.SendMessage.Request
): Promise<Api.Message.SendMessage.Response> => {
  return AxiosConfig.post<
    Api.Message.SendMessage.Response,
    AxiosResponse<Api.Message.SendMessage.Response>
  >(`/message/${payload.receiverId}`, payload).then((res) => res.data);
};

export const addMessageReactionService = async (
  payload: Api.Message.AddMessageReaction.Request
): Promise<Api.Message.AddMessageReaction.Response> => {
  return AxiosConfig.put<
    Api.Message.AddMessageReaction.Response,
    AxiosResponse<Api.Message.AddMessageReaction.Response>
  >(`/message/${payload.messageId}`, payload).then((res) => res.data);
};

export const deleteMessageService = async (
  payload: Api.Message.DeleteMessage.Request
): Promise<Api.Message.DeleteMessage.Response> => {
  return AxiosConfig.delete<
    Api.Message.DeleteMessage.Response,
    AxiosResponse<Api.Message.DeleteMessage.Response>
  >(`/message/${payload.messageId}`).then((res) => res.data);
};

export const editMessageService = async (
  payload: Api.Message.EditMessage.Request
): Promise<Api.Message.EditMessage.Response> => {
  return AxiosConfig.put<
    Api.Message.EditMessage.Response,
    AxiosResponse<Api.Message.EditMessage.Response>
  >(`/message/edit/${payload.messageId}`, payload).then((res) => res.data);
};

export const undoMessageDeleteService = async (
  payload: Api.Message.UndoMessageDelete.Request
): Promise<Api.Message.UndoMessageDelete.Response> => {
  return AxiosConfig.put<
    Api.Message.UndoMessageDelete.Response,
    AxiosResponse<Api.Message.UndoMessageDelete.Response>
  >(`/message/undo-delete/${payload.messageId}`, {}).then((res) => res.data);
};

export const forwardMessageService = async (
  payload: Api.Message.ForwardMessage.Request
): Promise<Api.Message.ForwardMessage.Response> => {
  return AxiosConfig.post<
    Api.Message.ForwardMessage.Response,
    AxiosResponse<Api.Message.ForwardMessage.Response>
  >(`/message/forward/${payload.messageId}`, payload).then((res) => res.data);
};
