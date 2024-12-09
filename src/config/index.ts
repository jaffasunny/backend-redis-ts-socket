import Redis from 'ioredis';
import { createClient } from 'redis';
import { User } from '../models/user.model';
import { REDIS_KEYS } from '../constants';
import { TUser } from '../types/userTypes';

export const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  connectTimeout: 10000,
  db: 0,
  lazyConnect: true,
  keepAlive: 1000,
});

export const redisClient = createClient({
  socket: {
    port: 6379,
    host: 'redis',
  },
});

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
