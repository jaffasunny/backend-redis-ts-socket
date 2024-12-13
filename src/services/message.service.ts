import { Message } from '../models/message.model';
import { IMessage } from '../types/messageTypes';

type TCreateMessageParams = {
  senderId: string;
  chatId: string;
  username: string;
  text: string;
};

export const createMessage = async ({
  senderId,
  chatId,
  username,
  text,
}: TCreateMessageParams): Promise<IMessage> => {
  const message = new Message({
    senderId,
    chatId,
    username,
    text,
  });

  return await message.save();
};

export const getMessageByChatId = async (
  chatId: string
): Promise<IMessage[]> => {
  return await Message.find({ chat: chatId });
};
