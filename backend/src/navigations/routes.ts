export enum Path {
  /**
   * Auth
   */
  SignUp = "/auth/signup",
  Login = "/auth/login",
  ForgotPassword = "/auth/forgot-password",
  VerifyForgotPasswordOtp = "/auth/forgot-password/verify-otp",
  ResetPassword = "/auth/reset-password",
  ResetPasswordOtp = "/auth/reset-password-otp",
  Logout = "/auth/logout",
  VerifyOtp = "/auth/verify-otp",

  /**
   * User
   */
  GetProfile = "/user/profile",
  UpdatePicture = "/user/update-picture",

  /**
   * Message
   */
  GetMessageUsers = "/message/users",
  GetMessages = "/message/:receiverId",
  MessageId = "/message/:messageId",
  EditMessage = "/message/edit/:messageId",
  UndoMessageDelete = "/message/undo-delete/:messageId",
  ForwardMessage = "/message/forward/:messageId",
}
