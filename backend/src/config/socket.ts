import { Server } from "socket.io";
import http from "http";
import express from "express";
import { corsOptions } from "./corsOptions";
import { ONLINE_USERS } from "../constants/socket";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

const onlineUsers: Record<string, string> = {};

export const getReceiverSocketId = (id: string | undefined) => {
  if (!id) return;
  return onlineUsers[id];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string | undefined;
  if (userId) {
    onlineUsers[userId] = socket.id;
  }

  io.emit(ONLINE_USERS, Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    if (userId) {
      delete onlineUsers[userId];
      io.emit(ONLINE_USERS, Object.keys(onlineUsers));
    }
  });
});

export { app, io, server };
