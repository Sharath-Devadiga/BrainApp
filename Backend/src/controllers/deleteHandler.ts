import { Request, Response } from "express"
import { Content } from "../db"

interface AuthRequest extends Request{
    userId? : string
}

export const deleteHandler = async (req: AuthRequest, res: Response) => {
    try{
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized: No userId found" });
            return;
        }

        const { contentId } = req.body;

        if (!contentId) {
            res.status(400).json({ message: "Content ID is required" });
            return;
        }

        const result = await Content.deleteOne({ _id: contentId, userId: req.userId });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }

        res.status(200).json({ message: "Content deleted successfully" });
    } catch(err){
        res.status(500).json({
            message: 'Error while deleting',
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
}