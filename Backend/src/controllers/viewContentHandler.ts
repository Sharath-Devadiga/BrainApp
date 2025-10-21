import { Request, Response } from "express";
import { Content } from "../db";

interface AuthRequest extends Request {
  userId?: string;
}

export const viewContentHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ 
        success: false,
        message: "Unauthorized: Authentication required" 
      });
      return;
    }

    const content = await Content.find({ userId: req.userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching content",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
