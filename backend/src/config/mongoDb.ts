import mongoose from "mongoose";
import Logging from "../library/logs";
import { MONGO_DB_URI } from "../constants";

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(MONGO_DB_URI);

    Logging.info(`Mongo db connected with ${res.connection.host}`);
  } catch (error: any) {
    Logging.error(`mongodb error: ${error.message}`);

    // try again after 5s
    setTimeout(connectDB, 5000);
  }
};
