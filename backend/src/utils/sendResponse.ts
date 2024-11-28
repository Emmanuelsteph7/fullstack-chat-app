import { Response } from "express";

interface ISendResponseOptions {
  res: Response;
  status?: number;
  message: string;
  data?: any;
  success?: boolean;
}

export const sendResponse = ({
  message,
  res,
  status = 200,
  data,
  success = true,
}: ISendResponseOptions) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};
