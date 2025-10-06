[
  {
    "schema_name": "extensions",
    "view_name": "pg_stat_statements",
    "view_definition": " SELECT userid,\n    dbid,\n    toplevel,\n    queryid,\n    query,\n    plans,\n    total_plan_time,\n    min_plan_time,\n    max_plan_time,\n    mean_plan_time,\n    stddev_plan_time,\n    calls,\n    total_exec_time,\n    min_exec_time,\n    max_exec_time,\n    mean_exec_time,\n    stddev_exec_time,\n    rows,\n    shared_blks_hit,\n    shared_blks_read,\n    shared_blks_dirtied,\n    shared_blks_written,\n    local_blks_hit,\n    local_blks_read,\n    local_blks_dirtied,\n    local_blks_written,\n    temp_blks_read,\n    temp_blks_written,\n    shared_blk_read_time,\n    shared_blk_write_time,\n    local_blk_read_time,\n    local_blk_write_time,\n    temp_blk_read_time,\n    temp_blk_write_time,\n    wal_records,\n    wal_fpi,\n    wal_bytes,\n    jit_functions,\n    jit_generation_time,\n    jit_inlining_count,\n    jit_inlining_time,\n    jit_optimization_count,\n    jit_optimization_time,\n    jit_emission_count,\n    jit_emission_time,\n    jit_deform_count,\n    jit_deform_time,\n    stats_since,\n    minmax_stats_since\n   FROM pg_stat_statements(true) pg_stat_statements(userid, dbid, toplevel, queryid, query, plans, total_plan_time, min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time, calls, total_exec_time, min_exec_time, max_exec_time, mean_exec_time, stddev_exec_time, rows, shared_blks_hit, shared_blks_read, shared_blks_dirtied, shared_blks_written, local_blks_hit, local_blks_read, local_blks_dirtied, local_blks_written, temp_blks_read, temp_blks_written, shared_blk_read_time, shared_blk_write_time, local_blk_read_time, local_blk_write_time, temp_blk_read_time, temp_blk_write_time, wal_records, wal_fpi, wal_bytes, jit_functions, jit_generation_time, jit_inlining_count, jit_inlining_time, jit_optimization_count, jit_optimization_time, jit_emission_count, jit_emission_time, jit_deform_count, jit_deform_time, stats_since, minmax_stats_since);"
  },
  {
    "schema_name": "extensions",
    "view_name": "pg_stat_statements_info",
    "view_definition": " SELECT dealloc,\n    stats_reset\n   FROM pg_stat_statements_info() pg_stat_statements_info(dealloc, stats_reset);"
  },
  {
    "schema_name": "vault",
    "view_name": "decrypted_secrets",
    "view_definition": " SELECT id,\n    name,\n    description,\n    secret,\n    convert_from(vault._crypto_aead_det_decrypt(message => decode(secret, 'base64'::text), additional => convert_to(id::text, 'utf8'::name), key_id => 0::bigint, context => '\\x7067736f6469756d'::bytea, nonce => nonce), 'utf8'::name) AS decrypted_secret,\n    key_id,\n    nonce,\n    created_at,\n    updated_at\n   FROM vault.secrets s;"
  }
]