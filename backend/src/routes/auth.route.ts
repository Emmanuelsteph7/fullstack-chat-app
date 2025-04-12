import express from "express";
import { Path } from "../navigations/routes";
import {
  loginController,
  logoutController,
  signUpController,
  verifyOtpController,
} from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const authRouter = express.Router();

authRouter.route(Path.SignUp).post(signUpController);
authRouter.route(Path.VerifyOtp).post(verifyOtpController);
authRouter.route(Path.Login).post(loginController);
authRouter.route(Path.Logout).post(isAuthenticated, logoutController);

export default authRouter;
