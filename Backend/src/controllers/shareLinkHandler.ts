import { Request, Response } from "express";
import { Link, Content, User } from "../db";

export const shareLinkHandler = async (req: Request, res: Response) => {
  try {
    const shareLink = req.params.shareLink;

    if (!shareLink) {
        res.status(400).json({ message: "Share link is required" });
        return;
    }

    // Find the link using the provided hash.
    const link = await Link.findOne({ hash: shareLink });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" });
        return;
    }

    // Fetch user first since we need to verify user exists
    const user = await User.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    // Add a limit to prevent excessive data fetching
    const content = await Content.find({ userId: link.userId }).limit(50);
    
    if (!content || content.length === 0) {
        res.status(404).json({ message: "No content found" });
        return;
    }

    res.json({
        username: user.username,
        content
    });
  } catch (err) {
    console.error('Error in shareLinkHandler:', err instanceof Error ? err.message : 'Unknown error');
    res.status(500).json({ message: "An error occurred" });
  }
};