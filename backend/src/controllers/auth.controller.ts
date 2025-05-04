import { NextFunction, Response, Request } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Api } from "../types";
import ErrorHandler from "../utils/errorHandler";
import UserModel from "../models/user.model";
import hashPassword from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";
import { sendResponse } from "../utils/sendResponse";
import comparePassword from "../utils/comparePassword";
import { disconnectSocket } from "../config/socket";
import OtpModel from "../models/otp.model";
import {
  DURATION_5_MIN,
  DURATION_20_MIN_IN_SECONDS,
  JWT_SECRET,
  WEBSITE_ORIGIN,
} from "../constants";
import { generateOtp } from "../utils/generateOtp";
import { sendMail } from "../utils/sendMail";
import { otpTemplate } from "../templates/otpTemplate";
import { emailVerifiedTemplate } from "../templates/emailVerifiedTemplate";
import { forgotPasswordTemplate } from "../templates/forgotPasswordTemplate";
import jwt from "jsonwebtoken";
import { passwordResetSuccessTemplate } from "../templates/passwordResetSuccessTemplate";

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
      await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });

      const previousOTP = await OtpModel.findOne({ email });
      const otp = generateOtp();

      if (!previousOTP) {
        await OtpModel.create({
          email,
          otp,
          expiresAt: new Date(Date.now() + DURATION_5_MIN),
        });
      } else {
        await OtpModel.findOneAndUpdate(
          { email },
          {
            otp,
            expiresAt: new Date(Date.now() + DURATION_5_MIN),
          }
        );
      }

      await sendMail({
        html: otpTemplate({ name, otp }),
        subject: "Eming Chat",
        to: email,
      });

      sendResponse({
        message: "Kindly verify your email address",
        res,
        status: 201,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const verifyOtpController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } = req.body as Api.Controllers.Auth.VerifyOtp.Request;

      if (!email || !otp) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      if (otp.length !== 6) {
        return next(
          new ErrorHandler("OTP should be at least 6 characters", 400)
        );
      }

      const otpInDB = await OtpModel.findOne({ email });

      if (!otpInDB) {
        return next(new ErrorHandler("Invalid OTP request", 400));
      }

      if (otpInDB.otp?.toString() !== otp) {
        return next(new ErrorHandler("Invalid OTP", 400));
      }

      const expiryTime = otpInDB?.expiresAt;
      const isOtpExpired = expiryTime?.getTime() < new Date()?.getTime();

      if (isOtpExpired) {
        await OtpModel.findOneAndDelete({ email });
        return next(
          new ErrorHandler("OTP expired. Kindly request a new OTP", 400)
        );
      }

      const userWithThisEmail = await UserModel.findOne({ email });

      if (!userWithThisEmail) {
        return next(new ErrorHandler("No user found with this email", 400));
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { isEmailVerified: true },
        { new: true }
      );

      const token = generateToken(userWithThisEmail._id as string);
      await OtpModel.findOneAndDelete({ email });

      await sendMail({
        html: emailVerifiedTemplate({ name: updatedUser?.name || "" }),
        subject: "Email Verified",
        to: email,
      });

      sendResponse({
        message: "Your email has been verified successfully.",
        res,
        status: 201,
        data: {
          user: {
            _id: updatedUser?._id,
            email: updatedUser?.email,
            name: updatedUser?.name,
            profilePic: updatedUser?.profilePic,
            isEmailVerified: updatedUser?.isEmailVerified,
            createdAt: (updatedUser as any).createdAt,
            updatedAt: (updatedUser as any).updatedAt,
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

      if (!userWithThisEmail?.isEmailVerified) {
        const previousOTP = await OtpModel.findOne({ email });
        const otp = generateOtp();

        if (!previousOTP) {
          await OtpModel.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + DURATION_5_MIN),
          });
        } else {
          await OtpModel.findOneAndUpdate(
            { email },
            {
              otp,
              expiresAt: new Date(Date.now() + DURATION_5_MIN),
            }
          );
        }

        await sendMail({
          html: otpTemplate({ name: userWithThisEmail.name, otp }),
          subject: "Eming Chat",
          to: email,
        });

        return next(new ErrorHandler("Kindly verify your email address", 400));
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
            isEmailVerified: userWithThisEmail?.isEmailVerified,
          },
          token,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const forgotPasswordController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, type } =
        req.body as Api.Controllers.Auth.ForgotPassword.Request;

      if (!email) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      const userWithThisEmail = await UserModel.findOne({ email }).select(
        "+password"
      );

      if (!userWithThisEmail) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      if (type === "mobile") {
        const previousOTP = await OtpModel.findOne({ email });
        const otp = generateOtp();

        if (!previousOTP) {
          await OtpModel.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + DURATION_5_MIN),
          });
        } else {
          await OtpModel.findOneAndUpdate(
            { email },
            {
              otp,
              expiresAt: new Date(Date.now() + DURATION_5_MIN),
            }
          );
        }

        await sendMail({
          html: otpTemplate({ name: "", otp }),
          subject: "Eming Chat",
          to: email,
        });

        sendResponse({
          message: "An OTP has been sent to your email.",
          res,
        });
      } else {
        const token = generateToken(
          email as string,
          DURATION_20_MIN_IN_SECONDS
        );
        const resetPasswordLink = `${WEBSITE_ORIGIN}/reset-password/${token}`;

        await sendMail({
          html: forgotPasswordTemplate({
            name: userWithThisEmail.name,
            resetLink: resetPasswordLink,
          }),
          subject: "Eming Chat",
          to: email,
        });

        sendResponse({
          message: "An email has been sent with a link to reset your password.",
          res,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const verifyForgotPasswordOtpController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp } =
        req.body as Api.Controllers.Auth.VerifyMobileForgotPasswordOtp.Request;

      if (!email || !otp) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      if (otp.length !== 6) {
        return next(
          new ErrorHandler("OTP should be at least 6 characters", 400)
        );
      }

      const otpInDB = await OtpModel.findOne({ email });

      if (!otpInDB) {
        return next(new ErrorHandler("Invalid OTP request", 400));
      }

      if (otpInDB.otp?.toString() !== otp) {
        return next(new ErrorHandler("Invalid OTP", 400));
      }

      const expiryTime = otpInDB?.expiresAt;
      const isOtpExpired = expiryTime?.getTime() < new Date()?.getTime();

      if (isOtpExpired) {
        await OtpModel.findOneAndDelete({ email });
        return next(
          new ErrorHandler("OTP expired. Kindly request a new OTP", 400)
        );
      }

      const userWithThisEmail = await UserModel.findOne({ email });

      if (!userWithThisEmail) {
        return next(new ErrorHandler("No user found with this email", 400));
      }

      await OtpModel.findOneAndDelete({ email });

      sendResponse({
        message: "Email verified. Proceed to reset your password",
        res,
        status: 200,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const resetPasswordController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, token } =
        req.body as Api.Controllers.Auth.ResetPassword.Request;

      if (!token || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
      };

      if (!decoded) {
        return next(new ErrorHandler("Invalid token", 401));
      }

      const userWithThisEmail = await UserModel.findOne({ email: decoded.id });

      if (!userWithThisEmail) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const hashedPassword = await hashPassword(password);

      userWithThisEmail.password = hashedPassword;
      await userWithThisEmail.save();

      await sendMail({
        html: passwordResetSuccessTemplate({
          name: userWithThisEmail.name,
        }),
        subject: "Eming Chat",
        to: decoded.id,
      });

      sendResponse({
        message: "Your password reset was successful.",
        res,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const resetPasswordOtpController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } =
        req.body as Api.Controllers.Auth.ResetPasswordOtp.Request;

      if (!password || !email) {
        return next(new ErrorHandler("Please enter all fields", 400));
      }

      if (password.length < 6) {
        return next(
          new ErrorHandler("Password should be at least 6 characters", 400)
        );
      }

      const userWithThisEmail = await UserModel.findOne({ email });

      if (!userWithThisEmail) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const hashedPassword = await hashPassword(password);

      userWithThisEmail.password = hashedPassword;
      await userWithThisEmail.save();

      await sendMail({
        html: passwordResetSuccessTemplate({
          name: userWithThisEmail.name,
        }),
        subject: "Eming Chat",
        to: email,
      });

      sendResponse({
        message: "Your password reset was successful.",
        res,
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
      disconnectSocket(req.user?._id as string);

      sendResponse({
        message: "Logout successful",
        res,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
