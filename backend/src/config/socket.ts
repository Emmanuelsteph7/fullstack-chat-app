import { Server } from "socket.io";
import http from "http";
import express from "express";
import { corsOptions } from "./corsOptions";
import {
  ENTER_ROOM,
  LEAVE_ROOM,
  MESSAGE_DELIVERED,
  MESSAGE_DELIVERED_ACKNOWLEDGED,
  MESSAGE_READ,
  MESSAGE_READ_ACKNOWLEDGED,
  ONLINE_USERS,
  UNREAD_COUNT,
  TYPING_MESSAGE,
  TYPING_MESSAGE_STOP,
  TYPING_USERS,
} from "../constants/socket";
import MessageModel from "../models/message.model";
import { isDBConnected } from "./mongoDb";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

const onlineUsers: Record<string, string> = {};
const typingUsers: Record<string, string[]> = {};
const userRooms: Record<string, string> = {};

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

  if (socketId && id) {
    const socket = io.sockets.sockets.get(socketId);
    socket?.disconnect(true);
    delete onlineUsers[id];
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

  socket.on(
    MESSAGE_DELIVERED,
    async (messageId: string, receiverId?: string) => {
      let status = "delivered";
      const receiverCurrentRoom = userRooms[receiverId || ""];

      if (userId && receiverCurrentRoom) {
        if (receiverCurrentRoom && receiverCurrentRoom === userId) {
          status = "read";
        }
      }

      const updatedMessage = await MessageModel.findByIdAndUpdate(
        messageId,
        {
          status,
        },
        { new: true }
      );

      const senderSocketId = getSocketId(updatedMessage?.senderId || "");
      const userSocketId = getSocketId(userId);

      if (senderSocketId) {
        const unreadMessagesCount = await MessageModel.countDocuments({
          senderId: receiverId,
          receiverId: userId, // Messages intended for the user
          status: { $in: ["sent", "delivered"] }, // Only count unread messages
        });

        io.to(senderSocketId).emit(MESSAGE_DELIVERED_ACKNOWLEDGED, {
          message: updatedMessage,
          unreadMessagesCount,
        });
      }

      if (userSocketId && receiverCurrentRoom) {
        io.to(userSocketId).emit(UNREAD_COUNT, {
          message: updatedMessage,
          unreadMessagesCount: 0,
          receiverId: updatedMessage?.senderId || "",
        });
      }
    }
  );

  socket.on(MESSAGE_READ, async (receiverId: string) => {
    const unreadMessages = await MessageModel.find({
      receiverId,
      $or: [
        { status: "sent" },
        { status: "delivered" },
        { status: { $exists: false } }, // Matches documents where "status" field is not defined
      ],
    });

    unreadMessages.forEach(async (m) => {
      const updatedMessage = await MessageModel.findByIdAndUpdate(
        m._id,
        {
          status: "read",
        },
        { new: true }
      );

      const senderSocketId = onlineUsers[updatedMessage?.senderId || ""];
      if (senderSocketId) {
        io.to(senderSocketId).emit(MESSAGE_READ_ACKNOWLEDGED, updatedMessage);
      }
    });
  });

  socket.on(ENTER_ROOM, async (receiverId: string) => {
    if (userId && receiverId) {
      userRooms[userId] = receiverId;

      const unreadMessages = await MessageModel.find({
        receiverId: userId,
        senderId: receiverId,
        $or: [
          { status: "sent" },
          { status: "delivered" },
          { status: { $exists: false } }, // Matches documents where "status" field is not defined
        ],
      });

      unreadMessages.forEach(async (m) => {
        const updatedMessage = await MessageModel.findByIdAndUpdate(
          m._id,
          {
            status: "read",
          },
          { new: true }
        );

        const senderSocketId = getSocketId(updatedMessage?.senderId || "");
        const userSocketId = getSocketId(userId);

        if (senderSocketId) {
          const unreadMessagesCount = await MessageModel.countDocuments({
            senderId: receiverId,
            receiverId: userId, // Messages intended for the user
            status: { $in: ["sent", "delivered"] }, // Only count unread messages
          });

          io.to(senderSocketId).emit(MESSAGE_READ_ACKNOWLEDGED, {
            message: updatedMessage,
            unreadMessagesCount,
          });

          if (userSocketId) {
            io.to(userSocketId).emit(UNREAD_COUNT, {
              message: updatedMessage,
              unreadMessagesCount: 0,
              receiverId: updatedMessage?.senderId || "",
            });
          }
        }
      });
    }
  });

  socket.on(LEAVE_ROOM, async () => {
    if (userId && userRooms[userId]) {
      delete userRooms[userId];
    }
  });

  socket.on(
    TYPING_MESSAGE,
    async ({ receiver, sender }: { sender: string; receiver: string }) => {
      const receiverTypingUsers = typingUsers[receiver] || [];
      const isSenderTyping = receiverTypingUsers.includes(sender);

      if (!isSenderTyping) {
        typingUsers[receiver] = [...receiverTypingUsers, sender];
      }

      const receiverSocketId = getSocketId(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(TYPING_USERS, typingUsers[receiver]);
      }
    }
  );

  socket.on(
    TYPING_MESSAGE_STOP,
    async ({ receiver, sender }: { sender: string; receiver: string }) => {
      const receiverTypingUsers = typingUsers[receiver] || [];
      const senderIdIndex = receiverTypingUsers.findIndex(
        (id) => id === sender
      );

      if (senderIdIndex > -1) {
        receiverTypingUsers.splice(senderIdIndex, 1);
        typingUsers[receiver] = receiverTypingUsers;
      }

      const receiverSocketId = getSocketId(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit(TYPING_USERS, typingUsers[receiver]);
      }
    }
  );

  socket.on("disconnect", () => {
    if (userId) {
      if (userRooms[userId]) {
        delete userRooms[userId];
      }

      delete onlineUsers[userId];
      io.emit(ONLINE_USERS, Object.keys(onlineUsers));
    }
  });
});

export { app, io, server };
