import { User } from "../db"
import { Request, Response } from "express"
import  jwt  from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET as string;
import bcrypt from 'bcrypt'


export const signinHandler = async (req: Request, res: Response) => {
    try{
        const {username,password} = req.body
        const doesUserExists = await User.findOne({
            username
        })
        if( !doesUserExists ){
            res.status(400).json({
                msg: 'User does not exist'
            })
            return
        }

        const checkPassword = await bcrypt.compare(password,doesUserExists.password)
        if(!checkPassword){
            res.status(400).json({
                msg: "invalid password"
            })
            return
        }

        const token = jwt.sign({
            id: doesUserExists._id
        },JWT_SECRET)

        res.json({
            message: 'You have succesfully signed up!',
            token
        })
    } catch(err){
        res.status(500).json({
            msg: "Internal server error"
        })
        console.error("Error while signup", err)
    }
}