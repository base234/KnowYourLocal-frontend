# Environment Setup for Google Maps

## Quick Fix for Blank White Screen

The blank white screen indicates that the Google Maps API key is missing or invalid. Follow these steps:

### 1. Create Environment File

Create a `.env` file in your project root (same level as `package.json`):

```bash
# Windows (PowerShell)
New-Item -Path ".env" -ItemType File

# Or manually create .env file in your project root
```

### 2. Add Your API Key

Add this line to your `.env` file:

```env
VITE_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with your real Google Maps API key.

### 3. Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the generated key

### 4. Restart Development Server

After creating the `.env` file:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### 5. Verify Setup

The debug info in the top-left of the map should show:
- ✅ API Key: ✅ Set
- Center: coordinates
- Zoom: 10

### Common Issues

1. **File Location**: `.env` must be in project root (same folder as `package.json`)
2. **File Name**: Must be exactly `.env` (not `.env.txt` or `.env.local`)
3. **Variable Name**: Must start with `REACT_APP_`
4. **Restart Required**: Dev server must be restarted after adding `.env`
5. **API Enabled**: Ensure required APIs are enabled in Google Cloud Console

### Test Your API Key

You can test your API key by visiting:
```
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places
```

Replace `YOUR_API_KEY` with your actual key. You should see JavaScript code, not an error.

### Need Help?

If you still see a blank screen:
1. Check browser console for errors
2. Verify API key is correct
3. Ensure APIs are enabled
4. Check API key restrictions
5. Restart development server
