import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { connectDB } from "./config/mongoDb";
import errorMiddleware from "./middlewares/errors";
import Logging from "./library/logs";
import { generalConfig } from "./config/generalConfig";
import { allRoutes } from "./config/allRoutes";
import { NODE_ENV, PORT } from "./constants";
import { cloudinaryConfig } from "./config/cloudinary";
import { app, server } from "./config/socket";

config();

generalConfig(app);
cloudinaryConfig();

// Routes
allRoutes(app);

// Middleware to handle errors
app.use(errorMiddleware);

// Handle unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const errMessage = `Route ${req.originalUrl} not found`;
  const err = new Error(errMessage) as any;
  err.statusCode = 404;
  next(err);
});

/**
 * Create server
 */

/** Added this because of mobile testing */
if (NODE_ENV === "development") {
  // @ts-ignore
  server.listen(PORT || 8000, "0.0.0.0", () => {
    Logging.info(`Server started on port ${PORT}`);
    connectDB();
  });
} else {
  server.listen(PORT || 8000, () => {
    Logging.info(`Server started on port ${PORT}`);
    connectDB();
  });
}
