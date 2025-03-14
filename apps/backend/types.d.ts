import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      email: string;
    }

    interface Response extends ExpressResponse { }
  }
}

// Fix for Express route handler return type issue
declare module 'express-serve-static-core' {
  interface RequestHandler {
    (req: Express.Request, res: Express.Response, next: NextFunction): any;
  }
}
