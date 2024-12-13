import { Response } from "express";
import {
  DURATION_7_DAYS,
  NODE_ENV,
  TOKEN_COOKIE_KEY,
  WEBSITE_ORIGIN,
} from "../constants";
import { removeProtocol } from "./removeProtocol";

export const sendCookie = (
  res: Response,
  token: string,
  maxAge = DURATION_7_DAYS
) => {
  const isDevelopment = NODE_ENV === "development";
  const formattedDomain = isDevelopment
    ? "localhost"
    : removeProtocol(WEBSITE_ORIGIN);

  res.cookie(TOKEN_COOKIE_KEY, token, {
    maxAge,
    httpOnly: true,
    sameSite: "lax",
    secure: !isDevelopment,
    domain: formattedDomain,
  });
};
