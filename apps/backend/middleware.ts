import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      email: string;
    }
  }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    req.email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
}
