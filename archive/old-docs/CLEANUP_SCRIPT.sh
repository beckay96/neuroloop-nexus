#!/bin/bash

# Create SQL archive directory
mkdir -p docs/sql-archive

# Move all old RLS fix attempts to archive
mv RLS_COMPLETE_FIX_SAFE.sql docs/sql-archive/ 2>/dev/null
mv RLS_CRITICAL_FIXES.sql docs/sql-archive/ 2>/dev/null
mv RLS_FIX_WITH_RESULTS.sql docs/sql-archive/ 2>/dev/null
mv RLS_GET_FAILING_POLICIES.sql docs/sql-archive/ 2>/dev/null
mv RLS_SURGICAL_FIX.sql docs/sql-archive/ 2>/dev/null
mv COMPLETE_RLS_OVERHAUL.sql docs/sql-archive/ 2>/dev/null
mv NUCLEAR_RLS_FIX.sql docs/sql-archive/ 2>/dev/null
mv PERFECT_RLS_FIX.sql docs/sql-archive/ 2>/dev/null
mv CORRECTED_RLS_POLICIES.sql docs/sql-archive/ 2>/dev/null
mv FINAL_RLS_FIX.sql docs/sql-archive/ 2>/dev/null
mv FIX_ALL_DUPLICATES.sql docs/sql-archive/ 2>/dev/null
mv FIX_LAST_TWO.sql docs/sql-archive/ 2>/dev/null
mv FIND_AND_FIX_FINAL_TWO.sql docs/sql-archive/ 2>/dev/null
mv FIND_PROBLEM_POLICIES.sql docs/sql-archive/ 2>/dev/null
mv SEE_EXACT_POLICIES.sql docs/sql-archive/ 2>/dev/null
mv CHECK_RLS_FIX_RESULTS.sql docs/sql-archive/ 2>/dev/null

# Move old database fix attempts
mv COMPLETE_ONBOARDING_DATABASE_FIX.sql docs/sql-archive/ 2>/dev/null
mv FINAL_COMPLETE_DATABASE_FIX.sql docs/sql-archive/ 2>/dev/null
mv FIX_RLS_POLICIES_COMPLETE.sql docs/sql-archive/ 2>/dev/null
mv FIX_USER_CONDITIONS_SCHEMA.sql docs/sql-archive/ 2>/dev/null
mv FIX_USER_SIGNUP_RLS.sql docs/sql-archive/ 2>/dev/null
mv URGENT_FIX_SIGNUP.sql docs/sql-archive/ 2>/dev/null

echo "✅ Archived old SQL files"

# Keep these ACTIVE SQL files at root (the ones you actually use):
# - VERIFIED_RLS_OVERHAUL.sql (final working RLS fix)
# - ATOMIC_FIX_AND_VERIFY.sql (atomic fix with verification)
# - FINAL_VERIFICATION.sql (audit script)
# - FRESH_AUDIT.sql (current state checker)
# - RLS_COMPLIANCE_TEST.sql (initial compliance test)
# - RLS_DETAILED_SECURITY_AUDIT.sql (detailed audit)

echo "✅ Kept active SQL files at root"
echo ""
echo "📁 Active SQL Files:"
ls -lh *.sql 2>/dev/null | awk '{print "  - " $9 " (" $5 ")"}'
echo ""
echo "📁 Archived SQL Files:"
ls -lh docs/sql-archive/*.sql 2>/dev/null | wc -l | awk '{print "  Total: " $1 " files"}'
