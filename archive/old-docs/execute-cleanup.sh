#!/bin/bash
# =====================================================
# DOCUMENTATION CLEANUP SCRIPT
# Moves outdated files to archives
# =====================================================

set -e  # Exit on error

echo "🧹 Starting Documentation Cleanup..."

# Create documentation folder if it doesn't exist
mkdir -p documentation

# Move outdated action plans to archive
echo "📦 Archiving outdated action plans..."
mv -f ACTION_PLAN.md docs/archive/ 2>/dev/null || true
mv -f APPLY_MIGRATIONS_NOW.md docs/archive/ 2>/dev/null || true
mv -f CRITICAL_ACTION_PLAN.md docs/archive/ 2>/dev/null || true
mv -f EMERGENCY_FIX_DEPLOYMENT.md docs/archive/ 2>/dev/null || true
mv -f FINAL_EXECUTION_PLAN.md docs/archive/ 2>/dev/null || true
mv -f NEXT_STEPS_CHECKLIST.md docs/archive/ 2>/dev/null || true
mv -f ONBOARDING_COMPLETE_RESTORATION.md docs/archive/ 2>/dev/null || true

# Move duplicate audit files to archive
echo "📦 Archiving duplicate audit files..."
mv -f AUDIT_FIXES_APPLIED.md docs/archive/ 2>/dev/null || true
mv -f CRITICAL_FIXES_APPLIED.md docs/archive/ 2>/dev/null || true
mv -f EMERGENCY_FIXES_SUMMARY.md docs/archive/ 2>/dev/null || true
mv -f COMPREHENSIVE_SAFETY_AUDIT.md docs/archive/ 2>/dev/null || true
mv -f CRITICAL_SAFETY_AUDIT.md docs/archive/ 2>/dev/null || true
mv -f SECURITY_AUDIT_COMPLETE.md docs/archive/ 2>/dev/null || true

# Move duplicate deployment files to archive
echo "📦 Archiving duplicate deployment files..."
mv -f DEPLOYMENT_READY_CHECKLIST.md docs/archive/ 2>/dev/null || true
mv -f FINAL_PRODUCTION_READINESS.md docs/archive/ 2>/dev/null || true
mv -f PHASE_1_FIXED_README.md docs/archive/ 2>/dev/null || true

# Move duplicate tracking/restructure files
echo "📦 Archiving duplicate tracking files..."
mv -f PHASE_1-4_IMPLEMENTATION_SUMMARY.md docs/archive/ 2>/dev/null || true
mv -f RESEARCH_GRADE_COMPLETED.md docs/archive/ 2>/dev/null || true
mv -f RESTRUCTURE_PLAN.md docs/archive/ 2>/dev/null || true
mv -f TRACKING_RESTRUCTURE_SUMMARY.md docs/archive/ 2>/dev/null || true

# Move outdated onboarding docs from /docs/ to archive
echo "📦 Archiving outdated onboarding docs..."
mv -f docs/BEAUTIFUL_ONBOARDING_RESTORED.md docs/archive/ 2>/dev/null || true
mv -f docs/EXACT_ONBOARDING_MATCH.md docs/archive/ 2>/dev/null || true
mv -f docs/ONBOARDING_FULLY_RESTORED.md docs/archive/ 2>/dev/null || true

# Move outdated SQL files to sql-archive
echo "📦 Archiving outdated SQL files..."
mv -f DIAGNOSE_RLS_ISSUES.sql docs/sql-archive/ 2>/dev/null || true
mv -f FIX_RLS_FORCE.sql docs/sql-archive/ 2>/dev/null || true
mv -f FIX_ONBOARDING_RPC.sql docs/sql-archive/ 2>/dev/null || true
mv -f FIX_TABLE_GRANTS.sql docs/sql-archive/ 2>/dev/null || true
mv -f FIX_RPCS_AND_RLS.sql docs/sql-archive/ 2>/dev/null || true
mv -f ADD_MISSING_RLS_POLICIES.sql docs/sql-archive/ 2>/dev/null || true
mv -f CREATE_SYMPTOM_LOG_RPC.sql docs/sql-archive/ 2>/dev/null || true

# Move active documentation to /documentation/
echo "📁 Organizing active documentation..."
cp -f DEPLOYMENT_CHECKLIST.md documentation/ 2>/dev/null || true
cp -f HIPAA_SECURITY_COMPLIANCE_AUDIT.md documentation/HIPAA_COMPLIANCE.md 2>/dev/null || true
cp -f INTEGRATION_GUIDE.md documentation/ 2>/dev/null || true
cp -f DEBUG_SYSTEM_GUIDE.md documentation/DEBUG_GUIDE.md 2>/dev/null || true
cp -f COMPLETE_FEATURE_AUDIT_REPORT.md docs/guides/ 2>/dev/null || true

# Move guides to proper location
echo "📁 Organizing guides..."
mv -f DEPLOYMENT_CHECKLIST.md docs/guides/ 2>/dev/null || true

echo ""
echo "✅ Cleanup Complete!"
echo ""
echo "📊 Summary:"
echo "  - Archived 20+ outdated files"
echo "  - Organized active documentation"
echo "  - Moved SQL files to sql-archive"
echo ""
echo "📂 New Structure:"
echo "  - /documentation/ → Current documentation"
echo "  - /docs/guides/ → How-to guides"  
echo "  - /docs/archive/ → Historical files"
echo "  - /docs/sql-archive/ → Old SQL scripts"
echo ""
echo "🎯 Next Steps:"
echo "  1. Verify types file matches database"
echo "  2. Review FIXES_TO_BE_MADE.md"
echo "  3. Run RUN_THIS_NOW.sql"
echo ""
