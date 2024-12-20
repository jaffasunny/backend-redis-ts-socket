import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { Message } from '../models/message.model';
import { ApiError } from '../utils/ApiError';
import { getIO } from '../utils/utils';

const createOrAccessChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId, text } = req.body;
  const { _id: senderId } = req.user;

  const createdMessage = await Message.create({
    chat: chatId,
    text,
    senderId,
  });

  if (!createdMessage) throw new ApiError(400, 'Message creation failed!');

  const io = getIO(req);

  io.to(createdMessage.chat).emit('chat message', createdMessage);

  return res
    .status(201)
    .json(new ApiResponse(200, createdMessage, 'Chat created successfully'));
});

export { createOrAccessChat };
