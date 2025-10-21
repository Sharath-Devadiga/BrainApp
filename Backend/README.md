# Brain App - Backend

A production-ready backend API for the Brain App (Second Brain application).

## Features

- 🔐 JWT Authentication with token expiration
- 📁 Cloud file storage with Cloudinary
- 🗄️ MongoDB database with optimized schemas
- 🔒 Secure password hashing with bcrypt
- ✨ Content management (YouTube, Twitter, Notes)
- 🔗 Content sharing with unique links
- 📊 Indexed database queries for performance

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **Security:** bcrypt, CORS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
MONGO_URL='your_mongodb_connection_string'
JWT_SECRET='your_jwt_secret_key'
CLOUDINARY_CLOUD_NAME='your_cloudinary_name'
CLOUDINARY_API_KEY='your_cloudinary_key'
CLOUDINARY_API_SECRET='your_cloudinary_secret'
PORT=3000
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/user/signup` - Create new account
- `POST /api/v1/user/signin` - Sign in

### Content Management
- `GET /api/v1/user/content` - Get all user content
- `POST /api/v1/user/content` - Create content
- `DELETE /api/v1/user/content` - Delete content
- `POST /api/v1/user/upload` - Upload files

### Sharing
- `POST /api/v1/user/brain/share` - Create/remove share link
- `GET /api/v1/user/brain/:shareLink` - Access shared content

## Deployment

### Environment Variables for Production

- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure `FRONTEND_URL` for CORS
- Use production MongoDB cluster

### Recommended Platforms

- **Backend:** Railway, Render, Heroku
- **Database:** MongoDB Atlas
- **Storage:** Cloudinary (already configured)

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token expiration (7 days)
- CORS configuration
- Input validation
- Protected routes with authentication middleware

## License

MIT
