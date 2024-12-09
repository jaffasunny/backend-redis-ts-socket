import mongoose from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  roomId: string;
  receiverId: mongoose.Schema.Types.ObjectId;
  username: string;
  text: string;
  createdAt: Date;
}

export interface IRoom extends Document {
  name: string;
  participants: mongoose.Schema.Types.ObjectId[];
}
