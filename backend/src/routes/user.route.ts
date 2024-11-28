import express from "express";
import { Path } from "../navigations/routes";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  getProfileController,
  updatePictureController,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route(Path.GetProfile).get(isAuthenticated, getProfileController);
userRouter
  .route(Path.UpdatePicture)
  .post(isAuthenticated, updatePictureController);

export default userRouter;
