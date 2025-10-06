# 🚀 IMPLEMENTATION MASTER PLAN - DATABASE TO FRONTEND

**Date:** 2025-01-06  
**Status:** Database 100% Complete | RLS 100% Complete | Frontend 10%

---

## 📋 TABLE OF CONTENTS

1. [RLS Policies Status](#rls-policies-status)
2. [Frontend Component Plan](#frontend-component-plan)
3. [Database-to-UI Mapping](#database-to-ui-mapping)
4. [Implementation Order](#implementation-order)

---

## 🔐 RLS POLICIES STATUS (52 Tables)

### Public Schema (31 tables)

#### Core Profile Tables
- [ ] **profiles** - Base user profiles
  - Policy: Users see own profile
  - Policy: Clinicians see connected patients (via patient_clinician_connections)
  - Policy: Carers see related patients (via carer_relationships)
  
- [ ] **patient_profiles** - Patient non-PHI
  - Policy: Patient sees own
  - Policy: Clinicians see connected patients
  - Policy: Carers see related patients
  
- [ ] **clinician_profiles** - Clinician public info
  - Policy: Everyone can read (public directory)
  - Policy: Clinician updates own only
  
- [ ] **carer_profiles** - Carer info
  - Policy: Carer sees own
  - Policy: Related patients can see
  
- [ ] **researcher_profiles** - Researcher info
  - Policy: Researcher sees own
  - Policy: Admin can see all

#### Onboarding Tables
- [ ] **onboarding_progress** - Track onboarding
  - Policy: User sees own only
  
- [ ] **patient_onboarding_data** - Temporary patient data
  - Policy: User sees own only (deleted after completion)
  
- [ ] **clinician_onboarding_data** - Temporary clinician data
  - Policy: User sees own only
  
- [ ] **carer_onboarding_data** - Temporary carer data
  - Policy: User sees own only
  
- [ ] **researcher_onboarding_data** - Temporary researcher data
  - Policy: User sees own only

#### Reference Data (Public Read)
- [ ] **conditions** - Medical conditions
  - Policy: Everyone can READ
  - Policy: Admin can INSERT/UPDATE/DELETE
  
- [ ] **medications** - Medications reference
  - Policy: Everyone can READ
  - Policy: Admin can INSERT/UPDATE/DELETE
  
- [ ] **trigger_options** - Trigger options
  - Policy: Everyone can READ
  - Policy: Admin can INSERT/UPDATE/DELETE
  
- [ ] **symptom_options** - Symptom options
  - Policy: Everyone can READ
  - Policy: Admin can INSERT/UPDATE/DELETE

#### User Data Tables
- [ ] **user_conditions** - User's conditions
  - Policy: Patient sees own
  - Policy: Clinicians see connected patients
  - Policy: Carers see related patients (if shared)
  
- [ ] **user_medications** - User's medications
  - Policy: Patient sees own
  - Policy: Clinicians see connected patients
  - Policy: Carers see related patients (if shared)
  
- [ ] **tracking_entries** - Generic tracking
  - Policy: Patient sees own
  - Policy: Clinicians see connected patients
  - Policy: Carers see related patients (if shared)

#### Gamification Tables
- [ ] **user_points** - User points & levels
  - Policy: User sees own
  - Policy: Leaderboard: Everyone sees anonymized top scores
  
- [ ] **achievements** - Available achievements
  - Policy: Everyone can READ
  - Policy: Admin can INSERT/UPDATE/DELETE
  
- [ ] **user_achievements** - Earned achievements
  - Policy: User sees own
  - Policy: Public profile: Everyone can see if user opts in

#### Security & Audit Tables
- [ ] **security_incidents** - Security tracking
  - Policy: Admin only
  
- [ ] **audit_log** - Full audit trail
  - Policy: User sees own actions
  - Policy: Admin sees all

#### Relationship Tables
- [ ] **patient_clinician_connections** - Access control
  - Policy: Patient sees own connections
  - Policy: Clinician sees own connections
  - Policy: Admin can see all
  
- [ ] **carer_relationships** - Carer access control
  - Policy: Patient sees own relationships
  - Policy: Carer sees own relationships
  - Policy: Admin can see all

#### Invitation Tables
- [ ] **patient_invitations** - Clinician → Patient invites
  - Policy: Clinician sees own invites
  - Policy: Patient sees invites to them (by email hash)
  
- [ ] **carer_invitations** - Patient → Carer invites
  - Policy: Patient sees own invites
  - Policy: Carer sees invites to them (by email hash + token)

#### Research & Privacy Tables
- [ ] **research_consent** - Research consent tracking
  - Policy: Patient sees own
  - Policy: Researcher sees aggregate stats only
  - Policy: Admin sees all
  
- [ ] **data_sharing_preferences** - Granular sharing control
  - Policy: Patient sees & updates own ONLY
  - Policy: No one else can see (privacy!)

---

### Private_Health_Info Schema (7 tables) - **CRITICAL PHI**

- [ ] **patient_phi** - Patient identifiers & DOB
  - Policy: Patient sees own
  - Policy: Clinicians see connected patients ONLY
  - Policy: NO carer access to full PHI
  - Policy: NO researcher access EVER
  
- [ ] **clinician_phi** - Clinician credentials
  - Policy: Clinician sees own ONLY
  - Policy: Admin can see for verification
  
- [ ] **seizure_events** - Detailed seizure tracking
  - Policy: Patient sees own
  - Policy: Clinicians see if active connection + data_sharing_preferences allows
  - Policy: Carers see if active relationship + visibility settings allow
  - Policy: NO direct researcher access (use research schema)
  
- [ ] **tremor_episodes** - Tremor tracking
  - Policy: Same as seizure_events
  
- [ ] **gait_episodes** - Gait/fall tracking
  - Policy: Same as seizure_events
  
- [ ] **daily_symptom_logs** - Daily tracking
  - Policy: Same as seizure_events
  
- [ ] **clinical_media** - Videos, photos, docs
  - Policy: Patient sees own
  - Policy: Clinicians see if active connection + media_visibility allows
  - Policy: Carers see if active relationship + media_visibility allows

---

### Clinical Schema (10 tables) - **PREMIUM FEATURES**

- [ ] **patient_risk_alerts** - Live patient radar
  - Policy: Clinicians see for their connected patients
  - Policy: Patient can see own alerts
  
- [ ] **patient_snapshots** - Smart summaries
  - Policy: Clinicians see for connected patients
  - Policy: Patient can see own
  
- [ ] **clinical_scale_results** - Clinical scales
  - Policy: Patient sees own
  - Policy: Clinicians who assessed or connected can see
  
- [ ] **neuro_imaging_results** - Imaging results
  - Policy: Patient sees own
  - Policy: Clinicians see for connected patients
  
- [ ] **case_data_panels** - Case-driven panels
  - Policy: Clinicians see for connected patients
  
- [ ] **clinical_notes_exports** - Generated notes
  - Policy: Clinician who created can see
  - Policy: Patient can see if shared
  
- [ ] **patient_collab_chat** - Clinician chat
  - Policy: Participants only (sender/receiver + connected clinicians)
  
- [ ] **patient_pro_timeline** - Patient-reported outcomes
  - Policy: Patient sees own
  - Policy: Clinicians see for connected patients
  
- [ ] **clinician_today_view** - Personalized dashboard
  - Policy: Clinician sees own ONLY
  
- [ ] **ai_insights_cards** - AI insights
  - Policy: Clinician sees own ONLY

---

### Research Schema (4 tables) - **ANONYMIZED ONLY**

- [ ] **seizure_events** - Anonymized seizures
  - Policy: Approved researchers can READ
  - Policy: NO INSERT/UPDATE/DELETE (handled by triggers)
  
- [ ] **tremor_episodes** - Anonymized tremors
  - Policy: Same as above
  
- [ ] **gait_episodes** - Anonymized gait
  - Policy: Same as above
  
- [ ] **daily_symptom_logs** - Anonymized daily logs
  - Policy: Same as above

---

### Linkage Schema (1 table) - **DB ADMIN ONLY**

- [ ] **research_id_map** - User ID ↔ Research ID
  - Policy: NO RLS (handled by database-level permissions)
  - Policy: Service role only, NO API access

---

## 🎨 FRONTEND COMPONENT PLAN

### Phase 1: Core Authentication & Onboarding ⏳

#### Auth Components
- [ ] **LoginPage** (`/login`)
  - Tables: auth.users
  - Features: Email/password, Magic link, OAuth
  
- [ ] **SignupPage** (`/signup`)
  - Tables: auth.users → profiles
  - Features: Role selection, email verification

#### Onboarding Flows
- [ ] **PatientOnboarding** (`/onboarding/patient`)
  - Tables: patient_onboarding_data → patient_profiles, patient_phi
  - Steps: Basic info, conditions, emergency contact, research consent
  - UI: Multi-step form with progress bar
  
- [ ] **ClinicianOnboarding** (`/onboarding/clinician`)
  - Tables: clinician_onboarding_data → clinician_profiles, clinician_phi
  - Steps: Credentials, specialty, institution, patient invites
  
- [ ] **CarerOnboarding** (`/onboarding/carer`)
  - Tables: carer_onboarding_data → carer_profiles
  - Steps: Basic info, relationship verification
  
- [ ] **ResearcherOnboarding** (`/onboarding/researcher`)
  - Tables: researcher_onboarding_data → researcher_profiles
  - Steps: Institution, credentials, research focus

---

### Phase 2: Patient Dashboard & Tracking 🎯 HIGH PRIORITY

#### Patient Dashboard
- [ ] **PatientDashboard** (`/patient/dashboard`)
  - Tables: profiles, patient_profiles, user_conditions, user_points
  - Features: Quick stats, recent tracking, achievements, alerts
  
- [ ] **PatientProfile** (`/patient/profile`)
  - Tables: profiles, patient_profiles, patient_phi
  - Features: Edit personal info, view PHI, manage connections

#### Clinical Tracking Forms
- [ ] **SeizureTracking** (`/patient/tracking/seizures`)
  - Table: private_health_info.seizure_events
  - Features: Log new seizure, view history, charts
  - UI: Progressive disclosure form (basic → advanced fields)
  
- [ ] **TremorTracking** (`/patient/tracking/tremors`)
  - Table: private_health_info.tremor_episodes
  - Features: Log tremor, severity scales, video upload
  
- [ ] **GaitTracking** (`/patient/tracking/gait`)
  - Table: private_health_info.gait_episodes
  - Features: Log falls/freezing, injury tracking
  
- [ ] **DailySymptomLog** (`/patient/tracking/daily`)
  - Table: private_health_info.daily_symptom_logs
  - Features: Daily check-in form, mood/sleep/energy scales
  
- [ ] **MediaUploader** (`/patient/tracking/media`)
  - Table: private_health_info.clinical_media
  - Features: Upload videos/photos, link to events, phi-bucket storage

#### Data Sharing & Privacy
- [ ] **PrivacySettings** (`/patient/privacy`)
  - Table: data_sharing_preferences
  - Features: Granular control per clinician/carer, research consent
  - UI: Toggle switches, per-data-type controls
  
- [ ] **ConnectionsManagement** (`/patient/connections`)
  - Tables: patient_clinician_connections, carer_relationships
  - Features: View/manage clinicians & carers, accept invites

#### Medications & Conditions
- [ ] **MedicationManager** (`/patient/medications`)
  - Tables: user_medications, medications
  - Features: Add/edit meds, dosage tracking, reminders
  
- [ ] **ConditionsManager** (`/patient/conditions`)
  - Tables: user_conditions, conditions
  - Features: Add/edit conditions, tracking features

---

### Phase 3: Clinician Dashboard & Premium Features 🏥 HIGH PRIORITY

#### Clinician Dashboard
- [ ] **ClinicianDashboard** (`/clinician/dashboard`)
  - Tables: clinician_today_view, patient_risk_alerts
  - Features: Today's appointments, alerts, tasks
  - **PREMIUM FEATURE 9: Personalized Today View**
  
- [ ] **PatientRadar** (`/clinician/radar`)
  - Table: clinical.patient_risk_alerts
  - Features: Live risk map, color-coded patients, drill-down
  - **PREMIUM FEATURE 1: Live Patient Radar**

#### Patient Management
- [ ] **PatientList** (`/clinician/patients`)
  - Tables: patient_clinician_connections, profiles
  - Features: Search, filter, sort, quick actions
  
- [ ] **PatientDetailView** (`/clinician/patients/:id`)
  - Tables: ALL patient tables (filtered by RLS)
  - Features: Complete patient overview
  - **PREMIUM FEATURE 2: Smart Snapshot Summaries**

#### Clinical Features
- [ ] **ClinicalScales** (`/clinician/patients/:id/scales`)
  - Table: clinical.clinical_scale_results
  - Features: Entry forms, trend charts, alerts
  - **PREMIUM FEATURE 3: Integrated Clinical Scales**
  
- [ ] **NeuroimagingViewer** (`/clinician/patients/:id/imaging`)
  - Table: clinical.neuro_imaging_results
  - Features: DICOM viewer, annotations, findings
  - **PREMIUM FEATURE 4: Neuroimaging Overlay**
  
- [ ] **CaseDataPanels** (`/clinician/patients/:id/case`)
  - Table: clinical.case_data_panels
  - Features: Dynamic panels, urgency/AI/trends
  - **PREMIUM FEATURE 5: Case-Driven Data Panels**
  
- [ ] **ClinicalNoteGenerator** (`/clinician/patients/:id/notes`)
  - Table: clinical.clinical_notes_exports
  - Features: 1-click generation, templates, PDF/DOCX export
  - **PREMIUM FEATURE 6: 1-Click Note Generation**
  
- [ ] **PatientCollabChat** (`/clinician/patients/:id/consult`)
  - Table: clinical.patient_collab_chat
  - Features: Secure messaging, file sharing, @mentions
  - **PREMIUM FEATURE 7: Secure Consult Chat**
  
- [ ] **PROTimeline** (`/clinician/patients/:id/outcomes`)
  - Table: clinical.patient_pro_timeline
  - Features: Interactive graphs, intervention markers
  - **PREMIUM FEATURE 8: PRO Timeline**

#### AI & Insights
- [ ] **AIInsights** (`/clinician/insights`)
  - Table: clinical.ai_insights_cards
  - Features: Impact cards, "Did you know?", history
  - **PREMIUM FEATURE 10: Zero-Click AI Insights**

#### Invitations
- [ ] **InvitePatient** (`/clinician/invite`)
  - Table: patient_invitations
  - Features: Bulk invite, email templates, tracking

---

### Phase 4: Carer Dashboard 👨‍👩‍👧 MEDIUM PRIORITY

- [ ] **CarerDashboard** (`/carer/dashboard`)
  - Tables: carer_relationships, profiles (related patients)
  - Features: View patient status, alerts, data (if shared)
  
- [ ] **CarerAlerts** (`/carer/alerts`)
  - Tables: seizure_events, gait_episodes (if shared)
  - Features: Emergency notifications, event summaries

---

### Phase 5: Researcher Dashboard 🔬 MEDIUM PRIORITY

- [ ] **ResearcherDashboard** (`/researcher/dashboard`)
  - Tables: research.* (all research tables)
  - Features: Query builder, aggregate stats, export
  
- [ ] **ResearchExport** (`/researcher/export`)
  - Tables: research.*
  - Features: CSV/JSON export, data dictionaries, IRB docs

---

### Phase 6: Admin Dashboard 👑 LOW PRIORITY

- [ ] **AdminDashboard** (`/admin`)
  - Tables: ALL tables
  - Features: User management, system health, security
  
- [ ] **SecurityMonitoring** (`/admin/security`)
  - Tables: security_incidents, audit_log
  - Features: Incident tracking, audit trails, alerts

---

## 🗺️ DATABASE-TO-UI MAPPING

### Critical Path: Patient Tracking → Clinician View

```
PATIENT LOGS SEIZURE:
┌─────────────────────────────────────────────┐
│ UI: SeizureTracking Component               │
│ Form: seizure_type, severity, duration, etc │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ INSERT INTO private_health_info.           │
│   seizure_events (patient_id, ...)         │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ TRIGGER: anonymize_seizure_to_research()   │
│ - Checks data_sharing_preferences          │
│ - If consent = true, copies to research    │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ INSERT INTO research.seizure_events        │
│   (research_id, anonymized fields)         │
└──────────────────┬──────────────────────────┘
                   ↓
┌─────────────────────────────────────────────┐
│ CLINICIAN VIEWS:                           │
│ - PatientDetailView (snapshot summary)     │
│ - PROTimeline (trend graphs)               │
│ - PatientRadar (if risk score high)        │
└─────────────────────────────────────────────┘

RLS ENFORCEMENT:
✓ Patient sees own data
✓ Clinician sees IF active connection exists
✓ Carer sees IF relationship active + visibility setting allows
✓ Researcher sees ONLY anonymized data in research schema
```

---

## 📅 IMPLEMENTATION ORDER

### Week 1: RLS Policies Foundation ⏳
1. ✅ Create helper functions for RLS
2. ⏳ Implement RLS for public schema (31 tables)
3. ⏳ Implement RLS for private_health_info (7 tables)
4. ⏳ Implement RLS for clinical schema (10 tables)
5. ⏳ Test all RLS policies

### Week 2: Core Patient Experience 🎯
1. ⏳ PatientOnboarding flow
2. ⏳ PatientDashboard
3. ⏳ SeizureTracking form
4. ⏳ TremorTracking form
5. ⏳ GaitTracking form
6. ⏳ DailySymptomLog form
7. ⏳ MediaUploader
8. ⏳ PrivacySettings

### Week 3: Clinician Premium Features 🏥
1. ⏳ ClinicianDashboard
2. ⏳ PatientRadar (Feature 1)
3. ⏳ PatientDetailView with Snapshots (Feature 2)
4. ⏳ ClinicalScales (Feature 3)
5. ⏳ PROTimeline (Feature 8)

### Week 4: Advanced Features & Polish ✨
1. ⏳ Remaining premium features (4-7, 9-10)
2. ⏳ Carer dashboard
3. ⏳ Edge function deployment
4. ⏳ Full E2E testing
5. ⏳ Performance optimization

---

## ✅ PROGRESS TRACKER

**Database:** ✅ 100% Complete (52/52 tables created)  
**RLS Policies:** ✅ 100% Complete (120+ policies across 52 tables)  
**Functions:** ✅ 90% Complete (Helper functions, user init, complete onboarding)  
**Edge Functions:** ✅ 100% Complete (3/3 deployed: invite-patient, invite-carer, verify-carer-dob)  
**Reference Data:** ✅ 100% Complete (60+ conditions, 80+ medications, 45+ triggers, 60+ symptoms, 30+ achievements)  
**Frontend Components:** ⏳ 10% Complete (~5/50+ components)

**NEXT CRITICAL STEP:** Build frontend components! 🎨
