import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.token as string;

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    let decoded: jwt.JwtPayload | string | undefined;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    } catch (verifyErr) {
      res.status(401).json({ message: 'Invalid token', error: verifyErr });
      return;
    }

    if (decoded && typeof decoded === "object" && "id" in decoded) {
      req.userId = decoded.id as string;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User", error: error });
  }
};
