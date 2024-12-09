import mongoose, { Schema } from 'mongoose';
import { IRoom } from './../types/messageTypes';

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model<IRoom>('Room', roomSchema);
