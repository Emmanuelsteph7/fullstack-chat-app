import { NextFunction, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Api } from "../types";
import ErrorHandler from "../utils/errorHandler";
import MessageModel from "../models/message.model";
import UserModel from "../models/user.model";
import { sendResponse } from "../utils/sendResponse";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { CLOUDINARY_CHAT_PICTURES_FOLDER } from "../constants";
import { getReceiverSocketId, io } from "../config/socket";
import { NEW_MESSAGE, UPDATE_MESSAGE } from "../constants/socket";

export const getMessageUsersController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { limit = 10, page = 1 } =
        req.query as Api.Controllers.Message.GetMessageUsers.Request;

      const parsedPage = Number(page);
      const parsedLimit = Number(limit);

      const skip = (parsedPage - 1) * parsedLimit;
      const messageUsers = await UserModel.find({ _id: { $ne: userId } })
        .skip(skip)
        .limit(parsedLimit);

      const totalItems = await UserModel.countDocuments({
        _id: { $ne: userId },
      });

      const hasNextPage = parsedPage * parsedLimit < totalItems;
      const totalPages = Math.ceil(totalItems / parsedLimit);

      sendResponse({
        message: "Users fetched successfully",
        res,
        data: {
          currentPage: parsedPage,
          totalPages,
          hasNextPage,
          users: messageUsers,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getMessagesController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { receiverId } =
        req.params as Api.Controllers.Message.GetMessages.RequestParams;
      const { page = 1, limit = 10 } =
        req.query as Api.Controllers.Message.GetMessages.RequestQuery;

      const parsedPage = Number(page);
      const parsedLimit = Number(limit);

      const skip = (parsedPage - 1) * parsedLimit;

      const messages = await MessageModel.find({
        $or: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      })
        .sort({ createdAt: -1 }) // Sort by `createdAt` field, latest first
        .skip(skip)
        .limit(parsedLimit);

      // Count total messages
      const totalMessages = await MessageModel.countDocuments({
        $or: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      });

      const unreadMessagesCount = await MessageModel.countDocuments({
        senderId: receiverId,
        receiverId: userId, // Messages intended for the user
        status: { $in: ["sent", "delivered"] }, // Only count unread messages
      });

      const hasNextPage = parsedPage * parsedLimit < totalMessages;
      const totalPages = Math.ceil(totalMessages / parsedLimit);

      sendResponse({
        message: "Messages fetched successfully",
        res,
        data: {
          currentPage: parsedPage,
          totalPages,
          hasNextPage,
          messages,
          unreadMessagesCount,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const sendMessageController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { receiverId } =
        req.params as Api.Controllers.Message.SendMessage.RequestParams;
      const { image, text } =
        req.body as Api.Controllers.Message.SendMessage.RequestBody;

      let cloudinaryResponse: UploadApiResponse | undefined = undefined;
      if (image) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: CLOUDINARY_CHAT_PICTURES_FOLDER,
        });
      }

      const message = await MessageModel.create({
        senderId: userId,
        receiverId,
        text,
        image:
          image && cloudinaryResponse
            ? {
                public_id: cloudinaryResponse?.public_id || "",
                url: cloudinaryResponse?.secure_url || "",
              }
            : null,
      });

      const receiverSocketId = getReceiverSocketId(receiverId);

      // This means that the receiver is online
      if (receiverSocketId) {
        const unreadMessagesCount = await MessageModel.countDocuments({
          senderId: userId,
          receiverId: receiverId, // Messages intended for the user
          status: { $in: ["sent", "delivered"] }, // Only count unread messages
        });

        io.to(receiverSocketId).emit(NEW_MESSAGE, {
          message,
          unreadMessagesCount,
        });
      }

      sendResponse({
        message: "Message sent successfully",
        res,
        status: 201,
        data: {
          message,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const addMessageReactionController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { messageId } =
        req.params as Api.Controllers.Message.AddMessageReaction.RequestParams;
      const { emoji, receiverId } =
        req.body as Api.Controllers.Message.AddMessageReaction.RequestBody;

      await MessageModel.findByIdAndUpdate(
        messageId,
        { $pull: { reactions: { userId } } },
        { new: true }
      );

      // Add the new reaction
      const updatedMessage = await MessageModel.findByIdAndUpdate(
        messageId,
        { $push: { reactions: { userId, emoji } } },
        { new: true }
      );

      const receiverSocketId = getReceiverSocketId(receiverId);

      // This means that the receiver is online
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(UPDATE_MESSAGE, {
          message: updatedMessage,
          receiverId: userId,
        });
      }

      sendResponse({
        message: "Emoji updated successfully",
        res,
        status: 201,
        data: {
          message: updatedMessage,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editMessageController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { messageId } =
        req.params as Api.Controllers.Message.EditMessage.RequestParams;
      const { text, receiverId } =
        req.body as Api.Controllers.Message.EditMessage.RequestBody;

      // Add the new reaction
      const updatedMessage = await MessageModel.findByIdAndUpdate(
        messageId,
        { text, isEdited: true },
        { new: true }
      );

      const receiverSocketId = getReceiverSocketId(receiverId);

      // This means that the receiver is online
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(UPDATE_MESSAGE, {
          message: updatedMessage,
          receiverId: userId,
        });
      }

      sendResponse({
        message: "Message updated successfully",
        res,
        status: 201,
        data: {
          message: updatedMessage,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const deleteMessageController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { messageId } =
        req.params as Api.Controllers.Message.DeleteMessage.RequestParams;

      const message = await MessageModel.findById(messageId);
      const messageSenderId = message?.senderId;
      const messageReceiverId = message?.receiverId;

      if (messageSenderId?.toString() !== userId?.toString()) {
        return next(
          new ErrorHandler("You are not allowed to delete this message", 400)
        );
      }

      if (message?.isDeleted) {
        return next(new ErrorHandler("This message is already deleted", 400));
      }

      const updatedMessage = await MessageModel.findByIdAndUpdate(
        messageId,
        {
          text: null,
          image: null,
          isDeleted: true,
          reactions: [],
          backupMessages: {
            text: message?.text,
            image: message?.image,
            reactions: message?.reactions,
          },
        },
        { new: true }
      );

      const receiverSocketId = getReceiverSocketId(messageReceiverId);

      // This means that the receiver is online
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(UPDATE_MESSAGE, {
          message: updatedMessage,
          receiverId: userId,
        });
      }

      sendResponse({
        message: "Message deleted successfully",
        res,
        status: 200,
        data: {
          message: updatedMessage,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const undoMessageDeleteController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { messageId } =
        req.params as Api.Controllers.Message.UndoMessageDelete.RequestParams;

      const message = await MessageModel.findById(messageId).select(
        "+backupMessages"
      );
      const messageSenderId = message?.senderId;
      const messageReceiverId = message?.receiverId;

      if (messageSenderId?.toString() !== userId?.toString()) {
        return next(
          new ErrorHandler("You are not allowed to update this message", 400)
        );
      }

      if (!message?.isDeleted) {
        return next(
          new ErrorHandler("This message was not initially deleted", 400)
        );
      }

      const updatedMessage = await MessageModel.findByIdAndUpdate(
        messageId,
        {
          text: message.backupMessages?.text || "",
          image: message.backupMessages?.image || null,
          isDeleted: false,
          reactions: message.backupMessages?.reactions || [],
          backupMessages: null,
        },
        { new: true }
      );

      const receiverSocketId = getReceiverSocketId(messageReceiverId);

      // This means that the receiver is online
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(UPDATE_MESSAGE, {
          message: updatedMessage,
          receiverId: userId,
        });
      }

      sendResponse({
        message: "Message updated successfully",
        res,
        status: 200,
        data: {
          message: updatedMessage,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const forwardMessageController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const { messageId } =
        req.params as Api.Controllers.Message.ForwardMessage.RequestParams;
      const { receiverIds } =
        req.body as Api.Controllers.Message.ForwardMessage.RequestBody;

      const message = await MessageModel.findById(messageId).select(
        "+backupMessages"
      );

      const forwardedMessages: {
        message: Api.Models.Message.MessageModel;
        receiverId: string;
      }[] = [];

      if (receiverIds) {
        for (let i = 0; i < receiverIds.length; i++) {
          const receiverId = receiverIds[i];

          const newForwardedMessage = await MessageModel.create({
            senderId: userId,
            receiverId,
            text: message?.text || "",
            image: message?.image ? message.image : null,
            isForwarded: true,
          });

          forwardedMessages.push({
            message: newForwardedMessage,
            receiverId,
          });

          const receiverSocketId = getReceiverSocketId(receiverId);

          // This means that the receiver is online
          if (receiverSocketId) {
            const unreadMessagesCount = await MessageModel.countDocuments({
              senderId: userId,
              receiverId: receiverId, // Messages intended for the user
              status: { $in: ["sent", "delivered"] }, // Only count unread messages
            });

            io.to(receiverSocketId).emit(NEW_MESSAGE, {
              message: newForwardedMessage,
              unreadMessagesCount,
            });
          }
        }
      }

      sendResponse({
        message: "Message updated successfully",
        res,
        status: 200,
        data: {
          messages: forwardedMessages,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
