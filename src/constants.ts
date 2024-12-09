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

export const getRedisConfig = (env: TEnvironment) => {
  return env === 'DEVELOPMENT'
    ? {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        connectTimeout: 10000,
        db: 0,
        lazyConnect: true,
        keepAlive: 1000,
      }
    : {
        host: process.env.UPSTASH_REDIS_URL,
        password: process.env.UPSTASH_REDIS_TOKEN,
        tls: {
          rejectUnauthorized: false,
        },
      };
};
