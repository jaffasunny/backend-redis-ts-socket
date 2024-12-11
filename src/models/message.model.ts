import mongoose, { Schema } from 'mongoose';
import { IMessage } from './../types/messageTypes';

const messageSchema = new Schema<IMessage>(
  {
    chat: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessage>('Message', messageSchema);
