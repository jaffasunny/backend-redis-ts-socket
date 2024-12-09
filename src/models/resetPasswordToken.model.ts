import mongoose, { Schema } from 'mongoose';
import { IResetPasswordToken } from '../types/index.ts';

const resetPasswordTokenSchema = new Schema<IResetPasswordToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required!'],
    },
    token: {
      type: String,
      required: [true, 'Reset Password Token is required!'],
    },
  },
  {
    timestamps: true,
  }
);

export const ResetPasswordToken = mongoose.model<IResetPasswordToken>(
  'ResetPasswordToken',
  resetPasswordTokenSchema
);
