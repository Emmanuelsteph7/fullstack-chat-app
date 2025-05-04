import { AxiosResponse } from "axios";
import { Api } from "../../types";
import { AxiosConfig } from "@/config/axios";

export const signUpService = async (
  payload: Api.Auth.SignUp.Request
): Promise<Api.Auth.SignUp.Response> => {
  return AxiosConfig.post<
    Api.Auth.SignUp.Response,
    AxiosResponse<Api.Auth.SignUp.Response>
  >("/auth/signup", payload).then((res) => res.data);
};

export const verifyOtpService = async (
  payload: Api.Auth.VerifyOtp.Request
): Promise<Api.Auth.VerifyOtp.Response> => {
  return AxiosConfig.post<
    Api.Auth.VerifyOtp.Response,
    AxiosResponse<Api.Auth.VerifyOtp.Response>
  >("/auth/verify-otp", payload).then((res) => res.data);
};

export const loginService = async (
  payload: Api.Auth.Login.Request
): Promise<Api.Auth.Login.Response> => {
  return AxiosConfig.post<
    Api.Auth.Login.Response,
    AxiosResponse<Api.Auth.Login.Response>
  >("/auth/login", payload).then((res) => res.data);
};

export const forgotPasswordService = async (
  payload: Api.Auth.ForgotPassword.Request
): Promise<Api.Auth.ForgotPassword.Response> => {
  return AxiosConfig.post<
    Api.Auth.ForgotPassword.Response,
    AxiosResponse<Api.Auth.ForgotPassword.Response>
  >("/auth/forgot-password", payload).then((res) => res.data);
};

export const verifyForgotPasswordOtpService = async (
  payload: Api.Auth.VerifyForgotPasswordOtp.Request
): Promise<Api.Auth.VerifyForgotPasswordOtp.Response> => {
  return AxiosConfig.post<
    Api.Auth.VerifyForgotPasswordOtp.Response,
    AxiosResponse<Api.Auth.VerifyForgotPasswordOtp.Response>
  >("/auth/forgot-password/verify-otp", payload).then((res) => res.data);
};

export const resetPasswordService = async (
  payload: Api.Auth.ResetPassword.Request
): Promise<Api.Auth.ResetPassword.Response> => {
  return AxiosConfig.post<
    Api.Auth.ResetPassword.Response,
    AxiosResponse<Api.Auth.ResetPassword.Response>
  >("/auth/reset-password", payload).then((res) => res.data);
};

export const resetPasswordOtpService = async (
  payload: Api.Auth.ResetPasswordOtp.Request
): Promise<Api.Auth.ResetPasswordOtp.Response> => {
  return AxiosConfig.post<
    Api.Auth.ResetPasswordOtp.Response,
    AxiosResponse<Api.Auth.ResetPasswordOtp.Response>
  >("/auth/reset-password-otp", payload).then((res) => res.data);
};

export const logoutService = async (): Promise<Api.Auth.Logout.Response> => {
  return AxiosConfig.post<
    Api.Auth.Logout.Response,
    AxiosResponse<Api.Auth.Logout.Response>
  >("/auth/logout", {}).then((res) => res.data);
};
