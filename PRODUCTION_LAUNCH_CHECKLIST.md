# 🚀 PRODUCTION LAUNCH CHECKLIST - READY IN DAYS

## ✅ DATABASE DEPLOYMENT: COMPLETE

**Status:** DONE ✅  
**Date Completed:** 2025-10-05

- [x] Schema deployed (25+ tables)
- [x] Enums configured (25+ with all values)
- [x] IP hashing working (verified)
- [x] Salt stored securely (protected.system_settings)
- [x] RLS policies active on all tables
- [x] Audit triggers on all PHI tables
- [x] Breach detection system active
- [x] Research anonymization working
- [x] Access expiry for carers/clinicians
- [x] 7-day PITR backups enabled

---

## ⏳ CRITICAL: BEFORE BAA SIGNING (NOW)

### 1. Upgrade to Teams Tier (15 minutes)

1. **Initiate Upgrade**
   - Go to Supabase Dashboard → Billing
   - Click "Upgrade to Teams"
   - Select Teams plan ($599/month)
   - Complete payment setup

2. **Request BAA Immediately**
   - In Supabase Dashboard → Settings → Legal
   - Click "Request Business Associate Agreement"
   - Fill out company information
   - Submit request
   - **Turnaround:** Usually 1-3 business days

3. **Prepare Legal Documents**
   - Company name & address
   - Authorized signer details
   - Security officer contact info
   - HIPAA compliance documentation

**DO THIS TODAY** - Don't wait for BAA to start upgrade process.

---

## ⏳ FRONTEND VERIFICATION (30 minutes)

### Test Every Critical Flow:

#### A. User Registration & Onboarding
```bash
# Test with real email addresses (not real patient data yet)
1. Sign up as Patient
2. Complete onboarding (all 5 steps)
3. Verify profile created in database
4. Verify conditions/medications saved
5. Verify research consent recorded
```

**Verify in DB:**
```sql
SELECT 
    p.user_type,
    pp.first_name,
    p.onboarding_completed,
    COUNT(DISTINCT uc.id) as conditions_count,
    COUNT(DISTINCT um.id) as medications_count,
    rc.consent_version
FROM profiles p
LEFT JOIN patient_profiles pp ON pp.user_id = p.id
LEFT JOIN user_conditions uc ON uc.user_id = p.id
LEFT JOIN user_medications um ON um.user_id = p.id
LEFT JOIN research_consent rc ON rc.user_id = p.id
WHERE p.id = 'TEST_USER_ID'
GROUP BY p.user_type, pp.first_name, p.onboarding_completed, rc.consent_version;
```

#### B. Tracking Features
```bash
1. Log a Seizure (all 5 steps)
2. Log Daily Wellness
3. Log Medication adherence
4. Log Symptom
5. Log Menstrual Cycle
```

**Verify in DB:**
```sql
-- Check all tracking data saved with proper enums
SELECT 
    'seizure_logs' as table_name, 
    COUNT(*) as count,
    MAX(created_at) as last_entry
FROM seizure_logs WHERE user_id = 'TEST_USER_ID'
UNION ALL
SELECT 'daily_wellness_logs', COUNT(*), MAX(created_at)
FROM daily_wellness_logs WHERE user_id = 'TEST_USER_ID'
UNION ALL
SELECT 'medication_logs', COUNT(*), MAX(created_at)
FROM medication_logs WHERE user_id = 'TEST_USER_ID'
UNION ALL
SELECT 'symptom_logs', COUNT(*), MAX(created_at)
FROM symptom_logs WHERE user_id = 'TEST_USER_ID'
UNION ALL
SELECT 'menstrual_cycle_logs', COUNT(*), MAX(created_at)
FROM menstrual_cycle_logs WHERE user_id = 'TEST_USER_ID';
```

#### C. Audit Logging
```sql
-- Verify every action is logged
SELECT 
    action,
    table_name,
    ip_address_hash,
    created_at
FROM audit_log
WHERE user_id = 'TEST_USER_ID'
ORDER BY created_at DESC
LIMIT 20;

-- Verify IP addresses are hashed (not raw IPs)
SELECT 
    CASE 
        WHEN ip_address_hash ~ '^[a-f0-9]{64}$' THEN 'HASHED ✅'
        ELSE 'NOT HASHED ❌'
    END as ip_status,
    COUNT(*) as count
FROM audit_log
WHERE ip_address_hash IS NOT NULL
GROUP BY 1;
```

---

## ⏳ SECURITY CONFIGURATION (1 hour)

### 1. Auth Settings (Supabase Dashboard)

Go to **Authentication** → **Settings**:

- [x] **Email confirmation:** ENABLED
- [x] **Email provider:** Configured (test email sending)
- [x] **Password requirements:**
  - Minimum 12 characters
  - Require uppercase
  - Require lowercase
  - Require numbers
  - Require symbols
- [x] **Session timeout:** 30 minutes
- [x] **Auto-refresh tokens:** ENABLED
- [x] **Disable signup:** NO (allow new users)

**Test:**
```bash
1. Sign up with weak password → Should fail
2. Sign up with strong password → Should succeed
3. Check email for confirmation link
4. Click confirmation link → Account activated
5. Login → Should work
6. Wait 31 minutes → Session should expire
```

### 2. Database Settings

Go to **Settings** → **Database**:

- [x] **SSL required:** YES (default, can't disable)
- [x] **PITR backups:** 7 days enabled
- [x] **Connection pooling:** Default (Supavisor enabled)
- [x] **Encryption:** Automatic (always on)

### 3. API Settings

Go to **Settings** → **API**:

- [x] **RLS enabled:** Verify on all tables
- [x] **Anon key:** Copy for frontend .env
- [x] **Service role key:** Keep secret, never expose
- [x] **Auto-generated docs:** Review schema exposure

**Security Check:**
```sql
-- Verify RLS is enabled on ALL user tables
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ALL should show rowsecurity = true (except seed data tables)
```

### 4. Network Settings (Optional but Recommended)

Go to **Settings** → **Database** → **Network**:

- [ ] **IP Allowlist:** Add your production server IPs (if applicable)
- [ ] **VPC:** Configure if using private networking

---

## ⏳ ENVIRONMENT VARIABLES (15 minutes)

### Production .env File

Create `.env.production`:

```bash
# Supabase Production
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# Security
VITE_ENABLE_RLS=true
VITE_ENABLE_AUDIT_LOGGING=true
VITE_SESSION_TIMEOUT=1800000  # 30 minutes
VITE_AUTO_REFRESH_TOKEN=true

# Features
VITE_DEBUG_MODE=false  # MUST BE FALSE IN PRODUCTION
VITE_ENABLE_REALTIME=true
VITE_REQUIRE_EMAIL_CONFIRMATION=true

# Environment
VITE_ENVIRONMENT=production
```

**Verify:**
```bash
# Check no secrets in code
grep -r "supabase.co" src/
# Should only return import statements, no hardcoded URLs

# Check no hardcoded keys
grep -r "eyJ" src/
# Should return nothing (all keys in .env)
```

---

## ⏳ LEGAL & COMPLIANCE DOCUMENTS (2-3 hours)

### 1. Privacy Policy (REQUIRED)

**Must include:**
- What PHI you collect
- How you use it
- Who you share it with
- User rights (access, deletion, correction)
- Data retention periods
- Security measures
- Breach notification procedures
- Contact information

**Template:** Use a HIPAA-compliant privacy policy generator or hire legal counsel.

### 2. Terms of Service (REQUIRED)

**Must include:**
- Service description
- User responsibilities
- Acceptable use policy
- Account termination
- Limitation of liability
- Dispute resolution
- Governing law

### 3. Consent Forms (REQUIRED)

**Research Consent Form:**
- Purpose of research
- What data is collected
- How data is anonymized
- Who can access research data
- How to withdraw consent
- Contact for questions

**Already implemented in app** - just need legal review.

### 4. Notice of Privacy Practices (HIPAA REQUIRED)

**Must include:**
- How PHI may be used and disclosed
- Patient rights under HIPAA
- Covered entity's duties
- Complaint procedures
- Effective date
- Contact information

**Resource:** HHS provides templates at hhs.gov

---

## ⏳ OPERATIONAL READINESS (1-2 hours)

### 1. Incident Response Plan

**Document:**
- Who is notified when breach detected
- Steps to contain breach
- Investigation procedures
- Notification requirements (60 days if 500+ affected)
- Documentation requirements

**Test:**
```sql
-- Manually create security incident
INSERT INTO security_incidents (
    incident_type,
    severity,
    affected_users,
    description
) VALUES (
    'OTHER',
    'low',
    ARRAY['test-user-id']::UUID[],
    'TEST INCIDENT - drill'
);

-- Verify you can query it
SELECT * FROM security_incidents WHERE description LIKE '%TEST%';

-- Delete test incident
DELETE FROM security_incidents WHERE description LIKE '%TEST%';
```

### 2. Backup & Recovery Procedures

**Document:**
- How to restore from PITR backup
- Recovery Time Objective (RTO): Target 4 hours
- Recovery Point Objective (RPO): 7 days max data loss
- Who can initiate restore
- Testing schedule (quarterly)

**Test PITR Restore:**
1. Create test data
2. Note timestamp
3. Delete test data
4. Restore to timestamp in Supabase Dashboard
5. Verify data recovered

### 3. Monitoring Setup

**Set up alerts for:**
- Failed logins (>5 in 10 minutes)
- Database CPU >80%
- Database memory >80%
- API error rate >5%
- Unresolved security incidents >1 hour old

**Supabase Dashboard:**
- Settings → Monitoring → Configure alerts
- Add your email/phone for critical alerts

### 4. Data Retention & Cleanup

**Verify cleanup function:**
```sql
-- Test audit log cleanup (in transaction so we can rollback)
BEGIN;
SELECT * FROM cleanup_old_audit_logs_safe();
ROLLBACK;

-- Should return count of deleted records and oldest remaining date
```

**Schedule monthly cleanup:**
```sql
-- If pg_cron is enabled (Teams tier):
SELECT cron.schedule(
    'monthly-audit-cleanup',
    '0 0 1 * *',
    'SELECT cleanup_old_audit_logs_safe()'
);

-- Verify scheduled job
SELECT * FROM cron.job WHERE jobname = 'monthly-audit-cleanup';
```

If pg_cron not enabled, set calendar reminder to run manually monthly.

---

## ⏳ TEAM TRAINING (2-4 hours)

### 1. HIPAA Training (REQUIRED)

**All team members must complete:**
- What is PHI/ePHI
- HIPAA Privacy Rule basics
- HIPAA Security Rule basics
- Breach notification requirements
- Reporting incidents
- Password security
- Mobile device security

**Resources:**
- HHS Training: https://www.hhs.gov/hipaa/for-professionals/training/index.html
- Online courses: Many vendors offer HIPAA training ($50-200 per person)

**Document:**
- Training completion dates
- Training materials used
- Keep records for 6 years (HIPAA requirement)

### 2. Platform Training

**For support staff:**
- How to query database safely (read-only access)
- How to check audit logs
- How to review security incidents
- How to escalate issues
- What NOT to do (never disable RLS, never export PHI)

### 3. Incident Response Drill

**Simulate:**
1. Security incident detected
2. Team notified
3. Incident investigated
4. Actions taken
5. Incident resolved
6. Post-mortem completed

**Document the drill** - shows you're prepared.

---

## ⏳ FINAL PRE-LAUNCH CHECKS (1 hour)

### Security Audit Queries

Run these final verification queries:

```sql
-- 1. Verify RLS is enabled everywhere
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN '✅' ELSE '❌ FAIL' END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
AND tablename NOT IN ('conditions', 'medications')  -- seed data tables
ORDER BY tablename;

-- 2. Verify audit triggers exist
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table
FROM information_schema.triggers
WHERE trigger_name LIKE 'audit_%'
ORDER BY event_object_table;

-- 3. Verify IP hashing works
SELECT 
    COUNT(*) as total_logs,
    COUNT(ip_address_hash) as logs_with_ip,
    COUNT(CASE WHEN ip_address_hash ~ '^[a-f0-9]{64}$' THEN 1 END) as properly_hashed
FROM audit_log;

-- 4. Verify protected schema is locked down
SELECT 
    tablename,
    COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'protected'
GROUP BY tablename;

-- 5. Check for any NULL user_ids in user data (data leak check)
SELECT 
    'profiles' as table_name,
    COUNT(*) as null_user_ids
FROM profiles
WHERE id IS NULL
UNION ALL
SELECT 'patient_profiles', COUNT(*)
FROM patient_profiles
WHERE user_id IS NULL;
-- Should return 0 for all tables

-- 6. Verify research mapping is protected
SELECT 
    schemaname,
    tablename
FROM pg_tables
WHERE tablename = 'research_user_mapping';
-- Should show: protected | research_user_mapping

-- 7. Check breach detection is working
SELECT 
    COUNT(*) as total_incidents,
    COUNT(CASE WHEN resolved_at IS NULL THEN 1 END) as unresolved
FROM security_incidents;

-- 8. Verify session settings (should error if not in team tier yet)
SHOW session_timeout;
-- Should show 30 minutes or similar
```

### Frontend Security Check

```bash
# 1. Check for console.log() calls (security leak)
grep -r "console.log" src/ | grep -v "node_modules" | wc -l
# Should be 0 or very few (remove sensitive data logs)

# 2. Check for hardcoded credentials
grep -ri "password" src/ | grep -v "node_modules" | grep -v "type.*password"
# Review each result - no hardcoded passwords

# 3. Check for exposed API keys
grep -r "SUPABASE" src/ | grep -v ".env" | grep -v "import"
# Should only show import statements

# 4. Build production version
npm run build
# Should complete without errors

# 5. Test production build locally
npm run preview
# Browse app, test all features
```

---

## 🚨 GO/NO-GO DECISION CRITERIA

### ✅ MUST BE GREEN TO LAUNCH:

- [ ] **BAA signed with Supabase** (Legal requirement)
- [ ] **Teams tier active** ($599/month)
- [ ] **All 3 database fixes verified** (enum, salt, hashing)
- [ ] **RLS enabled on all tables** (Verified with query)
- [ ] **Audit logging working** (Test and verify)
- [ ] **Frontend tests pass** (All flows work)
- [ ] **Email confirmation works** (Test signup flow)
- [ ] **Privacy policy published** (Legal requirement)
- [ ] **Terms of service published** (Legal requirement)
- [ ] **Team HIPAA trained** (Documented)
- [ ] **Incident response plan documented** (Required)
- [ ] **Backup restore tested** (Verify you can recover)
- [ ] **Production .env configured** (No dev credentials)
- [ ] **SSL/TLS enforced** (Automatic, verify)
- [ ] **No console.log() with PHI** (Code review)

### ⚠️ SHOULD BE YELLOW (Fix within 30 days):

- [ ] Penetration testing completed
- [ ] Third-party security audit
- [ ] Monitoring alerts configured
- [ ] On-call rotation established
- [ ] Data retention policy published
- [ ] Breach notification templates ready
- [ ] Customer support procedures documented

---

## 📅 LAUNCH TIMELINE

### Day 1 (TODAY):
- [x] Database deployed ✅
- [ ] Upgrade to Teams tier
- [ ] Request BAA
- [ ] Frontend testing
- [ ] Security verification queries

### Day 2:
- [ ] Complete legal documents (Privacy Policy, ToS, NPP)
- [ ] Team HIPAA training
- [ ] Incident response plan
- [ ] Production .env setup
- [ ] Code review (remove debug logs)

### Day 3:
- [ ] BAA should arrive (if fast-tracked)
- [ ] Final security audit
- [ ] Backup restore test
- [ ] Production build & test
- [ ] Monitoring setup

### Day 4-5:
- [ ] BAA signed ✅
- [ ] Final go/no-go decision
- [ ] Deploy to production
- [ ] Soft launch (limited users)
- [ ] Monitor closely

### Week 2:
- [ ] Ramp up users
- [ ] Monitor security incidents
- [ ] Review audit logs
- [ ] Collect feedback

---

## 📞 EMERGENCY CONTACTS

**Supabase Support:**
- Email: support@supabase.com
- Emergency: Upgrade ticket priority in dashboard

**Legal/Compliance:**
- HIPAA Violations: HHS Office for Civil Rights
- Phone: 1-800-368-1019
- Email: ocrmail@hhs.gov

**Your Team:**
- Security Officer: [YOUR NAME/EMAIL]
- Privacy Officer: [NAME/EMAIL]
- Technical Lead: [NAME/EMAIL]
- On-Call: [PHONE NUMBER]

---

## ✅ PRODUCTION LAUNCH APPROVAL

Once all "MUST BE GREEN" items are checked:

```
I certify that:
- All technical security measures are implemented and tested
- Business Associate Agreement is signed with Supabase
- Team is trained on HIPAA requirements
- Incident response procedures are documented
- Privacy policy and terms of service are published
- Application is ready for production use with real patient data

Approved by: _________________________
Title: ___________________________
Date: ____________________________
```

---

## 🎉 YOU'RE ALMOST THERE!

**Database:** ✅ DONE  
**Timeline:** 3-5 days to launch  
**Next:** Complete checklist above in order  

**Focus on these HIGH PRIORITY items today:**
1. Upgrade to Teams tier (15 min)
2. Request BAA (15 min)
3. Frontend testing (1 hour)
4. Security verification queries (30 min)

**You've got this!** 🚀
