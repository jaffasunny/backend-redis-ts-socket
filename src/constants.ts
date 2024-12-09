import { RedisOptions } from 'ioredis';
import { TEnvironment } from './types';

export const DB_NAME: string = 'social-media-platform';

export const nameless: string = 'xyz';

export const NotificationPayload = (title: string, body: string) => {
  return {
    notification: {
      title,
      body,
    },
  };
};

export enum REDIS_KEYS {
  USER_AUTHENTICATION = 'user-authentication',
}

export const getRedisConfig = (env: TEnvironment): RedisOptions | string => {
  if (env === 'DEVELOPMENT') {
    return {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      connectTimeout: 10000,
      db: 0,
      lazyConnect: true,
      keepAlive: 1000,
    };
  } else if (env === 'PRODUCTION') {
    const redisUrl = process.env.UPSTASH_REDIS_URL || '';
    const redisToken = process.env.UPSTASH_REDIS_TOKEN || '';
    if (!redisUrl || !redisToken) {
      throw new Error('Missing Upstash Redis configuration');
    }
    return `rediss://default:${redisToken}@${redisUrl}:6379`;
  }
  throw new Error('Invalid environment specified');
};
