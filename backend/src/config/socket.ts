import { Server } from "socket.io";
import http from "http";
import express from "express";
import { corsOptions } from "./corsOptions";
import {
  MESSAGE_DELIVERED,
  MESSAGE_DELIVERED_ACKNOWLEDGED,
  ONLINE_USERS,
} from "../constants/socket";
import MessageModel from "../models/message.model";
import { isDBConnected } from "./mongoDb";

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

export const getSocketId = (id: string | undefined) => {
  if (!id) return;
  return onlineUsers[id];
};

export const disconnectSocket = (id: string | undefined) => {
  const socketId = getSocketId(id);

  console.log({ id, socketId, onlineUsers });

  if (socketId && id) {
    const socket = io.sockets.sockets.get(socketId);
    socket?.disconnect(true);
    delete onlineUsers[id];
    console.log({ onlineUsers });
    io.emit(ONLINE_USERS, Object.keys(onlineUsers));
  }
};

io.on("connection", async (socket) => {
  if (!isDBConnected) return;

  const userId = socket.handshake.query.userId as string | undefined;
  if (userId) {
    onlineUsers[userId] = socket.id;

    try {
      const undeliveredMessages = await MessageModel.find({
        receiverId: userId,
        status: { $in: ["sent", undefined] },
      });

      undeliveredMessages.forEach(async (m) => {
        const updatedMessage = await MessageModel.findByIdAndUpdate(
          m._id,
          {
            status: "delivered",
          },
          { new: true }
        );
        const senderSocketId = onlineUsers[updatedMessage?.senderId || ""];
        if (senderSocketId) {
          io.to(senderSocketId).emit(
            MESSAGE_DELIVERED_ACKNOWLEDGED,
            updatedMessage
          );
        }
      });
    } catch (error) {
      console.log({ error });
    }
  }

  io.emit(ONLINE_USERS, Object.keys(onlineUsers));

  socket.on(MESSAGE_DELIVERED, async (messageId: string) => {
    const updatedMessage = await MessageModel.findByIdAndUpdate(
      messageId,
      {
        status: "delivered",
      },
      { new: true }
    );

    const senderSocketId = onlineUsers[updatedMessage?.senderId || ""];
    if (senderSocketId) {
      io.to(senderSocketId).emit(
        MESSAGE_DELIVERED_ACKNOWLEDGED,
        updatedMessage
      );
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      delete onlineUsers[userId];
      io.emit(ONLINE_USERS, Object.keys(onlineUsers));
    }
  });
});

export { app, io, server };
