import { Request, Response } from "express";
import { Content } from "../db";

interface AuthRequest extends Request {
  userId?: string;
}

export const deleteHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ 
        success: false,
        message: "Unauthorized: Authentication required" 
      });
      return;
    }

    const { contentId } = req.body;

    if (!contentId) {
      res.status(400).json({ 
        success: false,
        message: "Content ID is required" 
      });
      return;
    }

    const result = await Content.deleteOne({ 
      _id: contentId, 
      userId: req.userId 
    });

    if (result.deletedCount === 0) {
      res.status(404).json({ 
        success: false,
        message: "Content not found or unauthorized" 
      });
      return;
    }

    res.status(200).json({ 
      success: true,
      message: "Content deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting content",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};