import { Request,Response } from "express";
import {User} from '../db'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;



export const signupHandler = async (req: Request,res: Response) => {
  try{
    const {username,password} = req.body
    
    if(!username || !password){
      res.json({
        message: 'Username and Password are required'
      })
      return;
    }

    const existingUser = await User.findOne({username})
    if(existingUser){
      res.json({
        message: 'Username already exits'
      })
      return;
    }

    const hashPassword = await bcrypt.hash(password,5)

    const newUser = await User.create({
      username,
      password: hashPassword
    })

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    res.status(200).json({
      msg: "Signup successfully!",
    })
  } catch(err){
    res.status(500).json({
      msg: "Internal server error"
  })
  }
}