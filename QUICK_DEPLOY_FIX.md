# 🚨 QUICK FIX: Deploy to Correct Database

**Problem:** Supabase CLI was linked to OLD project `jrpmvilcyctqwflnojbf`  
**Solution:** Relinked to CORRECT project `evcdikzpnjjpotbkkshs` ✅

---

## ✅ What I Fixed

1. ✅ Updated `.temp/project-ref` → `evcdikzpnjjpotbkkshs`
2. ✅ Updated `.temp/pooler-url` → correct database URL
3. ✅ Ran `supabase link --project-ref evcdikzpnjjpotbkkshs`

---

## 🎯 Next: Apply Migration Manually (EASIEST)

Since the migration history is mismatched, use the **Supabase Dashboard** SQL Editor:

### Step 1: Go to SQL Editor
```
https://supabase.com/dashboard/project/evcdikzpnjjpotbkkshs/sql/new
```

### Step 2: Copy & Paste This SQL
Open `supabase/migrations/20250106_carer_invitations.sql` and copy ALL contents.

### Step 3: Run in SQL Editor
1. Paste the SQL
2. Click "Run" button
3. ✅ Migration applied!

---

## 🚀 Alternative: Deploy Edge Functions Now

The database may already have the tables (from previous work). Let's deploy the Edge Functions:

```bash
# Make sure you're linked to correct project
supabase link --project-ref evcdikzpnjjpotbkkshs

# Deploy all functions
supabase functions deploy invite_patient
supabase functions deploy invite_carer
supabase functions deploy verify_carer_dob

# Set environment secrets
supabase secrets set APP_URL=https://neuroloop-nexus.vercel.app
```

---

## 🔍 Check What's Already in Database

Go to Supabase Dashboard and check if these tables exist:
- ✅ `patient_invitations`
- ❓ `carer_invitations` (this is the new one we need to add)

**Dashboard URL:**
```
https://supabase.com/dashboard/project/evcdikzpnjjpotbkkshs/editor
```

---

## 📋 Correct Project Info

**Project ID:** `evcdikzpnjjpotbkkshs`  
**Project Name:** neuroloop-database-compliant  
**Region:** ap-southeast-2 (Sydney)  
**URL:** `https://evcdikzpnjjpotbkkshs.supabase.co`

**OLD Project (DO NOT USE):**
- ❌ `jrpmvilcyctqwflnojbf` (neuroloop-nexus - old one)

---

## ✅ Summary

1. **CLI now linked to correct project** ✅
2. **Use SQL Editor to apply `carer_invitations` migration** (easiest)
3. **Then deploy Edge Functions**
4. **Test the invite flows**

---

## 🎯 Quick Deploy Commands

```bash
# 1. Verify link
supabase link --project-ref evcdikzpnjjpotbkkshs

# 2. Deploy functions (ignore migration errors for now)
supabase functions deploy

# 3. Set secrets
supabase secrets set APP_URL=https://neuroloop-nexus.vercel.app
```

The migration can be applied via SQL Editor manually!
