import { Request, Response } from "express";
import { Content } from "../db";

interface AuthRequest extends Request {
    userId?: string;
}

export const viewContentHandler = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
         res.status(401).json({ message: "Unauthorized: No userId found" });
         return
        }

        const content = await Content.find({ userId }).populate('userId', 'username');

        res.status(200).json(content);
    } catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({
            message: "Error occurred while fetching content.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
