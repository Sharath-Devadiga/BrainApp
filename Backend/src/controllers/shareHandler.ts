import { Request, Response } from "express";
import crypto from "crypto";
import { Link } from "../db";

interface AuthRequest extends Request {
  userId?: string;
}

export const shareHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Authentication required"
      });
      return;
    }

    const { share } = req.body;

    if (share) {
      const existingLink = await Link.findOne({ userId: req.userId });
      
      if (existingLink) {
        res.json({
          success: true,
          hash: existingLink.hash
        });
        return;
      }

      const hash = crypto.randomBytes(10).toString("hex");
      await Link.create({ userId: req.userId, hash });
      
      res.json({
        success: true,
        hash
      });
    } else {
      await Link.deleteOne({ userId: req.userId });
      res.json({
        success: true,
        message: "Share link removed"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error managing share link"
    });
  }
};
