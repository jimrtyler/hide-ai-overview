# Hide AI Overview - Chrome Extension

A simple Chrome extension that removes Google's AI Overview from search results, encouraging students to engage with primary sources.

## Why This Exists

Google's AI Overview provides summarized answers at the top of search results. While convenient, this can:
- Discourage students from evaluating multiple sources
- Reduce critical thinking about information credibility  
- Create over-reliance on AI-generated summaries

This extension silently removes the AI Overview, forcing students to scroll through and evaluate actual sources.

## Installation Options

### Option 1: Manual Install (Single Computer)
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this folder (`hide-ai-overview`)
5. The extension is now active

### Option 2: Google Admin Console (District-Wide Deployment)
For deploying across all managed Chromebooks:

1. **Package the extension:**
   - Zip the contents of this folder
   - Or use Chrome's "Pack extension" feature in `chrome://extensions/`

2. **Upload to Google Admin Console:**
   - Go to admin.google.com
   - Navigate to: Devices → Chrome → Apps & Extensions
   - Select the appropriate OU (students)
   - Click the + icon → "Add Chrome app or extension by ID"
   - For self-hosted: Upload the .crx file to a web server and add the URL
   - Or: Use "Add from file" for testing

3. **Force Install (Recommended):**
   - Set installation policy to "Force install"
   - This prevents students from disabling it

### Option 3: Self-Hosted with update_url
For automatic updates across the district:

1. Host the extension files on your district web server
2. Create an `updates.xml` file (see Google's documentation)
3. Add `"update_url"` to manifest.json pointing to your updates.xml
4. Deploy via Admin Console with the hosted URL

## Icons

You'll need to add two icon files:
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

Any simple icon will work - even just a red "X" or a magnifying glass.

## Testing

1. Install the extension
2. Search for something that typically shows AI Overview (e.g., "what is photosynthesis")
3. The AI Overview should not appear - only regular search results

## Troubleshooting

**AI Overview still showing:**
- Google frequently changes their DOM structure
- Check browser console for errors
- The extension may need selector updates

**Extension not loading:**
- Verify manifest.json has no syntax errors
- Check that all files are in the same folder
- Try removing and re-adding the extension

## Updating Selectors

Google may change their HTML structure. If AI Overview starts appearing again:

1. Right-click the AI Overview → Inspect
2. Look for unique attributes (data-*, jsname, etc.)
3. Add new selectors to both `hide-ai.css` and `hide-ai.js`

## Alternative: uBlock Origin

If you already have uBlock Origin deployed, you can add custom filters instead:

```
! Hide Google AI Overview
google.com##div[data-attrid="AIOverview"]
google.com##div[jsname="N760b"]
google.com##div:has(> div > h2:has-text("AI Overview"))
```

## License

Free to use, modify, and distribute for educational purposes.

---

Created for Niles Community Schools
Questions? Contact Jim Tyler - Director of Technology
