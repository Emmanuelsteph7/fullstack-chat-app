import { Response } from "express";
import { DURATION_7_DAYS, NODE_ENV, TOKEN_COOKIE_KEY } from "../constants";

export const sendCookie = (res: Response, token: string) => {
  const isDevelopment = NODE_ENV === "development";

  res.cookie(TOKEN_COOKIE_KEY, token, {
    maxAge: DURATION_7_DAYS,
    httpOnly: true,
    sameSite: "none",
    secure: !isDevelopment,
  });
};
