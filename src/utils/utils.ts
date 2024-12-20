import { Request } from 'express';

export const getIO = (req: Request) => {
  return req.app.get('io');
};
