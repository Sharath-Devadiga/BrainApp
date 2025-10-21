import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signinHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
      return;
    }

    const user = await User.findOne({ username });
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      message: "Signed in successfully",
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};