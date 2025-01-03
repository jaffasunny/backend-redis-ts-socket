import mongoose from 'mongoose';

export type TCorsOptions = { origin: string; credentials: boolean };

export interface JwtPayload {
  _id: string;
}

export interface IResetPasswordToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
}

export type TEnvironment = 'DEVELOPMENT' | 'PRODUCTION';

export type TRedisConfigReturn =
  | string
  | {
      host: string;
      port: number;
      connectTimeout: number;
      db: number;
      lazyConnect: boolean;
      keepAlive: number;
    }
  | null;
