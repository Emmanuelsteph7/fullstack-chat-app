import { CorsOptions } from "cors";
import { WEBSITE_ORIGIN } from "../constants";

export const allowedOrigins = [WEBSITE_ORIGIN];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if ((origin && allowedOrigins.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
