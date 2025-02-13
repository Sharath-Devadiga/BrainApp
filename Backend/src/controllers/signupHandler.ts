import { Request,Response } from "express";
import {User} from '../db'
import bcrypt from 'bcrypt';



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

    res.status(200).json({
      msg: "Signup successfully!",
  })
  } catch(err){
    console.error('Error during signup:', err);    res.status(500).json({
      msg: "Internal server error"
  })
  }
}