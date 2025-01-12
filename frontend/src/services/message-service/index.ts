import { AxiosResponse } from "axios";
import { AxiosConfig } from "../../config/axiosConfig";
import { Api } from "../../types";

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
