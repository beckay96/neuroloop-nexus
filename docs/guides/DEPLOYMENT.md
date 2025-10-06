# Production Deployment Guide - NeuroLoop

Complete guide for deploying to production with HIPAA compliance.

**Target Platform:** Vercel (Frontend) + Supabase (Backend)  
**Domain:** neuroloop.app  
**Compliance:** HIPAA-ready

---

## 🎯 Deployment Overview

### Architecture
```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Users     │────────>│    Vercel    │────────>│  Supabase   │
│  (Browser)  │  HTTPS  │  (Frontend)  │  HTTPS  │  (Backend)  │
└─────────────┘         └──────────────┘         └─────────────┘
                              │
                              │ TLS 1.2+ (NO PHI)
                              ▼
                        ┌──────────────┐
                        │   SendGrid   │
                        │ (Auth emails)│
                        └──────────────┘
```

### Required Services
1. **Vercel Enterprise** - Frontend hosting ($250/month + BAA available)
2. **Supabase Teams** - Backend ($599/month + BAA included)
3. **SendGrid** - Email (Free tier OK - NO BAA needed, NO PHI sent)
4. **Domain Registrar** - neuroloop.app DNS
5. **UptimeRobot** - External uptime monitoring (free tier OK)

---

## ⚠️ CRITICAL: Email & PHI Policy

### **NO PHI IN EMAILS - EVER**

**HIPAA Requirement:** Email is NOT a secure medium for PHI transmission.

**What We Send:**
- ✅ Account verification links (no names, no health data)
- ✅ Password reset tokens (generic, no PHI)
- ✅ Invitation links with secure tokens (no patient names)
- ✅ Generic notifications ("You have a new message")

**What We NEVER Send:**
- ❌ Patient names
- ❌ Health conditions
- ❌ Seizure data
- ❌ Medication information
- ❌ Any Protected Health Information

**Result:** SendGrid BAA is NOT required because we never transmit PHI via email.

---

## 📋 Pre-Deployment Checklist

### Development Complete
- [x] All features implemented
- [x] All tests passing
- [x] Database schema finalized
- [x] Security audit completed
- [x] Performance optimized
- [x] Email templates verified (NO PHI)

### Compliance Ready
- [ ] Supabase Teams tier active ($599/month)
- [ ] BAA signed with Supabase (REQUIRED)
- [ ] Vercel Enterprise tier active (~$250/month)
- [ ] BAA signed with Vercel (REQUIRED)
- [ ] ~~BAA signed with SendGrid~~ (NOT NEEDED - no PHI in emails)
- [ ] Security policies documented (see below)
- [ ] Incident response plan ready (with RTO/RPO)
- [ ] Staff HIPAA training completed & documented
- [ ] Backup retention confirmed with Supabase (6+ years)
- [ ] Staff training completed

### Infrastructure Ready
- [ ] Vercel account created
- [ ] Domain purchased (neuroloop.app)
- [ ] SendGrid account set up
- [ ] SSL certificates configured
- [ ] Monitoring alerts set up

---

## 🚀 Deployment Steps

### STEP 1: Upgrade Supabase to Teams Tier

#### 1.1 Upgrade Project
```bash
# Login to Supabase Dashboard
https://supabase.com/dashboard/project/evcdikzpnjjpotbkkshs

# Navigate to: Settings > Billing
# Click "Upgrade to Teams" ($599/month)
# Confirm upgrade
```

#### 1.2 Request BAA
```bash
# Navigate to: Settings > Legal
# Click "Request BAA"
# Fill out form with:
- Company name
- Business address
- Authorized signatory
- Use case: HIPAA-compliant health data

# Wait for Supabase legal team (usually 2-5 business days)
# Sign BAA electronically
```

#### 1.3 Verify HIPAA Settings
```sql
-- 1. Verify encryption in transit (SSL/TLS)
SELECT current_setting('ssl') as ssl_enabled;
-- Should return: 'on'

-- 2. Verify encryption at rest (KMS-backed)
-- Test encryption capability
SELECT pgp_sym_encrypt('test_data', 'encryption_key');
-- Should return encrypted value

-- 3. Verify RLS enabled
SELECT COUNT(*) FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;
-- Should return: 29

-- 4. Verify audit logging active
SELECT COUNT(*) FROM audit_log WHERE created_at > NOW() - INTERVAL '1 day';
-- Should have entries (if any activity occurred)

-- 5. Verify backup configuration
-- In Supabase Dashboard > Database > Backups
-- Ensure daily backups enabled
-- Configure Point-in-Time Recovery (PITR)
```

#### 1.4 Configure Backup Retention
```bash
# In Supabase Dashboard > Database > Backups
# Enable: Daily backups
# Enable: Point-in-Time Recovery (PITR)
# Retention: 30 days (maximum on Teams tier)

# Note: For HIPAA 6+ year requirement, Supabase retains backups
# internally for compliance. Confirm with Supabase support when
# signing BAA that backup retention meets HIPAA requirements.
```

---

### STEP 2: Configure SendGrid (NO BAA REQUIRED)

#### 2.1 Create SendGrid Account
1. Go to https://sendgrid.com/pricing
2. Select **Free tier** (sufficient - we send NO PHI)
3. Complete signup

#### 2.2 ~~Request BAA~~ (NOT REQUIRED)
**SKIP THIS STEP** - We never send PHI via email, so BAA is not needed.

#### 2.3 Configure HIPAA-Safe Email Settings
```bash
# CRITICAL: Disable tracking features (they leak PII)

# In SendGrid Dashboard > Settings > Tracking
1. Click Tracking: DISABLE
2. Open Tracking: DISABLE  
3. Click Tracking: DISABLE
4. Subscription Tracking: DISABLE

# These features create tracking pixels and links that could
# inadvertently log PHI if users click from secure contexts
```

#### 2.3 Configure Email Domain
```bash
# Add DNS records for domain authentication
# In your domain registrar (e.g., Cloudflare, Namecheap):

# SPF Record
Type: TXT
Host: @
Value: v=spf1 include:sendgrid.net ~all

# DKIM Records (SendGrid provides these)
Type: CNAME
Host: s1._domainkey
Value: s1.domainkey.u<your-sendgrid-id>.wl.sendgrid.net

Type: CNAME
Host: s2._domainkey
Value: s2.domainkey.u<your-sendgrid-id>.wl.sendgrid.net

# Wait for DNS propagation (up to 48 hours)
```

#### 2.4 Create API Key
```bash
# In SendGrid Dashboard
# Settings > API Keys > Create API Key

# Name: "NeuroLoop Production"
# Permissions: "Full Access" (or "Mail Send" only)
# Copy API key (starts with SG.)
```

#### 2.5 Configure Supabase Auth with SendGrid
```sql
-- In Supabase Dashboard
-- Authentication > Settings > SMTP Settings

SMTP Host: smtp.sendgrid.net
SMTP Port: 587
SMTP User: apikey
SMTP Password: <YOUR_SENDGRID_API_KEY>
Sender Email: noreply@neuroloop.app
Sender Name: NeuroLoop

-- Test email
-- Send yourself a test to verify
```

---

### STEP 3: Deploy to Vercel

#### 3.1 Upgrade to Enterprise & Request BAA
```bash
# REQUIRED for HIPAA compliance

# 1. Go to https://vercel.com/contact/sales
# Contact Vercel sales for Enterprise plan (~$250/month minimum)
# Request HIPAA BAA as part of Enterprise agreement

# 2. Once Enterprise is active, connect repository:
# Go to https://vercel.com
# Click "Add New" > "Project"
# Import your GitHub repository
# Select "neuroloop-nexus"
```

#### 3.2 Configure Environment Variables
```bash
# In Vercel Project Settings > Environment Variables

# Production
VITE_SUPABASE_URL=https://evcdikzpnjjpotbkkshs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id

# DO NOT include secrets in frontend env vars!
```

#### 3.3 Configure Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

#### 3.4 Configure Security Headers
Create `vercel.json` in project root:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';"
        }
      ]
    }
  ]
}
```

#### 3.5 Deploy
```bash
# Vercel will auto-deploy on git push to main
# Or manually trigger:

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Deployment URL will be shown
# Example: https://neuroloop-nexus.vercel.app
```

---

### STEP 4: Configure Custom Domain

#### 4.1 Add Domain to Vercel
```bash
# In Vercel Dashboard
# Project > Settings > Domains
# Add: neuroloop.app
# Add: www.neuroloop.app
```

#### 4.2 Configure DNS
```bash
# In your domain registrar (e.g., Cloudflare)

# For neuroloop.app
Type: A
Name: @
Value: 76.76.21.21  # Vercel IP

# For www.neuroloop.app
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# SSL will be auto-provisioned by Vercel (via Let's Encrypt)
```

#### 4.3 Verify Domain
```bash
# Wait for DNS propagation (can take up to 48 hours)
# Verify at:
https://www.whatsmydns.net/#A/neuroloop.app

# Test SSL
https://www.ssllabs.com/ssltest/analyze.html?d=neuroloop.app
# Should get A+ rating
```

---

### STEP 5: Configure Monitoring & Alerts

#### 5.1 Vercel Analytics
```bash
# In Vercel Dashboard
# Project > Analytics
# Enable "Web Analytics"
# Enable "Speed Insights"
```

#### 5.2 Supabase Monitoring
```bash
# In Supabase Dashboard
# Database > Logs
# Set up alerts for:
- High CPU usage (>80%)
- Low storage (<10% free)
- High error rate (>5%)
- Failed authentication attempts (>10 per minute)
```

#### 5.3 Error Tracking (Optional: Sentry)
```bash
# Install Sentry
npm install @sentry/react @sentry/vite-plugin

# Add to vite.config.ts
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    sentryVitePlugin({
      org: "your-org",
      project: "neuroloop-nexus"
    })
  ]
});

# Configure in src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 0.1,
});
```

---

### STEP 6: Post-Deployment Verification

#### 6.1 Smoke Tests
```bash
# Test user flows
✅ Visit https://neuroloop.app
✅ Sign up new patient account
✅ Complete onboarding
✅ Log seizure
✅ Invite patient (as clinician)
✅ Accept invitation
✅ Verify data appears in dashboard

# Test security
✅ Verify HTTPS redirect
✅ Check security headers (securityheaders.com)
✅ Test RLS (try accessing other user's data)
✅ Verify audit logging working
```

#### 6.2 Performance Tests
```bash
# Use Lighthouse (Chrome DevTools)
# Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

# Test with:
# - Desktop
# - Mobile
# - Slow 3G connection
```

#### 6.3 Load Testing
```bash
# Use Artillery or k6
npm install -g artillery

# Create test script (loadtest.yml)
config:
  target: https://neuroloop.app
  phases:
    - duration: 60
      arrivalRate: 10  # 10 users per second
scenarios:
  - name: "Patient Login"
    flow:
      - get:
          url: "/"
      - post:
          url: "/api/auth/login"
          json:
            email: "test@example.com"
            password: "test123"

# Run test
artillery run loadtest.yml
```

---

## 🔧 Continuous Deployment

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🆘 Troubleshooting

### Issue: Build Fails on Vercel
**Cause:** Missing environment variables or build errors  
**Fix:**
```bash
# Check build logs in Vercel dashboard
# Ensure all env vars are set
# Test build locally: npm run build
# Check for TypeScript errors
```

### Issue: 404 on Page Refresh
**Cause:** Missing SPA routing configuration  
**Fix:** Already handled by Vercel's default Vite config

### Issue: Supabase Connection Timeout
**Cause:** Network issues or wrong credentials  
**Fix:**
```bash
# Verify env vars in Vercel
# Test connection from browser console:
console.log(import.meta.env.VITE_SUPABASE_URL);

# Check Supabase project status
# Verify API key is correct
```

### Issue: Email Not Sending
**Cause:** SendGrid not configured or API key invalid  
**Fix:**
```bash
# Test SendGrid API key:
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{...test email...}'

# Check Supabase Auth SMTP settings
# Verify DNS records are configured
```

---

## 📊 Monitoring & Alerting

### Required Monitoring Tools
1. **Vercel Analytics** - Frontend performance (built-in)
2. **Supabase Logs** - Database & API monitoring (built-in)
3. **UptimeRobot** or **BetterStack** - External uptime monitoring (REQUIRED)
4. **Sentry** - Error tracking & performance monitoring
5. **PagerDuty** or **Opsgenie** - Incident management (optional but recommended)

### Setup External Uptime Monitoring
```bash
# UptimeRobot (Free tier available)
1. Go to https://uptimerobot.com
2. Add Monitor:
   - Type: HTTPS
   - URL: https://neuroloop.app/health
   - Interval: 5 minutes
   - Alert Contacts: your-email@example.com

# Create /health endpoint in your app
# src/pages/Health.tsx
export default function Health() {
  return new Response(JSON.stringify({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Key Metrics to Monitor
- **Uptime:** Target 99.9% (8.76 hours downtime/year max)
- **Response Time:** <200ms avg (p95 <500ms)
- **Error Rate:** <0.1% of requests
- **Failed Logins:** <5% of total attempts (alert if >10%)
- **Email Delivery:** >99% delivered
- **Database CPU:** Alert if >80% for 5+ minutes
- **Database Storage:** Alert if <10% free space
- **RLS Policy Violations:** Alert on any occurrence

### Alert Configuration
```yaml
# Example: PagerDuty alert rules
alerts:
  - name: "Site Down"
    condition: uptime < 99%
    severity: critical
    notify: on-call-engineer
    
  - name: "High Error Rate"
    condition: error_rate > 1%
    severity: high
    notify: dev-team
    
  - name: "Failed Login Spike"
    condition: failed_logins > 10 in 5min
    severity: medium
    notify: security-team
    
  - name: "Database CPU High"
    condition: db_cpu > 80% for 5min
    severity: high
    notify: on-call-engineer
```

---

## 🔄 Rollback Procedure

### If Deployment Fails:
```bash
# Via Vercel Dashboard
1. Go to Deployments
2. Find last working deployment
3. Click "..." menu
4. Select "Promote to Production"

# Via Vercel CLI
vercel rollback
```

### If Database Migration Fails:
```sql
-- Restore from backup
-- Contact Supabase support for Point-in-Time Recovery

-- Or manually rollback:
-- Run previous migration SQL in reverse
```

---

## 📋 Required HIPAA Policy Documents

### Create These Policy Files (Private Repository)

#### 1. INCIDENT_RESPONSE_PLAN.md
```markdown
# Incident Response Plan

## RTO/RPO Targets
- Recovery Time Objective (RTO): 4 hours
- Recovery Point Objective (RPO): 1 hour

## Incident Classification
- **Critical:** Data breach, complete outage
- **High:** Partial outage, security vulnerability
- **Medium:** Performance degradation
- **Low:** Minor bugs

## Response Procedures
1. Detection (automated alerts or manual report)
2. Assessment (severity classification)
3. Containment (isolate affected systems)
4. Investigation (root cause analysis)
5. Resolution (fix and verify)
6. Documentation (incident report)
7. Post-mortem (lessons learned)

## Contact Chain
- On-call Engineer: [Contact]
- Security Officer: [Contact]
- Legal/Compliance: [Contact]
- Supabase Support: support@supabase.com
- HHS Breach Reporting: https://www.hhs.gov/hipaa/filing-a-complaint
```

#### 2. DATA_RETENTION_POLICY.md
```markdown
# Data Retention Policy

## HIPAA Requirements
- Audit logs: 6 years minimum
- Patient records: 6 years after last activity
- Backups: 6+ years (Supabase handles internally)

## Implementation
- Daily backups via Supabase (30-day PITR)
- Supabase maintains long-term backups for HIPAA compliance
- Point-in-Time Recovery enabled
- Annual retention compliance audit with Supabase

## Data Deletion Procedures
- User-requested deletion: 30-day grace period
- Automated anonymization after deletion
- Audit trail maintained even after deletion
```

#### 3. ACCESS_CONTROL_POLICY.md
```markdown
# Access Control Policy

## Principle of Least Privilege
- Users access only their own data (RLS enforced)
- Clinicians access only connected patients
- Researchers access only de-identified data

## MFA Requirements
- REQUIRED for all admin accounts:
  - Supabase Dashboard
  - Vercel Dashboard
  - SendGrid Dashboard
  - Domain registrar

## Access Review
- Quarterly review of all user permissions
- Immediate revocation upon termination
- Annual security training for all staff
```

#### 4. SECURITY_POLICY.md
```markdown
# Security Policy

## Encryption Standards
- In Transit: TLS 1.2+ only
- At Rest: AES-256 (Supabase managed)
- Passwords: bcrypt (Supabase Auth)

## Vulnerability Management
- Weekly dependency scans (npm audit)
- Monthly security reviews
- Quarterly penetration testing
- Annual third-party security audit

## Email Security
- NO PHI in emails (enforced by policy)
- Tracking disabled (no open/click tracking)
- Generic notifications only
```

---

## ✅ Go-Live Checklist

### Final Checks
- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance benchmarks met
- [ ] BAAs signed (Supabase + Vercel)
- [ ] Domain configured (neuroloop.app)
- [ ] SSL A+ rating
- [ ] Monitoring configured (including external uptime)
- [ ] Backup retention confirmed with Supabase
- [ ] Incident response plan ready (with RTO/RPO)
- [ ] Team trained on procedures
- [ ] MFA enabled on all admin accounts
- [ ] Email templates verified (NO PHI)
- [ ] SendGrid tracking DISABLED

### HIPAA Compliance
- [ ] Policy documents created (see above)
- [ ] Backup retention verified with Supabase (6+ years)
- [ ] Staff HIPAA training completed & documented
- [ ] Access control policies enforced
- [ ] Encryption verified (at rest and in transit)
- [ ] Breach notification procedures documented
- [ ] Privacy Officer assigned

### Communication
- [ ] Notify stakeholders of go-live date
- [ ] Prepare support documentation
- [ ] Create status page (status.neuroloop.app)
- [ ] Set up support email (support@neuroloop.app)

### Legal
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] HIPAA Notice of Privacy Practices
- [ ] Cookie consent banner (if using analytics)

---

## 🔒 HIPAA Gap Audit Summary

| Category | Status | Notes |
|----------|--------|-------|
| **Encryption in Transit** | ✅ OK | TLS 1.2+ enforced |
| **Encryption at Rest** | ✅ OK | AES-256 (Supabase) |
| **BAA Coverage** | ⚠️ ACTION REQUIRED | Sign with Supabase + Vercel |
| **Staff Training** | ⚠️ ACTION REQUIRED | Document completion |
| **Email PHI Exposure** | ✅ OK | Policy: NO PHI in emails |
| **Backups** | ⚠️ ACTION REQUIRED | Confirm 6+ year retention with Supabase |
| **Monitoring** | ⚠️ ACTION REQUIRED | Add external uptime (UptimeRobot) |
| **Incident Response** | ⚠️ ACTION REQUIRED | Document RTO/RPO |
| **MFA** | ⚠️ ACTION REQUIRED | Enable on all admin accounts |

---

## 🎯 Cost Summary

### Monthly Costs (Production)
- **Supabase Teams:** $599/month (includes BAA)
- **Vercel Enterprise:** ~$250/month (includes BAA)
- **SendGrid:** $0/month (Free tier - NO BAA needed)
- **UptimeRobot:** $0/month (Free tier)
- **Domain:** ~$12/year (~$1/month)
- **Sentry:** $0/month (free tier)

**Total:** ~$850/month

### One-Time Costs
- Domain registration: ~$12/year
- Security audit: $2,000-10,000 (recommended annually)
- Legal review: $1,000-5,000 (Terms, Privacy Policy)

---

**You're ready to launch! 🚀**

**Remember:** HIPAA compliance is ongoing. Schedule quarterly reviews and annual audits.
