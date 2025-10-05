# 🚀 Deployment Guide: Secure Invite System

**Target:** Vercel + Supabase  
**Timeline:** 30 minutes  
**Prerequisites:** Supabase CLI, Git, Vercel account

---

## ✅ Pre-Deployment Checklist

- [ ] Supabase project created: `evcdikzpnjjpotbkkshs`
- [ ] Vercel account connected to GitHub
- [ ] GitHub repo: `beckay96/neuroloop-nexus`
- [ ] `.env` file configured locally
- [ ] Supabase CLI installed

---

## 📦 Step 1: Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Verify installation
supabase --version
```

---

## 🔐 Step 2: Login and Link Project

```bash
# Login to Supabase
supabase login

# Navigate to project
cd /Users/rebeccafrancis/CascadeProjects/neuroloop-nexus

# Link to your Supabase project
supabase link --project-ref evcdikzpnjjpotbkkshs

# Enter your database password when prompted
```

---

## 🗄️ Step 3: Apply Database Migration

```bash
# Apply the carer_invitations migration
supabase db push

# Or manually via psql
psql $DATABASE_URL -f supabase/migrations/20250106_carer_invitations.sql
```

### Verify Migration
```sql
-- Connect to your database
psql $DATABASE_URL

-- Check table exists
\dt carer_invitations

-- Check RLS enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'carer_invitations';

-- Check function exists
\df verify_carer_dob_and_accept
```

---

## ☁️ Step 4: Deploy Edge Functions

```bash
# Deploy all three functions
supabase functions deploy invite_patient
supabase functions deploy invite_carer
supabase functions deploy verify_carer_dob

# Or deploy all at once
supabase functions deploy
```

### Expected Output
```
✓ invite_patient deployed successfully
✓ invite_carer deployed successfully
✓ verify_carer_dob deployed successfully

URLs:
- https://evcdikzpnjjpotbkkshs.supabase.co/functions/v1/invite_patient
- https://evcdikzpnjjpotbkkshs.supabase.co/functions/v1/invite_carer
- https://evcdikzpnjjpotbkkshs.supabase.co/functions/v1/verify_carer_dob
```

---

## 🔑 Step 5: Set Environment Variables

### For Edge Functions
```bash
# Set the app URL
supabase secrets set APP_URL=https://neuroloop-nexus.vercel.app

# Verify secrets
supabase secrets list
```

### For Vercel
Go to: https://vercel.com/beckay96/neuroloop-nexus/settings/environment-variables

Add these:
```
VITE_SUPABASE_URL=https://evcdikzpnjjpotbkkshs.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_PROJECT_ID=evcdikzpnjjpotbkkshs
VITE_AUTO_REFRESH_TOKEN=true
VITE_REQUIRE_EMAIL_CONFIRMATION=false
```

**Get your keys from:**
https://supabase.com/dashboard/project/evcdikzpnjjpotbkkshs/settings/api

---

## 📧 Step 6: Configure Email Templates

### Go to Supabase Dashboard
https://supabase.com/dashboard/project/evcdikzpnjjpotbkkshs/auth/templates

### Configure "Invite User" Template

**Subject:**
```
You have been invited to NeuroLoop!
```

**Body (HTML):**
```html
<h2>You have been invited to NeuroLoop</h2>

<p>You have been invited to create a new account on {{ .SiteURL }}. 
   Follow this link to accept the invite:</p>

<p><a href="{{ .ConfirmationURL }}" 
      style="background-color: #6366f1; 
             color: white; 
             padding: 12px 24px; 
             text-decoration: none; 
             border-radius: 6px; 
             display: inline-block;">
   Accept the invite
</a></p>

<p style="color: #666; font-size: 14px; margin-top: 20px;">
   This invitation link will expire in 7 days.
</p>

<p style="color: #666; font-size: 12px; margin-top: 30px;">
   If you didn't expect this invitation, you can safely ignore this email.
</p>
```

**⚠️ CRITICAL: NO PHI in email templates!**

---

## 🌐 Step 7: Deploy to Vercel

### Option A: Via Git Push
```bash
# Commit all changes
git add .
git commit -m "feat: Add secure invite system with DOB verification"
git push origin main

# Vercel will auto-deploy
```

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🧪 Step 8: Test Deployment

### Test 1: Edge Functions

```bash
# Get your JWT token from browser devtools after logging in as clinician
export CLINICIAN_JWT="your-jwt-here"

# Test patient invite
curl -X POST https://evcdikzpnjjpotbkkshs.supabase.co/functions/v1/invite_patient \
  -H "Authorization: Bearer $CLINICIAN_JWT" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","message":"Welcome"}'

# Expected: {"success":true,"link":"https://...","message":"Invitation created successfully"}
```

```bash
# Get patient JWT
export PATIENT_JWT="your-jwt-here"

# Test carer invite
curl -X POST https://evcdikzpnjjpotbkkshs.supabase.co/functions/v1/invite_carer \
  -H "Authorization: Bearer $PATIENT_JWT" \
  -H "Content-Type: application/json" \
  -d '{"email":"carer@example.com","relationship_type":"spouse"}'

# Expected: {"success":true,"link":"https://...","message":"Invitation created successfully"}
```

### Test 2: Frontend Flow

1. **Patient Invite Flow:**
   - Login as clinician
   - Navigate to patients section
   - Click "Invite Patient"
   - Enter email
   - Click "Send Invite"
   - Check email received
   - Click link in email
   - Sign up/sign in
   - Verify connection created

2. **Carer Invite Flow:**
   - Login as patient
   - Go to emergency contact section
   - Enter carer email + relationship
   - Click "Send Invite"
   - Check email received
   - Click link in email
   - Sign up/sign in
   - Enter patient's DOB
   - Verify relationship activated

---

## 🔍 Step 9: Verify Database

```sql
-- Connect to production database
psql $DATABASE_URL

-- Check patient_invitations
SELECT COUNT(*), status FROM patient_invitations GROUP BY status;

-- Check carer_invitations
SELECT COUNT(*), status FROM carer_invitations GROUP BY status;

-- Check carer_relationships
SELECT COUNT(*), status FROM carer_relationships GROUP BY status;

-- Check patient_clinician_connections
SELECT COUNT(*), status FROM patient_clinician_connections GROUP BY status;
```

---

## 📊 Step 10: Monitor & Logs

### View Edge Function Logs
```bash
# View logs for specific function
supabase functions logs invite_patient
supabase functions logs invite_carer
supabase functions logs verify_carer_dob

# Follow logs in real-time
supabase functions logs invite_patient --follow
```

### Check Vercel Logs
https://vercel.com/beckay96/neuroloop-nexus/logs

---

## 🚨 Troubleshooting

### Issue: Edge Function 401 Unauthorized
**Solution:** Check JWT token is valid and not expired

### Issue: Edge Function 403 Forbidden
**Solution:** Verify user has correct role (clinician/patient)

### Issue: Email not sending
**Solution:** 
1. Check Supabase Auth email templates configured
2. Verify SMTP settings
3. Check spam folder

### Issue: DOB verification always fails
**Solution:**
1. Verify patient has date_of_birth in patient_profiles
2. Check date format is YYYY-MM-DD
3. Verify dates match exactly

### Issue: Carer invite creates duplicate relationship
**Solution:** Check pre-linking logic in invite_carer function

---

## 🔐 Security Checks

- [ ] RLS enabled on all tables
- [ ] Edge Functions use service-role internally
- [ ] No PHI in email templates
- [ ] No PHI in logs
- [ ] Tokens are 32-byte random
- [ ] Invitations expire (7/30 days)
- [ ] DOB verification max 3 attempts
- [ ] Security incidents logged
- [ ] HTTPS everywhere
- [ ] Environment variables set correctly

---

## 📈 Post-Deployment

### Monitor These Metrics
1. Invitation send success rate
2. Invitation acceptance rate
3. DOB verification success rate
4. Failed DOB attempts (watch for attacks)
5. Average time to accept invitation
6. Expired invitations rate

### Setup Alerts
```sql
-- Create alert for excessive failed DOB attempts
-- (Add to monitoring system)
SELECT 
  carer_email_hash,
  COUNT(*) as failed_attempts
FROM carer_invitations
WHERE status = 'verification_failed'
  AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY carer_email_hash
HAVING COUNT(*) > 5;
```

---

## ✅ Deployment Complete!

**Your secure invite system is now live on:**
- Frontend: https://neuroloop-nexus.vercel.app
- Edge Functions: https://evcdikzpnjjpotbkkshs.supabase.co/functions/v1/*

**Next Steps:**
1. Test invitation flows end-to-end
2. Monitor logs for errors
3. Create UI components for invite flows
4. Setup email monitoring
5. Configure alerts for security incidents

---

## 📞 Support

**Issues?**
- Check logs: `supabase functions logs`
- Check database: `psql $DATABASE_URL`
- Review RLS policies
- Verify environment variables

**Documentation:**
- See `SECURE_INVITE_SYSTEM.md` for architecture
- See `HIPAA_COMPLIANCE.md` for security details

---

**Deployment successful! Your HIPAA-compliant invite system is ready for production.** 🚀🔐
