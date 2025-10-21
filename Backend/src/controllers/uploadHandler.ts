import { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    return {
      folder: 'brainapp/uploads',
      resource_type: 'auto',
      public_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/gif",
    "text/plain",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, DOC, DOCX, JPG, PNG, GIF, TXT are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadHandler = (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ 
        success: false,
        message: "No file uploaded" 
      });
      return;
    }

    const fileUrl = (req.file as any).secure_url || (req.file as any).path;
    const fileName = (req.file as any).original_filename || (req.file as any).originalname;

    if (!fileUrl) {
      res.status(500).json({
        success: false,
        message: "Failed to upload file to cloud storage",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
      fileName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
