import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
    res.status(401).json({
      message: "Unauthorized"
    });
  }
}
