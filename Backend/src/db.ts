import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    index: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

const tagsSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  }
}, {
  timestamps: true
});

const contentSchema = new Schema({
  link: { 
    type: String, 
    trim: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['youtube', 'twitter', 'note'],
    index: true
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  tags: [{ 
    type: ObjectId, 
    ref: 'tags' 
  }],
  userId: { 
    type: ObjectId, 
    ref: 'users', 
    required: true,
    index: true 
  },
  content: { 
    type: String,
    trim: true 
  },
  fileUrl: { 
    type: String,
    trim: true 
  },
  fileName: { 
    type: String,
    trim: true 
  }
}, {
  timestamps: true
});

contentSchema.index({ userId: 1, createdAt: -1 });

const linkSchema = new Schema({
  hash: { 
    type: String, 
    required: true,
    unique: true,
    index: true 
  },
  userId: { 
    type: ObjectId, 
    ref: 'users', 
    required: true,
    unique: true 
  }
}, {
  timestamps: true
});

export const User = model('users', userSchema);
export const Content = model('contents', contentSchema);
export const Tags = model('tags', tagsSchema);
export const Link = model('links', linkSchema);

