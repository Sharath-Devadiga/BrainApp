import { Request, Response } from "express";
import { Link } from "../db"; 
import crypto from "crypto"; 

interface AuthRequest extends Request {
  userId?: string; 
}

export const shareHandler = async (req: AuthRequest, res: Response) => {
  try {
    const { share }: { share: boolean } = req.body; 

    if (share) {

      const existingLink = await Link.findOne({ userId: req.userId });
      if (existingLink) {
        res.json({ hash: existingLink.hash });
        return;
      }

      
      const hash = crypto.randomBytes(10).toString("hex");

      
      await Link.create({ userId: req.userId, hash });
      res.json({ hash });
    } else {
      
      await Link.deleteOne({ userId: req.userId });
      res.json({ message: "Removed link" });
    }
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "An error occurred" });
  }
};
