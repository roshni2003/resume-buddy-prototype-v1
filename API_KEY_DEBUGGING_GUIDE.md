# API Key Debugging Guide

## Changes Made to Fix the Issue

### 1. Added Page Reload
The dialog now automatically reloads the page after saving the API key to ensure all cached instances are cleared and the new key is picked up.

### 2. Added Debug Logging
Both AI service files now log which API key they're using:
- `/src/utils/ai-service.ts` - Logs the first 10 characters of the API key being used
- `/src/integrations/orpc/services/ai.ts` - Logs the first 10 characters of the API key being used

### 3. Added Current Key Display
The dialog now shows:
- The current saved API key (first 15 characters)
- A "Clear Current Key" button to remove the saved key

## How to Debug

### Step 1: Check Browser Console
1. Open the dashboard page
2. Open browser DevTools (F12 or right-click → Inspect)
3. Go to the Console tab
4. Try to use an AI feature (generate experience description, etc.)
5. Look for these log messages:
   - `"Using API key from localStorage: AIzaSy..."` - Good! Using your custom key
   - `"Using API key from environment: AIzaSy..."` - Using environment variable
   - `"Using Gemini API key from localStorage: AIzaSy..."` - Good! Using your custom key

### Step 2: Verify API Key in localStorage
1. Open browser DevTools
2. Go to Application tab (Chrome) or Storage tab (Firefox)
3. Navigate to Local Storage → your domain
4. Look for `gemini_api_key`
5. Verify it contains your new API key

### Step 3: Test the API Key
To verify your API key is valid:
1. Go to https://aistudio.google.com/app/apikey
2. Make sure your API key has quota available
3. Check if Gemini API is enabled for your project

### Step 4: Clear and Re-enter Key
1. Click "API Key" button in dashboard
2. Click "Clear Current Key" if one is shown
3. Enter your new valid API key
4. Click "Use This"
5. Page will reload automatically
6. Try using AI features again

## Common Issues and Solutions

### Issue 1: "Quota Exceeded" Error
**Cause:** The old API key is still being used, or the new key also has no quota.

**Solutions:**
- Make sure you entered a valid API key with available quota
- Check console logs to see which key is being used
- Clear browser cache and try again
- Use a different browser to test

### Issue 2: API Key Not Saved
**Cause:** Browser's localStorage might be disabled or full.

**Solutions:**
- Check if localStorage is enabled in browser settings
- Clear some browser data to free up storage
- Try using private/incognito mode

### Issue 3: Changes Not Applied
**Cause:** Page needs to reload to pick up new key.

**Solutions:**
- The dialog now automatically reloads the page
- If it doesn't, manually refresh the page (Ctrl+R or Cmd+R)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue 4: Still Using Environment Key
**Cause:** localStorage check might not be working.

**Solutions:**
- Check console logs to see which key is being used
- Verify the key is saved in localStorage (see Step 2 above)
- Make sure you're on the same domain/subdomain

## Testing Checklist

- [ ] Open API Key dialog
- [ ] Enter a valid Gemini API key
- [ ] Click "Use This"
- [ ] Page reloads automatically
- [ ] Open browser console
- [ ] Try using an AI feature
- [ ] Check console logs for "Using API key from localStorage"
- [ ] Verify AI feature works without "quota exceeded" error

## If Still Not Working

1. **Clear everything and start fresh:**
   ```javascript
   // Run in browser console
   localStorage.clear();
   location.reload();
   ```

2. **Manually check the key:**
   ```javascript
   // Run in browser console
   console.log("Saved key:", localStorage.getItem("gemini_api_key"));
   ```

3. **Test the API key directly:**
   - Use the Gemini API Playground at https://aistudio.google.com/
   - Try your key there to ensure it's valid

4. **Check for CORS or security issues:**
   - Some browsers block localStorage in certain contexts
   - Try a different browser
   - Check if third-party cookies are blocked

---
**Last Updated:** April 1, 2026
