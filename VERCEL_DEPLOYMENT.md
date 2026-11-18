# Vercel Deployment Guide - The Princess Diaries

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. Push your code to GitHub:
```bash
# Clone your repo
git clone https://github.com/GOBLYNsh/princess-diaries.git
cd princess-diaries

# Add files and commit
git add .
git commit -m "Initial commit: The Princess Diaries"
git push origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository `GOBLYNsh/princess-diaries`
4. Configure environment variables:

| Variable Name | Value |
|---------------|-------|
| NEXT_PUBLIC_SUPABASE_URL | https://your-project.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | your-anon-key |
| SUPABASE_SERVICE_ROLE_KEY | your-service-role-key |

5. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🔧 Environment Variables

Add these environment variables in Vercel Dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-supabase-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

## 📊 Build Settings

Verify these settings in Vercel:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Dev Command**: `npm run dev`

## 🗄️ Database Setup for Production

1. Create a Supabase project at https://supabase.com
2. Run `push_database.sql` in Supabase SQL Editor
3. Create Storage bucket `photos` and make it public
4. Update environment variables in Vercel

## ⚙️ API Routes

All pages use Next.js App Router. The following routes are available:

- `/` - Homepage with all sections
- No additional API routes needed (data fetched via Supabase client)

## 🌐 Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records with your registrar

## 🔄 Automatic Deployments

Every push to `main` branch will automatically deploy to Vercel.

## 🛠️ Troubleshooting

### Build Failed
- Check environment variables are set correctly
- Verify Supabase project is accessible
- Check build logs in Vercel Dashboard

### Image Loading Issues
- Ensure Supabase Storage bucket is public
- Verify image URLs are accessible

### API Errors
- Check Supabase project URL and keys
- Verify database schema is deployed

## 📱 Production Checklist

- [ ] GitHub repo pushed
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Database schema deployed
- [ ] Storage bucket created
- [ ] First production build successful
- [ ] Test on mobile device