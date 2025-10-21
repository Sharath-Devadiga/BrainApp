import { Request, Response } from "express";
import { Content } from "../db";

interface AuthRequest extends Request {
  userId?: string;
}

export const contentHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ 
        success: false,
        message: "Unauthorized: Authentication required" 
      });
      return;
    }

    const { link, type, title, content, fileUrl, fileName } = req.body;

    if (!title || !type) {
      res.status(400).json({
        success: false,
        message: "Title and type are required fields"
      });
      return;
    }

    const newContent = await Content.create({
      link: link || "",
      type,
      title,
      userId: req.userId,
      tags: [],
      content: content || "",
      fileUrl: fileUrl || "",
      fileName: fileName || ""
    });

    res.status(201).json({
      success: true,
      message: "Content added successfully",
      contentId: newContent._id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding content",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};