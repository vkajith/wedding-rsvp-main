# Deployment Guide for Vercel

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit - Wedding RSVP system"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a React app
   - Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:

   ```bash
   vercel
   ```

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Environment Variables (Optional)

If you need environment variables, add them in the Vercel dashboard:

1. Go to your project in Vercel dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add any variables you need

## Custom Domain (Optional)

1. In your Vercel project dashboard
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Build Configuration

The project is already configured for Vercel with:

- ✅ `vercel.json` configuration file
- ✅ Proper build settings
- ✅ Static file optimization
- ✅ SPA routing support

## Troubleshooting

### Build Issues

- Make sure all dependencies are in `package.json`
- Check that the build command works locally: `npm run build`

### Routing Issues

- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html` for client-side routing

### Performance

- Static assets are cached for 1 year
- The build is optimized for production

## Monitoring

After deployment, you can monitor:

- Build logs in Vercel dashboard
- Performance metrics
- Analytics (if enabled)
- Function logs (if using serverless functions)

## Updates

To update your deployment:

1. Push changes to your GitHub repository
2. Vercel will automatically redeploy
3. Or manually trigger deployment in Vercel dashboard
