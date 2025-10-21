import { Request, Response } from "express";
import { Link, Content, User } from "../db";

export const shareLinkHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shareLink } = req.params;

    if (!shareLink) {
      res.status(400).json({
        success: false,
        message: "Share link is required"
      });
      return;
    }

    const link = await Link.findOne({ hash: shareLink });
    
    if (!link) {
      res.status(404).json({
        success: false,
        message: "Invalid share link"
      });
      return;
    }

    const user = await User.findOne({ _id: link.userId });
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    const content = await Content.find({ userId: link.userId })
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      username: user.username,
      content
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching shared content"
    });
  }
};