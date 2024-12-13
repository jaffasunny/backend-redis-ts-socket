import mongoose, { Schema } from 'mongoose';
import { IChat } from '../types/messageTypes';

const chatSchema = new Schema<IChat>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }, 
    isGroupChat: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
