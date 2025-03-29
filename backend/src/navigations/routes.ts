export enum Path {
  /**
   * Auth
   */
  SignUp = "/auth/signup",
  Login = "/auth/login",
  Logout = "/auth/logout",

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
  AddMessageReaction = "/message/:messageId",
}
