import mongoose from 'mongoose';
import { Room } from '../models/room.model';
import { IRoom } from '../types/messageTypes';

export const createRoom = async (roomName: string): Promise<IRoom> => {
  const room = new Room({ name: roomName });

  await room.save();

  return room;
};

export const getAllRooms = async () => {
  return await Room.find();
};

export const addUserToRoom = async (roomId: string, userId: string) => {
  const room = await Room.findById(roomId);

  if (room) {
    const _id = new mongoose.Schema.Types.ObjectId(userId);
    room.participants.push(_id);

    await room.save();
  }
};
