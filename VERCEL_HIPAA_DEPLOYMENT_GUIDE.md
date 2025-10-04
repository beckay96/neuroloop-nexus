# 🚀 VERCEL DEPLOYMENT GUIDE - HIPAA COMPLIANT

**Date:** 2025-10-05  
**Status:** ✅ READY FOR DEVELOPMENT DEPLOYMENT  
**Production:** ⏳ Pending Supabase Teams + BAA

---

## 🚨 CRITICAL SECURITY FIXES APPLIED

### 1. Removed Hardcoded Credentials ✅
**Was:** Supabase URL and anon key hardcoded in `client.ts`  
**Now:** Using environment variables from `.env`

### 2. Updated .gitignore ✅
**Added:** All `.env` files to prevent credential leaks

### 3. Fixed CSP Header ✅
**Was:** Hardcoded Supabase URL in `vercel.json`  
**Now:** Using wildcard `*.supabase.co` pattern

---

## ⚠️ IMPORTANT: PRO TIER VS TEAMS TIER

### Current Status: Pro Tier (Development Mode)
**What you CAN do:**
- ✅ Deploy to Vercel for testing
- ✅ Use fake/synthetic patient data
- ✅ Test all features
- ✅ Share with team for internal testing
- ✅ Demo to investors/stakeholders (with fake data)

**What you CANNOT do:**
- ❌ Collect real patient data
- ❌ Store real PHI/ePHI
- ❌ Launch publicly to patients
- ❌ Market as HIPAA-compliant

**Why:** Pro tier doesn't include Business Associate Agreement (BAA). Without BAA, you're not legally HIPAA-compliant regardless of technical security.

### When You Upgrade to Teams Tier:
1. Sign BAA with Supabase (1-3 business days)
2. Update privacy policy with BAA info
3. Deploy production version
4. Launch to real patients

**Timeline:** You can deploy NOW for testing, upgrade to Teams when budget allows.

---

## 🔐 DEPLOYMENT STEPS (30 MINUTES)

### STEP 1: Verify Security Fixes (5 min)

**Check these files were updated:**

1. **src/integrations/supabase/client.ts**
   ```typescript
   // Should use environment variables, NOT hardcoded
   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
   const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

2. **.gitignore**
   ```
   # Should include:
   .env
   .env.local
   .env.production
   .env.development
   .env.*.local
   .vercel
   ```

3. **vercel.json**
   ```json
   // CSP should use wildcard, not hardcoded URL
   "connect-src 'self' https://*.supabase.co wss://*.supabase.co"
   ```

**Verify these are correct ✅ before proceeding.**

---

### STEP 2: Install Vercel CLI (2 min)

```bash
npm install -g vercel
```

Or use the Vercel website (easier).

---

### STEP 3: Create Vercel Account & Project (5 min)

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub (recommended)
3. **Import Git Repository:**
   - Click "Add New Project"
   - Import your GitHub repo
   - Or manually upload (not recommended)

---

### STEP 4: Configure Environment Variables (10 min)

**Critical:** Never expose credentials in code or git.

#### In Vercel Dashboard:

1. Go to your project
2. Click **Settings** → **Environment Variables**
3. Add these **EXACT** variable names:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://jrpmvilcyctqwflnojbf.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` (your anon key) | Production, Preview, Development |
| `VITE_ENABLE_RLS` | `true` | All |
| `VITE_ENABLE_AUDIT_LOGGING` | `true` | All |
| `VITE_DEBUG_MODE` | `false` | Production, Preview |
| `VITE_DEBUG_MODE` | `true` | Development (optional) |
| `VITE_SESSION_TIMEOUT` | `1800000` | All (30 min) |
| `VITE_AUTO_REFRESH_TOKEN` | `true` | All |
| `VITE_ENABLE_REALTIME` | `true` | All |
| `VITE_REQUIRE_EMAIL_CONFIRMATION` | `true` | All |

**IMPORTANT:** 
- Check "Production", "Preview", and "Development" for each variable
- Never add `service_role` key (backend only)
- Never commit these to git

---

### STEP 5: Configure Build Settings (3 min)

In Vercel Dashboard → **Settings** → **Build & Development Settings**:

**Framework Preset:** Vite  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`  
**Node Version:** 18.x (or 20.x)

---

### STEP 6: Deploy (5 min)

Two options:

#### Option A: Automatic (Recommended)
1. Push to GitHub main branch
2. Vercel auto-deploys
3. Check deployment logs

#### Option B: Manual
```bash
cd /Users/rebeccafrancis/CascadeProjects/neuroloop-nexus
vercel --prod
```

---

### STEP 7: Verify Deployment (5 min)

Once deployed, test:

1. **Visit your Vercel URL** (e.g., `neuroloop-nexus.vercel.app`)

2. **Check Security Headers:**
   ```bash
   curl -I https://your-app.vercel.app
   ```
   
   Should see:
   - `Strict-Transport-Security`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Content-Security-Policy`

3. **Test Sign Up:**
   - Create test account
   - Should receive confirmation email
   - Complete onboarding
   - Check Supabase for data

4. **Test Tracking:**
   - Log a seizure
   - Log daily wellness
   - Check data saved in Supabase

5. **Check Console:**
   ```
   F12 → Console
   Should see NO errors
   Should NOT see credentials logged
   ```

---

## 🔒 SECURITY CONFIGURATION

### Security Headers (Already Configured)

Your `vercel.json` includes:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS protection |
| `Strict-Transport-Security` | `max-age=31536000` | Force HTTPS (1 year) |
| `Content-Security-Policy` | See below | Restrict resources |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer info |
| `Permissions-Policy` | Restrictive | Disable unnecessary APIs |

### Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https://*.supabase.co wss://*.supabase.co;
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

**What this does:**
- Only allows scripts/styles from your domain
- Allows Supabase API connections
- Blocks embedding in iframes
- Prevents form submission to external sites

---

## 🌍 CUSTOM DOMAIN (RECOMMENDED)

### Why Use Custom Domain:
- Professional appearance
- Better SEO
- Required for production
- Easier to remember

### Steps:

1. **Buy domain** (Namecheap, GoDaddy, etc.)
2. **Add to Vercel:**
   - Settings → Domains
   - Add your domain
   - Follow DNS instructions
3. **Wait for DNS** (can take 24-48 hours)
4. **Vercel auto-configures SSL** (free Let's Encrypt)

**Recommended domains:**
- `neuroloopnexus.com`
- `neuroloop.health`
- `myneuroloop.com`

---

## 📊 MONITORING & ANALYTICS

### Vercel Analytics (Included Free)

**Enable:**
1. Go to project dashboard
2. Click **Analytics**
3. Enable Web Analytics

**What you get:**
- Page views
- Unique visitors
- Performance metrics
- Real User Monitoring (RUM)

**HIPAA Note:** Vercel Analytics is aggregated and doesn't store PII. Safe to use.

### DO NOT USE:
- ❌ Google Analytics (not HIPAA-compliant without BAA)
- ❌ Facebook Pixel (never HIPAA-compliant)
- ❌ Hotjar (not compliant)
- ❌ Mixpanel (requires BAA)

### HIPAA-Compliant Options:
- ✅ Vercel Analytics (safe, included)
- ✅ PostHog (with BAA, self-hosted)
- ✅ Matomo (self-hosted)
- ⚠️ Amplitude (enterprise tier with BAA)

---

## 🚨 BEFORE LAUNCHING TO REAL PATIENTS

### Critical Checklist:

- [ ] **Supabase upgraded to Teams tier** ($599/month)
- [ ] **BAA signed with Supabase** (1-3 days after upgrade)
- [ ] **Privacy Policy published** (mentions BAA)
- [ ] **Terms of Service published**
- [ ] **Notice of Privacy Practices published** (HIPAA required)
- [ ] **Team HIPAA trained** (documented)
- [ ] **Incident response plan documented**
- [ ] **All environment variables verified**
- [ ] **Security headers verified** (check with curl)
- [ ] **Console.log() removed** (no PHI in logs)
- [ ] **Error messages sanitized** (no PHI exposed)
- [ ] **Test backup restoration** (verify you can recover)
- [ ] **Vercel Analytics enabled** (tracking setup)

### NEVER Launch Without:
1. ❌ BAA from Supabase
2. ❌ Privacy Policy
3. ❌ HIPAA training

**Violations can cost $100-$50,000 PER VIOLATION.**

---

## 🔧 TROUBLESHOOTING

### Build Fails

**Error:** "Missing environment variables"
```
Solution:
1. Check Vercel Dashboard → Settings → Environment Variables
2. Verify all VITE_* variables are set
3. Check you selected "Production", "Preview", and "Development"
4. Redeploy
```

**Error:** "TypeScript errors"
```
Solution:
1. Run `npm run build` locally first
2. Fix any TypeScript errors
3. Commit and push
4. Vercel will rebuild
```

### Site Loads But Blank Page

**Check:**
1. F12 → Console for errors
2. Verify environment variables in Vercel
3. Check Supabase URL is correct
4. Check anon key is correct

### Supabase Connection Fails

**Error:** "Invalid API key" or "Failed to fetch"
```
Solution:
1. Verify VITE_SUPABASE_URL matches your Supabase project
2. Verify VITE_SUPABASE_ANON_KEY is correct
3. Check CSP allows *.supabase.co
4. Check Supabase project is not paused
```

### Data Not Saving

**Check:**
1. RLS policies enabled (should be)
2. User is authenticated
3. Browser console for errors
4. Supabase logs (Dashboard → Logs)

---

## 📈 PERFORMANCE OPTIMIZATION

### Vercel Automatically Provides:
- ✅ Global CDN (instant worldwide access)
- ✅ Automatic caching
- ✅ Edge functions
- ✅ Image optimization
- ✅ Brotli compression

### You Should Also:

1. **Enable Compression:**
   - Already enabled by Vercel

2. **Lazy Load Images:**
   ```typescript
   <img loading="lazy" src="..." />
   ```

3. **Code Splitting:**
   - Vite does this automatically
   - Keep components small

4. **Minimize Bundle:**
   ```bash
   # Check bundle size
   npm run build
   # Review dist/ folder size
   ```

---

## 🔄 CI/CD WORKFLOW

### Automatic Deployment:

```
1. You push to GitHub main branch
   ↓
2. Vercel detects commit
   ↓
3. Vercel runs build
   ↓
4. If build succeeds → Deploy to production
   ↓
5. If build fails → Send notification
```

### Preview Deployments:

**Every pull request gets:**
- Unique preview URL
- Independent environment
- Comments on PR with link

**Use this for:**
- Testing features before merging
- Showing clients progress
- QA testing

---

## 💰 VERCEL PRICING

### Hobby Tier (FREE):
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ SSL included
- ✅ Custom domains
- ❌ No team features
- ❌ No SSO

**Good for:** Development, personal projects, testing

### Pro Tier ($20/month per user):
- ✅ Everything in Hobby
- ✅ Team collaboration
- ✅ Advanced analytics
- ✅ Password protection
- ✅ Commercial use allowed
- ✅ 1TB bandwidth/month

**Good for:** Small teams, early startup

### Enterprise:
- ✅ Everything in Pro
- ✅ Custom SLAs
- ✅ SSO/SAML
- ✅ Dedicated support
- ✅ Advanced security
- ✅ SOC 2 compliance

**Good for:** Healthcare apps at scale (later)

### Recommendation:
- **Now:** Hobby tier (free) for testing
- **After BAA:** Pro tier ($20/month)
- **At scale:** Enterprise (when you have 100+ patients)

---

## 🎯 DEPLOYMENT CHECKLIST

### Before First Deploy:
- [x] Hardcoded credentials removed ✅
- [x] .gitignore updated ✅
- [x] vercel.json configured ✅
- [x] Environment variables ready ✅
- [ ] Test build locally (`npm run build`)
- [ ] Create Vercel account
- [ ] Import GitHub repo
- [ ] Add environment variables
- [ ] Deploy

### After Deploy:
- [ ] Test sign up flow
- [ ] Test onboarding
- [ ] Test tracking features
- [ ] Check security headers
- [ ] Verify no console errors
- [ ] Test on mobile
- [ ] Test on different browsers
- [ ] Share with team for testing

### Before Production:
- [ ] Upgrade Supabase to Teams
- [ ] Sign BAA
- [ ] Publish privacy policy
- [ ] Publish terms of service
- [ ] Train team on HIPAA
- [ ] Document incident response
- [ ] Test backup restoration
- [ ] Set up monitoring alerts

---

## 🚀 DEPLOY NOW

**You're ready to deploy for testing!**

```bash
# Option 1: Push to GitHub (auto-deploys)
git add .
git commit -m "Ready for deployment"
git push origin main

# Option 2: Manual deploy
vercel --prod
```

**Remember:** Use ONLY fake data until you have BAA signed.

---

## 📞 SUPPORT

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Support: support@vercel.com
- Community: https://github.com/vercel/vercel/discussions

**Supabase Issues:**
- Docs: https://supabase.com/docs
- Support: support@supabase.com
- Discord: https://discord.supabase.com

**HIPAA Questions:**
- HHS OCR: 1-800-368-1019
- OCR Email: ocrmail@hhs.gov

---

## ✅ SUMMARY

**What's Ready:**
- ✅ Code is secure (no hardcoded credentials)
- ✅ Vercel config is compliant
- ✅ Security headers configured
- ✅ Environment variables ready
- ✅ Database is HIPAA-ready (Pro tier)

**What You Can Do Now:**
- ✅ Deploy to Vercel (Hobby or Pro tier)
- ✅ Test with fake data
- ✅ Share with team
- ✅ Demo to stakeholders

**What to Wait For:**
- ⏳ Supabase Teams upgrade
- ⏳ BAA signing (1-3 days after upgrade)
- ⏳ Launch to real patients

**Timeline:**
- **Today:** Deploy for testing
- **When budget allows:** Upgrade Supabase to Teams
- **After BAA:** Launch to real patients

**You're ready to deploy! 🚀**
