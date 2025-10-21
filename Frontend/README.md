# Brain App - Frontend

A modern, responsive React application for managing your second brain - save, organize, and share YouTube videos, tweets, and notes.

## Features

- 🎨 Modern, clean UI with Tailwind CSS
- 📱 Fully responsive design
- 🔐 Secure authentication
- 📝 Content management (YouTube, Twitter, Notes)
- 📁 File upload with cloud storage
- 🔍 Content filtering by type
- 🔗 Share collections with unique links
- ⚡ Fast and optimized performance

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend API running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables:
```env
VITE_API_URL='http://localhost:3000/api/v1'
```

### Development

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── Icons/          # Icon components
├── api.ts          # API client configuration
├── config.ts       # App configuration
└── App.tsx         # Main app component
```

## Key Features

### Content Types
- **YouTube:** Embedded video players
- **Twitter:** Native tweet embeds
- **Notes:** Text content with file attachments

### File Upload
- Images (JPG, PNG, GIF)
- Documents (PDF, DOC, DOCX)
- Text files (TXT)
- Max file size: 10MB

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Optimized for all screen sizes



### Environment Variables for Production

Set `VITE_API_URL` to your production backend URL.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting
- Lazy loading
- Optimized bundle size
- Fast page loads

