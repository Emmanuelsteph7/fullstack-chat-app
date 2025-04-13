export enum Path {
  /**
   * Auth
   */
  SignUp = "/auth/signup",
  Login = "/auth/login",
  ForgotPassword = "/auth/forgot-password",
  ResetPassword = "/auth/reset-password",
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
