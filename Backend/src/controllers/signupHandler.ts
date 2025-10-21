import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signupHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
      return;
    }

    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Username already exists"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};