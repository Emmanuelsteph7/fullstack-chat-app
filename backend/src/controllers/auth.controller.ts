import { NextFunction, Response, Request } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Api } from "../types";
import ErrorHandler from "../utils/errorHandler";
import UserModel from "../models/user.model";
import hashPassword from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";
import { sendCookie } from "../utils/sendCookie";
import { sendResponse } from "../utils/sendResponse";
import comparePassword from "../utils/comparePassword";

export const signUpController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password } =
        req.body as Api.Controllers.Auth.SignUp.Request;

      if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      if (password.length < 6) {
        return next(
          new ErrorHandler("Password should be at least 6 characters", 400)
        );
      }

      const userWithThisEmail = await UserModel.findOne({ email });

      if (userWithThisEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });

      const token = generateToken(newUser._id as string);

      sendResponse({
        message: "User created",
        res,
        status: 201,
        data: {
          user: {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            profilePic: newUser.profilePic,
            createdAt: (newUser as any).createdAt,
            updatedAt: (newUser as any).updatedAt,
          },
          token,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const loginController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } =
        req.body as Api.Controllers.Auth.Login.Request;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      const userWithThisEmail = await UserModel.findOne({ email }).select(
        "+password"
      );

      if (!userWithThisEmail) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const isPasswordValid = await comparePassword(
        password,
        userWithThisEmail.password
      );

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const token = generateToken(userWithThisEmail._id as string);

      sendResponse({
        message: "Login successful",
        res,
        data: {
          user: {
            _id: userWithThisEmail._id,
            email: userWithThisEmail.email,
            name: userWithThisEmail.name,
            profilePic: userWithThisEmail.profilePic,
            createdAt: (userWithThisEmail as any).createdAt,
            updatedAt: (userWithThisEmail as any).updatedAt,
          },
          token,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const logoutController = catchAsyncErrors(
  async (
    req: Api.General.ExtendedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // res.cookie(TOKEN_COOKIE_KEY, "", { maxAge: 0 });
      sendCookie(res, "", 0);

      sendResponse({
        message: "Logout successful",
        res,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
