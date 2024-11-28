import { AxiosResponse } from "axios";
import { AxiosConfig } from "../../config/axiosConfig";
import { Api } from "../../types";

export const getUserProfileService =
  async (): Promise<Api.User.GetProfile.Response> => {
    return AxiosConfig.get<
      Api.User.GetProfile.Response,
      AxiosResponse<Api.User.GetProfile.Response>
    >("/user/profile").then((res) => res.data);
  };

export const uploadPictureService = async (
  payload: Api.User.UploadPicture.Request
): Promise<Api.User.UploadPicture.Response> => {
  return AxiosConfig.post<
    Api.User.UploadPicture.Response,
    AxiosResponse<Api.User.UploadPicture.Response>
  >("/user/update-picture", payload).then((res) => res.data);
};
