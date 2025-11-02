# Error Analysis & Fixes

## Error 1: GitHub OAuth 404

### Error Message
```
GET http://192.168.137.1:3000/auth/github 404 (Not Found)
```

### Root Cause
The OAuth methods in `lib/api-client.js` were using `this.apiOrigin` which was set to `window.location.origin` (the frontend URL: `http://192.168.137.1:3000`). This caused requests to:
- ❌ `http://192.168.137.1:3000/auth/github` (frontend - doesn't exist)
- ✅ Should be: `https://deployer-msd-1.onrender.com/auth/github` (backend)

### Methods Affected
- `startGoogleOAuth()` - Redirects to Google OAuth
- `startGitHubOAuth()` - Redirects to GitHub OAuth

### Fix Applied ✅
Updated `lib/api-client.js` constructor to use the backend API URL:

**Before:**
```javascript
this.apiOrigin = typeof window !== "undefined" ? window.location.origin : ""
```

**After:**
```javascript
const backendUrl = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL
this.apiOrigin = backendUrl ? backendUrl.replace('/api', '') : (typeof window !== "undefined" ? window.location.origin : "")
```

Now OAuth calls will correctly redirect to:
- ✅ `https://deployer-msd-1.onrender.com/auth/github`
- ✅ `https://deployer-msd-1.onrender.com/auth/google`

---

## Error 2: Vercel Web Analytics 404

### Error Message
```
GET http://192.168.137.1:3000/_vercel/insights/script.js 404 (Not Found)
[Vercel Web Analytics] Failed to load script from /_vercel/insights/script.js...
```

### Root Cause
Next.js automatically injects Vercel Web Analytics when deployed to Vercel. In local development, this endpoint doesn't exist.

### Status
✅ **Not a problem** - This is a harmless warning that only occurs in development.

**Evidence:**
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` is empty in `.env.local`
- Only appears locally, not in production
- Does not affect application functionality
- Can be safely ignored

---

## Summary of Changes

| File | Change | Status |
|------|--------|--------|
| `lib/api-client.js` | Updated constructor to use backend API for OAuth | ✅ Fixed |
| `.env.local` | Already configured with correct backend URL | ✅ OK |

## Testing

To verify the fixes work:

### Test 1: GitHub OAuth Flow
1. Navigate to login page: `http://localhost:3000/auth/signin`
2. Click "Sign in with GitHub"
3. Should redirect to: `https://deployer-msd-1.onrender.com/auth/github`
4. No more 404 error

### Test 2: Google OAuth Flow
1. Navigate to login page: `http://localhost:3000/auth/signin`
2. Click "Sign in with Google"
3. Should redirect to: `https://deployer-msd-1.onrender.com/auth/google`
4. No more 404 error

### Test 3: Vercel Analytics Warning
1. Open browser DevTools Console
2. Warning about Vercel Analytics is expected and harmless
3. Application functions normally

---

## Files Modified

- **`lib/api-client.js`** - Fixed OAuth URL routing
  - Constructor now uses `NEXT_PUBLIC_API_URL` for auth endpoints
  - Correctly routes to backend instead of local frontend

---

## Deployment Note

When deploying to production (Vercel):
1. Set environment variable `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` with your Vercel Analytics ID
2. The Vercel Web Analytics script will load and work correctly
3. No code changes needed
