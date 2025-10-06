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
