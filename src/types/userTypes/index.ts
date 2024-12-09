import mongoose from 'mongoose';

interface Address {
  country?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface IUserDocument extends Document {
  // Your existing IUser properties here...
  isModified(paths?: string | string[] | undefined): boolean;
  refreshToken: string;
}

export type TUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  address?: Address;
  shippingAddress?: Address;
  roles: string[];
  phone?: string;
  gender?: string;
  bio?: string;
  isProfileComplete: boolean;
  refreshTokens: { token: string }[];
  _id?: mongoose.Schema.Types.ObjectId; // Optional for inferred _id type
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUser extends IUserDocument {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  address?: Address;
  shippingAddress?: Address;
  roles: string[];
  phone?: string;
  gender?: string;
  bio?: string;
  isProfileComplete: boolean;
  refreshTokens: { token: string }[];
  _id?: mongoose.Schema.Types.ObjectId; // Optional for inferred _id type
  createdAt?: Date;
  updatedAt?: Date;
  socketId: string;
  isOnline?: string;
  _doc: any;

  // Instance methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
