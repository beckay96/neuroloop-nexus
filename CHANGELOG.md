# Changelog - NeuroLoop

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Planned
- Mobile app (React Native)
- Advanced analytics dashboard
- AI-powered pattern detection
- Telemedicine integration
- Wearable device sync

---

## [1.0.0] - 2025-10-05

### 🎉 Initial Production-Ready Release

#### Database
- ✅ Created complete database schema (34 tables)
- ✅ Implemented Row Level Security on all user data (29/34 tables)
- ✅ Added comprehensive audit logging (20+ tables)
- ✅ Created tracking feature auto-assignment system
- ✅ Implemented patient invitation system
- ✅ Added security incident tracking
- ✅ Created gamification tables (achievements, points)

#### Security
- ✅ Fixed function search_path vulnerability (7 functions)
- ✅ Implemented email hashing (SHA-256)
- ✅ Added secure invitation tokens (32 bytes entropy)
- ✅ Enabled encryption at rest and in transit
- ✅ Configured HIPAA-compliant audit logging
- ✅ Added security incident detection triggers

#### Features
- ✅ User authentication (Supabase Auth)
- ✅ Multi-role onboarding (Patient/Clinician/Researcher/Carer)
- ✅ Condition-based tracking feature assignment
- ✅ Daily tracking (seizures, medications, symptoms, mood, sleep)
- ✅ Patient-clinician invitation system
- ✅ Research consent management
- ✅ De-identified research data tables

#### Documentation
- ✅ Complete README with project overview
- ✅ Detailed SETUP guide
- ✅ Comprehensive DATABASE documentation
- ✅ Complete SECURITY & HIPAA compliance guide
- ✅ Production DEPLOYMENT guide
- ✅ Cleaned up all redundant documentation

#### Testing
- ✅ Ran comprehensive database tests (10/10 passed)
- ✅ Verified all triggers active (28 triggers)
- ✅ Verified all functions secure (13 functions)
- ✅ Tested RLS policies
- ✅ Verified audit logging

---

## [0.9.0] - 2025-10-05 (Pre-Production)

### Added
- Created missing database tables:
  - `onboarding_progress`
  - `daily_tracking_preferences`
  - `clinician_onboarding_data`
  - `carer_onboarding_data`
  - `researcher_access_requests`
  - `tracking_entries`
  - `security_incidents`
  - `user_points`

### Changed
- Migrated from old migration files to consolidated schema
- Updated all documentation for clarity
- Consolidated overlapping deployment guides

### Fixed
- Fixed syntax errors in tracking features migration
- Fixed missing table errors
- Fixed unique constraint errors
- Resolved merge conflicts in Supabase client configuration

---

## [0.8.0] - 2025-10-04

### Added
- Patient invitation schema and functions
- Email hashing for privacy
- Invitation expiry automation
- Accept invitation workflow

### Security
- Implemented search_path fixes on all functions
- Added IMMUTABLE flag to hash_email function
- Enhanced RLS policies for invitations

---

## [0.7.0] - 2025-10-03

### Added
- Tracking features enum and population
- Auto-assignment triggers for tracking features
- Unique constraints on critical tables

### Changed
- Updated conditions table with tracking_features_array
- Enhanced user_conditions with tracking_features_enabled

---

## [0.6.0] - 2025-10-02

### Added
- Complete research-grade schema
- De-identified research tables
- Research consent tracking
- Research user mapping

### Security
- Implemented comprehensive audit logging
- Added RLS to all PHI tables
- Created audit trigger function

---

## [0.5.0] - 2025-10-01

### Added
- Patient onboarding flow
- Clinician onboarding flow
- Carer onboarding flow
- Researcher access request system

### Changed
- Enhanced profiles table with user_type
- Added onboarding completion tracking

---

## [0.4.0] - 2025-09-30

### Added
- Seizure logging functionality
- Medication tracking
- Symptom logging
- Daily wellness logs
- Menstrual cycle tracking

### Changed
- Improved dashboard UI/UX
- Enhanced data visualization with Recharts

---

## [0.3.0] - 2025-09-29

### Added
- User authentication system (Supabase Auth)
- Role-based access control
- Initial dashboard layouts

### Security
- Implemented JWT token validation
- Added session management

---

## [0.2.0] - 2025-09-28

### Added
- Initial database schema
- Basic frontend structure
- Supabase integration
- Tailwind CSS styling

---

## [0.1.0] - 2025-09-27

### Added
- Project initialization
- React + Vite setup
- Initial component structure
- Routing setup

---

## Security Patches

### 2025-10-05
- **CVE-2025-SEARCH-PATH**: Fixed function search_path vulnerability affecting 7 functions
  - Severity: Medium
  - Impact: Potential search path hijacking attack
  - Fix: Set fixed search_path to `pg_catalog, public` on all functions
  - Status: ✅ Patched

---

## Database Migrations

### Applied (2025-10-05)
1. ✅ `COMPLETE_RESEARCH_GRADE_SCHEMA.sql` - Base schema
2. ✅ `PATIENT_INVITATIONS_SCHEMA.sql` - Invitation system
3. ✅ `ONBOARDING_TRACKING_FEATURES_MIGRATION.sql` - Tracking features
4. ✅ `create_onboarding_progress_table` - Onboarding tracking
5. ✅ `create_daily_tracking_preferences` - User preferences
6. ✅ `create_onboarding_data_tables` - Onboarding tables
7. ✅ `create_tracking_entries_table` - Unified tracking
8. ✅ `populate_tracking_features` - Feature assignment
9. ✅ `create_tracking_auto_assignment_triggers` - Automation
10. ✅ `add_unique_constraints` - Data integrity
11. ✅ `patient_invitations_functions_and_triggers` - Invitation logic
12. ✅ `create_security_and_gamification_tables` - Security & gamification
13. ✅ `fix_function_search_path_security` - Security hardening

---

## Known Issues

### Development
- None currently

### Production Blockers
- ⚠️ Requires Supabase Teams tier ($599/month) for HIPAA compliance
- ⚠️ Requires BAA with Supabase
- ⚠️ Requires BAA with email provider (SendGrid)
- ⚠️ Requires third-party security audit

---

## Deprecation Notices

### Removed (2025-10-05)
- Deprecated multiple overlapping documentation files
- Removed temporary debug files
- Cleaned up outdated audit reports

---

## Contributors

- **Development Team**: NeuroLoop Team
- **Security Audit**: Internal (2025-10-05)
- **Database Design**: Research-grade schema based on FHIR standards

---

## Links

- **Repository**: [GitHub](https://github.com/your-org/neuroloop-nexus)
- **Documentation**: See README.md
- **Security**: See SECURITY.md
- **Deployment**: See DEPLOYMENT.md

---

**Format:** This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) principles.  
**Versioning:** Follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
