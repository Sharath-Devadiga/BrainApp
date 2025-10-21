import { Request, Response } from "express";
import { User } from "../db";
import bcrypt from "bcrypt";

export const forgotPasswordHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, newPassword } = req.body;

    if (!username) {
      res.status(400).json({
        success: false,
        message: "Username is required",
      });
      return;
    }

    if (!newPassword) {
      res.status(400).json({
        success: false,
        message: "New password is required",
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Username not found",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now sign in with your new password.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password. Please try again later.",
    });
  }
};
