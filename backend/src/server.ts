import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { connectDB } from "./config/mongoDb";
import errorMiddleware from "./middlewares/errors";
import Logging from "./library/logs";
import { generalConfig } from "./config/generalConfig";
import { allRoutes } from "./config/allRoutes";
import { API_PREFIX, PORT } from "./constants";
import { cloudinaryConfig } from "./config/cloudinary";
import path from "path";

config();

const app = express();
// const _dirname = path.resolve();

generalConfig(app);
cloudinaryConfig();

// Routes
allRoutes(app);

// Middleware to handle errors
app.use(errorMiddleware);

const distPath = path.join(__dirname, "../../frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(distPath)));
}

// Handle unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;
  const isApiUrl = url.includes(API_PREFIX);

  if (isApiUrl) {
    const errMessage = `Route ${req.originalUrl} not found`;
    const err = new Error(errMessage) as any;
    err.statusCode = 404;
    next(err);
  } else {
    res.sendFile(path.join(distPath, "index.html"));
  }
});

/**
 * Create server
 */
app.listen(PORT || 8000, () => {
  Logging.info(`Server started on port ${PORT}`);
  connectDB();
});
