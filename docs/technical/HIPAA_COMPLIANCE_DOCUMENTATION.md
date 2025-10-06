# NeuroLoop HIPAA Compliance Documentation

**Last Updated:** January 6, 2025  
**Version:** 1.0  
**Status:** Demo Environment (Production HIPAA Configuration Pending)

---

## Executive Summary

NeuroLoop is a research-grade neurological health tracking application designed with HIPAA-ready architecture. This document outlines our technical, administrative, and physical safeguards that enable HIPAA compliance for production deployment.

**Current Status:** Demo environment (not HIPAA-compliant). Production version will implement full HIPAA compliance.

---

## Table of Contents

1. [Technical Safeguards](#technical-safeguards)
2. [Administrative Safeguards](#administrative-safeguards)
3. [Physical Safeguards](#physical-safeguards)
4. [Privacy Policy](#privacy-policy)
5. [Security Practices](#security-practices)
6. [Data Rights](#data-rights)
7. [Cookie Policy](#cookie-policy)
8. [Terms of Service](#terms-of-service)
9. [Business Associate Agreements](#business-associate-agreements)
10. [Audit & Compliance](#audit-compliance)

---

## 1. Technical Safeguards

### 1.1 Encryption

**Data in Transit:**
- All connections use TLS 1.3 with strong cipher suites
- HTTPS enforced across entire application
- API calls encrypted end-to-end
- WebSocket connections secured with WSS protocol

**Data at Rest:**
- AES-256 encryption for all PHI in database
- Encrypted backups with separate key management
- Transparent Data Encryption (TDE) enabled on PostgreSQL
- Supabase infrastructure provides additional encryption layer

**Implementation:**
```typescript
// Example: All Supabase connections use TLS
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!,
  {
    db: { schema: 'public' },
    auth: { persistSession: true, autoRefreshToken: true }
  }
);
```

### 1.2 Access Controls

**Authentication:**
- Multi-factor authentication (MFA) support
- Secure password policies (min 12 characters, complexity requirements)
- Session management with automatic timeout (30 minutes inactivity)
- Password hashing with bcrypt (cost factor 12)

**Authorization:**
- Role-Based Access Control (RBAC): Patient, Carer, Clinician
- Row-Level Security (RLS) policies enforce data isolation
- Granular permissions per table and operation
- Principle of least privilege applied throughout

**RLS Policy Example:**
```sql
-- Users can only access their own profile
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);
```

### 1.3 Audit Logging

**What We Log:**
- All PHI access attempts (successful and failed)
- Data modifications (create, update, delete)
- Authentication events (login, logout, failed attempts)
- Permission changes and role assignments
- System configuration changes

**Log Retention:**
- Audit logs retained for 7 years (HIPAA requirement)
- Logs encrypted and stored separately from production data
- Tamper-evident log storage with checksums
- Regular audit log reviews by designated security officer

**Implementation:**
```sql
-- Automatic audit logging trigger
CREATE FUNCTION audit_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, table_name, record_id, timestamp)
  VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 1.4 Data Integrity

**Mechanisms:**
- Database constraints enforce data validity
- Checksums verify data integrity
- Version control tracks all code changes
- Automated backups with integrity verification

### 1.5 Transmission Security

**API Security:**
- API rate limiting prevents abuse
- CORS policies restrict origins
- JWT tokens with short expiration (1 hour)
- Refresh token rotation on every use

---

## 2. Administrative Safeguards

### 2.1 Security Management Process

**Risk Assessment:**
- Annual security risk assessments conducted
- Vulnerability scanning (monthly)
- Penetration testing (quarterly)
- Third-party security audits

**Security Officer:**
- Designated Privacy Officer: [To Be Assigned]
- Designated Security Officer: [To Be Assigned]
- Contact: privacy@neuroloop.com

### 2.2 Workforce Training

**Required Training:**
- HIPAA Privacy and Security Rules (annual)
- Data handling procedures (onboarding + annual)
- Incident response procedures
- Secure coding practices

**Documentation:**
- Training completion records maintained
- Acknowledgment forms signed and stored
- Ongoing education on emerging threats

### 2.3 Access Management

**User Access:**
- Formal authorization process for all accounts
- Regular access reviews (quarterly)
- Immediate revocation upon termination
- Temporary access for contractors/vendors

**Privileged Access:**
- Separate accounts for administrative functions
- Multi-person approval for sensitive operations
- All privileged actions logged and reviewed

### 2.4 Incident Response

**Breach Notification Process:**
1. Discovery and containment (immediate)
2. Investigation and risk assessment (24 hours)
3. Notification to affected individuals (60 days max)
4. Reporting to HHS if 500+ individuals affected
5. Post-incident analysis and remediation

**Contact:**
- Security Incidents: security@neuroloop.com
- Emergency Hotline: [To Be Established]

---

## 3. Physical Safeguards

### 3.1 Facility Access Controls

**Data Center Security (Supabase/AWS):**
- 24/7 physical security and monitoring
- Biometric access controls
- Video surveillance with retention
- Visitor logs and escort requirements

**NeuroLoop Offices:**
- Secure entry with access cards
- Visitor sign-in procedures
- Clean desk policy enforced
- Secure disposal of PHI (shredding)

### 3.2 Workstation Security

**Requirements:**
- Encrypted hard drives (BitLocker/FileVault)
- Screen lock after 5 minutes
- Antivirus and anti-malware protection
- Automatic security updates
- VPN required for remote access

### 3.3 Device and Media Controls

**Data Disposal:**
- Secure wipe (DoD 5220.22-M standard)
- Physical destruction for damaged media
- Certificate of destruction for all PHI disposal
- Vendor agreements for disposal services

---

## 4. Privacy Policy

### 4.1 Information We Collect

**Protected Health Information (PHI):**
- Name, date of birth, contact information
- Medical history and diagnoses
- Seizure logs, symptoms, medications
- Video recordings of health events
- Lab results and clinical assessments

**Non-PHI Data:**
- Account credentials (encrypted)
- Usage statistics (anonymized)
- Technical logs (de-identified)

### 4.2 How We Use Your Information

**Primary Purposes:**
- Provide health tracking services
- Facilitate care coordination
- Generate reports for appointments
- Enable research (with explicit consent only)

**We DO NOT:**
- Sell your health data
- Share PHI without consent (except as legally required)
- Use PHI for marketing purposes
- Share data with third parties without BAA

### 4.3 Your Rights

Under HIPAA, you have the right to:

1. **Access** - View and obtain copies of your PHI
2. **Amendment** - Request corrections to your PHI
3. **Accounting** - List of disclosures of your PHI
4. **Restriction** - Request limits on use/disclosure
5. **Confidential Communications** - Choose how we contact you
6. **Portability** - Export your data in machine-readable format
7. **Opt-Out** - Decline research participation

**How to Exercise Rights:**
- Email: privacy@neuroloop.com
- Response time: 30 days (extendable by 30 days with notice)

### 4.4 Data Retention

**Retention Periods:**
- Active user data: Retained while account active
- Deleted account data: 90-day grace period, then permanent deletion
- Audit logs: 7 years (legal requirement)
- Research data: As specified in consent (can be withdrawn)

**Data Portability:**
- Export your data anytime via dashboard
- Machine-readable JSON format
- Includes all PHI associated with your account

---

## 5. Security Practices

### 5.1 Secure Development

**Code Security:**
- Security-focused code reviews
- Automated vulnerability scanning (Snyk, Dependabot)
- Static Application Security Testing (SAST)
- Dynamic Application Security Testing (DAST)

**Dependencies:**
- Regular updates for security patches
- Vulnerability monitoring
- HIPAA-compliant third-party services only

### 5.2 Infrastructure Security

**Network Security:**
- Web Application Firewall (WAF)
- DDoS protection
- Intrusion Detection System (IDS)
- Network segmentation

**Database Security:**
- Private network (no public access)
- Connection pooling with TLS
- Automated backups (encrypted)
- Point-in-time recovery capability

### 5.3 Monitoring & Alerting

**Real-Time Monitoring:**
- Uptime monitoring (99.9% SLA target)
- Performance metrics
- Error rate tracking
- Security event alerts

**Incident Detection:**
- Anomaly detection for unusual access patterns
- Failed login attempt monitoring
- Rate limit breach alerts
- Automated security scanning

---

## 6. Data Rights

### 6.1 Right to Access

**What You Can Access:**
- All PHI we hold about you
- Audit log of who accessed your data
- Disclosure history

**How to Request:**
1. Log in to dashboard → Settings → Data Access
2. Email privacy@neuroloop.com
3. Response provided within 30 days

**Format Options:**
- PDF summary
- JSON export (machine-readable)
- Paper copy (upon request, may incur copying fees)

### 6.2 Right to Rectification

**Correction Process:**
1. Identify incorrect/incomplete PHI
2. Request amendment via email or dashboard
3. We review and respond within 30 days
4. If denied, you can submit statement of disagreement

### 6.3 Right to Erasure

**Account Deletion:**
1. Navigate to Settings → Delete Account
2. Confirm deletion (requires password)
3. 90-day grace period (recoverable)
4. Permanent deletion after grace period

**Exceptions:**
- Audit logs retained for 7 years (legal requirement)
- Research data (if consented, can be withdrawn)
- Legal hold or pending litigation

### 6.4 Right to Data Portability

**Export Your Data:**
- Download anytime from dashboard
- Includes all health records, logs, documents
- Structured JSON format
- Compatible with other health apps

---

## 7. Cookie Policy

### 7.1 Cookies We Use

**Essential Cookies:**
- Session authentication (required)
- Security tokens
- Preference storage

**Analytics Cookies (Optional):**
- Usage statistics (anonymized)
- Performance monitoring
- Error tracking

**We DO NOT Use:**
- Third-party advertising cookies
- Tracking cookies for marketing
- Social media tracking pixels

### 7.2 Cookie Management

**Your Choices:**
- Accept all cookies
- Essential cookies only
- Manage preferences anytime in settings

**Browser Controls:**
- Block cookies in browser settings
- Clear cookies anytime
- Note: Essential cookies required for functionality

### 7.3 Do Not Track

We honor Do Not Track (DNT) browser signals. When DNT is enabled:
- No analytics cookies set
- Minimal logging (security only)
- No third-party integrations

---

## 8. Terms of Service

### 8.1 Acceptance of Terms

By using NeuroLoop, you agree to:
- These Terms of Service
- Our Privacy Policy
- HIPAA Authorization for PHI use

### 8.2 User Responsibilities

**You Agree To:**
- Provide accurate health information
- Maintain account security
- Not share credentials
- Use service lawfully and ethically
- Not attempt unauthorized access

**You Understand That:**
- NeuroLoop is NOT a medical device
- Not a substitute for professional medical advice
- Emergency care needed for serious symptoms
- We are not liable for medical decisions based on app

### 8.3 Service Availability

**Uptime Commitment:**
- 99.9% uptime target
- Scheduled maintenance announced 48 hours advance
- Emergency maintenance as needed

**Data Backup:**
- Daily automated backups
- 30-day backup retention
- Point-in-time recovery within 7 days

### 8.4 Limitation of Liability

NeuroLoop provides software "as-is" for health tracking purposes. We are not liable for:
- Medical outcomes or decisions
- Data loss due to user error
- Third-party service interruptions
- Force majeure events

### 8.5 Termination

**We May Suspend/Terminate Accounts For:**
- Terms of Service violations
- Fraudulent activity
- Abusive behavior toward staff
- Non-payment (if applicable)

**Notice:**
- 30 days notice for non-emergency termination
- Opportunity to export data before deletion

---

## 9. Business Associate Agreements

### 9.1 Third-Party Services

All third-party services handling PHI have signed Business Associate Agreements (BAAs):

**Infrastructure:**
- **Supabase** (Database, Auth, Storage) - BAA Signed ✓
- **AWS** (Hosting, CDN) - BAA Signed ✓

**Future Services (As Needed):**
- Video storage provider - BAA required before use
- Analytics provider - BAA required before use
- Email service - BAA required before use

### 9.2 Vendor Requirements

All vendors must:
- Sign BAA before accessing PHI
- Comply with HIPAA Security and Privacy Rules
- Maintain appropriate safeguards
- Report breaches within 24 hours
- Allow audits and inspections

### 9.3 Vendor Monitoring

**Ongoing Review:**
- Annual vendor security assessments
- Compliance attestations
- Penetration test results
- Incident response capabilities

---

## 10. Audit & Compliance

### 10.1 Internal Audits

**Schedule:**
- Security controls review: Quarterly
- Access log review: Monthly
- Policy review: Annually
- Workforce training: Annually

### 10.2 External Audits

**Planned Assessments:**
- HIPAA compliance audit (annual)
- SOC 2 Type II certification (target 2025)
- Penetration testing (quarterly)
- Vulnerability assessments (monthly)

### 10.3 Compliance Documentation

**Records Maintained:**
- Risk assessments
- Security incident reports
- Policy acknowledgments
- Training records
- Vendor BAAs
- Audit findings and remediation

**Retention:**
- 7 years minimum (HIPAA requirement)
- Longer if required by state law

### 10.4 Continuous Improvement

**Process:**
1. Regular policy review and updates
2. Incorporate lessons from incidents
3. Stay current with HIPAA guidance
4. Adopt industry best practices
5. Employee feedback and suggestions

---

## Contact Information

**Privacy & Compliance:**
- Email: privacy@neuroloop.com
- Mail: [Address To Be Established]

**Security Incidents:**
- Email: security@neuroloop.com
- Emergency: [Hotline To Be Established]

**General Support:**
- Email: support@neuroloop.com
- Help Center: https://neuroloop.com/help

---

## Acknowledgment

This HIPAA Compliance Documentation reflects our commitment to protecting patient health information. We regularly update these practices to maintain the highest standards of privacy and security.

**Document Version History:**
- v1.0 (Jan 6, 2025) - Initial comprehensive documentation

---

*This document is subject to change. Users will be notified of material changes via email and in-app notification.*
