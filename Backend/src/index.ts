import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use("/api/v1/user", userRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is required");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("✓ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("✗ Database connection failed:", err);
    process.exit(1);
  }
};

connectDB();