import mongoose from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  chat: mongoose.Schema.Types.ObjectId;
  text: string;
}

export interface IChat extends Document {
  admin: mongoose.Schema.Types.ObjectId;
  participants: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId;
  isGroupChat: boolean;
}

export interface IRoom extends Document {
  name: string;
  participants: mongoose.Schema.Types.ObjectId[];
}
