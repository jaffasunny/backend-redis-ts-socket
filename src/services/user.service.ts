import { User } from '../models/user.model';
import { IUser } from '../types/userTypes';

type TCreateOrUpdateUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  roles: string;
  socketId: string;
};

export const createOrUpdateUser = async ({
  firstName,
  lastName,
  username,
  email,
  password,
  roles,
  socketId,
}: TCreateOrUpdateUser): Promise<IUser> => {
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    existedUser.socketId = socketId;
    return await existedUser.save();
  }

  const newUser = await User.create({
    firstName,
    lastName,
    username: username.toLowerCase(),
    email,
    password,
    roles,
    socketId,
  });

  return newUser;
};

export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  await User.deleteOne({ socketId });
};
