import { config } from "dotenv";
config();

export const WEBSITE_ORIGIN = process.env.WEBSITE_ORIGIN || "";
export const API_PREFIX = "/api/v1/";
export const NODE_ENV = process.env.NODE_ENV || "";

export const MONGO_DB_URI = process.env.MONGO_DB_URI || "";
export const PORT = process.env.PORT || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const TOKEN_COOKIE_KEY = "auth_token";

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY || "";
export const CLOUDINARY_PROFILE_PICTURES_FOLDER = "chat_app_profile_pictures";
export const CLOUDINARY_CHAT_PICTURES_FOLDER = "chat_app_chat_pictures";

/** Time durations in milliseconds */
export const DURATION_2_SEC = 2 * 1000;
export const DURATION_5_SEC = 5 * 1000;
export const DURATION_10_SEC = 10 * 1000;
export const DURATION_1_MIN = 60 * 1000;
export const DURATION_4_MIN = 4 * 60 * 1000;
export const DURATION_5_MIN = 5 * 60 * 1000;
export const DURATION_10_MIN = 10 * 60 * 1000;
export const DURATION_1_HR = 60 * 60 * 1000;
export const DURATION_7_DAYS = 7 * 24 * 60 * 60 * 1000;
