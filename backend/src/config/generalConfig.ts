import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { corsOptions } from "./corsOptions";
import cors from "cors";
import Logging from "../library/logs";

export const generalConfig = (app: Express) => {
  app.use(express.json({ limit: "50mb" })); // Body parser
  app.use(cookieParser()); // Cookie parser
  app.use(cors(corsOptions)); // Cors

  app.use((req, res, next) => {
    /** Log every request */
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log every response */
      Logging.info(
        `Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });
};
