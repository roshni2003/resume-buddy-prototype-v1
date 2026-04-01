# localStorage Not Storing API Key - Fix Guide

## Issue
After clearing the API key and trying to add it again, the key is not being stored in localStorage.

## Changes Made to Fix This

### 1. **Added Verification Step**
The dialog now verifies that the key was actually saved to localStorage before proceeding:
```typescript
const savedKey = localStorage.getItem("gemini_api_key");
if (!savedKey || savedKey !== apiKey) {
  throw new Error("Failed to save key to localStorage - verification failed");
}
```

### 2. **Added Delay Before Reload**
Added a 100ms delay before reloading to ensure localStorage operations complete:
```typescript
setTimeout(() => {
  window.location.reload();
}, 100);
```

### 3. **Better Error Messages**
More detailed error messages that show exactly what went wrong:
- Shows if localStorage is not available
- Shows if verification failed
- Shows the actual error message

### 4. **Added Debug Logging**
Console logs now show:
- ✅ Success messages with checkmarks
- ❌ Error messages with X marks
- What key is being saved/loaded

### 5. **Added localStorage Test Button**
A "🔧 Test localStorage" button that verifies localStorage is working correctly.

## How to Fix Your Issue

### Method 1: Manual Steps (Do This First)

1. **Open Browser DevTools**
   - Press F12 (or Cmd+Option+I on Mac)

2. **Check localStorage**
   - Go to Application tab (Chrome) or Storage tab (Firefox)
   - Navigate to Local Storage → your domain
   - Look for `gemini_api_key`

3. **Manually Clear Everything**
   - In the Console tab, run:
   ```javascript
   localStorage.clear();
   console.log("Cleared. Current gemini_api_key:", localStorage.getItem("gemini_api_key"));
   ```

4. **Test localStorage**
   - In the Console tab, run:
   ```javascript
   localStorage.setItem("test", "123");
   console.log("Test read:", localStorage.getItem("test"));
   localStorage.removeItem("test");
   ```
   - You should see: `Test read: 123`

5. **Try Again**
   - Close DevTools
   - Refresh the page (Ctrl+R or Cmd+R)
   - Click "API Key" button
   - Click "🔧 Test localStorage" button
   - If test passes, enter your API key
   - Click "Use This"

### Method 2: Use the New Test Button

1. Click "API Key" button in dashboard
2. Click "🔧 Test localStorage" button at the bottom
3. If you see "✅ localStorage is working correctly!", proceed
4. If you see an error, localStorage is blocked in your browser

### Method 3: Check Browser Settings

**Chrome/Edge:**
1. Go to Settings → Privacy and security → Cookies and other site data
2. Make sure "Block third-party cookies" is NOT enabled for your domain
3. Make sure your site is not in "Sites that can never use cookies"

**Firefox:**
1. Go to Settings → Privacy & Security
2. Under "Cookies and Site Data", click "Manage Exceptions"
3. Make sure your domain is not blocked

**Safari:**
1. Preferences → Privacy
2. Make sure "Block all cookies" is not enabled
3. Disable "Prevent cross-site tracking" for testing

### Method 4: Try Different Browser

Sometimes browser extensions or settings can block localStorage:
1. Try Chrome Incognito/Firefox Private mode
2. Try a completely different browser
3. Try disabling browser extensions temporarily

## Common Causes

### 1. Browser Privacy Mode
- Private/Incognito mode may have localStorage restrictions
- Some browsers clear localStorage when closing private windows

### 2. Browser Extensions
- Ad blockers
- Privacy extensions (Privacy Badger, Ghostery, etc.)
- Script blockers

### 3. Browser Settings
- Cookies disabled
- Third-party data blocked
- Site-specific permissions

### 4. Quota Issues
- localStorage has a size limit (usually 5-10MB)
- If your localStorage is full, new items can't be added
- Clear other data to free up space

### 5. HTTPS vs HTTP
- Some browsers restrict localStorage on HTTP sites
- Make sure you're using HTTPS

## Debugging Console Commands

Run these in browser console to diagnose:

```javascript
// 1. Check if localStorage is available
console.log("localStorage available:", typeof localStorage !== "undefined");

// 2. Check current API key
console.log("Current API key:", localStorage.getItem("gemini_api_key"));

// 3. Test write/read
localStorage.setItem("debug_test", "test_value");
console.log("Test successful:", localStorage.getItem("debug_test") === "test_value");
localStorage.removeItem("debug_test");

// 4. Check localStorage size
let size = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    size += localStorage[key].length + key.length;
  }
}
console.log("localStorage size:", size, "bytes");

// 5. Clear gemini_api_key specifically
localStorage.removeItem("gemini_api_key");
console.log("After clear:", localStorage.getItem("gemini_api_key"));

// 6. Try to set it manually
localStorage.setItem("gemini_api_key", "test_key_12345");
console.log("After set:", localStorage.getItem("gemini_api_key"));
```

## What the Logs Should Show

When everything works correctly, you should see:

**When opening dialog:**
```
Dialog opened - Current key in localStorage: AIzaSy... (or NONE)
```

**When saving key:**
```
✅ API Key saved to localStorage: AIzaSy...
✅ Verification - Key in localStorage: AIzaSy...
```

**When clearing key:**
```
After removal, key is: null
```

**When using AI features:**
```
Using API key from localStorage: AIzaSy...
```

## If Nothing Works

If localStorage just won't work:

### Option 1: Use Environment Variables
Instead of the dialog, set the API key in your environment:
```bash
# In your .env file
VITE_AI_API_KEY=your_api_key_here
```

### Option 2: Use Session Storage
Modify the code to use sessionStorage instead (only lasts until browser close):
```javascript
// Replace all instances of localStorage with sessionStorage
sessionStorage.setItem("gemini_api_key", apiKey);
sessionStorage.getItem("gemini_api_key");
```

### Option 3: Use Cookies
If localStorage is blocked but cookies work, use cookies instead.

---

## Quick Fix Checklist

- [ ] Run `localStorage.clear()` in console
- [ ] Refresh the page
- [ ] Click "API Key" button
- [ ] Click "🔧 Test localStorage"
- [ ] If test passes, enter API key
- [ ] Watch console for ✅ success messages
- [ ] After reload, check console for "Using API key from localStorage"
- [ ] Try AI feature to confirm it works

---
**Last Updated:** April 1, 2026
**Related:** API_KEY_DEBUGGING_GUIDE.md
