import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const generateToken = (id: string, expiresIn = "7d") => {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn }
  );
};
