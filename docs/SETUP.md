# Setup Guide

## Quick Start

### Option 1: Direct File Opening (Easiest)
1. Navigate to the project folder
2. Right-click `index.html`
3. Select "Open with" → Choose your browser
4. App loads immediately

### Option 2: Using a Local Server
For development with live reload or to avoid CORS issues:

**Using Python 3:**
```bash
cd "path/to/Copilot Trial"
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Using Node.js (http-server):**
```bash
npm install -g http-server
http-server "path/to/Copilot Trial"
```
Then open: `http://localhost:8080`

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## System Requirements

### Minimum
- Modern web browser (2019+)
- No installation required
- No backend server needed

### Supported Browsers
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️  IE 11 (limited - no particles)

---

## File Modifications

### Accessing the Code
1. **index.html** - Open with text editor
2. **script.js** - Open with text editor or IDE
3. **Docs** - Open markdown files with any text editor or markdown viewer

### Edit & Test Workflow
1. Edit HTML/CSS/JS files
2. Save changes
3. Refresh browser (F5 or Cmd+R)
4. Changes apply immediately

---

## Troubleshooting

### Issue: App doesn't load
**Solution:** 
- Clear browser cache (Ctrl+Shift+Delete)
- Try in Incognito/Private window
- Check browser console for errors (F12)

### Issue: Tasks don't save
**Solution:**
- Check if localStorage is enabled
- Disable browser extensions that block storage
- Try different browser
- Check privacy mode (often disables localStorage)

### Issue: Particles not showing
**Solution:**
- Particles.js might not load from CDN
- Check internet connection
- No particles in IE 11 (expected)
- Check browser console (F12) for network errors

### Issue: Data lost after refresh
**Solution:**
- localStorage might be disabled
- Try enabling in browser settings
- Clear cookies/cache and try again

---\n\n## Configuration

### Customization Options

#### Change Particle Colors
In `script.js`, modify the `particlesJS` configuration:
```javascript\nparticlesJS('particles-js', {
    particles: {
        color: {
            value: '#ff0000'  // Change this color
        },
        ...
    }
});
```

#### Adjust Number of Particles
```javascript
number: {
    value: 80  // Increase for more, decrease for fewer
}
```

#### Modify Priority Colors
In `index.html`, find the CSS section:
```css
.todo-item.priority-high {
    border-left-color: #ff5f7a;  /* Change red */
}

.todo-item.priority-medium {
    border-left-color: #ffc93c;  /* Change yellow */
}

.todo-item.priority-low {
    border-left-color: #4caf50;  /* Change green */
}
```

---

## Development Tools

### Recommended Editor Setup
1. **VS Code**
   - Extensions: Live Server, Prettier, ES7+ snippets
   - F5 to launch Live Server
   - Cmd+S to auto-format

2. **Browser DevTools**
   - Open with F12
   - Console tab for errors
   - Application → localStorage to view saved data
   - Network tab to verify particles.js loads

### Debugging Tips
- Use `console.log()` in script.js for debugging
- Open DevTools (F12) → Console to see logs
- Check Network tab for failed resource loads
- Use Application → localStorage to inspect saved tasks

---

## Deployment

### GitHub Pages
1. Create GitHub repo
2. Push these files to main branch
3. Go to Settings → Pages
4. Select main branch as source
5. Site will be live at `username.github.io/repo-name`

### Netlify
1. Connect your GitHub repo
2. Build command: (leave empty)
3. Publish directory: (leave empty or `.`)
4. Deploy

### Any Static Host
- Upload all files to your host
- No build step needed
- No server-side code required

---

## Performance

### Optimization Tips
- Particle count: 80 is balanced for performance
- Large task lists (100+) may slow down editing
- localStorage has ~5-10MB limit (more than enough)

### Browser Performance
- App uses minimal CPU
- Particles.js handles animations efficiently
- No network requests after initial page load (except CDN)

---

## Security Notes

- All data stored locally in browser
- No data sent to servers
- Safe for personal/private use
- particles.js loaded from trusted CDN

---

## Getting Help

1. Check `docs/` folder for detailed documentation
2. Review comments in `script.js`
3. Check browser console (F12) for errors
4. Refer to API.md for function references
