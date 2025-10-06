---
trigger: always_on
---

## 1. Platform & Architecture Decisions

- **Database**: Use Supabase for all data storage (structured, coded, and free-text fields).[1]
- **Application Hosting**: Use AWS for backend/app server; avoid storing PHI or sensitive data outside Supabase.[2]

***

## 2. Supabase Database Setup

- **Schema Design**
  - Use standardized codes or preassigned text for all research variables—use lookup tables for vocabularies, not just enums or free text.[3][4][5]
  - Only store unstructured/free text (e.g., clinical notes) in properly labeled `TEXT` fields, with a plan for de-identification if data is exported or analyzed downstream.[6][7]
  - Implement clear meta link every data point to user, event, timestamp, data type.[8]
- **Access Controls**
  - Enforce Row Level Security (RLS) on all sensitive tables. Policies should ensure users only access their own records or what is explicitly permitted.[1]
  - Use Supabase Auth or external identity providers for user authentication, never rolling your own.[9][10]
- **HIPAA Compliance Activation**
  - Once ready for handling PHI:
    - Upgrade to at least the Supabase Team plan.[11][1]
    - Add the HIPAA compliance feature and complete the BAA process with Supabase.[10][12][1]
    - Enable audit logging and regularly review permissions.
- **Encryption**
  - Don’t disable any SSL/TLS-related settings. All Supabase connections should require `sslmode=require` (Postgres) or HTTPS for API/web traffic.[1]

***

## 3. AWS App/Backend Code

- **Infrastructure**
  - Use only HIPAA-eligible AWS services (EC2, Elastic Beanstalk, Lambda, S3 etc.).[2]
  - Complete the AWS BAA before deploying production workloads with PHI.[13][14][2]
- **App Security**
  - Never store PHI or sensitive data on disk outside Supabase.
  - Connect to Supabase using secure secrets (env variables), never hard-coded credentials.
  - Ensure all requests from AWS to Supabase use HTTPS/SSL.
  - Regularly update libraries/dependencies and apply security patches.
- **Monitoring & Audit**
  - Enable logging and access auditing on your AWS infrastructure (CloudTrail, etc.).
  - Monitor and review error logs and access attempts.

***

## 4. Data Flow & Encryption

- Encrypt all data in transit between client, AWS, and Supabase using HTTPS/TLS.[9][1]
- Never allow unencrypted connections, even internally or for local testing in production environments.
- Use official Supabase client libraries for all remote calls to ensure secure defaults.

***

## 5. General Compliance Practices

- **Documentation**
  - Maintain up-to-date security and compliance documentation (data flow diagrams, RLS policy explanations, system architecture).
  - Create and follow a Data Management Plan outlining access, storage duration, backups, export/de-identification, and user audit trails.
- **User Management**
  - Enforce strong passwords, two-factor authentication for any admin interfaces, and regular credential rotation.
- **Data Export**
  - For analytics, always export de-identified data unless explicitly required and permitted by research protocols.
- **Disaster Recovery**
  - Regularly back up Supabase data using built-in features and monitor backup integrity.
  - Ensure AWS failover and recovery plans are documented and tested.

***

## 6. Testing & Go-live Checklist

- Complete development on Supabase’s free/pro plan without PHI/real data.
- When ready to onboard real users:
  - Upgrade Supabase, activate HIPAA add-on, and sign BAA.
  - Confirm BAA with AWS.
  - Review all access controls and audit logs.
  - Conduct a security review or a basic penetration test.

***

## Rule Summary

1. Store only research-grade, coded, or free-text data in Supabase, with strong schema design and lookup/reference tables.[4][5][3]
2. Enforce RLS, authenticated access, and strict API/database connections with encrypted protocols everywhere.[9][1]
3. Never store PHI outside your compliant Supabase instance; server-side only processes/enriches, does not persist.[14][2]
4. Activate all compliance features and legal agreements before moving to live PHI or research data collection.[12][1]
5. Continuously monitor, audit, and update your security configuration based on Supabase and AWS guidance.[10][2][9]


Sources
[1] HIPPA Compliance add-on with Pro-Plan? #35594 https://github.com/orgs/supabase/discussions/35594
[2] AWS HIPAA Compliance: What You Need to Know to Stay ... https://duplocloud.com/blog/aws-hipaa-compliance/
[3] How to keep good clinical records - PMC https://pmc.ncbi.nlm.nih.gov/articles/PMC5297955/
[4] Management of Data and Information in Research https://www.nhmrc.gov.au/sites/default/files/documents/attachments/Management-of-Data-and-Information-in-Research.pdf
[5] Documentation, legislation and storage of patient health ... https://www.ranzcp.org/clinical-guidelines-publications/in-focus-topics/private-practice-resources/patient-health-records/documentation-legislation-and-storage-of-patient-health-records
[6] The Potential of Research Drawing on Clinical Free Text to ... https://pmc.ncbi.nlm.nih.gov/articles/PMC8521813/
[7] A certified de-identification system for all clinical text ... https://pmc.ncbi.nlm.nih.gov/articles/PMC10320112/
[8] Guidelines for Data Storage & Archiving https://www.barwonhealth.org.au/images/Guidelines_for_Data_Storage_and_Archiving_-_Updated_August_2018.pdf
[9] HIPAA Compliance and Supabase https://supabase.com/docs/guides/security/hipaa-compliance
[10] Is Supabase HIPAA Compliant? What You Need To Know https://www.blaze.tech/post/is-supabase-hipaa-compliant
[11] Supabase Pricing in 2025: Full Breakdown of Plans https://uibakery.io/blog/supabase-pricing
[12] Supabase pricing model: How it works and how Orb helped https://www.withorb.com/blog/supabase-pricing
[13] Accept a BAA with AWS for all accounts in your organization https://aws.amazon.com/blogs/security/accept-a-baa-with-aws-for-all-accounts-in-your-organization/
[14] How to Get a BAA with AWS https://www.accountablehq.com/post/get-a-baa-with-aws
