-- Messaging and Alerts RPCs for Clinician Dashboard
-- SECURITY INVOKER so RLS is enforced.

-- 1) Conversation list for a clinician (aggregated by thread)
DROP FUNCTION IF EXISTS public.get_clinician_message_conversations(uuid);
CREATE FUNCTION public.get_clinician_message_conversations(p_clinician_id uuid)
RETURNS TABLE (
  conversation_id uuid,
  patient_id uuid,
  patient_name text,
  patient_avatar text,
  clinician_id uuid,
  subject text,
  status text,
  priority text,
  last_message text,
  last_message_at timestamptz,
  unread_count_clinician int,
  unread_count_patient int,
  ai_priority_score numeric,
  ai_summary text,
  ai_urgency_reason text,
  tags text[],
  is_urgent boolean,
  ai_requires_action boolean
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  WITH connected_threads AS (
    SELECT c.thread_id, c.patient_id
    FROM clinical.patient_collab_chat c
    JOIN public.patient_clinician_connections pcc
      ON pcc.patient_id = c.patient_id
     AND pcc.clinician_id = p_clinician_id
     AND pcc.status = 'active'
    GROUP BY c.thread_id, c.patient_id
  ),
  latest AS (
    SELECT DISTINCT ON (c.thread_id)
      c.thread_id,
      c.patient_id,
      c.message,
      c.sent_at,
      COALESCE(c.is_urgent,false) AS is_urgent,
      COALESCE(c.requires_response,false) AS requires_response
    FROM clinical.patient_collab_chat c
    JOIN connected_threads t ON t.thread_id = c.thread_id
    ORDER BY c.thread_id, c.sent_at DESC
  ),
  counts AS (
    SELECT
      c.thread_id,
      sum(
        CASE
          WHEN (NOT COALESCE(c.is_read,false))
           AND c.sender_id <> p_clinician_id
           AND NOT (p_clinician_id = ANY(COALESCE(c.read_by, ARRAY[]::uuid[])))
          THEN 1 ELSE 0 END
      ) AS unread_for_clinician,
      sum(
        CASE
          WHEN (NOT COALESCE(c.is_read,false))
           AND c.sender_id = p_clinician_id
           AND NOT (t.patient_id = ANY(COALESCE(c.read_by, ARRAY[]::uuid[])))
          THEN 1 ELSE 0 END
      ) AS unread_for_patient
    FROM clinical.patient_collab_chat c
    JOIN connected_threads t ON t.thread_id = c.thread_id AND t.patient_id = c.patient_id
    GROUP BY c.thread_id
  )
  SELECT
    l.thread_id AS conversation_id,
    l.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    (COALESCE(SUBSTRING(NULLIF(TRIM(pp.first_name), '') FROM 1 FOR 1), 'P') || COALESCE(SUBSTRING(NULLIF(TRIM(pp.last_name), '') FROM 1 FOR 1), '')) AS patient_avatar,
    p_clinician_id AS clinician_id,
    'Conversation'::text AS subject,
    'active'::text AS status,
    CASE WHEN l.is_urgent THEN 'urgent' WHEN l.requires_response THEN 'high' ELSE 'normal' END AS priority,
    l.message AS last_message,
    l.sent_at AS last_message_at,
    COALESCE(ct.unread_for_clinician,0) AS unread_count_clinician,
    COALESCE(ct.unread_for_patient,0) AS unread_count_patient,
    CASE WHEN l.is_urgent THEN 92.5 WHEN l.requires_response THEN 75.0 ELSE 25.0 END AS ai_priority_score,
    NULL::text AS ai_summary,
    NULL::text AS ai_urgency_reason,
    ARRAY[]::text[] AS tags,
    COALESCE(l.is_urgent,false) AS is_urgent,
    COALESCE(l.requires_response,false) AS ai_requires_action
  FROM latest l
  LEFT JOIN public.patient_profiles pp ON pp.user_id = l.patient_id
  LEFT JOIN counts ct ON ct.thread_id = l.thread_id
  ORDER BY ai_priority_score DESC, last_message_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_clinician_message_conversations(uuid) TO authenticated;

-- 2) Messages in a conversation for a clinician
DROP FUNCTION IF EXISTS public.get_conversation_messages(uuid, uuid);
CREATE FUNCTION public.get_conversation_messages(p_clinician_id uuid, p_thread_id uuid)
RETURNS TABLE (
  message_id uuid,
  thread_id uuid,
  patient_id uuid,
  sender_id uuid,
  sender_type text,
  sender_name text,
  content text,
  sent_at timestamptz,
  is_read boolean,
  is_urgent boolean,
  message_type text,
  ai_summary text,
  ai_sentiment text,
  ai_requires_action boolean,
  ai_action_items text[],
  attachments jsonb
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  WITH allowed AS (
    SELECT c.*
    FROM clinical.patient_collab_chat c
    JOIN public.patient_clinician_connections pcc
      ON pcc.patient_id = c.patient_id
     AND pcc.clinician_id = p_clinician_id
     AND pcc.status = 'active'
    WHERE c.thread_id = p_thread_id
  )
  SELECT
    c.message_id,
    c.thread_id,
    c.patient_id,
    c.sender_id,
    CASE WHEN c.sender_id = p_clinician_id THEN 'clinician' ELSE 'patient' END AS sender_type,
    COALESCE(NULLIF(TRIM(
      CASE WHEN c.sender_id = p_clinician_id THEN cp.first_name || ' ' || cp.last_name ELSE pp.first_name || ' ' || pp.last_name END
    ), ''), 'User') AS sender_name,
    c.message AS content,
    c.sent_at,
    COALESCE(c.is_read,false) AS is_read,
    COALESCE(c.is_urgent,false) AS is_urgent,
    'text'::text AS message_type,
    NULL::text AS ai_summary,
    NULL::text AS ai_sentiment,
    COALESCE(c.requires_response,false) AS ai_requires_action,
    ARRAY[]::text[] AS ai_action_items,
    c.attachments
  FROM allowed c
  LEFT JOIN public.patient_profiles pp ON pp.user_id = c.patient_id
  LEFT JOIN public.clinician_profiles cp ON cp.user_id = p_clinician_id
  ORDER BY c.sent_at ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_conversation_messages(uuid, uuid) TO authenticated;

-- 3) Send a chat message
DROP FUNCTION IF EXISTS public.send_chat_message(uuid, uuid, uuid, text, boolean, boolean);
CREATE FUNCTION public.send_chat_message(
  p_thread_id uuid,
  p_patient_id uuid,
  p_sender_id uuid,
  p_content text,
  p_is_urgent boolean DEFAULT false,
  p_requires_response boolean DEFAULT false
) RETURNS TABLE(message_id uuid, sent_at timestamptz) LANGUAGE plpgsql SECURITY INVOKER AS $$
BEGIN
  INSERT INTO clinical.patient_collab_chat (
    message_id, thread_id, patient_id, sender_id, message, is_urgent, requires_response, sent_at
  ) VALUES (
    gen_random_uuid(), p_thread_id, p_patient_id, p_sender_id, p_content, COALESCE(p_is_urgent,false), COALESCE(p_requires_response,false), NOW()
  ) RETURNING clinical.patient_collab_chat.message_id, clinical.patient_collab_chat.sent_at INTO message_id, sent_at;
  RETURN;
END;
$$;

GRANT EXECUTE ON FUNCTION public.send_chat_message(uuid, uuid, uuid, text, boolean, boolean) TO authenticated;

-- 4) Critical patient alerts for clinician
DROP FUNCTION IF EXISTS public.get_critical_patient_alerts(uuid);
CREATE FUNCTION public.get_critical_patient_alerts(p_clinician_id uuid)
RETURNS TABLE (
  alert_id uuid,
  patient_id uuid,
  patient_name text,
  risk_type text,
  alert_level text,
  score numeric,
  reason text,
  created_at timestamptz
) LANGUAGE sql SECURITY INVOKER STABLE AS $$
  SELECT
    a.alert_id,
    a.patient_id,
    COALESCE(NULLIF(TRIM(pp.first_name || ' ' || pp.last_name), ''), 'Patient') AS patient_name,
    a.risk_type,
    a.alert_level,
    a.score,
    a.reason,
    a.created_at
  FROM clinical.patient_risk_alerts a
  JOIN public.patient_clinician_connections pcc
    ON pcc.patient_id = a.patient_id
   AND pcc.clinician_id = p_clinician_id
   AND pcc.status = 'active'
  LEFT JOIN public.patient_profiles pp ON pp.user_id = a.patient_id
  WHERE a.alert_level = 'critical'
  ORDER BY a.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_critical_patient_alerts(uuid) TO authenticated;

-- Reload PostgREST schema
NOTIFY pgrst, '{"db-schema": "public", "role": "authenticated", "action": "reload"}';
