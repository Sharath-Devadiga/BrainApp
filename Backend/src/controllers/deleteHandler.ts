import { Request, Response } from "express"
import { Content } from "../db"

interface AuthRequest extends Request{
    userId? : string
}

export const deleteHandler = async (req: AuthRequest, res: Response) => {
    try{
        const contentId = req.body.contentId

        await Content.deleteOne({_id: contentId, userId: req.userId});
        res.json({
            message: 'deleted'
        })
    } catch(err){
        res.json({
            message: 'Error while deleting',
            err
           })
    }
}