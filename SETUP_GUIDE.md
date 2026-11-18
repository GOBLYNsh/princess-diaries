# The Princess Diaries - Setup Guide

A beautiful, personalized Princess Day experience website for making someone feel like a real-life princess.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Deployment](#deployment)
8. [Customization](#customization)

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18.17 or later)
- **npm** or **yarn**
- **Git**
- **Supabase account** (free tier is sufficient)

## Project Setup

1. Clone the repository or copy the project files:

```bash
cd princess-diaries
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up Tailwind CSS (if not already configured):

```bash
npx tailwindcss init -p
```

## Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)

2. Enable the **Auth** module and configure it for **Email authentication**

3. Create the database tables using the schema below (see [Database Setup](#database-setup))

4. Configure Storage for photo uploads:

   - Go to **Storage** in your Supabase dashboard
   - Create a new bucket called `photos`
   - Set the bucket to **Public**
   - Configure upload rules:
     - Allowed file types: `image/png, image/jpeg, image/webp`
     - File size limit: 10MB

5. Enable **Row Level Security** on all tables

6. Set up policies for public read access:

   ```sql
   -- Allow public read access to photos
   CREATE POLICY "Public photos viewable" ON photos
   FOR SELECT USING (is_public = true);

   -- Allow authenticated users to manage their content
   CREATE POLICY "Admins can manage photos" ON photos
   FOR ALL TO admin USING (true);
   ```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Getting your keys:

1. In your Supabase dashboard, go to **Settings > API**
2. Copy the **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Copy the **service_role** key for `SUPABASE_SERVICE_ROLE_KEY`
4. Your project URL is in the format: `https://your-project-ref.supabase.co`

## Database Setup

Run the SQL schema file to create all tables:

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Click **New table** for each table, or run the full schema from **SQL Editor**

### Quick Setup Commands:

```sql
-- Run the complete schema
\i database/schema.sql

-- Or create tables individually
-- Users table (for admin authentication)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    role TEXT CHECK (role IN ('admin', 'user')) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website settings
CREATE TABLE website_settings (
    id SERIAL PRIMARY KEY,
    recipient_name TEXT NOT NULL DEFAULT 'Princess',
    princess_title TEXT DEFAULT 'My Dear Princess',
    welcome_message TEXT DEFAULT 'Welcome!',
    letter_content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Sample Data:

After creating tables, insert sample data:

```sql
-- Create an admin user
INSERT INTO users (email, role) VALUES ('admin@princessdiaries.com', 'admin');

-- The schema.sql file already includes sample data for other tables
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Deployment

### Recommended: Vercel Deployment

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and create a new project

3. Connect your repository

4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

5. Set the **Build Command**: `npm run build`
6. Set the **Output Directory**: `.next`

### Alternative: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## Customization

### Updating Content

1. **Login to Admin Dashboard**: Visit `/admin/login` and use your admin credentials

2. **Edit Website Settings**:
   - Recipient name
   - Welcome message
   - Letter content

3. **Manage Photos**:
   - Upload new photos
   - Edit captions
   - Delete or reorder

4. **Edit Reasons**: Modify the "Little Things I Love About You" content

5. **Update Timeline**: Add/edit/remove memory entries

6. **Change Surprise Messages**: Update interactive message content

### Adding Themes

You can customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Customize the princess color palette
      'blush-pink': { /* ... */ },
      'champagne': { /* ... */ },
      // etc.
    },
  },
}
```

## API Endpoints

The application exposes these API routes:

### Public Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/settings` | GET | Get website settings |
| `/api/photos` | GET | Get public photos |
| `/api/reasons` | GET | Get reasons |
| `/api/timeline` | GET | Get timeline events |
| `/api/letters` | GET | Get letter content |
| `/api/surprise-messages` | GET | Get surprise messages |

### Admin Routes (requires authentication)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/photos` | POST | Upload new photo |
| `/api/admin/photos/[id]` | PUT | Update photo |
| `/api/admin/photos/[id]` | DELETE | Delete photo |
| `/api/admin/settings` | PUT | Update website settings |
| `/api/admin/reasons` | POST | Add new reason |
| `/api/admin/timeline` | POST | Add timeline event |

## Security Notes

- All API endpoints are protected with Supabase authentication
- Row Level Security policies are enforced
- Public data is accessible without authentication
- Admin operations require valid session tokens
- File uploads are validated for type and size

## Troubleshooting

### Common Issues

1. **Images not loading**: Check that your Supabase Storage bucket is public
2. **Database errors**: Verify all tables and policies are created correctly
3. **Authentication failing**: Ensure the admin user exists in the users table
4. **CSS not loading**: Check that Tailwind is properly configured

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify your environment variables are correct
3. Ensure Supabase connections are working
4. Review the database schema and permissions

## License

This project is created for personal use as a Princess Day surprise website. Feel free to customize and use for special occasions.