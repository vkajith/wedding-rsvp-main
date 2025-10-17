# 📸 Photo Gallery Setup Guide

## 🎯 Quick Start (Using Sample Images)

Your gallery is now set up with beautiful sample images! You can see it working by running:

```bash
npm start
```

The gallery currently uses high-quality Unsplash images as placeholders.

## 🔄 Replace with Your Own Photos

### **Option 1: Direct Image URLs (Easiest)**

1. **Upload your photos to a hosting service:**
   - **Google Photos**: Share → Get Link → Copy image URL
   - **Dropbox**: Right-click → Share → Copy Link
   - **Imgur**: Upload → Copy Direct Link
   - **Cloudinary**: Upload → Copy URL

2. **Update the gallery in `src/components/InvitationPage.js`:**

```javascript
const galleryImages = [
  {
    image: "https://your-photo-url-1.jpg",
    quote: "Your beautiful quote here...",
  },
  {
    image: "https://your-photo-url-2.jpg", 
    quote: "Another lovely quote...",
  },
  // Add more photos...
];
```

### **Option 2: Use Cloudinary (Recommended for Production)**

**Why Cloudinary?**
- ✅ Automatic image optimization
- ✅ Responsive images for different screen sizes
- ✅ CDN delivery (faster loading)
- ✅ Free tier available (25GB storage)

**Setup Steps:**

1. **Sign up for Cloudinary:**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Create free account
   - Get your cloud name from dashboard

2. **Upload your photos:**
   - Go to Media Library in Cloudinary
   - Upload your wedding photos
   - Copy the public URLs

3. **Update your gallery:**
```javascript
const galleryImages = [
  {
    image: "https://res.cloudinary.com/your-cloud-name/image/upload/w_800,h_600,c_fill,f_auto/your-photo-1.jpg",
    quote: "Your quote here...",
  },
  // More photos...
];
```

### **Option 3: Store Photos in Public Folder**

1. **Add photos to `public/images/` folder:**
   ```
   public/
   ├── images/
   │   ├── gallery-1.jpg
   │   ├── gallery-2.jpg
   │   └── gallery-3.jpg
   ```

2. **Update gallery with local paths:**
```javascript
const galleryImages = [
  {
    image: "/images/gallery-1.jpg",
    quote: "Your quote here...",
  },
  {
    image: "/images/gallery-2.jpg",
    quote: "Another quote...",
  },
  // More photos...
];
```

## 🎨 Photo Guidelines

### **Recommended Photo Specifications:**
- **Aspect Ratio**: 4:3 or 16:9 (landscape works best)
- **Resolution**: 1200x800px minimum
- **File Size**: Under 2MB per photo
- **Format**: JPG or WebP
- **Quality**: High resolution, well-lit photos

### **Photo Ideas for Wedding Gallery:**
- 💕 Engagement photos
- 💒 Venue shots
- 🌸 Detail photos (rings, flowers, decorations)
- 👫 Candid moments
- 🌅 Scenic backgrounds
- 💑 Couple portraits

## 🔧 Advanced Customization

### **Add More Photos:**
Simply add more objects to the `galleryImages` array:

```javascript
const galleryImages = [
  // Existing photos...
  {
    image: "https://your-new-photo.jpg",
    quote: "New beautiful quote...",
  },
  // Add as many as you want!
];
```

### **Change Gallery Timing:**
Update the auto-play speed in `InvitationPage.js`:

```javascript
// Change 4000 to desired milliseconds (currently 4 seconds)
const interval = setInterval(() => {
  setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
}, 4000); // Change this number
```

### **Add Photo Captions:**
You can add captions by modifying the gallery structure:

```javascript
const galleryImages = [
  {
    image: "https://your-photo.jpg",
    quote: "Your quote...",
    caption: "Engagement Photo - 2024", // Add this
  },
];
```

Then update the display to show captions:

```javascript
<p className="text-lg text-white/90 mb-4 drop-shadow-lg">
  {img.caption}
</p>
<p className="text-3xl md:text-4xl font-elegant text-white italic leading-relaxed drop-shadow-lg">
  "{img.quote}"
</p>
```

## 🚀 Performance Tips

### **Optimize Images:**
- **Compress photos** before uploading (use tools like TinyPNG)
- **Use WebP format** when possible (smaller file sizes)
- **Resize images** to appropriate dimensions (800x600px is perfect)

### **Loading Optimization:**
- **Lazy loading**: Images load as needed
- **Progressive loading**: Low-quality placeholder while loading
- **CDN delivery**: Use Cloudinary or similar service

## 🎭 Styling Customization

### **Change Overlay Opacity:**
```javascript
// In the gallery display code, change this line:
<div className="absolute inset-0 bg-black/30"></div>
// Change /30 to /20 for lighter overlay, /50 for darker
```

### **Change Text Styling:**
```javascript
// Modify the quote text styling:
<p className="text-3xl md:text-4xl font-elegant text-white italic leading-relaxed drop-shadow-lg">
  "{img.quote}"
</p>
```

### **Add Animation Effects:**
```javascript
// Add fade-in animation to quotes:
<p className="text-3xl md:text-4xl font-elegant text-white italic leading-relaxed drop-shadow-lg animate-fade-in">
  "{img.quote}"
</p>
```

## 🔍 Troubleshooting

### **Images Not Loading:**
1. **Check URL format**: Make sure URLs are complete and accessible
2. **Test URLs**: Open image URLs directly in browser
3. **Check CORS**: Some hosting services block cross-origin requests
4. **Use HTTPS**: Ensure image URLs use HTTPS

### **Slow Loading:**
1. **Compress images**: Reduce file sizes
2. **Use CDN**: Host images on Cloudinary or similar
3. **Optimize dimensions**: Don't use oversized images

### **Mobile Issues:**
1. **Test on mobile**: Check how images look on phones
2. **Responsive images**: Use different sizes for different screens
3. **Touch gestures**: Gallery supports touch navigation

## 📱 Mobile Optimization

The gallery is fully responsive and works great on mobile devices:
- **Touch navigation**: Swipe to change photos
- **Auto-play**: Pauses when user interacts
- **Responsive text**: Scales appropriately on small screens
- **Fast loading**: Optimized for mobile networks

## 🎉 You're All Set!

Your photo gallery is now ready! The current setup includes:
- ✅ Beautiful sample images
- ✅ Smooth transitions
- ✅ Auto-play functionality
- ✅ Mobile responsive
- ✅ Easy to customize

Just replace the sample images with your own photos and you're ready to go!

---

**Need Help?** Check the main `SUPABASE_SETUP.md` guide or test your setup with `npm start`.
