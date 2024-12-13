import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { Chat } from '../models/chat.model';
import mongoose from 'mongoose';

const getAllChats = asyncHandler(async (req: Request, res: Response) => {
  const { _id: userId } = req.user;

  const Chats = await Chat.find({
    users: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, Chats, 'Chats fetched successfully'));
});

const createOrAccessChat = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid userId'));
  }

  const findChat = await Chat.findOne({
    users: {
      $all: [_id, userId],
    },
  });

  if (findChat) {
    return res
      .status(201)
      .json(new ApiResponse(200, findChat, 'Chat accessed successfully!'));
  }

  const createdChats = await Chat.create({
    users: [_id, userId],
  });

  return res
    .status(201)
    .json(new ApiResponse(200, createdChats, 'Chat created successfully'));
});

const addToGroupChat = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid userId'));
  }

  const findChat = await Chat.findOne({
    users: {
      $all: [_id, userId],
    },
  });

  if (findChat) {
    return res
      .status(201)
      .json(new ApiResponse(200, findChat, 'Chat accessed successfully!'));
  }

  const createdChats = await Chat.create({
    users: [_id, userId],
  });

  return res
    .status(201)
    .json(new ApiResponse(200, createdChats, 'Chat created successfully'));
});

export { getAllChats, createOrAccessChat, addToGroupChat };
