import { NextFunction, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Api } from "../types";
import ErrorHandler from "../utils/errorHandler";
import UserModel from "../models/user.model";
import { sendResponse } from "../utils/sendResponse";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_PROFILE_PICTURES_FOLDER } from "../constants";

export const getProfileController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;

      const userInDb = (await UserModel.findById(userId)) as any;

      sendResponse({
        message: "Profile fetched successfully",
        res,
        data: {
          user: {
            ...userInDb?._doc,
          },
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updatePictureController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { profilePic } =
        req.body as Api.Controllers.User.UpdatePicture.Request;

      if (!profilePic) {
        return next(new ErrorHandler("Profile picture is required", 400));
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(profilePic, {
        folder: CLOUDINARY_PROFILE_PICTURES_FOLDER,
      });

      const userId = req.user?._id;
      const previousPicId = req.user?.profilePic?.public_id;

      await UserModel.findByIdAndUpdate(userId, {
        profilePic: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });

      if (previousPicId) {
        await cloudinary.uploader.destroy(previousPicId);
      }

      sendResponse({
        message: "Profile picture updated",
        res,
        data: {
          profilePic: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          },
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
