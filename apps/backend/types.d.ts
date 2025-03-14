import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare namespace Express {
  interface Request {
    email: string;
  }
}
