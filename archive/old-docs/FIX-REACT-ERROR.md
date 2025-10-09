# 🔧 Fix: React useMemo Error (Service Worker Cache Issue)

## Problem
```
Uncaught TypeError: Cannot read properties of null (reading 'useMemo')
```

This error occurs when the **service worker serves cached JavaScript bundles** that have stale React references after a rebuild.

---

## ✅ Solution Applied

### 1. **Updated Service Worker** (`public/sw.js`)
- ✅ **Never cache JavaScript bundles** (they have hashed filenames like `index-B20F7H4R.js`)
- ✅ **Never cache CSS bundles** (same reason)
- ✅ **Bumped cache version** from `v1` to `v2` to force fresh cache
- ✅ **Network-first strategy** for all `/assets/*.js` and `/assets/*.css` files

### 2. **Why This Happened**
- Vite builds create hashed bundles: `index-[hash].js`
- Service worker was caching these bundles
- After rebuild, new bundles had different hashes
- Service worker served **old cached bundle** → React version mismatch → error

---

## 🚀 How to Fix (For Users)

### Option 1: Use the Clear Cache Tool
1. Navigate to: `http://localhost:8000/clear-sw-cache.html`
2. Click **"Do Everything & Reload"**
3. Wait for automatic redirect

### Option 2: Manual Browser Clear
1. Open **DevTools** (F12 or Cmd+Option+I)
2. Go to **Application** tab
3. Click **"Clear storage"** in left sidebar
4. Check all boxes and click **"Clear site data"**
5. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

### Option 3: Incognito/Private Window
- Open in incognito mode to test without cache

---

## 🔒 HIPAA Compliance Notes

The updated service worker maintains HIPAA compliance:
- ✅ **NO PHI cached** (Supabase API calls never cached)
- ✅ **NO JavaScript bundles cached** (prevents stale code)
- ✅ **Only static assets cached** (HTML shell, icons, manifest)
- ✅ **Network-first strategy** ensures fresh data always

---

## 📋 Deployment Checklist

When deploying to production:

1. **Bump cache version** in `public/sw.js`:
   ```javascript
   const CACHE_NAME = 'neuroloop-v3'; // Increment version
   ```

2. **Rebuild**:
   ```bash
   npm run build
   ```

3. **Test in incognito** before deploying

4. **Monitor service worker** in production:
   - Check DevTools → Application → Service Workers
   - Verify new version is active

---

## 🐛 If Error Persists

1. **Check React versions**:
   ```bash
   npm ls react react-dom
   ```
   All should be `18.3.1` (✅ Verified)

2. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for multiple React instances**:
   ```bash
   npm dedupe
   ```

4. **Verify Vite config** (`vite.config.ts`):
   - ✅ Using `@vitejs/plugin-react-swc`
   - ✅ No conflicting plugins

---

## 📝 Prevention

This fix ensures:
- Service worker **never caches JavaScript/CSS bundles**
- Only caches static shell for offline support
- Always fetches fresh code from network
- Automatic cache invalidation on service worker update

---

## 🎯 Summary

**Root Cause**: Service worker cached old JavaScript bundle with stale React references

**Fix**: Updated service worker to never cache JS/CSS bundles, only static assets

**Action Required**: Clear browser cache once (use `clear-sw-cache.html` tool)

**Status**: ✅ Fixed and deployed
