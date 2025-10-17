# Supabase Setup Guide for Wedding RSVP

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `wedding-rsvp`
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your location
6. Click "Create new project"
7. Wait for project to be ready (2-3 minutes)

### Step 2: Create Database Table

1. In your Supabase dashboard, go to **Table Editor**
2. Click **"New table"**
3. Configure the table:
   - **Name**: `rsvps`
   - **Description**: `Wedding RSVP responses`
4. Add these columns:

| Column Name | Type | Default Value | Nullable |
|-------------|------|---------------|----------|
| `id` | `uuid` | `gen_random_uuid()` | ❌ |
| `name` | `text` | - | ❌ |
| `phone` | `text` | - | ✅ |
| `status` | `text` | - | ❌ |
| `guests` | `int4` | - | ❌ |
| `wedding` | `bool` | `false` | ❌ |
| `reception` | `bool` | `false` | ❌ |
| `message` | `text` | - | ✅ |
| `created_at` | `timestamptz` | `now()` | ❌ |

5. Click **"Save"**

### Step 3: Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### Step 4: Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   REACT_APP_ADMIN_PASSWORD=your_secure_password
   ```

### Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm start
   ```

2. Test RSVP submission:
   - Go to `http://localhost:3000`
   - Fill out and submit an RSVP
   - Check Supabase dashboard → Table Editor → `rsvps` table

3. Test admin dashboard:
   - Go to `http://localhost:3000/admin`
   - Login with your password
   - Verify data appears in the dashboard

## 🔒 Security Configuration

### Row Level Security (RLS)

1. In Supabase dashboard, go to **Authentication** → **Policies**
2. Click **"New Policy"** for the `rsvps` table
3. Create these policies:

**Policy 1: Allow public inserts**
- **Policy name**: `Allow public to insert RSVPs`
- **Operation**: `INSERT`
- **Target roles**: `public`
- **Policy definition**: `true`

**Policy 2: Allow public to read all RSVPs**
- **Policy name**: `Allow public to read RSVPs`
- **Operation**: `SELECT`
- **Target roles**: `public`
- **Policy definition**: `true`

### Enable RLS
1. Go to **Table Editor** → `rsvps` table
2. Click the **"RLS"** toggle to enable Row Level Security

## 🚀 Deploy to Vercel

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `REACT_APP_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `REACT_APP_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
| `REACT_APP_ADMIN_PASSWORD` | `your_secure_password` | Production, Preview, Development |

### Step 2: Deploy
```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

Vercel will automatically deploy with your environment variables!

## 📊 Database Management

### Viewing Data
- **Supabase Dashboard**: Real-time data viewing
- **Admin Panel**: `https://your-domain.vercel.app/admin`
- **CSV Export**: Available in admin dashboard

### Backup
- Supabase automatically backs up your data
- You can also export data via CSV from admin panel
- For additional backup, use Supabase CLI

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid API key"**
   - Check your environment variables
   - Ensure you're using the `anon` key, not `service_role`

2. **"Permission denied"**
   - Check RLS policies are enabled
   - Verify policy definitions

3. **"Table doesn't exist"**
   - Check table name is exactly `rsvps`
   - Verify all columns exist

4. **Data not appearing**
   - Check browser console for errors
   - Verify Supabase connection in Network tab

### Testing Connection:
```javascript
// Add this to your browser console to test
import { supabase } from './src/utils/supabase';
supabase.from('rsvps').select('*').then(console.log);
```

## 📈 Monitoring

### Supabase Dashboard
- Real-time metrics
- Database performance
- API usage statistics

### Vercel Analytics
- Page views
- Performance metrics
- Error tracking

## 🎉 You're Ready!

Your wedding RSVP system now has:
- ✅ **Real-time database** (Supabase)
- ✅ **Automatic backups**
- ✅ **Scalable infrastructure**
- ✅ **Admin dashboard**
- ✅ **CSV export**
- ✅ **Production ready**

All RSVP data is now stored securely in Supabase and accessible from anywhere!
