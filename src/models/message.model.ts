import mongoose, { Schema } from 'mongoose';
import { IMessage } from './../types/messageTypes';

const messageSchema = new Schema<IMessage>(
  {
    roomId: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
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
