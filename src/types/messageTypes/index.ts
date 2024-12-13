import mongoose from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  chat: mongoose.Schema.Types.ObjectId;
  text: string;
}

export interface IChat extends Document {
  admin: mongoose.Schema.Types.ObjectId;
  users: mongoose.Schema.Types.ObjectId[];
  isGroupChat: boolean;
}
