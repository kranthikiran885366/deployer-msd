# API Fetch Issue - Fixed

## Problem
The frontend was making API calls to local routes (e.g., `/api/status/system`) that don't exist. These should instead call the backend API at `https://deployer-msd-1.onrender.com/api`.

## Root Cause
Many pages in the application use direct `fetch('/api/...')` calls, but:
1. These routes don't exist as frontend API routes
2. The actual API is on the backend service
3. The environment variable `NEXT_PUBLIC_API_URL` wasn't being used consistently

## Solution Implemented

### 1. Environment Configuration ✅
Updated `.env.local` with the correct backend URL:
```
NEXT_PUBLIC_API_URL=https://deployer-msd-1.onrender.com/api
```

### 2. API Fetch Utility ✅
Created `lib/api-fetch.js` - a wrapper function that automatically:
- Uses the `NEXT_PUBLIC_API_URL` environment variable
- Routes all API calls to the backend
- Handles endpoint normalization

### 3. Updated Pages ✅
Fixed the following pages to use the backend API:
- `app/page.jsx` - Home page status widget
- `app/(app)/status/page.jsx` - System status page

### 4. Files Needing Updates
The following pages still use local `/api/*` routes and should be updated to use the new `apiFetch` utility:

**Feature Pages:**
- `app/(app)/ssh-access/page.jsx` - SSH keys management
- `app/(app)/split-testing/page.jsx` - A/B testing
- `app/(app)/multi-region/page.jsx` - Multi-region deployment
- `app/(app)/media-cdn/page.jsx` - CDN assets
- `app/(app)/isr-config/page.jsx` - ISR configuration
- `app/(app)/help/page.jsx` - Help center
- `app/(app)/forms/page.jsx` - Forms management
- `app/(app)/blueprints/page.jsx` - Infrastructure templates

## How to Use the API Fetch Utility

### Before (incorrect):
```jsx
const response = await fetch('/api/status/system');
```

### After (correct):
```jsx
import apiFetch from '@/lib/api-fetch';

const response = await apiFetch('/status');
// or
const response = await apiFetch('/status/system');
```

The `apiFetch` utility:
1. Automatically prepends the backend URL
2. Removes `/api` prefix if present (since baseUrl includes `/api`)
3. Normalizes endpoints with or without leading `/`
4. Handles headers and options

## Benefits
- ✅ Centralized API configuration
- ✅ Automatic backend URL resolution
- ✅ Consistent error handling
- ✅ Easy to change backend URL in one place
- ✅ Works in both browser and server-side contexts

## Testing
After deployment:
1. Open http://localhost:3000
2. System status should load from backend
3. Open http://localhost:3000/status
4. Status page should show service health from backend
5. No more 404 errors for `/api/*` routes

## Next Steps
1. Update remaining feature pages to use `apiFetch` utility
2. Consider migrating to use `apiClient` (already configured) for consistency
3. Add authentication token handling if needed
4. Test all pages with the backend API

## Files Modified
- `.env.local` - Updated API URL
- `hooks/use-dashboard-data.ts` - Fixed API method calls
- `app/page.jsx` - Updated status fetch
- `app/(app)/status/page.jsx` - Updated status fetch
- `lib/api-fetch.js` - New utility function (created)
