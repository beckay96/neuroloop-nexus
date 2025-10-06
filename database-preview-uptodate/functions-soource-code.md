[
  {
    "schema_name": "auth",
    "function_name": "email",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.email()\n RETURNS text\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n  coalesce(\n    nullif(current_setting('request.jwt.claim.email', true), ''),\n    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')\n  )::text\n$function$\n"
  },
  {
    "schema_name": "auth",
    "function_name": "jwt",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.jwt()\n RETURNS jsonb\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n    coalesce(\n        nullif(current_setting('request.jwt.claim', true), ''),\n        nullif(current_setting('request.jwt.claims', true), '')\n    )::jsonb\n$function$\n"
  },
  {
    "schema_name": "auth",
    "function_name": "role",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.role()\n RETURNS text\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n  coalesce(\n    nullif(current_setting('request.jwt.claim.role', true), ''),\n    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')\n  )::text\n$function$\n"
  },
  {
    "schema_name": "auth",
    "function_name": "uid",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION auth.uid()\n RETURNS uuid\n LANGUAGE sql\n STABLE\nAS $function$\n  select \n  coalesce(\n    nullif(current_setting('request.jwt.claim.sub', true), ''),\n    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')\n  )::uuid\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea, text[], text[]",
    "definition": "CREATE OR REPLACE FUNCTION extensions.armor(bytea, text[], text[])\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_armor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.armor(bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_armor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "crypt",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.crypt(text, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_crypt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "dearmor",
    "args_signature": "text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.dearmor(text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_dearmor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "decrypt",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.decrypt(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_decrypt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "decrypt_iv",
    "args_signature": "bytea, bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_decrypt_iv$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.digest(text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_digest$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.digest(bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_digest$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "encrypt",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.encrypt(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_encrypt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "encrypt_iv",
    "args_signature": "bytea, bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_encrypt_iv$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_random_bytes",
    "args_signature": "integer",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_random_bytes(integer)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_random_bytes$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_random_uuid",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_random_uuid()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE\nAS '$libdir/pgcrypto', $function$pg_random_uuid$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_salt",
    "args_signature": "text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_salt(text)\n RETURNS text\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_gen_salt$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "gen_salt",
    "args_signature": "text, integer",
    "definition": "CREATE OR REPLACE FUNCTION extensions.gen_salt(text, integer)\n RETURNS text\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_gen_salt_rounds$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_cron_access",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.grant_pg_cron_access()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  IF EXISTS (\n    SELECT\n    FROM pg_event_trigger_ddl_commands() AS ev\n    JOIN pg_extension AS ext\n    ON ev.objid = ext.oid\n    WHERE ext.extname = 'pg_cron'\n  )\n  THEN\n    grant usage on schema cron to postgres with grant option;\n\n    alter default privileges in schema cron grant all on tables to postgres with grant option;\n    alter default privileges in schema cron grant all on functions to postgres with grant option;\n    alter default privileges in schema cron grant all on sequences to postgres with grant option;\n\n    alter default privileges for user supabase_admin in schema cron grant all\n        on sequences to postgres with grant option;\n    alter default privileges for user supabase_admin in schema cron grant all\n        on tables to postgres with grant option;\n    alter default privileges for user supabase_admin in schema cron grant all\n        on functions to postgres with grant option;\n\n    grant all privileges on all tables in schema cron to postgres with grant option;\n    revoke all on table cron.job from postgres;\n    grant select on table cron.job to postgres with grant option;\n  END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_graphql_access",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.grant_pg_graphql_access()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    func_is_graphql_resolve bool;\nBEGIN\n    func_is_graphql_resolve = (\n        SELECT n.proname = 'resolve'\n        FROM pg_event_trigger_ddl_commands() AS ev\n        LEFT JOIN pg_catalog.pg_proc AS n\n        ON ev.objid = n.oid\n    );\n\n    IF func_is_graphql_resolve\n    THEN\n        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func\n        DROP FUNCTION IF EXISTS graphql_public.graphql;\n        create or replace function graphql_public.graphql(\n            \"operationName\" text default null,\n            query text default null,\n            variables jsonb default null,\n            extensions jsonb default null\n        )\n            returns jsonb\n            language sql\n        as $$\n            select graphql.resolve(\n                query := query,\n                variables := coalesce(variables, '{}'),\n                \"operationName\" := \"operationName\",\n                extensions := extensions\n            );\n        $$;\n\n        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last\n        -- function in the extension so we need to grant permissions on existing entities AND\n        -- update default permissions to any others that are created after `graphql.resolve`\n        grant usage on schema graphql to postgres, anon, authenticated, service_role;\n        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;\n        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;\n        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;\n        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;\n        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;\n        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;\n\n        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles\n        grant usage on schema graphql_public to postgres with grant option;\n        grant usage on schema graphql to postgres with grant option;\n    END IF;\n\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "grant_pg_net_access",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.grant_pg_net_access()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  IF EXISTS (\n    SELECT 1\n    FROM pg_event_trigger_ddl_commands() AS ev\n    JOIN pg_extension AS ext\n    ON ev.objid = ext.oid\n    WHERE ext.extname = 'pg_net'\n  )\n  THEN\n    IF NOT EXISTS (\n      SELECT 1\n      FROM pg_roles\n      WHERE rolname = 'supabase_functions_admin'\n    )\n    THEN\n      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;\n    END IF;\n\n    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;\n\n    IF EXISTS (\n      SELECT FROM pg_extension\n      WHERE extname = 'pg_net'\n      -- all versions in use on existing projects as of 2025-02-20\n      -- version 0.12.0 onwards don't need these applied\n      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')\n    ) THEN\n      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;\n      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;\n\n      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;\n      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;\n\n      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;\n      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;\n\n      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;\n      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;\n    END IF;\n  END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "text, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.hmac(text, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_hmac$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.hmac(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_hmac$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements",
    "args_signature": "showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone)\n RETURNS SETOF record\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_1_11$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements_info",
    "args_signature": "OUT dealloc bigint, OUT stats_reset timestamp with time zone",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone)\n RETURNS record\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_info$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pg_stat_statements_reset",
    "args_signature": "userid oid, dbid oid, queryid bigint, minmax_only boolean",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pg_stat_statements_reset(userid oid DEFAULT 0, dbid oid DEFAULT 0, queryid bigint DEFAULT 0, minmax_only boolean DEFAULT false)\n RETURNS timestamp with time zone\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pg_stat_statements', $function$pg_stat_statements_reset_1_11$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_armor_headers",
    "args_signature": "text, OUT key text, OUT value text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text)\n RETURNS SETOF record\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_armor_headers$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_key_id",
    "args_signature": "bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_key_id(bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_key_id_w$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt(bytea, bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt",
    "args_signature": "bytea, bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_decrypt_bytea",
    "args_signature": "bytea, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt",
    "args_signature": "text, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt(text, bytea)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt",
    "args_signature": "text, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt(text, bytea, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt_bytea",
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_pub_encrypt_bytea",
    "args_signature": "bytea, bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_pub_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt(bytea, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt",
    "args_signature": "bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt(bytea, text, text)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt_bytea",
    "args_signature": "bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_decrypt_bytea",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_decrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt(text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt(text, text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt_bytea",
    "args_signature": "bytea, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt_bytea",
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_bytea$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgrst_ddl_watch",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgrst_ddl_watch()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n  cmd record;\nBEGIN\n  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()\n  LOOP\n    IF cmd.command_tag IN (\n      'CREATE SCHEMA', 'ALTER SCHEMA'\n    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'\n    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'\n    , 'CREATE VIEW', 'ALTER VIEW'\n    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'\n    , 'CREATE FUNCTION', 'ALTER FUNCTION'\n    , 'CREATE TRIGGER'\n    , 'CREATE TYPE', 'ALTER TYPE'\n    , 'CREATE RULE'\n    , 'COMMENT'\n    )\n    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp\n    AND cmd.schema_name is distinct from 'pg_temp'\n    THEN\n      NOTIFY pgrst, 'reload schema';\n    END IF;\n  END LOOP;\nEND; $function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgrst_drop_watch",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgrst_drop_watch()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n  obj record;\nBEGIN\n  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()\n  LOOP\n    IF obj.object_type IN (\n      'schema'\n    , 'table'\n    , 'foreign table'\n    , 'view'\n    , 'materialized view'\n    , 'function'\n    , 'trigger'\n    , 'type'\n    , 'rule'\n    )\n    AND obj.is_temporary IS false -- no pg_temp objects\n    THEN\n      NOTIFY pgrst, 'reload schema';\n    END IF;\n  END LOOP;\nEND; $function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "set_graphql_placeholder",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.set_graphql_placeholder()\n RETURNS event_trigger\n LANGUAGE plpgsql\nAS $function$\n    DECLARE\n    graphql_is_dropped bool;\n    BEGIN\n    graphql_is_dropped = (\n        SELECT ev.schema_name = 'graphql_public'\n        FROM pg_event_trigger_dropped_objects() AS ev\n        WHERE ev.schema_name = 'graphql_public'\n    );\n\n    IF graphql_is_dropped\n    THEN\n        create or replace function graphql_public.graphql(\n            \"operationName\" text default null,\n            query text default null,\n            variables jsonb default null,\n            extensions jsonb default null\n        )\n            returns jsonb\n            language plpgsql\n        as $$\n            DECLARE\n                server_version float;\n            BEGIN\n                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);\n\n                IF server_version >= 14 THEN\n                    RETURN jsonb_build_object(\n                        'errors', jsonb_build_array(\n                            jsonb_build_object(\n                                'message', 'pg_graphql extension is not enabled.'\n                            )\n                        )\n                    );\n                ELSE\n                    RETURN jsonb_build_object(\n                        'errors', jsonb_build_array(\n                            jsonb_build_object(\n                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'\n                            )\n                        )\n                    );\n                END IF;\n            END;\n        $$;\n    END IF;\n\n    END;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v1",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v1()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v1$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v1mc",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v1mc()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v1mc$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v3",
    "args_signature": "namespace uuid, name text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v3(namespace uuid, name text)\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v3$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v4",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v4()\n RETURNS uuid\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_generate_v5",
    "args_signature": "namespace uuid, name text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_generate_v5(namespace uuid, name text)\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_generate_v5$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_nil",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_nil()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_nil$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_dns",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_dns()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_dns$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_oid",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_oid()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_oid$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_url",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_url()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_url$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "uuid_ns_x500",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION extensions.uuid_ns_x500()\n RETURNS uuid\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/uuid-ossp', $function$uuid_ns_x500$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "_internal_resolve",
    "args_signature": "query text, variables jsonb, \"operationName\" text, extensions jsonb",
    "definition": "CREATE OR REPLACE FUNCTION graphql._internal_resolve(query text, variables jsonb DEFAULT '{}'::jsonb, \"operationName\" text DEFAULT NULL::text, extensions jsonb DEFAULT NULL::jsonb)\n RETURNS jsonb\n LANGUAGE c\nAS '$libdir/pg_graphql', $function$resolve_wrapper$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "comment_directive",
    "args_signature": "comment_ text",
    "definition": "CREATE OR REPLACE FUNCTION graphql.comment_directive(comment_ text)\n RETURNS jsonb\n LANGUAGE sql\n IMMUTABLE\nAS $function$\n    /*\n    comment on column public.account.name is '@graphql.name: myField'\n    */\n    select\n        coalesce(\n            (\n                regexp_match(\n                    comment_,\n                    '@graphql\\((.+)\\)'\n                )\n            )[1]::jsonb,\n            jsonb_build_object()\n        )\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "exception",
    "args_signature": "message text",
    "definition": "CREATE OR REPLACE FUNCTION graphql.exception(message text)\n RETURNS text\n LANGUAGE plpgsql\nAS $function$\nbegin\n    raise exception using errcode='22000', message=message;\nend;\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "get_schema_version",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION graphql.get_schema_version()\n RETURNS integer\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    select last_value from graphql.seq_schema_version;\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "increment_schema_version",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION graphql.increment_schema_version()\n RETURNS event_trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nbegin\n    perform pg_catalog.nextval('graphql.seq_schema_version');\nend;\n$function$\n"
  },
  {
    "schema_name": "graphql",
    "function_name": "resolve",
    "args_signature": "query text, variables jsonb, \"operationName\" text, extensions jsonb",
    "definition": "CREATE OR REPLACE FUNCTION graphql.resolve(query text, variables jsonb DEFAULT '{}'::jsonb, \"operationName\" text DEFAULT NULL::text, extensions jsonb DEFAULT NULL::jsonb)\n RETURNS jsonb\n LANGUAGE plpgsql\nAS $function$\ndeclare\n    res jsonb;\n    message_text text;\nbegin\n  begin\n    select graphql._internal_resolve(\"query\" := \"query\",\n                                     \"variables\" := \"variables\",\n                                     \"operationName\" := \"operationName\",\n                                     \"extensions\" := \"extensions\") into res;\n    return res;\n  exception\n    when others then\n    get stacked diagnostics message_text = message_text;\n    return\n    jsonb_build_object('data', null,\n                       'errors', jsonb_build_array(jsonb_build_object('message', message_text)));\n  end;\nend;\n$function$\n"
  },
  {
    "schema_name": "graphql_public",
    "function_name": "graphql",
    "args_signature": "\"operationName\" text, query text, variables jsonb, extensions jsonb",
    "definition": "CREATE OR REPLACE FUNCTION graphql_public.graphql(\"operationName\" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb)\n RETURNS jsonb\n LANGUAGE sql\nAS $function$\n            select graphql.resolve(\n                query := query,\n                variables := coalesce(variables, '{}'),\n                \"operationName\" := \"operationName\",\n                extensions := extensions\n            );\n        $function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_daily_log_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_daily_log_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'symptom');\n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;\n    \n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    INSERT INTO research.daily_symptom_logs (\n        research_id, log_date, overall_feeling, mood, energy_level, fatigue_level,\n        pain_level, sleep_quality, sleep_hours, sleep_disturbances,\n        motor_fluctuations_occurred, on_time_hours, off_time_hours,\n        dyskinesia_severity, stiffness_severity, slowness_severity,\n        cognitive_issues, mood_issues, autonomic_symptoms, adl_independence_level,\n        activities_difficult, all_medications_taken, medication_side_effects,\n        stress_level, exercise_minutes, source_log_id\n    ) VALUES (\n        v_research_id, NEW.log_date, NEW.overall_feeling, NEW.mood, NEW.energy_level,\n        NEW.fatigue_level, NEW.pain_level, NEW.sleep_quality, NEW.sleep_hours,\n        NEW.sleep_disturbances, NEW.motor_fluctuations_occurred, NEW.on_time_hours,\n        NEW.off_time_hours, NEW.dyskinesia_severity, NEW.stiffness_severity,\n        NEW.slowness_severity, NEW.cognitive_issues, NEW.mood_issues,\n        NEW.autonomic_symptoms, NEW.adl_independence_level, NEW.activities_difficult,\n        NEW.all_medications_taken, NEW.medication_side_effects, NEW.stress_level,\n        NEW.exercise_minutes, NEW.log_id\n    ) ON CONFLICT (research_id, log_date) DO UPDATE SET\n        overall_feeling = EXCLUDED.overall_feeling,\n        mood = EXCLUDED.mood,\n        updated_at = NOW();\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_gait_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_gait_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'gait');\n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;\n    \n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    INSERT INTO research.gait_episodes (\n        research_id, occurred_at_date, occurred_at_hour, duration_seconds,\n        event_type, severity, resulted_in_fall, fall_direction, injury_occurred,\n        required_assistance, environmental_factors, medication_status,\n        hours_since_medication, freezing_trigger, source_gait_id\n    ) VALUES (\n        v_research_id, DATE(NEW.occurred_at), EXTRACT(HOUR FROM NEW.occurred_at),\n        NEW.duration_seconds, NEW.event_type, NEW.severity, NEW.resulted_in_fall,\n        NEW.fall_direction, NEW.injury_occurred, NEW.required_assistance,\n        NEW.environmental_factors, NEW.medication_status, NEW.hours_since_medication,\n        NEW.freezing_trigger, NEW.gait_id\n    ) ON CONFLICT (gait_id) DO NOTHING;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_seizure_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_seizure_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    -- Only process if visible_to_researchers is true\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Check consent\n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'seizure');\n    \n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Get research ID\n    SELECT research_id INTO v_research_id\n    FROM linkage.research_id_map\n    WHERE user_id = NEW.patient_id;\n    \n    -- If no research ID, create one\n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id)\n        VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id\n        RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    -- Insert anonymized data into research schema\n    INSERT INTO research.seizure_events (\n        research_id,\n        occurred_at_date,\n        occurred_at_hour,\n        duration_seconds,\n        seizure_type,\n        severity,\n        consciousness_level,\n        had_aura,\n        aura_signs,\n        possible_triggers,\n        body_parts_affected,\n        motor_symptoms,\n        non_motor_symptoms,\n        post_ictal_effects,\n        post_ictal_duration_minutes,\n        injuries_occurred,\n        injury_types,\n        required_medical_attention,\n        witnessed,\n        medication_taken_as_prescribed,\n        hours_since_last_dose,\n        recent_medication_changes,\n        fully_recovered,\n        recovery_time_minutes,\n        source_event_id\n    ) VALUES (\n        v_research_id,\n        DATE(NEW.occurred_at),\n        EXTRACT(HOUR FROM NEW.occurred_at),\n        NEW.duration_seconds,\n        NEW.seizure_type,\n        NEW.severity,\n        NEW.consciousness_level,\n        NEW.had_aura,\n        NEW.aura_signs,\n        NEW.possible_triggers,\n        NEW.body_parts_affected,\n        NEW.motor_symptoms,\n        NEW.non_motor_symptoms,\n        NEW.post_ictal_effects,\n        NEW.post_ictal_duration_minutes,\n        NEW.injuries_occurred,\n        NEW.injury_types,\n        NEW.required_medical_attention,\n        NEW.witnessed,\n        NEW.medication_taken_as_prescribed,\n        NEW.hours_since_last_dose,\n        NEW.recent_medication_changes,\n        NEW.fully_recovered,\n        NEW.recovery_time_minutes,\n        NEW.event_id\n    )\n    ON CONFLICT (event_id) DO NOTHING; -- Prevent duplicates on update\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "anonymize_tremor_to_research",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.anonymize_tremor_to_research()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'research', 'private_health_info', 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\n    v_consent BOOLEAN;\nBEGIN\n    IF NEW.visible_to_researchers = false THEN\n        RETURN NEW;\n    END IF;\n    \n    v_consent := private_health_info.check_research_consent(NEW.patient_id, 'tremor');\n    IF v_consent = false THEN\n        RETURN NEW;\n    END IF;\n    \n    SELECT research_id INTO v_research_id FROM linkage.research_id_map WHERE user_id = NEW.patient_id;\n    \n    IF v_research_id IS NULL THEN\n        v_research_id := gen_random_uuid();\n        INSERT INTO linkage.research_id_map (user_id, research_id) VALUES (NEW.patient_id, v_research_id)\n        ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    INSERT INTO research.tremor_episodes (\n        research_id, occurred_at_date, occurred_at_hour, duration_seconds,\n        tremor_type, severity, frequency_hz, body_regions, dominant_side,\n        interfered_with_activities, activities_affected, occurred_during,\n        medication_status, hours_since_medication, possible_triggers, source_tremor_id\n    ) VALUES (\n        v_research_id, DATE(NEW.occurred_at), EXTRACT(HOUR FROM NEW.occurred_at),\n        NEW.duration_seconds, NEW.tremor_type, NEW.severity, NEW.frequency_hz,\n        NEW.body_regions, NEW.dominant_side, NEW.interfered_with_activities,\n        NEW.activities_affected, NEW.occurred_during, NEW.medication_status,\n        NEW.hours_since_medication, NEW.possible_triggers, NEW.tremor_id\n    ) ON CONFLICT (tremor_id) DO NOTHING;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_catamenial_pattern_alert",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.check_catamenial_pattern_alert()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_recent_cycles INTEGER;\nBEGIN\n    -- If user suspects catamenial pattern, send alert\n    IF NEW.catamenial_pattern_suspected = true THEN\n        -- Check how many times they've suspected this\n        SELECT COUNT(*) INTO v_recent_cycles\n        FROM private_health_info.menstrual_cycle_logs\n        WHERE user_id = NEW.user_id\n        AND catamenial_pattern_suspected = true\n        AND created_at > NOW() - INTERVAL '3 months';\n        \n        -- If 2+ cycles with suspected pattern, send alert (NO PHI!)\n        IF v_recent_cycles >= 2 THEN\n            PERFORM public.schedule_notification(\n                NEW.user_id,\n                'pattern_alert',\n                'Catamenial Seizure Pattern Detected',\n                'You''ve logged multiple cycles with menstrual-related seizures. Consider discussing this pattern with your neurologist.',\n                '/dashboard/insights',\n                NEW.id,\n                NOW(),\n                'high'\n            );\n        END IF;\n    END IF;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_research_consent",
    "args_signature": "p_patient_id uuid, p_data_type text",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.check_research_consent(p_patient_id uuid, p_data_type text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public', 'private_health_info', 'linkage'\nAS $function$\nDECLARE\n    v_consent BOOLEAN := false;\n    v_default_share BOOLEAN := false;\nBEGIN\n    -- Check data_sharing_preferences\n    SELECT \n        default_share_with_researchers,\n        CASE p_data_type\n            WHEN 'seizure' THEN research_seizure_data\n            WHEN 'tremor' THEN research_tremor_data\n            WHEN 'gait' THEN research_gait_data\n            WHEN 'symptom' THEN research_symptom_data\n            ELSE false\n        END\n    INTO v_default_share, v_consent\n    FROM public.data_sharing_preferences\n    WHERE patient_id = p_patient_id;\n    \n    -- If no preferences exist, default to NO consent\n    IF NOT FOUND THEN\n        RETURN false;\n    END IF;\n    \n    -- Both default AND specific consent must be true\n    RETURN (v_default_share AND v_consent);\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "check_seizure_cluster_alert",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.check_seizure_cluster_alert()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_recent_seizures INTEGER;\nBEGIN\n    -- Count seizures in last 24 hours\n    SELECT COUNT(*) INTO v_recent_seizures\n    FROM private_health_info.seizure_events\n    WHERE patient_id = NEW.patient_id\n    AND occurred_at > NOW() - INTERVAL '24 hours';\n    \n    -- If 3+ seizures in 24 hours, send critical alert (NO PHI!)\n    IF v_recent_seizures >= 3 THEN\n        PERFORM public.schedule_notification(\n            NEW.patient_id,\n            'critical_alert',\n            'Seizure Cluster Detected',\n            'You''ve logged 3+ seizures in 24 hours. Consider contacting your healthcare provider.',\n            '/dashboard/emergency',\n            NEW.id,\n            NOW(),\n            'critical'\n        );\n    END IF;\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "schedule_medication_reminders",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.schedule_medication_reminders()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_prefs RECORD;\n    v_medication_name TEXT;\n    v_next_dose TIMESTAMPTZ;\nBEGIN\n    -- Get user preferences\n    SELECT * INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = NEW.user_id;\n    \n    -- If medication reminders disabled, skip\n    IF NOT FOUND OR NOT v_prefs.medication_reminders THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Get medication name (NO PHI - just generic reference)\n    SELECT 'Medication Reminder' INTO v_medication_name;\n    \n    -- Calculate next dose time (example: if dose_times array exists)\n    -- For now, schedule for tomorrow at daily_checkin_time\n    v_next_dose := (CURRENT_DATE + INTERVAL '1 day' + v_prefs.daily_checkin_time::TIME)::TIMESTAMPTZ;\n    \n    -- Schedule notification (NO PHI in content!)\n    PERFORM public.schedule_notification(\n        NEW.user_id,\n        'medication_reminder',\n        'Medication Reminder',\n        'Time to take your medication. Tap to log.',\n        '/dashboard?action=medication',\n        NEW.id,\n        v_next_dose - (v_prefs.medication_reminder_minutes || ' minutes')::INTERVAL,\n        'normal'\n    );\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "update_menstrual_log_timestamp",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.update_menstrual_log_timestamp()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "update_onboarding_timestamp",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.update_onboarding_timestamp()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  NEW.last_updated_at = NOW();\n  RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "can_carer_see_patient_data",
    "args_signature": "p_carer_id uuid, p_patient_id uuid, p_data_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.can_carer_see_patient_data(p_carer_id uuid, p_patient_id uuid, p_data_type text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_default_share BOOLEAN;\n    v_visibility TEXT;\n    v_can_view_health_data BOOLEAN;\nBEGIN\n    -- Check if carer relationship exists and allows health data\n    SELECT can_view_health_data\n    INTO v_can_view_health_data\n    FROM public.carer_relationships\n    WHERE carer_user_id = p_carer_id\n      AND patient_user_id = p_patient_id\n      AND status = 'active';\n    \n    IF NOT FOUND OR NOT v_can_view_health_data THEN\n        RETURN false;\n    END IF;\n    \n    -- Check sharing preferences\n    SELECT \n        default_share_with_carers,\n        CASE p_data_type\n            WHEN 'seizure_events' THEN seizure_events_visibility\n            WHEN 'tremor_episodes' THEN tremor_episodes_visibility\n            WHEN 'gait_episodes' THEN gait_episodes_visibility\n            WHEN 'daily_logs' THEN daily_logs_visibility\n            WHEN 'medications' THEN medications_visibility\n            WHEN 'media' THEN media_visibility\n            ELSE 'clinician_only'\n        END\n    INTO v_default_share, v_visibility\n    FROM public.data_sharing_preferences\n    WHERE patient_id = p_patient_id;\n    \n    -- If no preferences set, default to allow for carers\n    IF NOT FOUND THEN\n        RETURN true;\n    END IF;\n    \n    -- Check if visibility allows carer access\n    RETURN v_default_share AND v_visibility IN ('clinician_carer', 'all');\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "can_clinician_see_patient_data",
    "args_signature": "p_clinician_id uuid, p_patient_id uuid, p_data_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.can_clinician_see_patient_data(p_clinician_id uuid, p_patient_id uuid, p_data_type text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_default_share BOOLEAN;\n    v_visibility TEXT;\nBEGIN\n    -- Must have active connection\n    IF NOT public.is_clinician_connected_to_patient(p_clinician_id, p_patient_id) THEN\n        RETURN false;\n    END IF;\n    \n    -- Check sharing preferences\n    SELECT \n        default_share_with_clinicians,\n        CASE p_data_type\n            WHEN 'seizure_events' THEN seizure_events_visibility\n            WHEN 'tremor_episodes' THEN tremor_episodes_visibility\n            WHEN 'gait_episodes' THEN gait_episodes_visibility\n            WHEN 'daily_logs' THEN daily_logs_visibility\n            WHEN 'medications' THEN medications_visibility\n            WHEN 'media' THEN media_visibility\n            ELSE 'clinician_only'\n        END\n    INTO v_default_share, v_visibility\n    FROM public.data_sharing_preferences\n    WHERE patient_id = p_patient_id;\n    \n    -- If no preferences set, default to allow\n    IF NOT FOUND THEN\n        RETURN true;\n    END IF;\n    \n    -- Check if visibility allows clinician access\n    RETURN v_default_share AND v_visibility IN ('clinician_only', 'clinician_carer', 'all');\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "cleanup_old_logs",
    "args_signature": "p_days_to_keep integer",
    "definition": "CREATE OR REPLACE FUNCTION public.cleanup_old_logs(p_days_to_keep integer DEFAULT 30)\n RETURNS TABLE(table_name text, rows_deleted bigint)\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_system_deleted BIGINT;\n    v_function_deleted BIGINT;\n    v_api_deleted BIGINT;\n    v_db_deleted BIGINT;\nBEGIN\n    -- Delete old system logs\n    DELETE FROM public.system_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_system_deleted = ROW_COUNT;\n    \n    -- Delete old function logs\n    DELETE FROM public.function_execution_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_function_deleted = ROW_COUNT;\n    \n    -- Delete old API logs\n    DELETE FROM public.api_request_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_api_deleted = ROW_COUNT;\n    \n    -- Delete old DB logs\n    DELETE FROM public.database_operation_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;\n    GET DIAGNOSTICS v_db_deleted = ROW_COUNT;\n    \n    -- Return summary\n    RETURN QUERY\n    SELECT 'system_logs'::TEXT, v_system_deleted\n    UNION ALL\n    SELECT 'function_execution_logs'::TEXT, v_function_deleted\n    UNION ALL\n    SELECT 'api_request_logs'::TEXT, v_api_deleted\n    UNION ALL\n    SELECT 'database_operation_logs'::TEXT, v_db_deleted;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "complete_function_execution",
    "args_signature": "p_execution_id uuid, p_success boolean, p_return_value jsonb, p_error_message text",
    "definition": "CREATE OR REPLACE FUNCTION public.complete_function_execution(p_execution_id uuid, p_success boolean, p_return_value jsonb DEFAULT NULL::jsonb, p_error_message text DEFAULT NULL::text)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public'\nAS $function$\nBEGIN\n    UPDATE public.function_execution_logs\n    SET \n        execution_status = CASE WHEN p_success THEN 'completed' ELSE 'failed' END,\n        completed_at = NOW(),\n        duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000,\n        success = p_success,\n        return_value = p_return_value,\n        error_message = p_error_message\n    WHERE id = p_execution_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "complete_onboarding",
    "args_signature": "p_user_id uuid, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.complete_onboarding(p_user_id uuid, p_user_type text)\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user_type user_type_enum;\nBEGIN\n    v_user_type := p_user_type::user_type_enum;\n\n    -- Update profile\n    UPDATE public.profiles\n    SET onboarding_completed = true,\n        updated_at = NOW()\n    WHERE id = p_user_id;\n\n    -- Update onboarding progress\n    UPDATE public.onboarding_progress\n    SET completed = true,\n        completed_at = NOW()\n    WHERE user_id = p_user_id;\n\n    -- Award \"Welcome Aboard\" achievement\n    INSERT INTO public.user_achievements (user_id, achievement_id)\n    SELECT p_user_id, id\n    FROM public.achievements\n    WHERE name = 'Welcome Aboard'\n    ON CONFLICT DO NOTHING;\n\n    -- Award points for completion\n    UPDATE public.user_points\n    SET total_points = total_points + 50\n    WHERE user_id = p_user_id;\n\n    RETURN json_build_object(\n        'success', true,\n        'message', 'Onboarding completed successfully'\n    );\n\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'message', 'Error completing onboarding: ' || SQLERRM\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_function_stats",
    "args_signature": "p_function_name text",
    "definition": "CREATE OR REPLACE FUNCTION public.get_function_stats(p_function_name text DEFAULT NULL::text)\n RETURNS TABLE(function_name text, total_executions bigint, successful bigint, failed bigint, avg_duration_ms numeric, max_duration_ms integer, last_execution timestamp with time zone)\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    SELECT \n        function_name,\n        COUNT(*) as total_executions,\n        SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,\n        SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed,\n        ROUND(AVG(duration_ms), 2) as avg_duration_ms,\n        MAX(duration_ms) as max_duration_ms,\n        MAX(started_at) as last_execution\n    FROM public.function_execution_logs\n    WHERE (p_function_name IS NULL OR function_name = p_function_name)\n    AND execution_status IN ('completed', 'failed')\n    GROUP BY function_name\n    ORDER BY last_execution DESC;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_recent_errors",
    "args_signature": "p_limit integer",
    "definition": "CREATE OR REPLACE FUNCTION public.get_recent_errors(p_limit integer DEFAULT 50)\n RETURNS TABLE(log_time timestamp with time zone, level text, category text, event text, message text, function_name text, error_code text, user_id uuid)\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    SELECT \n        created_at,\n        log_level,\n        category,\n        event_type,\n        message,\n        function_name,\n        error_code,\n        user_id\n    FROM public.system_logs\n    WHERE log_level IN ('ERROR', 'CRITICAL')\n    ORDER BY created_at DESC\n    LIMIT p_limit;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_research_id",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_research_id(p_user_id uuid)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'linkage', 'public'\nAS $function$\nDECLARE\n    v_research_id UUID;\nBEGIN\n    -- Get research ID from secure linkage table\n    SELECT research_id INTO v_research_id\n    FROM linkage.research_id_map\n    WHERE user_id = p_user_id;\n    \n    -- If not exists, create one\n    IF v_research_id IS NULL THEN\n        INSERT INTO linkage.research_id_map (user_id, research_id)\n        VALUES (p_user_id, gen_random_uuid())\n        RETURNING research_id INTO v_research_id;\n    END IF;\n    \n    -- Update access tracking\n    UPDATE linkage.research_id_map\n    SET \n        last_accessed = NOW(),\n        access_count = access_count + 1\n    WHERE user_id = p_user_id;\n    \n    RETURN v_research_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_user_type",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_user_type(p_user_id uuid)\n RETURNS text\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user_type TEXT;\nBEGIN\n    SELECT user_type INTO v_user_type\n    FROM public.profiles\n    WHERE id = p_user_id;\n    \n    RETURN v_user_type;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "handle_new_user",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.handle_new_user()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public', 'auth'\nAS $function$\nDECLARE\n    v_user_type TEXT;\n    v_user_type_enum public.user_type_enum;\nBEGIN\n    -- Extract user_type from signup metadata\n    v_user_type := COALESCE(\n        NEW.raw_user_meta_data->>'user_type',\n        NEW.raw_user_meta_data->>'userType',\n        'patient'\n    );\n    \n    -- Validate and cast to enum\n    BEGIN\n        v_user_type_enum := v_user_type::public.user_type_enum;\n    EXCEPTION\n        WHEN OTHERS THEN\n            v_user_type_enum := 'patient'::public.user_type_enum;\n    END;\n    \n    -- Create or update profile\n    INSERT INTO public.profiles (\n        id, \n        email, \n        user_type, \n        onboarding_completed,\n        created_at, \n        updated_at\n    ) VALUES (\n        NEW.id, \n        NEW.email, \n        v_user_type_enum,\n        false,\n        NOW(), \n        NOW()\n    )\n    ON CONFLICT (id) DO UPDATE\n    SET \n        user_type = COALESCE(public.profiles.user_type, v_user_type_enum),\n        email = EXCLUDED.email,\n        updated_at = NOW();\n    \n    -- Create type-specific profiles\n    CASE v_user_type_enum\n        WHEN 'patient' THEN\n            -- Patient profile\n            INSERT INTO public.patient_profiles (id, user_id, created_at, updated_at)\n            VALUES (gen_random_uuid(), NEW.id, NOW(), NOW())\n            ON CONFLICT (user_id) DO NOTHING;\n            \n            -- Data sharing preferences (with all columns)\n            INSERT INTO public.data_sharing_preferences (\n                id, \n                patient_id,\n                default_share_with_clinicians,\n                default_share_with_carers,\n                default_share_with_researchers,\n                seizure_events_visibility,\n                tremor_episodes_visibility,\n                gait_episodes_visibility,\n                daily_logs_visibility,\n                medications_visibility,\n                media_visibility,\n                research_seizure_data,\n                research_tremor_data,\n                research_gait_data,\n                research_symptom_data,\n                research_medication_data,\n                research_imaging_data,\n                research_demographic_data,\n                carer_access_rules,\n                clinician_access_rules,\n                created_at, \n                updated_at\n            ) VALUES (\n                gen_random_uuid(), \n                NEW.id,\n                true,  -- default_share_with_clinicians\n                true,  -- default_share_with_carers\n                false, -- default_share_with_researchers\n                'connected_clinicians', -- seizure_events_visibility\n                'connected_clinicians', -- tremor_episodes_visibility\n                'connected_clinicians', -- gait_episodes_visibility\n                'connected_clinicians', -- daily_logs_visibility\n                'connected_clinicians', -- medications_visibility\n                'connected_clinicians', -- media_visibility\n                false, -- research_seizure_data\n                false, -- research_tremor_data\n                false, -- research_gait_data\n                false, -- research_symptom_data\n                false, -- research_medication_data\n                false, -- research_imaging_data\n                false, -- research_demographic_data\n                '{}',  -- carer_access_rules\n                '{}',  -- clinician_access_rules\n                NOW(), \n                NOW()\n            )\n            ON CONFLICT (patient_id) DO NOTHING;\n            \n            -- User points\n            INSERT INTO public.user_points (\n                id, \n                user_id, \n                points, \n                level, \n                streak_days,\n                last_activity_date,\n                created_at, \n                updated_at\n            ) VALUES (\n                gen_random_uuid(), \n                NEW.id, \n                0,     -- points\n                1,     -- level\n                0,     -- streak_days\n                NULL,  -- last_activity_date\n                NOW(), \n                NOW()\n            )\n            ON CONFLICT (user_id) DO NOTHING;\n            \n        WHEN 'clinician' THEN\n            INSERT INTO public.clinician_profiles (\n                id, \n                user_id, \n                accepting_new_patients,\n                patient_capacity,\n                preferred_communication,\n                created_at, \n                updated_at\n            ) VALUES (\n                gen_random_uuid(), \n                NEW.id, \n                true,   -- accepting_new_patients\n                NULL,   -- patient_capacity\n                NULL,   -- preferred_communication\n                NOW(), \n                NOW()\n            )\n            ON CONFLICT (user_id) DO NOTHING;\n            \n        WHEN 'carer' THEN\n            INSERT INTO public.carer_profiles (\n                id, \n                user_id,\n                preferred_contact_method,\n                availability_notes,\n                certifications,\n                created_at, \n                updated_at\n            ) VALUES (\n                gen_random_uuid(), \n                NEW.id,\n                NULL,  -- preferred_contact_method\n                NULL,  -- availability_notes\n                NULL,  -- certifications\n                NOW(), \n                NOW()\n            )\n            ON CONFLICT (user_id) DO NOTHING;\n            \n        WHEN 'researcher' THEN\n            INSERT INTO public.researcher_profiles (\n                id, \n                user_id, \n                access_level,\n                institution,\n                department,\n                research_focus,\n                credentials,\n                created_at, \n                updated_at\n            ) VALUES (\n                gen_random_uuid(), \n                NEW.id, \n                'basic',  -- access_level\n                NULL,     -- institution\n                NULL,     -- department\n                NULL,     -- research_focus\n                NULL,     -- credentials\n                NOW(), \n                NOW()\n            )\n            ON CONFLICT (user_id) DO NOTHING;\n            \n        ELSE\n            -- Admin or unknown type\n            NULL;\n    END CASE;\n    \n    -- Notification preferences for ALL users\n    INSERT INTO public.notification_preferences (\n        id, \n        user_id,\n        email_enabled,\n        push_enabled,\n        sound_enabled,\n        vibration_enabled,\n        medication_reminders,\n        appointment_reminders,\n        critical_alerts,\n        pattern_alerts,\n        achievement_notifications,\n        message_notifications,\n        direct_messages,\n        daily_checkin_reminder,\n        daily_checkin_time,\n        medication_reminder_minutes,\n        appointment_reminder_hours,\n        quiet_hours_enabled,\n        quiet_hours_start,\n        quiet_hours_end,\n        created_at, \n        updated_at\n    ) VALUES (\n        gen_random_uuid(), \n        NEW.id,\n        true,   -- email_enabled\n        true,   -- push_enabled\n        true,   -- sound_enabled\n        true,   -- vibration_enabled\n        true,   -- medication_reminders\n        true,   -- appointment_reminders\n        true,   -- critical_alerts\n        true,   -- pattern_alerts\n        true,   -- achievement_notifications\n        true,   -- message_notifications\n        true,   -- direct_messages\n        false,  -- daily_checkin_reminder\n        NULL,   -- daily_checkin_time\n        30,     -- medication_reminder_minutes\n        24,     -- appointment_reminder_hours\n        false,  -- quiet_hours_enabled\n        NULL,   -- quiet_hours_start\n        NULL,   -- quiet_hours_end\n        NOW(), \n        NOW()\n    )\n    ON CONFLICT (user_id) DO NOTHING;\n    \n    RETURN NEW;\n    \nEXCEPTION\n    WHEN OTHERS THEN\n        -- Log error but don't block user creation\n        RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;\n        \n        -- At minimum, try to create the basic profile\n        INSERT INTO public.profiles (id, email, user_type, onboarding_completed, created_at, updated_at)\n        VALUES (NEW.id, NEW.email, 'patient'::public.user_type_enum, false, NOW(), NOW())\n        ON CONFLICT (id) DO NOTHING;\n        \n        RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "initialize_new_user",
    "args_signature": "p_user_id uuid, p_email text, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.initialize_new_user(p_user_id uuid, p_email text, p_user_type text DEFAULT 'patient'::text)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user_type public.user_type_enum;\n    v_user_exists BOOLEAN;\n    v_profile_exists BOOLEAN;\n    v_result JSONB;\nBEGIN\n    -- Validate user_type\n    BEGIN\n        v_user_type := p_user_type::public.user_type_enum;\n    EXCEPTION\n        WHEN OTHERS THEN\n            RETURN jsonb_build_object(\n                'success', false, \n                'message', 'Invalid user_type: ' || p_user_type,\n                'error', SQLERRM\n            );\n    END;\n    \n    -- Check if user exists in auth.users\n    SELECT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) INTO v_user_exists;\n    \n    IF NOT v_user_exists THEN\n        RETURN jsonb_build_object(\n            'success', false, \n            'message', 'User does not exist in auth.users'\n        );\n    END IF;\n    \n    -- Check if profile already exists\n    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id) INTO v_profile_exists;\n    \n    IF v_profile_exists THEN\n        -- Update user_type if profile exists but type is NULL\n        UPDATE public.profiles \n        SET \n            user_type = v_user_type,\n            updated_at = NOW()\n        WHERE id = p_user_id AND user_type IS NULL;\n        \n        RETURN jsonb_build_object(\n            'success', true, \n            'message', 'Profile already exists',\n            'user_id', p_user_id,\n            'user_type', v_user_type\n        );\n    END IF;\n    \n    -- Create profile\n    INSERT INTO public.profiles (\n        id, \n        email, \n        user_type, \n        created_at, \n        updated_at,\n        onboarding_completed\n    ) VALUES (\n        p_user_id, \n        p_email, \n        v_user_type, \n        NOW(), \n        NOW(),\n        false\n    );\n    \n    -- Create user type specific profiles\n    CASE v_user_type\n        WHEN 'patient' THEN\n            -- Create patient profile\n            INSERT INTO public.patient_profiles (\n                id, \n                user_id, \n                created_at, \n                updated_at\n            ) VALUES (\n                gen_random_uuid(), \n                p_user_id, \n                NOW(), \n                NOW()\n            );\n            \n            -- Create data sharing preferences with defaults\n            INSERT INTO public.data_sharing_preferences (\n                id,\n                patient_id,\n                default_share_with_clinicians,\n                default_share_with_carers,\n                default_share_with_researchers,\n                seizure_events_visibility,\n                tremor_episodes_visibility,\n                gait_episodes_visibility,\n                daily_logs_visibility,\n                medications_visibility,\n                media_visibility,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                true,  -- Default: share with clinicians\n                true,  -- Default: share with carers\n                false, -- Default: don't share with researchers\n                'connected_clinicians',\n                'connected_clinicians',\n                'connected_clinicians',\n                'connected_clinicians',\n                'connected_clinicians',\n                'connected_clinicians',\n                NOW(),\n                NOW()\n            );\n            \n            -- Create notification preferences\n            INSERT INTO public.notification_preferences (\n                id,\n                user_id,\n                email_enabled,\n                push_enabled,\n                medication_reminders,\n                appointment_reminders,\n                critical_alerts,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                true,  -- Email enabled\n                true,  -- Push enabled\n                true,  -- Medication reminders\n                true,  -- Appointment reminders\n                true,  -- Critical alerts\n                NOW(),\n                NOW()\n            );\n            \n            -- Create user points entry\n            INSERT INTO public.user_points (\n                id,\n                user_id,\n                points,\n                level,\n                streak_days,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                0,     -- Starting points\n                1,     -- Starting level\n                0,     -- Starting streak\n                NOW(),\n                NOW()\n            );\n            \n        WHEN 'clinician' THEN\n            -- Create clinician profile\n            INSERT INTO public.clinician_profiles (\n                id,\n                user_id,\n                accepting_new_patients,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                true,\n                NOW(),\n                NOW()\n            );\n            \n            -- Create notification preferences\n            INSERT INTO public.notification_preferences (\n                id,\n                user_id,\n                email_enabled,\n                push_enabled,\n                critical_alerts,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                true,\n                true,\n                true,\n                NOW(),\n                NOW()\n            );\n            \n        WHEN 'carer' THEN\n            -- Create carer profile\n            INSERT INTO public.carer_profiles (\n                id,\n                user_id,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                NOW(),\n                NOW()\n            );\n            \n            -- Create notification preferences\n            INSERT INTO public.notification_preferences (\n                id,\n                user_id,\n                email_enabled,\n                push_enabled,\n                critical_alerts,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                true,\n                true,\n                true,\n                NOW(),\n                NOW()\n            );\n            \n        WHEN 'researcher' THEN\n            -- Create researcher profile\n            INSERT INTO public.researcher_profiles (\n                id,\n                user_id,\n                access_level,\n                created_at,\n                updated_at\n            ) VALUES (\n                gen_random_uuid(),\n                p_user_id,\n                'basic', -- Start with basic access\n                NOW(),\n                NOW()\n            );\n            \n        ELSE\n            -- Admin or other type - just basic profile created\n            NULL;\n    END CASE;\n    \n    -- Log successful initialization\n    PERFORM public.log_system_event(\n        'INFO', \n        'auth', \n        'user_initialization_complete', \n        'User successfully initialized',\n        p_user_id,\n        'initialize_new_user',\n        NULL,\n        jsonb_build_object(\n            'user_type', v_user_type,\n            'email', p_email\n        )\n    );\n    \n    RETURN jsonb_build_object(\n        'success', true,\n        'message', 'User initialized successfully',\n        'user_id', p_user_id,\n        'user_type', v_user_type\n    );\n    \nEXCEPTION\n    WHEN OTHERS THEN\n        -- Log the error\n        PERFORM public.log_system_event(\n            'ERROR', \n            'auth', \n            'user_initialization_failed', \n            'Failed to initialize user: ' || SQLERRM,\n            p_user_id,\n            'initialize_new_user',\n            SQLSTATE,\n            jsonb_build_object(\n                'user_type', p_user_type,\n                'email', p_email,\n                'error', SQLERRM,\n                'detail', SQLSTATE\n            )\n        );\n        \n        RETURN jsonb_build_object(\n            'success', false,\n            'message', 'Failed to initialize user',\n            'error', SQLERRM,\n            'detail', SQLSTATE\n        );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "initialize_new_user_jsonb",
    "args_signature": "p_user_id uuid, p_email text, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.initialize_new_user_jsonb(p_user_id uuid, p_email text, p_user_type text)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public', 'private_health_info'\nAS $function$\nBEGIN\n  -- Optional: call legacy function if it exists and is needed\n  -- PERFORM public.initialize_new_user(p_user_id, p_email, p_user_type);\n\n  -- Create/ensure profile\n  INSERT INTO public.profiles (\n    id,\n    user_type,\n    onboarding_completed,\n    created_at,\n    updated_at\n  ) VALUES (\n    p_user_id,\n    p_user_type::user_type_enum,\n    false,\n    NOW(),\n    NOW()\n  )\n  ON CONFLICT (id) DO UPDATE\n    SET user_type = EXCLUDED.user_type,\n        updated_at = NOW();\n\n  -- Patient-specific\n  IF p_user_type = 'patient' THEN\n    INSERT INTO public.patient_profiles (user_id, created_at, updated_at)\n    VALUES (p_user_id, NOW(), NOW())\n    ON CONFLICT (user_id) DO NOTHING;\n\n    INSERT INTO private_health_info.patient_phi (user_id, created_at, updated_at)\n    VALUES (p_user_id, NOW(), NOW())\n    ON CONFLICT (user_id) DO NOTHING;\n  END IF;\n\n  -- Carer-specific\n  IF p_user_type = 'carer' THEN\n    INSERT INTO public.carer_profiles (user_id, created_at, updated_at)\n    VALUES (p_user_id, NOW(), NOW())\n    ON CONFLICT (user_id) DO NOTHING;\n  END IF;\n\n  RETURN jsonb_build_object('success', true, 'message', 'User initialized successfully');\n\nEXCEPTION\n  WHEN OTHERS THEN\n    RETURN jsonb_build_object('success', false, 'message', 'Initialization failed: ' || SQLERRM);\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_admin",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.is_admin()\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.profiles\n        WHERE id = auth.uid()\n          AND user_type = 'admin'\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_approved_researcher",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.is_approved_researcher()\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.researcher_profiles\n        WHERE user_id = auth.uid()\n          AND access_level IN ('advanced', 'admin')\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_carer_related_to_patient",
    "args_signature": "p_carer_id uuid, p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.is_carer_related_to_patient(p_carer_id uuid, p_patient_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.carer_relationships\n        WHERE carer_user_id = p_carer_id\n          AND patient_user_id = p_patient_id\n          AND status = 'active'\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_clinician_connected_to_patient",
    "args_signature": "p_clinician_id uuid, p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.is_clinician_connected_to_patient(p_clinician_id uuid, p_patient_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    RETURN EXISTS (\n        SELECT 1\n        FROM public.patient_clinician_connections\n        WHERE clinician_id = p_clinician_id\n          AND patient_id = p_patient_id\n          AND status = 'active'\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "is_in_quiet_hours",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.is_in_quiet_hours(p_user_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_prefs RECORD;\n    v_current_time TIME;\nBEGIN\n    -- Get user preferences\n    SELECT quiet_hours_enabled, quiet_hours_start, quiet_hours_end\n    INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = p_user_id;\n    \n    -- If quiet hours not enabled, return false\n    IF NOT FOUND OR NOT v_prefs.quiet_hours_enabled THEN\n        RETURN false;\n    END IF;\n    \n    v_current_time := CURRENT_TIME;\n    \n    -- Handle overnight quiet hours (e.g., 22:00 to 08:00)\n    IF v_prefs.quiet_hours_start > v_prefs.quiet_hours_end THEN\n        RETURN v_current_time >= v_prefs.quiet_hours_start OR v_current_time < v_prefs.quiet_hours_end;\n    ELSE\n        RETURN v_current_time >= v_prefs.quiet_hours_start AND v_current_time < v_prefs.quiet_hours_end;\n    END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "log_system_event",
    "args_signature": "p_level text, p_category text, p_event_type text, p_message text, p_user_id uuid, p_function_name text, p_error_code text, p_context jsonb",
    "definition": "CREATE OR REPLACE FUNCTION public.log_system_event(p_level text, p_category text, p_event_type text, p_message text, p_user_id uuid DEFAULT NULL::uuid, p_function_name text DEFAULT NULL::text, p_error_code text DEFAULT NULL::text, p_context jsonb DEFAULT '{}'::jsonb)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public'\nAS $function$\nDECLARE\n    v_log_id UUID;\nBEGIN\n    -- CRITICAL: Validate that context contains NO PHI\n    -- Remove any potentially sensitive keys\n    p_context := p_context - ARRAY['email', 'phone', 'name', 'first_name', 'last_name', 'ssn', 'dob', 'address', 'password'];\n    \n    INSERT INTO public.system_logs (\n        log_level,\n        category,\n        event_type,\n        message,\n        user_id,\n        function_name,\n        error_code,\n        context_data,\n        session_id\n    ) VALUES (\n        UPPER(p_level),\n        p_category,\n        p_event_type,\n        p_message,\n        p_user_id,\n        p_function_name,\n        p_error_code,\n        p_context,\n        current_setting('application_name', true)\n    )\n    RETURNING id INTO v_log_id;\n    \n    RETURN v_log_id;\nEXCEPTION\n    WHEN OTHERS THEN\n        -- Even logging failed! Raise warning but don't crash\n        RAISE WARNING 'Failed to write to system_logs: %', SQLERRM;\n        RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "mark_notification_read",
    "args_signature": "p_notification_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.mark_notification_read(p_notification_id uuid)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n    UPDATE public.notification_queue\n    SET status = 'sent',\n        sent_at = NOW()\n    WHERE id = p_notification_id\n    AND user_id = auth.uid(); -- Security: only own notifications\n    \n    -- Log to history\n    INSERT INTO public.notification_history (\n        user_id,\n        notification_type,\n        sent_at,\n        opened_at\n    )\n    SELECT \n        user_id,\n        notification_type,\n        NOW(),\n        NOW()\n    FROM public.notification_queue\n    WHERE id = p_notification_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_patient_onboarding",
    "args_signature": "p_user_id uuid, p_data jsonb",
    "definition": "CREATE OR REPLACE FUNCTION public.save_patient_onboarding(p_user_id uuid, p_data jsonb)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_result JSONB := '{\"success\": false}'::jsonb;\nBEGIN\n    -- Update profiles table\n    UPDATE public.profiles\n    SET \n        first_name = p_data->>'firstName',\n        middle_name = p_data->>'middleName',\n        last_name = p_data->>'lastName',\n        phone_number = p_data->>'phoneNumber',\n        onboarding_completed = true,\n        updated_at = NOW()\n    WHERE id = p_user_id;\n\n    -- Update patient_profiles\n    INSERT INTO public.patient_profiles (\n        user_id,\n        first_name,\n        last_name,\n        date_of_birth,\n        gender\n    ) VALUES (\n        p_user_id,\n        p_data->>'firstName',\n        p_data->>'lastName',\n        (p_data->>'dateOfBirth')::date,\n        (p_data->>'gender')::gender_enum\n    )\n    ON CONFLICT (user_id) DO UPDATE\n    SET \n        first_name = EXCLUDED.first_name,\n        last_name = EXCLUDED.last_name,\n        date_of_birth = EXCLUDED.date_of_birth,\n        gender = EXCLUDED.gender,\n        updated_at = NOW();\n\n    -- Save to patient_onboarding_data\n    INSERT INTO private_health_info.patient_onboarding_data (\n        user_id,\n        first_name,\n        middle_name,\n        last_name,\n        date_of_birth,\n        gender,\n        phone_number,\n        emergency_contact_name,\n        emergency_contact_phone,\n        emergency_contact_relationship,\n        selected_conditions,\n        track_menstrual_cycle,\n        share_research_data,\n        completed_at\n    ) VALUES (\n        p_user_id,\n        p_data->>'firstName',\n        p_data->>'middleName',\n        p_data->>'lastName',\n        (p_data->>'dateOfBirth')::date,\n        (p_data->>'gender')::gender_enum,\n        p_data->>'phoneNumber',\n        p_data->>'emergencyContactName',\n        p_data->>'emergencyContactPhone',\n        p_data->>'emergencyContactRelationship',\n        ARRAY(SELECT jsonb_array_elements_text(p_data->'selectedConditions'))::uuid[],\n        (p_data->>'trackMenstrual')::boolean,\n        (p_data->>'shareResearch')::boolean,\n        NOW()\n    )\n    ON CONFLICT (user_id) DO UPDATE\n    SET \n        first_name = EXCLUDED.first_name,\n        middle_name = EXCLUDED.middle_name,\n        last_name = EXCLUDED.last_name,\n        date_of_birth = EXCLUDED.date_of_birth,\n        gender = EXCLUDED.gender,\n        phone_number = EXCLUDED.phone_number,\n        emergency_contact_name = EXCLUDED.emergency_contact_name,\n        emergency_contact_phone = EXCLUDED.emergency_contact_phone,\n        emergency_contact_relationship = EXCLUDED.emergency_contact_relationship,\n        selected_conditions = EXCLUDED.selected_conditions,\n        track_menstrual_cycle = EXCLUDED.track_menstrual_cycle,\n        share_research_data = EXCLUDED.share_research_data,\n        completed_at = EXCLUDED.completed_at,\n        updated_at = NOW();\n\n    v_result := '{\"success\": true}'::jsonb;\n    RETURN v_result;\nEXCEPTION\n    WHEN OTHERS THEN\n        v_result := jsonb_build_object(\n            'success', false,\n            'error', SQLERRM\n        );\n        RETURN v_result;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "schedule_daily_checkin_reminders",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION public.schedule_daily_checkin_reminders()\n RETURNS integer\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_user RECORD;\n    v_scheduled_time TIMESTAMPTZ;\n    v_count INTEGER := 0;\nBEGIN\n    -- Loop through users with daily check-in enabled\n    FOR v_user IN \n        SELECT user_id, daily_checkin_time\n        FROM public.notification_preferences\n        WHERE daily_checkin_reminder = true\n        AND push_enabled = true\n    LOOP\n        -- Calculate next check-in time\n        v_scheduled_time := (CURRENT_DATE + v_user.daily_checkin_time)::TIMESTAMPTZ;\n        \n        -- If time has passed today, schedule for tomorrow\n        IF v_scheduled_time < NOW() THEN\n            v_scheduled_time := v_scheduled_time + INTERVAL '1 day';\n        END IF;\n        \n        -- Schedule notification (NO PHI!)\n        PERFORM public.schedule_notification(\n            v_user.user_id,\n            'daily_checkin',\n            'Daily Health Check-In',\n            'How are you feeling today? Log your mood, energy, and symptoms.',\n            '/dashboard?action=daily-tracking',\n            NULL,\n            v_scheduled_time,\n            'normal'\n        );\n        \n        v_count := v_count + 1;\n    END LOOP;\n    \n    RETURN v_count;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "schedule_notification",
    "args_signature": "p_user_id uuid, p_type text, p_title text, p_body text, p_action_url text, p_reference_id uuid, p_scheduled_for timestamp with time zone, p_priority text",
    "definition": "CREATE OR REPLACE FUNCTION public.schedule_notification(p_user_id uuid, p_type text, p_title text, p_body text, p_action_url text DEFAULT NULL::text, p_reference_id uuid DEFAULT NULL::uuid, p_scheduled_for timestamp with time zone DEFAULT now(), p_priority text DEFAULT 'normal'::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_notification_id UUID;\n    v_prefs RECORD;\nBEGIN\n    -- Get user preferences\n    SELECT * INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = p_user_id;\n    \n    -- Check if notifications enabled\n    IF NOT FOUND OR NOT v_prefs.push_enabled THEN\n        RETURN NULL; -- User has disabled notifications\n    END IF;\n    \n    -- Check type-specific preferences\n    IF p_type = 'medication_reminder' AND NOT v_prefs.medication_reminders THEN\n        RETURN NULL;\n    ELSIF p_type = 'daily_checkin' AND NOT v_prefs.daily_checkin_reminder THEN\n        RETURN NULL;\n    ELSIF p_type = 'message' AND NOT v_prefs.message_notifications THEN\n        RETURN NULL;\n    END IF;\n    \n    -- Don't schedule during quiet hours (unless critical)\n    IF p_priority != 'critical' AND public.is_in_quiet_hours(p_user_id) THEN\n        -- Reschedule for end of quiet hours\n        SELECT quiet_hours_end INTO p_scheduled_for\n        FROM public.notification_preferences\n        WHERE user_id = p_user_id;\n    END IF;\n    \n    -- Insert notification\n    INSERT INTO public.notification_queue (\n        user_id,\n        notification_type,\n        title,\n        body,\n        action_url,\n        reference_id,\n        scheduled_for,\n        priority\n    ) VALUES (\n        p_user_id,\n        p_type,\n        p_title,\n        p_body,\n        p_action_url,\n        p_reference_id,\n        p_scheduled_for,\n        p_priority\n    )\n    RETURNING id INTO v_notification_id;\n    \n    RETURN v_notification_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "start_function_execution",
    "args_signature": "p_function_name text, p_user_id uuid, p_user_type text, p_triggered_by text",
    "definition": "CREATE OR REPLACE FUNCTION public.start_function_execution(p_function_name text, p_user_id uuid DEFAULT NULL::uuid, p_user_type text DEFAULT NULL::text, p_triggered_by text DEFAULT 'api'::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'pg_catalog', 'public'\nAS $function$\nDECLARE\n    v_execution_id UUID;\nBEGIN\n    INSERT INTO public.function_execution_logs (\n        function_name,\n        execution_status,\n        started_at,\n        input_user_id,\n        input_user_type,\n        triggered_by,\n        session_id\n    ) VALUES (\n        p_function_name,\n        'started',\n        NOW(),\n        p_user_id,\n        p_user_type,\n        p_triggered_by,\n        current_setting('application_name', true)\n    )\n    RETURNING id INTO v_execution_id;\n    \n    RETURN v_execution_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "test_user_creation",
    "args_signature": "p_email text, p_user_type text",
    "definition": "CREATE OR REPLACE FUNCTION public.test_user_creation(p_email text, p_user_type text DEFAULT 'patient'::text)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_user_id UUID;\n    v_result JSONB;\nBEGIN\n    -- Generate a test user ID\n    v_user_id := gen_random_uuid();\n    \n    -- Simulate user creation in auth.users (for testing)\n    -- In production, this happens through Supabase Auth\n    \n    -- Call initialize_new_user\n    v_result := public.initialize_new_user(v_user_id, p_email, p_user_type);\n    \n    -- Return the result with test info\n    RETURN jsonb_build_object(\n        'test_user_id', v_user_id,\n        'test_email', p_email,\n        'test_user_type', p_user_type,\n        'initialization_result', v_result\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "apply_rls",
    "args_signature": "wal jsonb, max_record_bytes integer",
    "definition": "CREATE OR REPLACE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024))\n RETURNS SETOF realtime.wal_rls\n LANGUAGE plpgsql\nAS $function$\ndeclare\n-- Regclass of the table e.g. public.notes\nentity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;\n\n-- I, U, D, T: insert, update ...\naction realtime.action = (\n    case wal ->> 'action'\n        when 'I' then 'INSERT'\n        when 'U' then 'UPDATE'\n        when 'D' then 'DELETE'\n        else 'ERROR'\n    end\n);\n\n-- Is row level security enabled for the table\nis_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;\n\nsubscriptions realtime.subscription[] = array_agg(subs)\n    from\n        realtime.subscription subs\n    where\n        subs.entity = entity_;\n\n-- Subscription vars\nroles regrole[] = array_agg(distinct us.claims_role::text)\n    from\n        unnest(subscriptions) us;\n\nworking_role regrole;\nclaimed_role regrole;\nclaims jsonb;\n\nsubscription_id uuid;\nsubscription_has_access bool;\nvisible_to_subscription_ids uuid[] = '{}';\n\n-- structured info for wal's columns\ncolumns realtime.wal_column[];\n-- previous identity values for update/delete\nold_columns realtime.wal_column[];\n\nerror_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;\n\n-- Primary jsonb output for record\noutput jsonb;\n\nbegin\nperform set_config('role', null, true);\n\ncolumns =\n    array_agg(\n        (\n            x->>'name',\n            x->>'type',\n            x->>'typeoid',\n            realtime.cast(\n                (x->'value') #>> '{}',\n                coalesce(\n                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4\n                    (x->>'type')::regtype\n                )\n            ),\n            (pks ->> 'name') is not null,\n            true\n        )::realtime.wal_column\n    )\n    from\n        jsonb_array_elements(wal -> 'columns') x\n        left join jsonb_array_elements(wal -> 'pk') pks\n            on (x ->> 'name') = (pks ->> 'name');\n\nold_columns =\n    array_agg(\n        (\n            x->>'name',\n            x->>'type',\n            x->>'typeoid',\n            realtime.cast(\n                (x->'value') #>> '{}',\n                coalesce(\n                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4\n                    (x->>'type')::regtype\n                )\n            ),\n            (pks ->> 'name') is not null,\n            true\n        )::realtime.wal_column\n    )\n    from\n        jsonb_array_elements(wal -> 'identity') x\n        left join jsonb_array_elements(wal -> 'pk') pks\n            on (x ->> 'name') = (pks ->> 'name');\n\nfor working_role in select * from unnest(roles) loop\n\n    -- Update `is_selectable` for columns and old_columns\n    columns =\n        array_agg(\n            (\n                c.name,\n                c.type_name,\n                c.type_oid,\n                c.value,\n                c.is_pkey,\n                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')\n            )::realtime.wal_column\n        )\n        from\n            unnest(columns) c;\n\n    old_columns =\n            array_agg(\n                (\n                    c.name,\n                    c.type_name,\n                    c.type_oid,\n                    c.value,\n                    c.is_pkey,\n                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')\n                )::realtime.wal_column\n            )\n            from\n                unnest(old_columns) c;\n\n    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then\n        return next (\n            jsonb_build_object(\n                'schema', wal ->> 'schema',\n                'table', wal ->> 'table',\n                'type', action\n            ),\n            is_rls_enabled,\n            -- subscriptions is already filtered by entity\n            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),\n            array['Error 400: Bad Request, no primary key']\n        )::realtime.wal_rls;\n\n    -- The claims role does not have SELECT permission to the primary key of entity\n    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then\n        return next (\n            jsonb_build_object(\n                'schema', wal ->> 'schema',\n                'table', wal ->> 'table',\n                'type', action\n            ),\n            is_rls_enabled,\n            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),\n            array['Error 401: Unauthorized']\n        )::realtime.wal_rls;\n\n    else\n        output = jsonb_build_object(\n            'schema', wal ->> 'schema',\n            'table', wal ->> 'table',\n            'type', action,\n            'commit_timestamp', to_char(\n                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),\n                'YYYY-MM-DD\"T\"HH24:MI:SS.MS\"Z\"'\n            ),\n            'columns', (\n                select\n                    jsonb_agg(\n                        jsonb_build_object(\n                            'name', pa.attname,\n                            'type', pt.typname\n                        )\n                        order by pa.attnum asc\n                    )\n                from\n                    pg_attribute pa\n                    join pg_type pt\n                        on pa.atttypid = pt.oid\n                where\n                    attrelid = entity_\n                    and attnum > 0\n                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')\n            )\n        )\n        -- Add \"record\" key for insert and update\n        || case\n            when action in ('INSERT', 'UPDATE') then\n                jsonb_build_object(\n                    'record',\n                    (\n                        select\n                            jsonb_object_agg(\n                                -- if unchanged toast, get column name and value from old record\n                                coalesce((c).name, (oc).name),\n                                case\n                                    when (c).name is null then (oc).value\n                                    else (c).value\n                                end\n                            )\n                        from\n                            unnest(columns) c\n                            full outer join unnest(old_columns) oc\n                                on (c).name = (oc).name\n                        where\n                            coalesce((c).is_selectable, (oc).is_selectable)\n                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))\n                    )\n                )\n            else '{}'::jsonb\n        end\n        -- Add \"old_record\" key for update and delete\n        || case\n            when action = 'UPDATE' then\n                jsonb_build_object(\n                        'old_record',\n                        (\n                            select jsonb_object_agg((c).name, (c).value)\n                            from unnest(old_columns) c\n                            where\n                                (c).is_selectable\n                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))\n                        )\n                    )\n            when action = 'DELETE' then\n                jsonb_build_object(\n                    'old_record',\n                    (\n                        select jsonb_object_agg((c).name, (c).value)\n                        from unnest(old_columns) c\n                        where\n                            (c).is_selectable\n                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))\n                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey\n                    )\n                )\n            else '{}'::jsonb\n        end;\n\n        -- Create the prepared statement\n        if is_rls_enabled and action <> 'DELETE' then\n            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then\n                deallocate walrus_rls_stmt;\n            end if;\n            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);\n        end if;\n\n        visible_to_subscription_ids = '{}';\n\n        for subscription_id, claims in (\n                select\n                    subs.subscription_id,\n                    subs.claims\n                from\n                    unnest(subscriptions) subs\n                where\n                    subs.entity = entity_\n                    and subs.claims_role = working_role\n                    and (\n                        realtime.is_visible_through_filters(columns, subs.filters)\n                        or (\n                          action = 'DELETE'\n                          and realtime.is_visible_through_filters(old_columns, subs.filters)\n                        )\n                    )\n        ) loop\n\n            if not is_rls_enabled or action = 'DELETE' then\n                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;\n            else\n                -- Check if RLS allows the role to see the record\n                perform\n                    -- Trim leading and trailing quotes from working_role because set_config\n                    -- doesn't recognize the role as valid if they are included\n                    set_config('role', trim(both '\"' from working_role::text), true),\n                    set_config('request.jwt.claims', claims::text, true);\n\n                execute 'execute walrus_rls_stmt' into subscription_has_access;\n\n                if subscription_has_access then\n                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;\n                end if;\n            end if;\n        end loop;\n\n        perform set_config('role', null, true);\n\n        return next (\n            output,\n            is_rls_enabled,\n            visible_to_subscription_ids,\n            case\n                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']\n                else '{}'\n            end\n        )::realtime.wal_rls;\n\n    end if;\nend loop;\n\nperform set_config('role', null, true);\nend;\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "broadcast_changes",
    "args_signature": "topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text",
    "definition": "CREATE OR REPLACE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    -- Declare a variable to hold the JSONB representation of the row\n    row_data jsonb := '{}'::jsonb;\nBEGIN\n    IF level = 'STATEMENT' THEN\n        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';\n    END IF;\n    -- Check the operation type and handle accordingly\n    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN\n        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);\n        PERFORM realtime.send (row_data, event_name, topic_name);\n    ELSE\n        RAISE EXCEPTION 'Unexpected operation type: %', operation;\n    END IF;\nEXCEPTION\n    WHEN OTHERS THEN\n        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;\nEND;\n\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "build_prepared_statement_sql",
    "args_signature": "prepared_statement_name text, entity regclass, columns realtime.wal_column[]",
    "definition": "CREATE OR REPLACE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[])\n RETURNS text\n LANGUAGE sql\nAS $function$\n      /*\n      Builds a sql string that, if executed, creates a prepared statement to\n      tests retrive a row from *entity* by its primary key columns.\n      Example\n          select realtime.build_prepared_statement_sql('public.notes', '{\"id\"}'::text[], '{\"bigint\"}'::text[])\n      */\n          select\n      'prepare ' || prepared_statement_name || ' as\n          select\n              exists(\n                  select\n                      1\n                  from\n                      ' || entity || '\n                  where\n                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '\n              )'\n          from\n              unnest(columns) pkc\n          where\n              pkc.is_pkey\n          group by\n              entity\n      $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "cast",
    "args_signature": "val text, type_ regtype",
    "definition": "CREATE OR REPLACE FUNCTION realtime.\"cast\"(val text, type_ regtype)\n RETURNS jsonb\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\n    declare\n      res jsonb;\n    begin\n      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;\n      return res;\n    end\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "check_equality_op",
    "args_signature": "op realtime.equality_op, type_ regtype, val_1 text, val_2 text",
    "definition": "CREATE OR REPLACE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text)\n RETURNS boolean\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\n      /*\n      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness\n      */\n      declare\n          op_symbol text = (\n              case\n                  when op = 'eq' then '='\n                  when op = 'neq' then '!='\n                  when op = 'lt' then '<'\n                  when op = 'lte' then '<='\n                  when op = 'gt' then '>'\n                  when op = 'gte' then '>='\n                  when op = 'in' then '= any'\n                  else 'UNKNOWN OP'\n              end\n          );\n          res boolean;\n      begin\n          execute format(\n              'select %L::'|| type_::text || ' ' || op_symbol\n              || ' ( %L::'\n              || (\n                  case\n                      when op = 'in' then type_::text || '[]'\n                      else type_::text end\n              )\n              || ')', val_1, val_2) into res;\n          return res;\n      end;\n      $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "is_visible_through_filters",
    "args_signature": "columns realtime.wal_column[], filters realtime.user_defined_filter[]",
    "definition": "CREATE OR REPLACE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[])\n RETURNS boolean\n LANGUAGE sql\n IMMUTABLE\nAS $function$\n    /*\n    Should the record be visible (true) or filtered out (false) after *filters* are applied\n    */\n        select\n            -- Default to allowed when no filters present\n            $2 is null -- no filters. this should not happen because subscriptions has a default\n            or array_length($2, 1) is null -- array length of an empty array is null\n            or bool_and(\n                coalesce(\n                    realtime.check_equality_op(\n                        op:=f.op,\n                        type_:=coalesce(\n                            col.type_oid::regtype, -- null when wal2json version <= 2.4\n                            col.type_name::regtype\n                        ),\n                        -- cast jsonb to text\n                        val_1:=col.value #>> '{}',\n                        val_2:=f.value\n                    ),\n                    false -- if null, filter does not match\n                )\n            )\n        from\n            unnest(filters) f\n            join unnest(columns) col\n                on f.column_name = col.name;\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "list_changes",
    "args_signature": "publication name, slot_name name, max_changes integer, max_record_bytes integer",
    "definition": "CREATE OR REPLACE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer)\n RETURNS SETOF realtime.wal_rls\n LANGUAGE sql\n SET log_min_messages TO 'fatal'\nAS $function$\n      with pub as (\n        select\n          concat_ws(\n            ',',\n            case when bool_or(pubinsert) then 'insert' else null end,\n            case when bool_or(pubupdate) then 'update' else null end,\n            case when bool_or(pubdelete) then 'delete' else null end\n          ) as w2j_actions,\n          coalesce(\n            string_agg(\n              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),\n              ','\n            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),\n            ''\n          ) w2j_add_tables\n        from\n          pg_publication pp\n          left join pg_publication_tables ppt\n            on pp.pubname = ppt.pubname\n        where\n          pp.pubname = publication\n        group by\n          pp.pubname\n        limit 1\n      ),\n      w2j as (\n        select\n          x.*, pub.w2j_add_tables\n        from\n          pub,\n          pg_logical_slot_get_changes(\n            slot_name, null, max_changes,\n            'include-pk', 'true',\n            'include-transaction', 'false',\n            'include-timestamp', 'true',\n            'include-type-oids', 'true',\n            'format-version', '2',\n            'actions', pub.w2j_actions,\n            'add-tables', pub.w2j_add_tables\n          ) x\n      )\n      select\n        xyz.wal,\n        xyz.is_rls_enabled,\n        xyz.subscription_ids,\n        xyz.errors\n      from\n        w2j,\n        realtime.apply_rls(\n          wal := w2j.data::jsonb,\n          max_record_bytes := max_record_bytes\n        ) xyz(wal, is_rls_enabled, subscription_ids, errors)\n      where\n        w2j.w2j_add_tables <> ''\n        and xyz.subscription_ids[1] is not null\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "quote_wal2json",
    "args_signature": "entity regclass",
    "definition": "CREATE OR REPLACE FUNCTION realtime.quote_wal2json(entity regclass)\n RETURNS text\n LANGUAGE sql\n IMMUTABLE STRICT\nAS $function$\n      select\n        (\n          select string_agg('' || ch,'')\n          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)\n          where\n            not (x.idx = 1 and x.ch = '\"')\n            and not (\n              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)\n              and x.ch = '\"'\n            )\n        )\n        || '.'\n        || (\n          select string_agg('' || ch,'')\n          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)\n          where\n            not (x.idx = 1 and x.ch = '\"')\n            and not (\n              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)\n              and x.ch = '\"'\n            )\n          )\n      from\n        pg_class pc\n        join pg_namespace nsp\n          on pc.relnamespace = nsp.oid\n      where\n        pc.oid = entity\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "send",
    "args_signature": "payload jsonb, event text, topic text, private boolean",
    "definition": "CREATE OR REPLACE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  BEGIN\n    -- Set the topic configuration\n    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);\n\n    -- Attempt to insert the message\n    INSERT INTO realtime.messages (payload, event, topic, private, extension)\n    VALUES (payload, event, topic, private, 'broadcast');\n  EXCEPTION\n    WHEN OTHERS THEN\n      -- Capture and notify the error\n      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;\n  END;\nEND;\n$function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "subscription_check_filters",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION realtime.subscription_check_filters()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n    /*\n    Validates that the user defined filters for a subscription:\n    - refer to valid columns that the claimed role may access\n    - values are coercable to the correct column type\n    */\n    declare\n        col_names text[] = coalesce(\n                array_agg(c.column_name order by c.ordinal_position),\n                '{}'::text[]\n            )\n            from\n                information_schema.columns c\n            where\n                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity\n                and pg_catalog.has_column_privilege(\n                    (new.claims ->> 'role'),\n                    format('%I.%I', c.table_schema, c.table_name)::regclass,\n                    c.column_name,\n                    'SELECT'\n                );\n        filter realtime.user_defined_filter;\n        col_type regtype;\n\n        in_val jsonb;\n    begin\n        for filter in select * from unnest(new.filters) loop\n            -- Filtered column is valid\n            if not filter.column_name = any(col_names) then\n                raise exception 'invalid column for filter %', filter.column_name;\n            end if;\n\n            -- Type is sanitized and safe for string interpolation\n            col_type = (\n                select atttypid::regtype\n                from pg_catalog.pg_attribute\n                where attrelid = new.entity\n                      and attname = filter.column_name\n            );\n            if col_type is null then\n                raise exception 'failed to lookup type for column %', filter.column_name;\n            end if;\n\n            -- Set maximum number of entries for in filter\n            if filter.op = 'in'::realtime.equality_op then\n                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);\n                if coalesce(jsonb_array_length(in_val), 0) > 100 then\n                    raise exception 'too many values for `in` filter. Maximum 100';\n                end if;\n            else\n                -- raises an exception if value is not coercable to type\n                perform realtime.cast(filter.value, col_type);\n            end if;\n\n        end loop;\n\n        -- Apply consistent order to filters so the unique constraint on\n        -- (subscription_id, entity, filters) can't be tricked by a different filter order\n        new.filters = coalesce(\n            array_agg(f order by f.column_name, f.op, f.value),\n            '{}'\n        ) from unnest(new.filters) f;\n\n        return new;\n    end;\n    $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "to_regrole",
    "args_signature": "role_name text",
    "definition": "CREATE OR REPLACE FUNCTION realtime.to_regrole(role_name text)\n RETURNS regrole\n LANGUAGE sql\n IMMUTABLE\nAS $function$ select role_name::regrole $function$\n"
  },
  {
    "schema_name": "realtime",
    "function_name": "topic",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION realtime.topic()\n RETURNS text\n LANGUAGE sql\n STABLE\nAS $function$\nselect nullif(current_setting('realtime.topic', true), '')::text;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "add_prefixes",
    "args_signature": "_bucket_id text, _name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.add_prefixes(_bucket_id text, _name text)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    prefixes text[];\nBEGIN\n    prefixes := \"storage\".\"get_prefixes\"(\"_name\");\n\n    IF array_length(prefixes, 1) > 0 THEN\n        INSERT INTO storage.prefixes (name, bucket_id)\n        SELECT UNNEST(prefixes) as name, \"_bucket_id\" ON CONFLICT DO NOTHING;\n    END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "can_insert_object",
    "args_signature": "bucketid text, name text, owner uuid, metadata jsonb",
    "definition": "CREATE OR REPLACE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  INSERT INTO \"storage\".\"objects\" (\"bucket_id\", \"name\", \"owner\", \"metadata\") VALUES (bucketid, name, owner, metadata);\n  -- hack to rollback the successful insert\n  RAISE sqlstate 'PT200' using\n  message = 'ROLLBACK',\n  detail = 'rollback successful insert';\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "delete_leaf_prefixes",
    "args_signature": "bucket_ids text[], names text[]",
    "definition": "CREATE OR REPLACE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[])\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_rows_deleted integer;\nBEGIN\n    LOOP\n        WITH candidates AS (\n            SELECT DISTINCT\n                t.bucket_id,\n                unnest(storage.get_prefixes(t.name)) AS name\n            FROM unnest(bucket_ids, names) AS t(bucket_id, name)\n        ),\n        uniq AS (\n             SELECT\n                 bucket_id,\n                 name,\n                 storage.get_level(name) AS level\n             FROM candidates\n             WHERE name <> ''\n             GROUP BY bucket_id, name\n        ),\n        leaf AS (\n             SELECT\n                 p.bucket_id,\n                 p.name,\n                 p.level\n             FROM storage.prefixes AS p\n                  JOIN uniq AS u\n                       ON u.bucket_id = p.bucket_id\n                           AND u.name = p.name\n                           AND u.level = p.level\n             WHERE NOT EXISTS (\n                 SELECT 1\n                 FROM storage.objects AS o\n                 WHERE o.bucket_id = p.bucket_id\n                   AND o.level = p.level + 1\n                   AND o.name COLLATE \"C\" LIKE p.name || '/%'\n             )\n             AND NOT EXISTS (\n                 SELECT 1\n                 FROM storage.prefixes AS c\n                 WHERE c.bucket_id = p.bucket_id\n                   AND c.level = p.level + 1\n                   AND c.name COLLATE \"C\" LIKE p.name || '/%'\n             )\n        )\n        DELETE\n        FROM storage.prefixes AS p\n            USING leaf AS l\n        WHERE p.bucket_id = l.bucket_id\n          AND p.name = l.name\n          AND p.level = l.level;\n\n        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;\n        EXIT WHEN v_rows_deleted = 0;\n    END LOOP;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "delete_prefix",
    "args_signature": "_bucket_id text, _name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.delete_prefix(_bucket_id text, _name text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n    -- Check if we can delete the prefix\n    IF EXISTS(\n        SELECT FROM \"storage\".\"prefixes\"\n        WHERE \"prefixes\".\"bucket_id\" = \"_bucket_id\"\n          AND level = \"storage\".\"get_level\"(\"_name\") + 1\n          AND \"prefixes\".\"name\" COLLATE \"C\" LIKE \"_name\" || '/%'\n        LIMIT 1\n    )\n    OR EXISTS(\n        SELECT FROM \"storage\".\"objects\"\n        WHERE \"objects\".\"bucket_id\" = \"_bucket_id\"\n          AND \"storage\".\"get_level\"(\"objects\".\"name\") = \"storage\".\"get_level\"(\"_name\") + 1\n          AND \"objects\".\"name\" COLLATE \"C\" LIKE \"_name\" || '/%'\n        LIMIT 1\n    ) THEN\n    -- There are sub-objects, skip deletion\n    RETURN false;\n    ELSE\n        DELETE FROM \"storage\".\"prefixes\"\n        WHERE \"prefixes\".\"bucket_id\" = \"_bucket_id\"\n          AND level = \"storage\".\"get_level\"(\"_name\")\n          AND \"prefixes\".\"name\" = \"_name\";\n        RETURN true;\n    END IF;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "delete_prefix_hierarchy_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.delete_prefix_hierarchy_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    prefix text;\nBEGIN\n    prefix := \"storage\".\"get_prefix\"(OLD.\"name\");\n\n    IF coalesce(prefix, '') != '' THEN\n        PERFORM \"storage\".\"delete_prefix\"(OLD.\"bucket_id\", prefix);\n    END IF;\n\n    RETURN OLD;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "enforce_bucket_name_length",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.enforce_bucket_name_length()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nbegin\n    if length(new.name) > 100 then\n        raise exception 'bucket name \"%\" is too long (% characters). Max is 100.', new.name, length(new.name);\n    end if;\n    return new;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "extension",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.extension(name text)\n RETURNS text\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\nDECLARE\n    _parts text[];\n    _filename text;\nBEGIN\n    SELECT string_to_array(name, '/') INTO _parts;\n    SELECT _parts[array_length(_parts,1)] INTO _filename;\n    RETURN reverse(split_part(reverse(_filename), '.', 1));\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "filename",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.filename(name text)\n RETURNS text\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n_parts text[];\nBEGIN\n\tselect string_to_array(name, '/') into _parts;\n\treturn _parts[array_length(_parts,1)];\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "foldername",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.foldername(name text)\n RETURNS text[]\n LANGUAGE plpgsql\n IMMUTABLE\nAS $function$\nDECLARE\n    _parts text[];\nBEGIN\n    -- Split on \"/\" to get path segments\n    SELECT string_to_array(name, '/') INTO _parts;\n    -- Return everything except the last segment\n    RETURN _parts[1 : array_length(_parts,1) - 1];\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_level",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_level(name text)\n RETURNS integer\n LANGUAGE sql\n IMMUTABLE STRICT\nAS $function$\nSELECT array_length(string_to_array(\"name\", '/'), 1);\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_prefix",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_prefix(name text)\n RETURNS text\n LANGUAGE sql\n IMMUTABLE STRICT\nAS $function$\nSELECT\n    CASE WHEN strpos(\"name\", '/') > 0 THEN\n             regexp_replace(\"name\", '[\\/]{1}[^\\/]+\\/?$', '')\n         ELSE\n             ''\n        END;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_prefixes",
    "args_signature": "name text",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_prefixes(name text)\n RETURNS text[]\n LANGUAGE plpgsql\n IMMUTABLE STRICT\nAS $function$\nDECLARE\n    parts text[];\n    prefixes text[];\n    prefix text;\nBEGIN\n    -- Split the name into parts by '/'\n    parts := string_to_array(\"name\", '/');\n    prefixes := '{}';\n\n    -- Construct the prefixes, stopping one level below the last part\n    FOR i IN 1..array_length(parts, 1) - 1 LOOP\n            prefix := array_to_string(parts[1:i], '/');\n            prefixes := array_append(prefixes, prefix);\n    END LOOP;\n\n    RETURN prefixes;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "get_size_by_bucket",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.get_size_by_bucket()\n RETURNS TABLE(size bigint, bucket_id text)\n LANGUAGE plpgsql\n STABLE\nAS $function$\nBEGIN\n    return query\n        select sum((metadata->>'size')::bigint) as size, obj.bucket_id\n        from \"storage\".objects as obj\n        group by obj.bucket_id;\nEND\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "list_multipart_uploads_with_delimiter",
    "args_signature": "bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text",
    "definition": "CREATE OR REPLACE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text)\n RETURNS TABLE(key text, id text, created_at timestamp with time zone)\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    RETURN QUERY EXECUTE\n        'SELECT DISTINCT ON(key COLLATE \"C\") * from (\n            SELECT\n                CASE\n                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN\n                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))\n                    ELSE\n                        key\n                END AS key, id, created_at\n            FROM\n                storage.s3_multipart_uploads\n            WHERE\n                bucket_id = $5 AND\n                key ILIKE $1 || ''%'' AND\n                CASE\n                    WHEN $4 != '''' AND $6 = '''' THEN\n                        CASE\n                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN\n                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE \"C\" > $4\n                            ELSE\n                                key COLLATE \"C\" > $4\n                            END\n                    ELSE\n                        true\n                END AND\n                CASE\n                    WHEN $6 != '''' THEN\n                        id COLLATE \"C\" > $6\n                    ELSE\n                        true\n                    END\n            ORDER BY\n                key COLLATE \"C\" ASC, created_at ASC) as e order by key COLLATE \"C\" LIMIT $3'\n        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "list_objects_with_delimiter",
    "args_signature": "bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text",
    "definition": "CREATE OR REPLACE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text)\n RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    RETURN QUERY EXECUTE\n        'SELECT DISTINCT ON(name COLLATE \"C\") * from (\n            SELECT\n                CASE\n                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN\n                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))\n                    ELSE\n                        name\n                END AS name, id, metadata, updated_at\n            FROM\n                storage.objects\n            WHERE\n                bucket_id = $5 AND\n                name ILIKE $1 || ''%'' AND\n                CASE\n                    WHEN $6 != '''' THEN\n                    name COLLATE \"C\" > $6\n                ELSE true END\n                AND CASE\n                    WHEN $4 != '''' THEN\n                        CASE\n                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN\n                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE \"C\" > $4\n                            ELSE\n                                name COLLATE \"C\" > $4\n                            END\n                    ELSE\n                        true\n                END\n            ORDER BY\n                name COLLATE \"C\" ASC) as e order by name COLLATE \"C\" LIMIT $3'\n        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "lock_top_prefixes",
    "args_signature": "bucket_ids text[], names text[]",
    "definition": "CREATE OR REPLACE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[])\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_bucket text;\n    v_top text;\nBEGIN\n    FOR v_bucket, v_top IN\n        SELECT DISTINCT t.bucket_id,\n            split_part(t.name, '/', 1) AS top\n        FROM unnest(bucket_ids, names) AS t(bucket_id, name)\n        WHERE t.name <> ''\n        ORDER BY 1, 2\n        LOOP\n            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));\n        END LOOP;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_delete_cleanup",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_delete_cleanup()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_bucket_ids text[];\n    v_names      text[];\nBEGIN\n    IF current_setting('storage.gc.prefixes', true) = '1' THEN\n        RETURN NULL;\n    END IF;\n\n    PERFORM set_config('storage.gc.prefixes', '1', true);\n\n    SELECT COALESCE(array_agg(d.bucket_id), '{}'),\n           COALESCE(array_agg(d.name), '{}')\n    INTO v_bucket_ids, v_names\n    FROM deleted AS d\n    WHERE d.name <> '';\n\n    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);\n    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);\n\n    RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_insert_prefix_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_insert_prefix_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    PERFORM \"storage\".\"add_prefixes\"(NEW.\"bucket_id\", NEW.\"name\");\n    NEW.level := \"storage\".\"get_level\"(NEW.\"name\");\n\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_cleanup",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_update_cleanup()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    -- NEW - OLD (destinations to create prefixes for)\n    v_add_bucket_ids text[];\n    v_add_names      text[];\n\n    -- OLD - NEW (sources to prune)\n    v_src_bucket_ids text[];\n    v_src_names      text[];\nBEGIN\n    IF TG_OP <> 'UPDATE' THEN\n        RETURN NULL;\n    END IF;\n\n    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)\n    WITH added AS (\n        SELECT n.bucket_id, n.name\n        FROM new_rows n\n        WHERE n.name <> '' AND position('/' in n.name) > 0\n        EXCEPT\n        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''\n    ),\n    moved AS (\n         SELECT o.bucket_id, o.name\n         FROM old_rows o\n         WHERE o.name <> ''\n         EXCEPT\n         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''\n    )\n    SELECT\n        -- arrays for ADDED (dest) in stable order\n        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),\n        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),\n        -- arrays for MOVED (src) in stable order\n        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),\n        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )\n    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;\n\n    -- Nothing to do?\n    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN\n        RETURN NULL;\n    END IF;\n\n    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks\n    DECLARE\n        v_all_bucket_ids text[];\n        v_all_names text[];\n    BEGIN\n        -- Combine source and destination arrays for consistent lock ordering\n        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');\n        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');\n\n        -- Single lock call ensures consistent global ordering across all transactions\n        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN\n            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);\n        END IF;\n    END;\n\n    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources\n    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN\n        WITH candidates AS (\n            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name\n            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)\n            WHERE name <> ''\n        )\n        INSERT INTO storage.prefixes (bucket_id, name)\n        SELECT c.bucket_id, c.name\n        FROM candidates c\n        ON CONFLICT DO NOTHING;\n    END IF;\n\n    -- 4) Prune source prefixes bottom-up for OLD−NEW\n    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN\n        -- re-entrancy guard so DELETE on prefixes won't recurse\n        IF current_setting('storage.gc.prefixes', true) <> '1' THEN\n            PERFORM set_config('storage.gc.prefixes', '1', true);\n        END IF;\n\n        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);\n    END IF;\n\n    RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_level_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_update_level_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    -- Ensure this is an update operation and the name has changed\n    IF TG_OP = 'UPDATE' AND (NEW.\"name\" <> OLD.\"name\" OR NEW.\"bucket_id\" <> OLD.\"bucket_id\") THEN\n        -- Set the new level\n        NEW.\"level\" := \"storage\".\"get_level\"(NEW.\"name\");\n    END IF;\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "objects_update_prefix_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.objects_update_prefix_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n    old_prefixes TEXT[];\nBEGIN\n    -- Ensure this is an update operation and the name has changed\n    IF TG_OP = 'UPDATE' AND (NEW.\"name\" <> OLD.\"name\" OR NEW.\"bucket_id\" <> OLD.\"bucket_id\") THEN\n        -- Retrieve old prefixes\n        old_prefixes := \"storage\".\"get_prefixes\"(OLD.\"name\");\n\n        -- Remove old prefixes that are only used by this object\n        WITH all_prefixes as (\n            SELECT unnest(old_prefixes) as prefix\n        ),\n        can_delete_prefixes as (\n             SELECT prefix\n             FROM all_prefixes\n             WHERE NOT EXISTS (\n                 SELECT 1 FROM \"storage\".\"objects\"\n                 WHERE \"bucket_id\" = OLD.\"bucket_id\"\n                   AND \"name\" <> OLD.\"name\"\n                   AND \"name\" LIKE (prefix || '%')\n             )\n         )\n        DELETE FROM \"storage\".\"prefixes\" WHERE name IN (SELECT prefix FROM can_delete_prefixes);\n\n        -- Add new prefixes\n        PERFORM \"storage\".\"add_prefixes\"(NEW.\"bucket_id\", NEW.\"name\");\n    END IF;\n    -- Set the new level\n    NEW.\"level\" := \"storage\".\"get_level\"(NEW.\"name\");\n\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "operation",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.operation()\n RETURNS text\n LANGUAGE plpgsql\n STABLE\nAS $function$\nBEGIN\n    RETURN current_setting('storage.operation', true);\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "prefixes_delete_cleanup",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.prefixes_delete_cleanup()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_bucket_ids text[];\n    v_names      text[];\nBEGIN\n    IF current_setting('storage.gc.prefixes', true) = '1' THEN\n        RETURN NULL;\n    END IF;\n\n    PERFORM set_config('storage.gc.prefixes', '1', true);\n\n    SELECT COALESCE(array_agg(d.bucket_id), '{}'),\n           COALESCE(array_agg(d.name), '{}')\n    INTO v_bucket_ids, v_names\n    FROM deleted AS d\n    WHERE d.name <> '';\n\n    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);\n    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);\n\n    RETURN NULL;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "prefixes_insert_trigger",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.prefixes_insert_trigger()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    PERFORM \"storage\".\"add_prefixes\"(NEW.\"bucket_id\", NEW.\"name\");\n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text)\n RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\nAS $function$\ndeclare\n    can_bypass_rls BOOLEAN;\nbegin\n    SELECT rolbypassrls\n    INTO can_bypass_rls\n    FROM pg_roles\n    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);\n\n    IF can_bypass_rls THEN\n        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);\n    ELSE\n        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);\n    END IF;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search_legacy_v1",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text)\n RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\n STABLE\nAS $function$\ndeclare\n    v_order_by text;\n    v_sort_order text;\nbegin\n    case\n        when sortcolumn = 'name' then\n            v_order_by = 'name';\n        when sortcolumn = 'updated_at' then\n            v_order_by = 'updated_at';\n        when sortcolumn = 'created_at' then\n            v_order_by = 'created_at';\n        when sortcolumn = 'last_accessed_at' then\n            v_order_by = 'last_accessed_at';\n        else\n            v_order_by = 'name';\n        end case;\n\n    case\n        when sortorder = 'asc' then\n            v_sort_order = 'asc';\n        when sortorder = 'desc' then\n            v_sort_order = 'desc';\n        else\n            v_sort_order = 'asc';\n        end case;\n\n    v_order_by = v_order_by || ' ' || v_sort_order;\n\n    return query execute\n        'with folders as (\n           select path_tokens[$1] as folder\n           from storage.objects\n             where objects.name ilike $2 || $3 || ''%''\n               and bucket_id = $4\n               and array_length(objects.path_tokens, 1) <> $1\n           group by folder\n           order by folder ' || v_sort_order || '\n     )\n     (select folder as \"name\",\n            null as id,\n            null as updated_at,\n            null as created_at,\n            null as last_accessed_at,\n            null as metadata from folders)\n     union all\n     (select path_tokens[$1] as \"name\",\n            id,\n            updated_at,\n            created_at,\n            last_accessed_at,\n            metadata\n     from storage.objects\n     where objects.name ilike $2 || $3 || ''%''\n       and bucket_id = $4\n       and array_length(objects.path_tokens, 1) = $1\n     order by ' || v_order_by || ')\n     limit $5\n     offset $6' using levels, prefix, search, bucketname, limits, offsets;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search_v1_optimised",
    "args_signature": "prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text)\n RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\n STABLE\nAS $function$\ndeclare\n    v_order_by text;\n    v_sort_order text;\nbegin\n    case\n        when sortcolumn = 'name' then\n            v_order_by = 'name';\n        when sortcolumn = 'updated_at' then\n            v_order_by = 'updated_at';\n        when sortcolumn = 'created_at' then\n            v_order_by = 'created_at';\n        when sortcolumn = 'last_accessed_at' then\n            v_order_by = 'last_accessed_at';\n        else\n            v_order_by = 'name';\n        end case;\n\n    case\n        when sortorder = 'asc' then\n            v_sort_order = 'asc';\n        when sortorder = 'desc' then\n            v_sort_order = 'desc';\n        else\n            v_sort_order = 'asc';\n        end case;\n\n    v_order_by = v_order_by || ' ' || v_sort_order;\n\n    return query execute\n        'with folders as (\n           select (string_to_array(name, ''/''))[level] as name\n           from storage.prefixes\n             where lower(prefixes.name) like lower($2 || $3) || ''%''\n               and bucket_id = $4\n               and level = $1\n           order by name ' || v_sort_order || '\n     )\n     (select name,\n            null as id,\n            null as updated_at,\n            null as created_at,\n            null as last_accessed_at,\n            null as metadata from folders)\n     union all\n     (select path_tokens[level] as \"name\",\n            id,\n            updated_at,\n            created_at,\n            last_accessed_at,\n            metadata\n     from storage.objects\n     where lower(objects.name) like lower($2 || $3) || ''%''\n       and bucket_id = $4\n       and level = $1\n     order by ' || v_order_by || ')\n     limit $5\n     offset $6' using levels, prefix, search, bucketname, limits, offsets;\nend;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "search_v2",
    "args_signature": "prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text",
    "definition": "CREATE OR REPLACE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text)\n RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)\n LANGUAGE plpgsql\n STABLE\nAS $function$\nDECLARE\n    sort_col text;\n    sort_ord text;\n    cursor_op text;\n    cursor_expr text;\n    sort_expr text;\nBEGIN\n    -- Validate sort_order\n    sort_ord := lower(sort_order);\n    IF sort_ord NOT IN ('asc', 'desc') THEN\n        sort_ord := 'asc';\n    END IF;\n\n    -- Determine cursor comparison operator\n    IF sort_ord = 'asc' THEN\n        cursor_op := '>';\n    ELSE\n        cursor_op := '<';\n    END IF;\n    \n    sort_col := lower(sort_column);\n    -- Validate sort column  \n    IF sort_col IN ('updated_at', 'created_at') THEN\n        cursor_expr := format(\n            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE \"C\") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',\n            sort_col, cursor_op\n        );\n        sort_expr := format(\n            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE \"C\" %s',\n            sort_col, sort_ord, sort_ord\n        );\n    ELSE\n        cursor_expr := format('($5 = '''' OR name COLLATE \"C\" %s $5)', cursor_op);\n        sort_expr := format('name COLLATE \"C\" %s', sort_ord);\n    END IF;\n\n    RETURN QUERY EXECUTE format(\n        $sql$\n        SELECT * FROM (\n            (\n                SELECT\n                    split_part(name, '/', $4) AS key,\n                    name,\n                    NULL::uuid AS id,\n                    updated_at,\n                    created_at,\n                    NULL::timestamptz AS last_accessed_at,\n                    NULL::jsonb AS metadata\n                FROM storage.prefixes\n                WHERE name COLLATE \"C\" LIKE $1 || '%%'\n                    AND bucket_id = $2\n                    AND level = $4\n                    AND %s\n                ORDER BY %s\n                LIMIT $3\n            )\n            UNION ALL\n            (\n                SELECT\n                    split_part(name, '/', $4) AS key,\n                    name,\n                    id,\n                    updated_at,\n                    created_at,\n                    last_accessed_at,\n                    metadata\n                FROM storage.objects\n                WHERE name COLLATE \"C\" LIKE $1 || '%%'\n                    AND bucket_id = $2\n                    AND level = $4\n                    AND %s\n                ORDER BY %s\n                LIMIT $3\n            )\n        ) obj\n        ORDER BY %s\n        LIMIT $3\n        $sql$,\n        cursor_expr,    -- prefixes WHERE\n        sort_expr,      -- prefixes ORDER BY\n        cursor_expr,    -- objects WHERE\n        sort_expr,      -- objects ORDER BY\n        sort_expr       -- final ORDER BY\n    )\n    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;\nEND;\n$function$\n"
  },
  {
    "schema_name": "storage",
    "function_name": "update_updated_at_column",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION storage.update_updated_at_column()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n    NEW.updated_at = now();\n    RETURN NEW; \nEND;\n$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_decrypt",
    "args_signature": "message bytea, additional bytea, key_id bigint, context bytea, nonce bytea",
    "definition": "CREATE OR REPLACE FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea DEFAULT '\\x7067736f6469756d'::bytea, nonce bytea DEFAULT NULL::bytea)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE\nAS '$libdir/supabase_vault', $function$pgsodium_crypto_aead_det_decrypt_by_id$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_encrypt",
    "args_signature": "message bytea, additional bytea, key_id bigint, context bytea, nonce bytea",
    "definition": "CREATE OR REPLACE FUNCTION vault._crypto_aead_det_encrypt(message bytea, additional bytea, key_id bigint, context bytea DEFAULT '\\x7067736f6469756d'::bytea, nonce bytea DEFAULT NULL::bytea)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE\nAS '$libdir/supabase_vault', $function$pgsodium_crypto_aead_det_encrypt_by_id$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "_crypto_aead_det_noncegen",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION vault._crypto_aead_det_noncegen()\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE\nAS '$libdir/supabase_vault', $function$pgsodium_crypto_aead_det_noncegen$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "create_secret",
    "args_signature": "new_secret text, new_name text, new_description text, new_key_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION vault.create_secret(new_secret text, new_name text DEFAULT NULL::text, new_description text DEFAULT ''::text, new_key_id uuid DEFAULT NULL::uuid)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO ''\nAS $function$\nDECLARE\n  rec record;\nBEGIN\n  INSERT INTO vault.secrets (secret, name, description)\n  VALUES (\n    new_secret,\n    new_name,\n    new_description\n  )\n  RETURNING * INTO rec;\n  UPDATE vault.secrets s\n  SET secret = encode(vault._crypto_aead_det_encrypt(\n    message := convert_to(rec.secret, 'utf8'),\n    additional := convert_to(s.id::text, 'utf8'),\n    key_id := 0,\n    context := 'pgsodium'::bytea,\n    nonce := rec.nonce\n  ), 'base64')\n  WHERE id = rec.id;\n  RETURN rec.id;\nEND\n$function$\n"
  },
  {
    "schema_name": "vault",
    "function_name": "update_secret",
    "args_signature": "secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION vault.update_secret(secret_id uuid, new_secret text DEFAULT NULL::text, new_name text DEFAULT NULL::text, new_description text DEFAULT NULL::text, new_key_id uuid DEFAULT NULL::uuid)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO ''\nAS $function$\nDECLARE\n  decrypted_secret text := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE id = secret_id);\nBEGIN\n  UPDATE vault.secrets s\n  SET\n    secret = CASE WHEN new_secret IS NULL THEN s.secret\n                  ELSE encode(vault._crypto_aead_det_encrypt(\n                    message := convert_to(new_secret, 'utf8'),\n                    additional := convert_to(s.id::text, 'utf8'),\n                    key_id := 0,\n                    context := 'pgsodium'::bytea,\n                    nonce := s.nonce\n                  ), 'base64') END,\n    name = coalesce(new_name, s.name),\n    description = coalesce(new_description, s.description),\n    updated_at = now()\n  WHERE s.id = secret_id;\nEND\n$function$\n"
  }
]