# NeuroLoop Project Structure

## 📋 Overview
NeuroLoop is a research-grade neurological health tracking platform focused on epilepsy and Parkinson's disease, with special emphasis on advancing women's health research, particularly catamenial epilepsy.

## 🗂️ Directory Structure

### `/src` - Application Source Code
- **`/components`** - React components
  - `/auth` - Authentication components
  - `/brain-analysis` - Brain seizure analysis features
  - `/clinician` - Clinician dashboard components
  - `/landing` - Landing page components (including WaitlistModal)
  - `/patient` - Patient dashboard components
  - `/tracking` - Health tracking components
- **`/pages`** - Page-level components
- **`/hooks`** - Custom React hooks
- **`/integrations`** - Third-party integrations (Supabase)
- **`/lib`** - Utility libraries

### `/supabase` - Backend Configuration
- **`/migrations`** - Database migration files (chronological)
  - Latest: `20250110_create_waitlist_table.sql`
- **`/functions`** - Edge Functions
  - `invite_carer`, `invite_patient`, `verify_carer_dob`
- **`config.toml`** - Supabase configuration

### `/documentation` - Current Documentation
- `CURRENT_STATUS_2025-01-08.md` - Project status snapshot
- `DEBUG_GUIDE.md` - Debugging guidelines
- `CLEANUP_COMPLETE.md` - Documentation cleanup log

### `/database-preview-uptodate` - Database Schema Reference
- Current schema snapshots and table structures
- `the-tables-that-matter.md` - Key table reference

### `/archive` - Historical Files
- **`/old-docs`** - Previous documentation and fix logs
- **`/old-sql`** - Ad-hoc SQL scripts from development
- **`/deployment-history`** - Deployment logs

### `/docs` - Legacy Docs Archive
- Contains archived guides and technical documentation
- Being phased out in favor of `/documentation`

## 📦 Key Files

### Root Configuration
- **`package.json`** - npm dependencies and scripts
- **`vite.config.ts`** - Vite build configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration with custom animations
- **`tsconfig.json`** - TypeScript configuration
- **`vercel.json`** - Vercel deployment configuration

### Documentation
- **`README.md`** - Main project README
- **`CHANGELOG.md`** - Version history and changes
- **`RESEARCH_VALIDATED.md`** - Validated research statistics with sources
- **`WAITLIST_FEATURE_COMPLETE.md`** - Waitlist implementation documentation

## 🚀 Deployment

### Prerequisites
1. Node.js 18+ installed
2. Supabase project configured
3. Environment variables set (see `.env.example`)

### Build & Deploy
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Required variables (see `.env.example`):
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## 🔒 Security & Compliance

### HIPAA Compliance
- End-to-end encryption for PHI
- RLS (Row Level Security) on all sensitive tables
- Secure authentication via Supabase Auth
- Audit logging enabled

### Data Architecture
- **`public` schema** - User profiles, waitlist, public data
- **`private_health_info` schema** - Protected health information
- **`clinical` schema** - Clinical data and assessments
- **`research` schema** - Research-grade anonymized data
- **`linkage` schema** - Relationship management (patients, clinicians, carers)

## 📊 Key Features

### Patient Features
- Comprehensive seizure tracking (ILAE-compliant)
- Parkinson's movement tracking
- Menstrual cycle tracking (catamenial epilepsy focus)
- Medication management
- Symptom logging
- Emergency contacts & alerts

### Clinician Features
- Patient dashboard with real-time data
- Clinical scale assessments (UPDRS, ILAE)
- Collaborative notes and chat
- Risk alerts and monitoring
- Export capabilities

### Research Features
- Anonymous data collection with consent
- Research-grade data structure
- Validated statistics integration
- Contribution to global neurological health datasets

## 🎨 Design System

### Colors
- **Primary**: Teal-500 to Purple-600 gradient
- **Backgrounds**: White (light) / Black (dark) - pure, no dark blue
- **Accents**: Teal and Purple throughout

### Animations
All animations are seizure-safe:
- Slow, smooth transitions (500ms+)
- No flashing or rapid color changes
- Gentle glows and shimmers
- Scale and slide effects only

### Components
- Built with shadcn/ui
- Tailwind CSS for styling
- Lucide React for icons
- Fully responsive design

## 📚 Resources

### Research Sources
See `RESEARCH_VALIDATED.md` for validated statistics and sources:
- Parkinson's: 12M people worldwide (2021), projected 25.2M by 2050
- Epilepsy: 65M people worldwide
- Mortality data with validated sources (BMJ, NIH, Frontiers in Neurology)

### Development Resources
- [Supabase Docs](https://supabase.com/docs)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🧹 Maintenance

### Regular Tasks
- Review and archive old documentation monthly
- Update research statistics quarterly
- Database migrations reviewed and tested
- Security audits per deployment

### Archive Policy
- Old documentation moved to `/archive/old-docs`
- Ad-hoc SQL scripts moved to `/archive/old-sql`
- Deployment logs kept in `/archive/deployment-history`
- Keep root directory clean for deployment readiness

---

**Last Updated**: January 10, 2025  
**Version**: 1.0.0-waitlist  
**Status**: Pre-launch waitlist phase
