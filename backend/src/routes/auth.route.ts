import express from "express";
import { Path } from "../navigations/routes";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  resetPasswordController,
  resetPasswordOtpController,
  signUpController,
  verifyForgotPasswordOtpController,
  verifyOtpController,
} from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const authRouter = express.Router();

authRouter.route(Path.SignUp).post(signUpController);
authRouter.route(Path.VerifyOtp).post(verifyOtpController);
authRouter.route(Path.Login).post(loginController);
authRouter.route(Path.ForgotPassword).post(forgotPasswordController);
authRouter
  .route(Path.VerifyForgotPasswordOtp)
  .post(verifyForgotPasswordOtpController);
authRouter.route(Path.ResetPassword).post(resetPasswordController);
authRouter.route(Path.ResetPasswordOtp).post(resetPasswordOtpController);
authRouter.route(Path.Logout).post(isAuthenticated, logoutController);

export default authRouter;
