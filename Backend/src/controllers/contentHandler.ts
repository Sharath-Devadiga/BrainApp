import { Request, Response } from "express"
import { Content } from "../db"


interface AuthRequest extends Request {
    userId?: string;
  } 

export const contentHandler = async (req: AuthRequest, res: Response) => {
    try{

        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized: No userId found" });
            return
        }

        const {link,type,title,tags = []} = req.body



        await Content.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []
        })
        res.json({
            message: 'Your content added!'
        })

        
    } catch(err){
       res.json({
        message: 'Error while adding content',
        err
       })
    }
}