import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.token as string || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication token required"
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if (decoded && typeof decoded === "object" && "id" in decoded) {
      req.userId = decoded.id as string;
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Token expired"
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }
  }
};
