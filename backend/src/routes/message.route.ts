import express from "express";
import { Path } from "../navigations/routes";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  getMessagesController,
  getMessageUsersController,
  sendMessageController,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter
  .route(Path.GetMessageUsers)
  .get(isAuthenticated, getMessageUsersController);
messageRouter
  .route(Path.GetMessages)
  .get(isAuthenticated, getMessagesController)
  .post(isAuthenticated, sendMessageController);

export default messageRouter;
