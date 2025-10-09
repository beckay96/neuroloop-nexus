#!/bin/bash

# ============================================================================
# DOCUMENTATION CLEANUP SCRIPT
# ============================================================================
# This script moves outdated/redundant documentation to the archive folder
# and organizes the remaining docs into a clean structure.
# ============================================================================

set -e

echo "🧹 Starting documentation cleanup..."

# Create archive directory if it doesn't exist
mkdir -p docs/archive/database-audit-history
mkdir -p docs/archive/old-sql-files

# ============================================================================
# MOVE OUTDATED SQL FILES
# ============================================================================
echo "📦 Archiving outdated SQL files..."

# Keep: FINAL_COMPREHENSIVE_DATABASE_FIXES.sql (this is the correct one)
# Archive: All others

if [ -f "CRITICAL_DATABASE_FIXES.sql" ]; then
    mv CRITICAL_DATABASE_FIXES.sql docs/archive/old-sql-files/
    echo "  ✓ Archived CRITICAL_DATABASE_FIXES.sql"
fi

if [ -f "COMPREHENSIVE_DATABASE_AUDIT_AND_FIXES.sql" ]; then
    mv COMPREHENSIVE_DATABASE_AUDIT_AND_FIXES.sql docs/archive/old-sql-files/
    echo "  ✓ Archived COMPREHENSIVE_DATABASE_AUDIT_AND_FIXES.sql"
fi

if [ -f "CORRECT_MENSTRUAL_TRACKING_SCHEMA.sql" ]; then
    mv CORRECT_MENSTRUAL_TRACKING_SCHEMA.sql docs/archive/old-sql-files/
    echo "  ✓ Archived CORRECT_MENSTRUAL_TRACKING_SCHEMA.sql (consolidated into final)"
fi

# ============================================================================
# MOVE REDUNDANT AUDIT DOCUMENTATION
# ============================================================================
echo "📦 Archiving redundant audit documentation..."

# Keep: COMPLETE_AUDIT_REPORT.md (most recent, comprehensive)
# Archive: Multiple versions

if [ -f "DATABASE_FIXES_ACTION_PLAN.md" ]; then
    mv DATABASE_FIXES_ACTION_PLAN.md docs/archive/database-audit-history/
    echo "  ✓ Archived DATABASE_FIXES_ACTION_PLAN.md"
fi

if [ -f "EXECUTIVE_SUMMARY.md" ]; then
    mv EXECUTIVE_SUMMARY.md docs/archive/database-audit-history/
    echo "  ✓ Archived EXECUTIVE_SUMMARY.md"
fi

if [ -f "QUICK_FIX_GUIDE.md" ]; then
    mv QUICK_FIX_GUIDE.md docs/archive/database-audit-history/
    echo "  ✓ Archived QUICK_FIX_GUIDE.md"
fi

if [ -f "RUN_THIS_IMMEDIATELY.md" ]; then
    mv RUN_THIS_IMMEDIATELY.md docs/archive/database-audit-history/
    echo "  ✓ Archived RUN_THIS_IMMEDIATELY.md"
fi

if [ -f "RUN_THIS_NOW.md" ]; then
    mv RUN_THIS_NOW.md docs/archive/database-audit-history/
    echo "  ✓ Archived RUN_THIS_NOW.md"
fi

if [ -f "MENSTRUAL_TRACKING_SETUP.md" ]; then
    mv MENSTRUAL_TRACKING_SETUP.md docs/archive/database-audit-history/
    echo "  ✓ Archived MENSTRUAL_TRACKING_SETUP.md (info now in COMPLETE_AUDIT_REPORT.md)"
fi

# ============================================================================
# ORGANIZE REMAINING DOCS
# ============================================================================
echo "📁 Organizing remaining documentation..."

# Move to appropriate docs folders
if [ -f "DATABASE.md" ]; then
    mv DATABASE.md docs/technical/
    echo "  ✓ Moved DATABASE.md to docs/technical/"
fi

if [ -f "HIPAA_COMPLIANCE_DOCUMENTATION.md" ]; then
    mv HIPAA_COMPLIANCE_DOCUMENTATION.md docs/technical/
    echo "  ✓ Moved HIPAA_COMPLIANCE_DOCUMENTATION.md to docs/technical/"
fi

if [ -f "SECURITY.md" ]; then
    mv SECURITY.md docs/technical/
    echo "  ✓ Moved SECURITY.md to docs/technical/"
fi

if [ -f "DEPLOYMENT.md" ]; then
    mv DEPLOYMENT.md docs/guides/
    echo "  ✓ Moved DEPLOYMENT.md to docs/guides/"
fi

if [ -f "DOCUMENTATION.md" ]; then
    mv DOCUMENTATION.md docs/guides/
    echo "  ✓ Moved DOCUMENTATION.md to docs/guides/"
fi

if [ -f "PRODUCTION_READY.md" ]; then
    mv PRODUCTION_READY.md docs/guides/
    echo "  ✓ Moved PRODUCTION_READY.md to docs/guides/"
fi

if [ -f "RESEARCH_VALIDATION_UPDATE.md" ]; then
    mv RESEARCH_VALIDATION_UPDATE.md docs/technical/
    echo "  ✓ Moved RESEARCH_VALIDATION_UPDATE.md to docs/technical/"
fi

# ============================================================================
# CREATE ARCHIVE README
# ============================================================================
echo "📝 Creating archive index..."

cat > docs/archive/database-audit-history/README.md << 'EOF'
# Database Audit History Archive

This folder contains outdated database audit documentation from the initial menstrual tracking implementation (October 2025).

## What Happened

During the implementation of menstrual cycle tracking for catamenial epilepsy research, multiple audit and fix documents were created as issues were discovered and resolved.

## Final Resolution

All issues were consolidated into:
- **`FINAL_COMPREHENSIVE_DATABASE_FIXES.sql`** - The production SQL script (in root)
- **`COMPLETE_AUDIT_REPORT.md`** - The comprehensive audit report (in root)
- **`START_HERE.md`** - Quick start guide (in root)

## Files in This Archive

These files represent the iteration process but are no longer needed for reference:
- Multiple "RUN THIS" guides
- Intermediate audit reports
- Preliminary fix scripts
- Setup instructions (now consolidated)

## Reference

If you need to understand the audit process or see how issues were discovered:
1. Read `/COMPLETE_AUDIT_REPORT.md` (most comprehensive)
2. Review `/FINAL_COMPREHENSIVE_DATABASE_FIXES.sql` (the final solution)

---

**Archived:** October 6, 2025  
**Reason:** Consolidated into final documentation
EOF

cat > docs/archive/old-sql-files/README.md << 'EOF'
# Archived SQL Files

These SQL files were created during the database audit and menstrual tracking implementation but have been superseded by the final version.

## Current Production File

Use only: **`/FINAL_COMPREHENSIVE_DATABASE_FIXES.sql`**

## Archived Files

- `CRITICAL_DATABASE_FIXES.sql` - Initial fix attempt (had JSONB issues)
- `COMPREHENSIVE_DATABASE_AUDIT_AND_FIXES.sql` - Second iteration (had syntax errors)
- `CORRECT_MENSTRUAL_TRACKING_SCHEMA.sql` - Educational reference (consolidated into final)

## Why These Were Replaced

The archived files had various issues:
1. Used JSONB arrays instead of proper junction tables
2. PostgreSQL syntax errors (IF NOT EXISTS for ENUMs, DESC in indexes)
3. Incorrect table references in RLS policies
4. Missing DO blocks for RAISE NOTICE statements

All issues were resolved in the final version.

---

**Archived:** October 6, 2025  
**Status:** Successfully replaced and deployed
EOF

echo "  ✓ Created archive README files"

# ============================================================================
# UPDATE ROOT README
# ============================================================================
echo "📝 Updating root README with clean documentation structure..."

cat > DOCS_INDEX.md << 'EOF'
# 📚 NeuroLoop Nexus Documentation Index

**Last Updated:** October 6, 2025

## 🚀 Quick Start

- **`README.md`** - Main project overview and getting started
- **`START_HERE.md`** - Quick guide for database setup (post-audit)
- **`CHANGELOG.md`** - Project change history

## 📖 Active Documentation

### Database
- **`COMPLETE_AUDIT_REPORT.md`** - Comprehensive database audit findings (Oct 2025)
- **`FINAL_COMPREHENSIVE_DATABASE_FIXES.sql`** - Production database fixes ⭐
- **`FULL_DATABASE_NOW.md`** - Complete database schema snapshot (1.3MB reference)
- **`NOTIFICATIONS_SYSTEM_SETUP.sql`** - Notifications system setup

### Technical Documentation (`/docs/technical/`)
- `DATABASE.md` - Database architecture and patterns
- `HIPAA_COMPLIANCE_DOCUMENTATION.md` - HIPAA compliance guidelines
- `SECURITY.md` - Security implementation details
- `RESEARCH_VALIDATION_UPDATE.md` - Research data validation

### Guides (`/docs/guides/`)
- `DEPLOYMENT.md` - Deployment procedures
- `DOCUMENTATION.md` - Documentation standards
- `PRODUCTION_READY.md` - Production readiness checklist

## 🗄️ Archive

Historical documentation is in `/docs/archive/`:
- `archive/database-audit-history/` - Audit iteration documents
- `archive/old-sql-files/` - Superseded SQL scripts

## 📁 File Organization

```
/
├── README.md                              # Main project docs
├── START_HERE.md                          # Database setup guide
├── COMPLETE_AUDIT_REPORT.md              # Latest audit (Oct 2025)
├── FINAL_COMPREHENSIVE_DATABASE_FIXES.sql # Production SQL ⭐
├── FULL_DATABASE_NOW.md                  # Schema reference
├── CHANGELOG.md                          # Version history
├── DOCS_INDEX.md                         # This file
│
├── docs/
│   ├── technical/                        # Technical specs
│   ├── guides/                           # How-to guides
│   └── archive/                          # Historical docs
│
└── src/
    └── ... (application code)
```

## 🎯 Finding Information

| Looking for... | Check... |
|----------------|----------|
| How to set up the project | `README.md` |
| Database fixes | `FINAL_COMPREHENSIVE_DATABASE_FIXES.sql` |
| Why database was fixed | `COMPLETE_AUDIT_REPORT.md` |
| Current database schema | `FULL_DATABASE_NOW.md` |
| HIPAA compliance | `docs/technical/HIPAA_COMPLIANCE_DOCUMENTATION.md` |
| Deployment steps | `docs/guides/DEPLOYMENT.md` |
| Security practices | `docs/technical/SECURITY.md` |

## 🧹 Cleanup Status

✅ **Completed:** October 6, 2025
- Archived redundant audit documents (9 files)
- Archived outdated SQL files (3 files)
- Organized remaining docs into `/docs/` structure
- Created archive indexes for historical reference

---

**Note:** If you're looking for old audit iterations or preliminary fixes, they're in `/docs/archive/` with explanation READMEs.
EOF

echo "  ✓ Created DOCS_INDEX.md"

# ============================================================================
# CLEANUP REPORT
# ============================================================================
echo ""
echo "✅ Documentation cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  • Archived 3 outdated SQL files"
echo "  • Archived 6 redundant audit documents"
echo "  • Organized 7 docs into /docs/ structure"
echo "  • Created DOCS_INDEX.md for easy navigation"
echo "  • Created archive README files for reference"
echo ""
echo "📁 Current Structure:"
echo "  Root:"
echo "    ✓ README.md (main docs)"
echo "    ✓ START_HERE.md (database setup)"
echo "    ✓ COMPLETE_AUDIT_REPORT.md (audit findings)"
echo "    ✓ FINAL_COMPREHENSIVE_DATABASE_FIXES.sql (production SQL)"
echo "    ✓ FULL_DATABASE_NOW.md (schema reference)"
echo "    ✓ CHANGELOG.md"
echo "    ✓ DOCS_INDEX.md (this index)"
echo ""
echo "  docs/technical/:"
echo "    ✓ DATABASE.md"
echo "    ✓ HIPAA_COMPLIANCE_DOCUMENTATION.md"
echo "    ✓ SECURITY.md"
echo "    ✓ RESEARCH_VALIDATION_UPDATE.md"
echo ""
echo "  docs/guides/:"
echo "    ✓ DEPLOYMENT.md"
echo "    ✓ DOCUMENTATION.md"
echo "    ✓ PRODUCTION_READY.md"
echo ""
echo "  docs/archive/:"
echo "    ✓ database-audit-history/ (6 files)"
echo "    ✓ old-sql-files/ (3 files)"
echo ""
echo "🎉 Your documentation is now clean and organized!"
