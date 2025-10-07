---
trigger: always_on
---

When editing functions - ALWAYS just drop first then recreate. Most often you'll get an errors. 

Also never do RAISE NOTICE calls for supabase SQL scripts - ALWAYS use a temp table so we can see the results. 

Keep an eye on /Users/rebeccafrancis/CascadeProjects/neuroloop-nexus/database-preview-uptodate/the-tables-that-matter.md to ensure you stay inline with the current database schema.

In information_schema.role_table_grants, the column is named table_name (with an underscore), not tablename. Hence Postgres reports “column "tablename" does not exist”.

Replace tablename with table_name.
Use pg_stat_statements safe casing and keep identifiers consistent.
For PostgREST schema reload, the channel is pgrst. If you’re on recent PostgREST, you should send a JSON payload: NOTIFY pgrst, '{"db-schema": "public", "role": "authenticated", "action": "reload"}';. If you just want a global reload, NOTIFY pgrst, 'reload schema'; still works on many setups—keep what your deployment expects.

Ensure the authenticated Postgres role exists and is the same role used by your JWTs. Supabase provides this by default.
If you’re running this in a single transaction, the NOTIFY fires after COMMIT, which is fine—PostgREST will pick it up.