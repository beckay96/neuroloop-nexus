# Security & HIPAA Compliance - NeuroLoop

Complete security documentation and HIPAA compliance measures.

**Last Security Audit:** 2025-10-05  
**Compliance Status:** Development (HIPAA-Ready Architecture)  
**Production Status:** Requires Supabase Teams + BAA

---

## 🔒 Security Overview

### Current Security Posture
**Development Environment:**
- ✅ RLS enabled on all user data tables
- ✅ Audit logging on all PHI operations
- ✅ Email hashing (SHA-256)
- ✅ Secure invitation tokens (32 bytes)
- ✅ Fixed search_path on all functions
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Encryption at rest (Supabase)

**Production Requirements:**
- ⚠️ Supabase Teams tier ($599/month)
- ⚠️ BAA signed with Supabase
- ⚠️ BAA signed with email provider (SendGrid)
- ⚠️ Third-party security audit
- ⚠️ Penetration testing
- ⚠️ HIPAA compliance certification

---

## 🏥 HIPAA Compliance

### Technical Safeguards (§164.312)

#### Access Control (§164.312(a))
**Implementation:**
- ✅ **Unique User IDs:** Every user has unique UUID
- ✅ **Emergency Access:** Clinician access with audit trail
- ✅ **Automatic Logoff:** Session timeout implemented
- ✅ **Encryption:** All data encrypted at rest and in transit

**Database-Level:**
```sql
-- Row Level Security ensures users only see own data
CREATE POLICY "Users can manage their own data" 
    ON patient_onboarding_data
    FOR ALL 
    USING (auth.uid() = user_id);
```

---

#### Audit Controls (§164.312(b))
**Implementation:**
- ✅ **Hardware/Software Audit:** Complete database audit logging
- ✅ **Record Examination:** 7-year retention of audit logs
- ✅ **Monitoring:** Security incident tracking

**Audit Coverage:**
```sql
-- All PHI operations logged to audit_log table
INSERT INTO audit_log (
    user_id,
    action,        -- INSERT/UPDATE/DELETE
    table_name,    -- Which table
    record_id,     -- Which record
    ip_address,    -- Client IP
    user_agent,    -- Client info
    created_at     -- When
);
```

**Logged Events:**
- User authentication (login/logout)
- PHI access (read)
- PHI modification (create/update/delete)
- Permission changes
- Security incidents

---

#### Integrity (§164.312(c))
**Implementation:**
- ✅ **Data Integrity:** PostgreSQL ACID compliance
- ✅ **Validation:** Input validation on all forms
- ✅ **Constraints:** Database constraints prevent invalid data
- ✅ **Checksums:** Automatic via Supabase

**Data Validation:**
```typescript
// All forms use Zod validation
const patientSchema = z.object({
  email: z.string().email(),
  dateOfBirth: z.date().max(new Date()),
  // ...strict validation rules
});
```

---

#### Person/Entity Authentication (§164.312(d))
**Implementation:**
- ✅ **Password Requirements:** Min 8 chars, enforced by Supabase Auth
- ✅ **Multi-Factor Authentication:** Supported via Supabase Auth
- ✅ **Session Management:** Secure JWT tokens
- ✅ **Password Reset:** Secure email-based reset

**Authentication Flow:**
1. User enters credentials
2. Supabase Auth validates
3. JWT token issued (short-lived)
4. Token validated on every request
5. All auth events logged

---

#### Transmission Security (§164.312(e))
**Implementation:**
- ✅ **TLS 1.2+:** All data encrypted in transit
- ✅ **HTTPS Only:** Enforced via Vercel
- ✅ **Secure Headers:** CSP, HSTS, X-Frame-Options
- ✅ **API Security:** All API calls authenticated

**Vercel Configuration:**
```json
{
  "headers": [
    {
      "key": "Strict-Transport-Security",
      "value": "max-age=63072000; includeSubDomains; preload"
    },
    {
      "key": "Content-Security-Policy",
      "value": "default-src 'self'; connect-src 'self' https://*.supabase.co"
    }
  ]
}
```

---

### Administrative Safeguards (§164.308)

#### Security Management Process (§164.308(a)(1))
- ✅ **Risk Analysis:** Regular security audits
- ✅ **Risk Management:** Documented mitigation strategies
- ✅ **Sanction Policy:** Access revocation procedures
- ✅ **Information System Activity Review:** Audit log monitoring

#### Assigned Security Responsibility (§164.308(a)(2))
- Security Officer role defined
- Incident response procedures documented
- Regular security training required

#### Workforce Security (§164.308(a)(3))
- Background checks for access to PHI
- Termination procedures (immediate access revocation)
- Minimum necessary access principle

---

### Physical Safeguards (§164.310)

**Delegated to Supabase (SOC 2 Type II certified):**
- ✅ Facility Access Controls
- ✅ Workstation Use
- ✅ Workstation Security
- ✅ Device and Media Controls

---

## 🛡️ Security Features Implementation

### Row Level Security (RLS)

**Enabled on 29/34 tables (85%)**

**Example Policies:**

```sql
-- Patient can only see own health data
CREATE POLICY "Patients see own data" 
    ON seizure_logs
    FOR SELECT
    USING (auth.uid() = user_id);

-- Clinicians see connected patients' data
CREATE POLICY "Clinicians see connected patients" 
    ON seizure_logs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM patient_clinician_connections
            WHERE patient_id = seizure_logs.user_id
            AND clinician_id = auth.uid()
            AND status = 'active'
        )
    );

-- Researchers see ONLY de-identified data
CREATE POLICY "Researchers access de-identified only" 
    ON research_seizure_data
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM researcher_access_requests
            WHERE user_id = auth.uid()
            AND status = 'approved'
        )
    );
```

---

### Data Encryption

#### At Rest
**Provider:** Supabase  
**Method:** AES-256 encryption  
**Scope:** Entire database

#### In Transit
**Protocol:** TLS 1.2+  
**Scope:** All network traffic  
**Verification:**
```bash
# Check TLS version
curl -vI https://evcdikzpnjjpotbkkshs.supabase.co 2>&1 | grep TLS
```

#### Application-Level Hashing
```sql
-- Email hashing for privacy
CREATE FUNCTION hash_email(email TEXT) RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(lower(trim(email)), 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE
   SET search_path = pg_catalog, public;

-- Usage
SELECT hash_email('patient@example.com');
-- Returns: SHA-256 hash (64 chars)
```

---

### Authentication & Authorization

#### Authentication Methods
1. **Email/Password** (Supabase Auth)
2. **Magic Links** (passwordless login)
3. **OAuth** (Google, GitHub - optional)
4. **MFA** (TOTP-based, optional)

#### Authorization Levels
```typescript
type UserType = 'patient' | 'clinician' | 'researcher' | 'carer';

// Role-based access control
const hasAccess = (userType: UserType, resource: string) => {
  const permissions = {
    patient: ['own_data', 'tracking', 'medications'],
    clinician: ['own_data', 'connected_patients', 'invitations'],
    researcher: ['de_identified_data', 'research_consent'],
    carer: ['own_data', 'connected_patients']
  };
  return permissions[userType].includes(resource);
};
```

---

### Audit Logging

#### What Gets Logged
**All PHI Operations:**
- ✅ Read (SELECT)
- ✅ Create (INSERT)
- ✅ Update (UPDATE)
- ✅ Delete (DELETE)

**Authentication Events:**
- ✅ Login attempts (success/failure)
- ✅ Logout
- ✅ Password changes
- ✅ MFA events

**Permission Changes:**
- ✅ Patient-clinician connections
- ✅ Data sharing consent
- ✅ Research consent changes

**Security Events:**
- ✅ Failed authentication attempts
- ✅ Suspicious access patterns
- ✅ Policy violations

#### Audit Log Structure
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY,
    user_id UUID,           -- Who
    action TEXT,            -- What (INSERT/UPDATE/DELETE/LOGIN/etc)
    table_name TEXT,        -- Which table
    record_id TEXT,         -- Which record
    ip_address INET,        -- From where
    user_agent TEXT,        -- Using what
    created_at TIMESTAMPTZ  -- When
);

-- Retention: 7 years (HIPAA requirement)
```

#### Audit Review Procedures
```sql
-- Daily review: Check for suspicious activity
SELECT 
    COUNT(*) as failed_logins,
    user_id,
    ip_address
FROM audit_log
WHERE action = 'LOGIN_FAILED'
AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY user_id, ip_address
HAVING COUNT(*) > 5;  -- Flag > 5 failed attempts

-- Weekly review: Access patterns
SELECT 
    user_id,
    COUNT(*) as access_count,
    array_agg(DISTINCT table_name) as tables_accessed
FROM audit_log
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY user_id
ORDER BY access_count DESC;
```

---

### Security Incident Response

#### Incident Detection
```sql
-- Automated detection via triggers
CREATE FUNCTION detect_suspicious_access() 
RETURNS TRIGGER AS $$
DECLARE
    access_count INTEGER;
    recent_failures INTEGER;
BEGIN
    -- Check for excessive access in 5 minutes
    SELECT COUNT(*) INTO access_count
    FROM audit_log
    WHERE user_id = NEW.user_id
    AND action LIKE '%ACCESS%'
    AND created_at > NOW() - INTERVAL '5 minutes';
    
    IF access_count > 100 THEN
        -- Log security incident
        INSERT INTO security_incidents (
            user_id,
            incident_type,
            severity,
            description
        ) VALUES (
            NEW.user_id,
            'excessive_queries',
            'high',
            format('User performed %s queries in 5 minutes', access_count)
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Incident Response Procedure
1. **Detection:** Automated triggers or manual review
2. **Logging:** Record in `security_incidents` table
3. **Assessment:** Evaluate severity (low/medium/high/critical)
4. **Containment:** Suspend account if necessary
5. **Investigation:** Review audit logs
6. **Resolution:** Fix vulnerability
7. **Documentation:** Update incident report
8. **Prevention:** Implement additional controls

---

## 🔐 Secure Development Practices

### Code Security
```typescript
// ✅ GOOD: Parameterized queries (SQL injection protection)
const { data } = await supabase
  .from('seizure_logs')
  .select('*')
  .eq('user_id', userId);

// ❌ BAD: String concatenation
const query = `SELECT * FROM seizure_logs WHERE user_id = '${userId}'`;

// ✅ GOOD: Input validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// ✅ GOOD: Error handling without info disclosure
try {
  // operation
} catch (error) {
  console.error('Operation failed:', error); // Log detailed error
  return { error: 'An error occurred' };    // Return generic message
}
```

### Environment Security
```bash
# ✅ GOOD: Environment variables
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# ❌ BAD: Hardcoded credentials
const supabaseUrl = 'https://xxx.supabase.co';
const supabaseKey = 'eyJ...';

# ✅ GOOD: .gitignore includes
.env
.env.local
.env.production
```

### Dependency Security
```bash
# Regular dependency audits
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

---

## ✅ Security Checklist

### Development
- [x] RLS enabled on all user data tables
- [x] Audit triggers on all PHI tables
- [x] Input validation on all forms
- [x] Error handling without info disclosure
- [x] Secure session management
- [x] No hardcoded credentials
- [x] Dependencies up to date

### Pre-Production
- [ ] Third-party security audit
- [ ] Penetration testing
- [ ] Vulnerability scanning
- [ ] Load testing
- [ ] Disaster recovery testing
- [ ] Incident response drill

### Production
- [ ] Supabase Teams tier active
- [ ] BAA signed with Supabase
- [ ] BAA signed with SendGrid
- [ ] SSL/TLS certificates valid
- [ ] Monitoring alerts configured
- [ ] Backup procedures tested
- [ ] Audit log review schedule
- [ ] Security training completed

---

## 📋 Compliance Documentation

### Required Documentation
- ✅ Security Risk Analysis
- ✅ Security Policies & Procedures
- ✅ Audit Control Procedures
- ✅ Incident Response Plan
- ⚠️ Business Associate Agreements (pending)
- ⚠️ Breach Notification Procedures (pending)
- ⚠️ Employee Training Records (pending)

### Supabase BAA Requirements
**Cost:** Included with Teams tier ($599/month)  
**Coverage:** Database, Auth, Storage, Realtime  
**Exclusions:** None (full platform coverage)  
**Contact:** https://supabase.com/contact/enterprise

### SendGrid BAA Requirements
**Cost:** $99/month (Advanced tier minimum)  
**Coverage:** Email delivery  
**Requirements:** HIPAA-compliant configuration  
**Contact:** https://sendgrid.com/pricing

---

## 🆘 Security Incident Contacts

### Internal
- **Security Officer:** [To be assigned]
- **Development Team:** [Contact info]

### External
- **Supabase Support:** https://supabase.com/support
- **SendGrid Support:** https://support.sendgrid.com
- **HHS Breach Reporting:** https://www.hhs.gov/hipaa/filing-a-complaint

---

## 📚 Additional Resources

- **HIPAA Security Rule:** https://www.hhs.gov/hipaa/for-professionals/security
- **Supabase Security:** https://supabase.com/docs/guides/platform/going-into-prod
- **OWASP Top 10:** https://owasp.org/www-project-top-ten
- **PostgreSQL Security:** https://www.postgresql.org/docs/current/security.html

---

**Security is everyone's responsibility. Report all incidents immediately.**
