# 🔍 Comprehensive Debug System Guide

**Status:** ✅ Ready to Deploy  
**HIPAA Compliance:** ✅ NO PHI is ever logged

---

## 🚀 **Quick Start**

### 1. **Deploy the System**
```bash
# Run in Supabase SQL Editor:
# Copy and paste COMPREHENSIVE_DEBUG_SYSTEM.sql
```

### 2. **Try Signup Again**
The enhanced `initialize_new_user` function now logs every step!

### 3. **View Errors**
```sql
-- See recent errors (last 20)
SELECT * FROM public.get_recent_errors(20);

-- See all errors for a specific user
SELECT * FROM public.system_logs 
WHERE user_id = 'YOUR-UUID-HERE'::uuid 
ORDER BY created_at DESC;

-- See function execution details
SELECT * FROM public.function_execution_logs 
WHERE function_name = 'initialize_new_user'
ORDER BY started_at DESC
LIMIT 10;
```

---

## 📊 **What Was Created**

### **4 Log Tables:**

| Table | Purpose | What's Logged |
|-------|---------|---------------|
| `system_logs` | General events | Errors, warnings, info events |
| `function_execution_logs` | Function tracing | Start/end, duration, errors |
| `api_request_logs` | API calls | Endpoints, status codes, timing |
| `database_operation_logs` | DB operations | DDL/DML changes |

### **Helper Functions:**

| Function | Usage |
|----------|-------|
| `log_system_event()` | Log custom events |
| `start_function_execution()` | Track function start |
| `complete_function_execution()` | Track function end |
| `get_recent_errors()` | View recent errors |
| `get_function_stats()` | Performance statistics |
| `cleanup_old_logs()` | Purge old data |

---

## 🔧 **Enhanced `initialize_new_user`**

### **What Changed:**
- ✅ Logs every step of execution
- ✅ Tracks where failures occur
- ✅ Records timing and performance
- ✅ Captures error details without PHI
- ✅ Returns detailed error messages

### **Logged Steps:**
1. `validate_user_type` - User type validation
2. `check_auth_user` - Auth user existence
3. `check_existing_profile` - Duplicate check
4. `create_profile` - Profile creation
5. `initialize_points` - Points setup
6. `create_type_specific_profile` - Role profile
7. `create_sharing_preferences` - Privacy settings

---

## 🧪 **Finding the Signup Error**

### **Step 1: Try Signup**
```
1. Go to your app
2. Try to sign up
3. Note the exact time it failed
```

### **Step 2: Query Logs**
```sql
-- View errors from last 5 minutes
SELECT 
    created_at,
    event_type,
    message,
    function_name,
    context_data
FROM public.system_logs
WHERE created_at > NOW() - INTERVAL '5 minutes'
AND log_level IN ('ERROR', 'CRITICAL')
ORDER BY created_at DESC;
```

### **Step 3: Get Function Execution Details**
```sql
-- See the failed execution
SELECT 
    function_name,
    execution_status,
    started_at,
    duration_ms,
    error_message,
    error_detail
FROM public.function_execution_logs
WHERE function_name = 'initialize_new_user'
AND execution_status = 'failed'
ORDER BY started_at DESC
LIMIT 5;
```

### **Step 4: Check Specific Step**
```sql
-- Find which step failed
SELECT 
    created_at,
    event_type,
    message,
    context_data->>'step' as failed_step,
    context_data->>'error' as error_detail
FROM public.system_logs
WHERE function_name = 'initialize_new_user'
AND log_level = 'ERROR'
AND created_at > NOW() - INTERVAL '10 minutes'
ORDER BY created_at DESC;
```

---

## 📖 **Usage Examples**

### **Log Custom Event:**
```sql
SELECT public.log_system_event(
    'INFO',                           -- level
    'auth',                           -- category
    'password_reset_requested',       -- event_type
    'User requested password reset',  -- message
    'a0000000-0000-0000-0000-000000000000'::uuid,  -- user_id
    NULL,                             -- function_name
    NULL,                             -- error_code
    jsonb_build_object('method', 'email')  -- context
);
```

### **Track Function Performance:**
```sql
-- See slowest functions
SELECT * FROM public.get_function_stats()
ORDER BY avg_duration_ms DESC;

-- See specific function stats
SELECT * FROM public.get_function_stats('initialize_new_user');
```

### **View Error Patterns:**
```sql
-- Group errors by type
SELECT 
    event_type,
    COUNT(*) as occurrences,
    MAX(created_at) as last_occurrence
FROM public.system_logs
WHERE log_level = 'ERROR'
AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY event_type
ORDER BY occurrences DESC;
```

### **Monitor Signup Success Rate:**
```sql
SELECT 
    DATE_TRUNC('hour', started_at) as hour,
    COUNT(*) as total_attempts,
    SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,
    SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed,
    ROUND(100.0 * SUM(CASE WHEN success THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate
FROM public.function_execution_logs
WHERE function_name = 'initialize_new_user'
AND started_at > NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', started_at)
ORDER BY hour DESC;
```

---

## 🧹 **Maintenance**

### **Clean Up Old Logs:**
```sql
-- Remove logs older than 30 days (default)
SELECT * FROM public.cleanup_old_logs(30);

-- Remove logs older than 7 days
SELECT * FROM public.cleanup_old_logs(7);
```

### **Check Log Table Sizes:**
```sql
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    n_live_tup as row_count
FROM pg_stat_user_tables
WHERE tablename IN ('system_logs', 'function_execution_logs', 'api_request_logs', 'database_operation_logs')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### **Set Up Automated Cleanup (Supabase Cron):**
```sql
-- Create a cron job to clean logs weekly
-- (Run this in Supabase SQL Editor if you have pg_cron enabled)
SELECT cron.schedule(
    'cleanup-old-logs',
    '0 2 * * 0',  -- Every Sunday at 2 AM
    $$SELECT public.cleanup_old_logs(30)$$
);
```

---

## 🔒 **Security & Privacy**

### **What's NEVER Logged:**
- ❌ Email addresses (only UUIDs)
- ❌ Names (first, middle, last)
- ❌ Phone numbers
- ❌ Passwords
- ❌ Health data (PHI)
- ❌ Personal identifiers
- ❌ Location data
- ❌ Any sensitive information

### **What IS Logged:**
- ✅ User UUIDs (references only)
- ✅ Function names
- ✅ Error codes
- ✅ Stack traces
- ✅ Timing information
- ✅ Status codes
- ✅ Technical context only

### **Access Control:**
- 🔒 Only `service_role` can read logs
- 🔒 System functions can write logs
- 🔒 Users cannot access any logs
- 🔒 RLS policies enforced

---

## 🎯 **Next Steps**

### **Immediate:**
1. ✅ Deploy `COMPREHENSIVE_DEBUG_SYSTEM.sql`
2. 🔄 Try signup again
3. 🔍 Run `SELECT * FROM public.get_recent_errors(20);`
4. 📋 Share the error output

### **Future Enhancements:**
- [ ] Add Slack/email alerts for critical errors
- [ ] Create admin dashboard for log viewing
- [ ] Add performance monitoring (APM)
- [ ] Integrate with external logging service
- [ ] Add anomaly detection
- [ ] Create automated reports

---

## 🐛 **Troubleshooting the System Itself**

If logging fails:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_name LIKE '%_logs';

-- Check if functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name LIKE 'log_%' OR routine_name LIKE '%_function_execution';

-- Check permissions
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'system_logs';
```

---

## 📞 **Getting Help**

After deploying, run this to see the signup error:

```sql
-- THE MAGIC QUERY 🪄
SELECT 
    sl.created_at,
    sl.event_type,
    sl.message,
    sl.context_data->>'step' as step,
    sl.context_data->>'error' as error,
    sl.error_code,
    fel.error_message,
    fel.error_detail
FROM public.system_logs sl
LEFT JOIN public.function_execution_logs fel 
    ON fel.input_user_id = sl.user_id 
    AND fel.function_name = 'initialize_new_user'
WHERE sl.function_name = 'initialize_new_user'
AND sl.log_level IN ('ERROR', 'CRITICAL')
ORDER BY sl.created_at DESC
LIMIT 10;
```

Share this output and we'll know exactly what's wrong! 🎯
