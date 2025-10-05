# 📧 PATIENT INVITATION EMAIL SETUP - HIPAA COMPLIANT

**Date:** 2025-10-05  
**Status:** ✅ DATABASE READY | ⏳ EMAIL INTEGRATION NEEDED

---

## 🎯 WHAT WAS CREATED

### 1. Database Table: `patient_invitations` ✅
**File:** `PATIENT_INVITATIONS_SCHEMA.sql`

**Features:**
- Tracks all patient invitations
- Secure random tokens (32 bytes entropy)
- Email hashing for privacy
- 7-day expiration
- Status tracking (pending, accepted, expired, cancelled)
- RLS policies for security
- Automatic expiry checking
- Audit logging

### 2. Updated Hook: `usePatientInvites_NEW.ts` ✅
**Location:** `src/hooks/usePatientInvites_NEW.ts`

**Features:**
- Creates invitation records in database
- Generates secure invitation URLs
- Manages invitation lifecycle
- HIPAA-compliant (no PHI in emails)
- Email template generation

### 3. This Guide ✅
How to integrate HIPAA-compliant email sending

---

## 🚀 DEPLOYMENT STEPS

### STEP 1: Deploy Database Table (5 min)

```bash
# In Supabase SQL Editor, run:
```

```sql
-- Copy entire contents of PATIENT_INVITATIONS_SCHEMA.sql
-- Paste and execute in Supabase
```

**Verify:**
```sql
-- Should return 1
SELECT COUNT(*) FROM pg_tables WHERE tablename = 'patient_invitations';

-- Should show RLS enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'patient_invitations';

-- Should show 4 policies
SELECT COUNT(*) FROM pg_policies WHERE tablename = 'patient_invitations';
```

---

### STEP 2: Replace Old Hook (2 min)

```bash
# Backup old file
mv src/hooks/usePatientInvites.ts src/hooks/usePatientInvites_OLD.ts

# Rename new file
mv src/hooks/usePatientInvites_NEW.ts src/hooks/usePatientInvites.ts
```

**Or manually:**
1. Open `src/hooks/usePatientInvites.ts`
2. Replace entire contents with `usePatientInvites_NEW.ts`
3. Save

---

### STEP 3: Choose Email Service (15-30 min)

You have 3 HIPAA-compliant options:

#### Option A: Supabase Auth Email (Recommended for MVP) ✅

**Requirements:**
- Supabase Teams tier ($599/month) ✅
- BAA signed with Supabase ✅

**Pros:**
- Built into Supabase
- No additional integration
- Automatic SSL/TLS encryption
- Free (included in Teams tier)

**Cons:**
- Less customization
- Must use Supabase's templates
- Limited tracking/analytics

**Setup:**
```typescript
// In src/hooks/usePatientInvites.ts
// After creating invitation record:

const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(
  data.email,
  {
    data: {
      invitation_token: invitation.invitation_token,
      invited_by: data.clinicianName,
      custom_message: data.inviteMessage
    },
    redirectTo: `${window.location.origin}/signup?invite=${invitation.invitation_token}`
  }
)
```

**Configure in Supabase:**
1. Dashboard → Authentication → Email Templates
2. Customize "Invite User" template
3. Add invitation details
4. Test with fake email

---

#### Option B: SendGrid with BAA (Production Grade) 💼

**Requirements:**
- SendGrid Pro or Premier plan ($89+/month)
- Sign BAA with SendGrid

**Pros:**
- Professional email service
- Detailed analytics
- High deliverability
- Custom templates
- Bounce/spam tracking

**Cons:**
- Additional cost
- Requires separate BAA
- More complex setup

**Setup:**

1. **Sign up for SendGrid Pro:**
   - https://sendgrid.com
   - Choose Pro or Premier plan
   - Request BAA from account manager

2. **Get API Key:**
   - SendGrid Dashboard → Settings → API Keys
   - Create key with "Mail Send" permission
   - Copy key

3. **Add to Environment:**
   ```bash
   # In .env
   VITE_SENDGRID_API_KEY=SG.your-key-here
   VITE_SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   VITE_SENDGRID_FROM_NAME=NeuroLoop
   ```

4. **Add to Vercel:**
   - Settings → Environment Variables
   - Add all VITE_SENDGRID_* variables

5. **Install Package:**
   ```bash
   npm install @sendgrid/mail
   ```

6. **Update Hook:**
   ```typescript
   // In src/hooks/usePatientInvites.ts
   import sgMail from '@sendgrid/mail'
   
   // After creating invitation:
   sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY)
   
   const msg = {
     to: data.email,
     from: {
       email: import.meta.env.VITE_SENDGRID_FROM_EMAIL,
       name: import.meta.env.VITE_SENDGRID_FROM_NAME
     },
     subject: `${data.clinicianName} has invited you to NeuroLoop`,
     html: generateInvitationEmail(data.clinicianName, invitationUrl, data.inviteMessage)
   }
   
   await sgMail.send(msg)
   ```

**SendGrid BAA Request:**
- Email: baa@sendgrid.com
- Include: Company name, plan tier, use case
- Processing: 1-5 business days

---

#### Option C: AWS SES with BAA (Enterprise) 🏢

**Requirements:**
- AWS Account
- Sign BAA with AWS (Enterprise Support required)

**Pros:**
- Very cheap ($0.10 per 1000 emails)
- Scalable to millions
- AWS infrastructure
- Detailed metrics

**Cons:**
- More complex setup
- Requires AWS knowledge
- BAA requires Enterprise Support ($15,000/month minimum)
- Better for large scale

**Setup:**

1. **AWS SES Setup:**
   - Sign into AWS Console
   - Navigate to SES
   - Verify domain
   - Move out of sandbox mode
   - Request production access

2. **AWS BAA:**
   - Requires AWS Enterprise Support
   - Contact AWS account manager
   - Sign HIPAA BAA
   - Enable HIPAA-eligible services

3. **Get Credentials:**
   - IAM → Create user
   - Attach `AmazonSESFullAccess` policy
   - Generate access keys

4. **Environment Variables:**
   ```bash
   VITE_AWS_REGION=us-east-1
   VITE_AWS_ACCESS_KEY_ID=your-key
   VITE_AWS_SECRET_ACCESS_KEY=your-secret
   VITE_SES_FROM_EMAIL=noreply@yourdomain.com
   ```

5. **Install Package:**
   ```bash
   npm install @aws-sdk/client-ses
   ```

6. **Implementation:**
   ```typescript
   // In src/hooks/usePatientInvites.ts
   import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
   
   const sesClient = new SESClient({
     region: import.meta.env.VITE_AWS_REGION,
     credentials: {
       accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
       secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
     }
   })
   
   const command = new SendEmailCommand({
     Source: import.meta.env.VITE_SES_FROM_EMAIL,
     Destination: { ToAddresses: [data.email] },
     Message: {
       Subject: { Data: `${data.clinicianName} has invited you to NeuroLoop` },
       Body: { Html: { Data: generateInvitationEmail(...) } }
     }
   })
   
   await sesClient.send(command)
   ```

---

## 🔒 HIPAA COMPLIANCE CHECKLIST

### Email Content Requirements:

- [ ] **No PHI in Subject Line**
  - ✅ Good: "You've been invited to NeuroLoop"
  - ❌ Bad: "Dr. Smith invited you for epilepsy treatment"

- [ ] **No PHI in Email Body**
  - ✅ Good: "Your clinician has invited you..."
  - ❌ Bad: "Track your seizures..."

- [ ] **No Patient Name in Email**
  - ✅ Good: "You've been invited..."
  - ❌ Bad: "Hi John, you've been invited..."

- [ ] **Secure Invitation Link**
  - ✅ Use HTTPS
  - ✅ 32-byte random token
  - ✅ 7-day expiration
  - ✅ One-time use (becomes 'accepted')

- [ ] **Encrypted Transmission**
  - ✅ TLS 1.2 or higher
  - ✅ All email services listed use encryption

- [ ] **Audit Logging**
  - ✅ All invitation actions logged
  - ✅ Acceptance tracked
  - ✅ Audit_log table captures everything

### BAA Requirements:

- [ ] **Supabase BAA Signed** (Teams tier)
- [ ] **Email Service BAA Signed** (if using SendGrid/SES)
- [ ] **Document all BAAs** (keep copies)

---

## 📋 TESTING PROCEDURE

### 1. Test Invitation Creation (Local):

```typescript
// In your app, after clinician completes onboarding:
const { sendPatientInvite } = usePatientInvites()

await sendPatientInvite({
  email: 'test@example.com',
  clinicianName: 'Dr. Test',
  inviteMessage: 'Looking forward to working with you!'
})
```

**Check:**
1. Console shows invitation URL
2. Database has new record:
   ```sql
   SELECT * FROM patient_invitations ORDER BY invited_at DESC LIMIT 1;
   ```
3. Email hash is populated
4. Token is unique and random

### 2. Test Invitation Acceptance:

```typescript
// Patient signs up with invitation token:
const { acceptInvitation } = usePatientInvites()

// After patient signs up:
await acceptInvitation(token)
```

**Check:**
1. Invitation status = 'accepted'
2. patient_id is populated
3. patient_clinician_connections record created
4. Audit log shows acceptance

### 3. Test Expiration:

```sql
-- Manually expire an invitation
UPDATE patient_invitations
SET expires_at = NOW() - INTERVAL '1 day'
WHERE id = 'some-id';

-- Run expiry function
SELECT expire_old_invitations();

-- Check status changed
SELECT status FROM patient_invitations WHERE id = 'some-id';
-- Should show 'expired'
```

### 4. Test Email Delivery (Production):

1. Send test invitation
2. Check email received
3. Click invitation link
4. Should redirect to signup with token
5. Sign up
6. Should auto-connect to clinician

---

## 🚨 SECURITY WARNINGS

### ❌ NEVER DO:

1. **Don't send PHI via email**
   - No diagnosis info
   - No treatment details
   - No patient identifiers beyond email

2. **Don't use unencrypted email**
   - All services listed use TLS
   - Never use SMTP without STARTTLS

3. **Don't use non-BAA email services**
   - Gmail/Yahoo = ❌
   - Mailchimp without BAA = ❌
   - Any service without BAA = ❌

4. **Don't store email service keys in code**
   - Always use environment variables
   - Never commit to git

5. **Don't reuse invitation tokens**
   - One token = one invitation
   - Mark as 'accepted' after use
   - Generate new token for re-invites

### ✅ ALWAYS DO:

1. **Log all invitation activity**
2. **Expire old invitations**
3. **Verify BAA before sending**
4. **Use HTTPS for invitation links**
5. **Hash or encrypt email addresses**

---

## 💰 COST COMPARISON

| Service | Monthly Cost | Setup Time | BAA Included | Recommended For |
|---------|-------------|------------|--------------|-----------------|
| **Supabase Auth** | $0 (in Teams) | 10 min | Yes (Teams) | MVP, Small Scale |
| **SendGrid Pro** | $89+ | 30 min | Yes (request) | Production, Medium Scale |
| **AWS SES** | ~$0-10 | 2 hours | Yes (Enterprise) | Large Scale, Tech Teams |

**Recommendation for You:**
1. **Now (MVP):** Supabase Auth - Free, BAA included in Teams tier
2. **Later (Scale):** SendGrid Pro - Better deliverability and analytics

---

## 📝 EXAMPLE EMAIL TEMPLATE

The email template in `usePatientInvites_NEW.ts` includes:

- ✅ Professional design
- ✅ Clear call-to-action button
- ✅ No PHI
- ✅ Expiration notice
- ✅ HIPAA compliance statement
- ✅ Mobile-responsive

**Preview:**
```
[NeuroLoop Header]

You've Been Invited!

Dr. Jane Smith has invited you to join NeuroLoop, a secure platform 
for tracking your neurological health and connecting with your care team.

[Accept Invitation Button]

Why NeuroLoop?
• Track symptoms, medications, and triggers
• Share data securely with your care team
• Contribute to research (optional)
• HIPAA-compliant and secure

This invitation will expire in 7 days.

[Footer: This email contains no PHI]
```

---

## ✅ IMPLEMENTATION CHECKLIST

**Before Testing:**
- [ ] Deploy PATIENT_INVITATIONS_SCHEMA.sql to Supabase
- [ ] Replace usePatientInvites.ts with new version
- [ ] Choose email service (Supabase Auth recommended)
- [ ] Configure email service
- [ ] Add environment variables
- [ ] Test invitation creation locally

**Before Production:**
- [ ] Supabase Teams tier active
- [ ] BAA signed with Supabase
- [ ] Email service BAA signed (if not using Supabase)
- [ ] Email templates reviewed and approved
- [ ] Test full invitation flow end-to-end
- [ ] Verify no PHI in any emails
- [ ] Set up monitoring for failed emails
- [ ] Document all BAA agreements

---

## 🚀 QUICK START (Supabase Auth)

**Fastest path to working invitations:**

1. **Deploy table** (5 min):
   ```sql
   -- Run PATIENT_INVITATIONS_SCHEMA.sql in Supabase
   ```

2. **Update hook** (2 min):
   ```bash
   # Replace old file with new one
   ```

3. **Add Supabase email** (5 min):
   ```typescript
   // In sendPatientInvite() function, after creating invitation:
   
   const { error } = await supabase.auth.admin.inviteUserByEmail(
     data.email,
     {
       redirectTo: invitationUrl
     }
   )
   ```

4. **Test** (2 min):
   - Create invitation through UI
   - Check console for URL
   - Check database for record
   - Click URL to test signup flow

**Total Time: 15 minutes** ⚡

---

## 📞 SUPPORT

**Supabase Email Issues:**
- Docs: https://supabase.com/docs/guides/auth/auth-email-templates
- Support: support@supabase.com

**SendGrid Issues:**
- Docs: https://docs.sendgrid.com
- BAA: baa@sendgrid.com
- Support: support@sendgrid.com

**AWS SES Issues:**
- Docs: https://docs.aws.amazon.com/ses/
- BAA: AWS Enterprise Support
- Support: AWS Support Center

---

## 🎯 SUMMARY

**What You Have:**
- ✅ HIPAA-compliant database table for tracking invitations
- ✅ Secure invitation system with random tokens
- ✅ Email hashing for privacy
- ✅ Automatic expiration (7 days)
- ✅ Full audit logging
- ✅ Updated React hook ready to use

**What You Need:**
- ⏳ Choose and configure email service
- ⏳ Test invitation flow
- ⏳ Sign BAA with email provider (if not Supabase)

**Recommended Next Steps:**
1. Deploy database table NOW
2. Update React hook NOW
3. Use Supabase Auth for MVP (easiest)
4. Upgrade to SendGrid when you need better analytics

**You're 95% there! Just need to configure email service.** 🎉
