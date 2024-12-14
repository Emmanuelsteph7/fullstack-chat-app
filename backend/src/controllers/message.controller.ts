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
import { NEW_MESSAGE } from "../constants/socket";

export const getMessageUsersController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const messageUsers = await UserModel.find({ _id: { $ne: userId } }); // Get all users not equall to this id

      sendResponse({
        message: "Users fetched successfully",
        res,
        data: {
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
        req.params as Api.Controllers.Message.GetMessages.Request;

      const messages = await MessageModel.find({
        $or: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      });

      sendResponse({
        message: "Messages fetched successfully",
        res,
        data: {
          messages,
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
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(NEW_MESSAGE, message);
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
