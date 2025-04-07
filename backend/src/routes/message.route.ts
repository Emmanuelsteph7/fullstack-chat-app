import express from "express";
import { Path } from "../navigations/routes";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  addMessageReactionController,
  deleteMessageController,
  editMessageController,
  getMessagesController,
  getMessageUsersController,
  sendMessageController,
  undoMessageDeleteController,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter
  .route(Path.GetMessageUsers)
  .get(isAuthenticated, getMessageUsersController);
messageRouter
  .route(Path.GetMessages)
  .get(isAuthenticated, getMessagesController)
  .post(isAuthenticated, sendMessageController);
messageRouter
  .route(Path.MessageId)
  .put(isAuthenticated, addMessageReactionController)
  .delete(isAuthenticated, deleteMessageController);
messageRouter
  .route(Path.EditMessage)
  .put(isAuthenticated, editMessageController);
messageRouter
  .route(Path.UndoMessageDelete)
  .put(isAuthenticated, undoMessageDeleteController);

export default messageRouter;
