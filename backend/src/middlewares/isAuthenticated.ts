import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors";
import { JWT_SECRET, TOKEN_COOKIE_KEY } from "../constants";
import ErrorHandler from "../utils/errorHandler";
import { Api } from "../types";
import UserModel from "../models/user.model";

const isAuthenticated = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.cookies[TOKEN_COOKIE_KEY] as string;

      if (!token) {
        return next(
          new ErrorHandler("Please login to access this resource", 401)
        );
      }

      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
      };

      if (!decoded) {
        return next(new ErrorHandler("Invalid token", 401));
      }

      const user = await UserModel.findById(decoded.id);
      //
      if (!user) {
        return next(new ErrorHandler("User not found", 401));
      }

      req.user = user as Api.Models.User.UserModel;

      next();
    } catch (error: any) {
      console.log({ error }, "isAuth catch error");
      return next(new ErrorHandler(error?.message || "Invalid token", 401));
    }
  }
);

export default isAuthenticated;
