import { Express, NextFunction, Request, Response } from "express";
import { API_PREFIX } from "../constants";
import authRouter from "../routes/auth.route";
import userRouter from "../routes/user.route";
import messageRouter from "../routes/message.route";

export const allRoutes = (app: Express) => {
  app.use(API_PREFIX, authRouter);
  app.use(API_PREFIX, userRouter);
  app.use(API_PREFIX, messageRouter);

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "Hurray!!!",
    });
  });
};
