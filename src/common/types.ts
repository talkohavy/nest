import { Request } from 'express';

export type CustomRequest = Request & {
  authToken?: Record<string, any>;
};
