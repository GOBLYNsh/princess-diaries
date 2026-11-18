# The Princess Diaries - A Princess Day Surprise Website

An immersive, Pinterest-inspired digital scrapbook that transforms special moments into an interactive, beautifully designed experience.

## ✨ Features

- **Immersive Landing Page**: Animated entrance with floating hearts and sparkles
- **Interactive Envelope**: Click to reveal personalized messages with smooth animations
- **Personalized Scrapbook**: Polaroid-style photo gallery with realistic shadows and decorations
- **Princess Gallery**: Masonry-style photo display with film photography aesthetics
- **Vintage Letter**: Animated handwritten letter with floating particles
- **Little Things I Love About You**: Interactive collection of reasons with paper note animations
- **Memory Timeline**: Beautiful chronological timeline of cherished moments
- **Interactive Surprises**: Gift box, clickable hearts, virtual bouquet with hidden messages
- **Full Admin Dashboard**: Secure authentication with complete content management
- **Responsive Design**: Mobile-first approach optimized for phone sharing

## 🎨 Design Philosophy

The website is designed to feel like a premium digital scrapbook with:
- Soft blush pink, cream white, champagne beige color palette
- Vintage scrapbook paper textures
- Handwritten typography for personal messages
- Decorative ribbons, bows, and sparkles
- Polaroid-style photo frames with realistic shadows
- Subtle animations that feel intentional and delightful

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom princess-themed colors
- **Animations**: Framer Motion for smooth, premium animations
- **Icons**: Lucide React
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for photo uploads

## 🚀 Quick Start

```bash
# Clone and install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📚 Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions, API documentation, and deployment options.

## 🔧 Database Schema

The project includes a complete PostgreSQL database schema covering:

- `users` - Admin account management
- `website_settings` - Global website configuration
- `photos` - Photo storage with metadata
- `memories` - Personal memory entries
- `letters` - Dynamic letter content
- `reasons` - "Little Things I Love About You" entries
- `timeline_events` - Chronological memory timeline
- `surprise_messages` - Interactive surprise message content

## 🎯 Usage

1. **First Visit**: Visitors land on the main surprise page
2. **Explore**: Navigate through the beautiful sections using the floating navigation
3. **Interact**: Click hearts, open gift boxes, reveal surprises
4. **Share**: The mobile-responsive design works perfectly on phone screens

## 🛡️ Security

- Secure admin authentication via Supabase
- Row Level Security policies on all database tables
- Public read access for photos and settings
- Private admin operations

## 📱 Responsive Design

Mobile-first design ensures:
- Touch-friendly interactions on phones
- Perfect fit on screen sizes from 320px to 1920px
- Optimized navigation for small screens

## 🎁 Creating Your Own Princess Day Website

1. Set up your Supabase instance
2. Import the database schema
3. Upload your personal photos
4. Update the content through the admin dashboard
5. Share the link for a magical Princess Day experience

## ✨ What Makes This Special

Every interaction feels intentional:
- Page transitions are smooth and elegant
- Animations have subtle delays and natural motion
- Decorations appear contextually, never overwhelming
- Content is meaningful and personal
- The overall experience feels like a gift, not just a website

## 📄 License

Created for special occasions and personal use.