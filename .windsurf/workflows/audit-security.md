---
description: For research-grade tracking data in clinical and medical applications - AUDIT
auto_execution_mode: 3
---

AUDIT EVERYTHING AND CREATE A LIST OF TASKS TO COMPLTE TO ENSURE WE ARE COMPLIANT. 



---
For research-grade tracking data in clinical and medical applications, using structured database standards like pre-assigned text values (codes/labels), enums, or standardized vocabularies (such as SNOMED CT or LOINC), is preferred over raw JSON or generic VARCHAR fields, especially for interoperability, compliance, and multilingual support.

### Medical Data Standards

- Established health data standards for clinical research include HL7 FHIR, CDISC, LOINC, and SNOMED CT, which rely on structured coding and pre-defined text values (codes, labels), not unstructured JSON blobs or free text.
- Using database ENUM types or lookup tables for such codes ensures consistency and validation, but with large vocabularies or evolving terminology, separate reference tables (with code, display text, and translations) offer greater flexibility and scale.
- Storing results as standardized codes/text makes data easier to process, share, and map for regulatory and research requirements, and facilitates translation, unlike JSON objects or arbitrary string fields.

### Text vs JSON vs VARCHAR

| Method               | Research-grade Suitability | Compliance | Ease of Translation | Interoperability | Best Use Case                |
|----------------------|---------------------------|------------|---------------------|------------------|------------------------------|
| Pre-assigned Text    | High               | High| High         | High      | Clinical codes, structured answers|
| Enums                | High               | High| Moderate     | Moderate  | Status, categorical values   |
| Reference Table Codes| Highest            | Highest| Highest   | Highest   | Terminologies, multi-language|
| JSON                 | Low                | Moderate| Low      | Low       | Unstructured, custom storage |
| VARCHAR/Free Text    | Low                | Low | Low          | Low       | Notes, comments              |

### Best Practices for Research-grade Data

- Always use **standardized coding systems** (e.g., SNOMED CT, LOINC, ICD-10, OMOP) in your tables as pre-assigned text values or codes, not free text or arbitrary labels.
- For research applications, store values using reference tables that map codes to display text and translations, enabling compliance, multilingual support, and consistent research export.
- Avoid storing clinical-tracking data primarily in JSON or simple VARCHAR columns—these are rarely accepted for regulatory audits or large-scale data sharing.
- Incorporate compliance frameworks (e.g., FHIR) that already define best structures for research-grade tracking.

### Recommendation

For your patient tracking data, use database schemas based on **pre-assigned codes/labels**, either through enums (for small, fixed sets), or a reference table system (for large/standards-based vocabularies). Store each observation, symptom, or event as a code, and reference translations or display text in separate lookup tables. Avoid JSON or raw VARCHAR except for free-form notes. This ensures your data is easy to query, audit, export for research, and ready for compliance.

If you need specific table structures or standards for your health tech platform, consider HL7 FHIR's `Observation` and terminology modules, which are designed for exactly this purpose.

The best method for storing non-preassigned patient notes in a research-grade database is to use a dedicated free-text field (e.g., TEXT or VARCHAR in SQL), paired with strong security, access controls, and de-identification processes to meet compliance and privacy regulations. This approach preserves the richness of patient input while ensuring the data remains accessible and useful for research.[1][2][3]

### Key Requirements for Research-quality Notes

- Store patient notes as free-text fields (TEXT/VARCHAR), separate from coded or structured variables, in a relational database for accessibility and indexing.[3][1]
- Apply regular de-identification processes (using certified pipelines if available) to remove personally identifiable information before research analysis, ensuring privacy while retaining meaningful data for studies.[4][1]
- Securely manage data with robust encryption, password protection, and retention policies, as required by local regulations and ethical guidelines for healthcare research in Australia.[2][5][3]
- Document procedures for extracting, handling, and sharing free-text notes in your Data Management Plan, so that future researchers can trace decisions related to privacy, data retention, and compliance.[6][3]

### Making Notes ‘Research-worthy’

- Ensure notes fields are indexed and easily retrievable for analysis, using clear links to patient records and timestamps.[3]
- Use standardized metadata (patient ID, clinician ID, event date, note type) alongside notes to support audit trails and data provenance.[3]
- Maintain original free-text records but apply NLP or manual review to derive additional structured insights if needed for analysis.[1]
- Retain de-identified notes for the recommended period (typically 5–7 years, or longer for medical interventions), according to local research ethics and policy.[3]

### Compliance Considerations

- Follow national best practices (Australian Code, NHMRC guidelines) for data security, retention, and access controls when storing notes.[2][6][3]
- Ensure research systems can export notes in accessible, readable formats (e.g., CSV, PDF, or queryable database), allowing for review and secondary analysis.[3]
- Avoid relying solely on JSON formatting for free-text notes, as this makes data harder to query and audit; stick to database-supported TEXT types instead.[7][8]

Storing patient notes using a TEXT or VARCHAR field, secured and routinely de-identified, is widely accepted and research-ready, providing strong compliance, accessibility, and scientific utility.[1][2][3]


Here’s a detailed compliance guide tailored to your project needs for building a research-grade, HIPAA-ready health platform using Supabase (database) and AWS (app/server), based on everything we’ve discussed:

***

## 1. Platform & Architecture Decisions

- **Database**: Use Supabase for all data storage (structured, coded, and free-text fields).[1]
- **Application Hosting**: Use AWS for backend/app server; avoid storing PHI or sensitive data outside Supabase.[2]

***

## 2. Supabase Database Setup

- **Schema Design**
  - Use standardized codes or preassigned text for all research variables—use lookup tables for vocabularies, not just enums or free text.[3][4][5]
  - Only store unstructured/free text (e.g., clinical notes) in properly labeled `TEXT` fields, with a plan for de-identification if data is exported or analyzed downstream.[6][7]
  - Implement clear metadata: link every data point to user, event, timestamp, data type.[8]
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
  - Create and follow a Data Management Plan outlining access, storage duration, backups, export/de-id