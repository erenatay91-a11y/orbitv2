# Orbit v7 - Community Platform

A modern community platform for mothers to connect, share, and support each other.

## Features

- 🏘️ **Groups & Communities**: Join groups by category (Support, Food, Local, Career, Sleep, Activities)
- 📱 **Posts & Content**: Create posts with images, videos, and polls
- 💬 **Comments & Engagement**: Like, comment, and interact with community content
- 🔍 **Explore & Discover**: Browse all posts or see content from your joined groups
- 🎯 **For You Feed**: Personalized feed from your joined groups
- 👤 **User Profiles**: Customizable profiles with avatars
- 🛡️ **Admin Panel**: Content moderation, user management, and analytics
- 💾 **Local Storage**: All data persists locally

## Netlify Deployment

This project is ready to deploy on Netlify.

### Quick Deploy

1. **Option 1: Drag & Drop**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the entire `v7` folder

2. **Option 2: Git Integration**
   - Push this repository to GitHub/GitLab/Bitbucket
   - Connect your repository to Netlify
   - Netlify will automatically detect the configuration

3. **Option 3: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Configuration Files

- `netlify.toml`: Netlify build and redirect configuration
- `_redirects`: SPA routing rules
- `_headers`: Security and cache headers

### Important Notes

- The main HTML file is `orbitv7.html`
- All routes redirect to `orbitv7.html` for SPA functionality
- Images use Unsplash CDN with gradient fallbacks
- No build process required - static HTML deployment

### Environment Variables (Optional)

If you want to use Supabase or OpenAI services, create a `.env` file or set environment variables in Netlify:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

Then update `config.supabase.js` and `config.openai.js` to use these variables.

## Local Development

Simply open `orbitv7.html` in a web browser. No build process required.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved


