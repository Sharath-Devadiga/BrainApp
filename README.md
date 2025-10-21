# 🧠 Brain App

A full-stack application for managing your "second brain" - save, organize, and share YouTube videos, tweets, notes, and files with cloud storage.

## 🌟 Features

- **Multi-format Content:** YouTube videos, Twitter posts, and notes with attachments
- **Cloud Storage:** File and image uploads via Cloudinary
- **Content Filtering:** Filter by content type
- **Share Collections:** Generate unique shareable links
- **Secure Authentication:** JWT-based auth with password hashing
- **Responsive Design:** Works seamlessly on all devices
- **Professional UI:** Clean, modern interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (File Storage)
- bcrypt (Password Security)

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB database
- Cloudinary account

### Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
# Configure .env with your credentials
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
cp .env.example .env
# Set VITE_API_URL
npm run dev
```

Visit `http://localhost:5173` to see the app!

## 📁 Project Structure

```
BrainApp/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth middleware
│   │   ├── routes/           # API routes
│   │   ├── db.ts            # Database schemas
│   │   └── index.ts         # App entry point
│   ├── .env.example
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/          # Page components
    │   ├── hooks/          # Custom hooks
    │   ├── Icons/          # Icon components
    │   └── App.tsx         # Main app
    ├── .env.example
    └── package.json
```

## 🔒 Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- CORS configuration
- Input validation
- Protected API routes
- Secure file uploads


## 🎨 UI Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Loading states and error messages
- Responsive grid layouts
- Twitter/YouTube embeds
- Image/PDF previews
- Professional cards and modals

## 📝 Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


---

