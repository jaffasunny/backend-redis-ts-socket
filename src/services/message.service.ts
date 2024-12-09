import { Message } from '../models/message.model';
import { IMessage } from '../types/messageTypes';

type TCreateMessageParams = {
  senderId: string;
  roomId: string;
  username: string;
  text: string;
};

export const createMessage = async ({
  senderId,
  roomId,
  username,
  text,
}: TCreateMessageParams): Promise<IMessage> => {
  const message = new Message({
    senderId,
    roomId,
    username,
    text,
  });

  return await message.save();
};

export const getMessageByRoomId = async (
  roomId: string
): Promise<IMessage[]> => {
  return await Message.find({ roomId });
};
