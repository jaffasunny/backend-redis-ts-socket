import Redis, { RedisOptions } from 'ioredis';
import { User } from '../models/user.model';
import { getRedisConfig, REDIS_KEYS } from '../constants';
import { TUser } from '../types/userTypes';
import { TEnvironment } from '../types';

export const redis = new Redis(
  getRedisConfig(process.env.ENVIRONMENT as TEnvironment) as RedisOptions
);

export const getUser = async (username: string) => {
  const CACHED_USER = await redis.get(REDIS_KEYS.USER_AUTHENTICATION);

  if (CACHED_USER) {
    let typedCachedUser: {
      user: TUser;
      accessToken: string;
      refreshToken: string;
    } = JSON.parse(CACHED_USER);

    return typedCachedUser.user;
  }

  const user = await User.findOne({ username }).select('-password');

  return user;
};
