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
    "schema_name": "clinical",
    "function_name": "get_image_annotations",
    "args_signature": "p_image_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION clinical.get_image_annotations(p_image_id uuid)\n RETURNS TABLE(annotation_id uuid, annotation_type text, coordinates text, ai_flagged boolean, snomed_ct_code text, icd10_code text, notes text, created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical'\nAS $function$\nDECLARE\n  v_patient_id UUID;\nBEGIN\n  -- Verify user owns the image\n  SELECT neuro_imaging_results.patient_id INTO v_patient_id\n  FROM clinical.neuro_imaging_results\n  WHERE image_id = p_image_id;\n  \n  IF v_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized access';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    ia.annotation_id,\n    ia.annotation_type::TEXT,\n    ia.coordinates,\n    ia.ai_flagged,\n    ia.snomed_ct_code,\n    ia.icd10_code,\n    ia.notes,\n    ia.created_at\n  FROM clinical.imaging_annotations ia\n  WHERE ia.image_id = p_image_id\n  ORDER BY ia.created_at DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "get_imaging_with_annotations",
    "args_signature": "p_patient_id uuid, p_limit integer",
    "definition": "CREATE OR REPLACE FUNCTION clinical.get_imaging_with_annotations(p_patient_id uuid, p_limit integer DEFAULT 10)\n RETURNS TABLE(image_id uuid, patient_id uuid, study_type text, study_date date, image_url text, findings text, impression text, snomed_ct_code text, icd10_code text, study_condition_code text, ordering_physician uuid, uploaded_by uuid, created_at timestamp with time zone, annotations jsonb)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical', 'public'\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT \n    ir.image_id,\n    ir.patient_id,\n    ir.study_type,\n    ir.study_date,\n    ir.image_url,\n    ir.findings,\n    ir.impression,\n    ir.snomed_ct_code,\n    ir.icd10_code,\n    ir.study_condition_code,\n    ir.ordering_physician,\n    ir.uploaded_by,\n    ir.created_at,\n    COALESCE(\n      (\n        SELECT jsonb_agg(\n          jsonb_build_object(\n            'annotation_id', ia.annotation_id,\n            'annotation_type', ia.annotation_type::TEXT,\n            'coordinates', ia.coordinates,\n            'ai_flagged', ia.ai_flagged,\n            'ai_confidence', ia.ai_confidence,\n            'snomed_ct_code', ia.snomed_ct_code,\n            'icd10_code', ia.icd10_code,\n            'notes', ia.notes,\n            'validated_by', ia.validated_by,\n            'validation_status', ia.validation_status\n          )\n        )\n        FROM clinical.imaging_annotations ia\n        WHERE ia.image_id = ir.image_id\n      ),\n      '[]'::JSONB\n    ) as annotations\n  FROM clinical.neuro_imaging_results ir\n  WHERE ir.patient_id = p_patient_id\n  ORDER BY ir.study_date DESC, ir.created_at DESC\n  LIMIT p_limit;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "get_pro_values",
    "args_signature": "p_pro_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION clinical.get_pro_values(p_pro_id uuid)\n RETURNS TABLE(value_id uuid, domain_label text, value numeric, value_unit text, snomed_ct_code text, icd10_code text, collected_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical'\nAS $function$\nDECLARE\n  v_patient_id UUID;\nBEGIN\n  -- Verify user owns the PRO\n  SELECT patient_id INTO v_patient_id\n  FROM clinical.patient_pro_timeline\n  WHERE pro_id = p_pro_id;\n  \n  IF v_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized access';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    pv.value_id,\n    pv.domain_label,\n    pv.value,\n    pv.value_unit,\n    pv.snomed_ct_code,\n    pv.icd10_code,\n    pv.collected_at\n  FROM clinical.patient_pro_value pv\n  WHERE pv.pro_id = p_pro_id\n  ORDER BY pv.collected_at DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "get_pro_with_values",
    "args_signature": "p_patient_id uuid, p_pro_type clinical.pro_type_enum, p_limit integer",
    "definition": "CREATE OR REPLACE FUNCTION clinical.get_pro_with_values(p_patient_id uuid, p_pro_type clinical.pro_type_enum DEFAULT NULL::clinical.pro_type_enum, p_limit integer DEFAULT 20)\n RETURNS TABLE(pro_id uuid, patient_id uuid, pro_type text, collection_method text, reported_at timestamp with time zone, snomed_ct_code text, icd10_code text, notes text, created_at timestamp with time zone, pro_values jsonb)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical', 'public'\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT \n    pt.pro_id,\n    pt.patient_id,\n    pt.pro_type::TEXT,\n    pt.collection_method::TEXT,\n    pt.reported_at,\n    pt.snomed_ct_code,\n    pt.icd10_code,\n    pt.notes,\n    pt.created_at,\n    COALESCE(\n      (\n        SELECT jsonb_agg(\n          jsonb_build_object(\n            'domain_label', pv.domain_label::TEXT,\n            'value', pv.value,\n            'value_unit', pv.value_unit,\n            'snomed_ct_code', pv.snomed_ct_code,\n            'icd10_code', pv.icd10_code\n          )\n        )\n        FROM clinical.patient_pro_value pv\n        WHERE pv.pro_id = pt.pro_id\n      ),\n      '[]'::JSONB\n    ) as pro_values\n  FROM clinical.patient_pro_timeline pt\n  WHERE \n    pt.patient_id = p_patient_id\n    AND (p_pro_type IS NULL OR pt.pro_type = p_pro_type)\n  ORDER BY pt.reported_at DESC, pt.created_at DESC\n  LIMIT p_limit;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "get_scale_results_with_subscores",
    "args_signature": "p_patient_id uuid, p_scale_type clinical.scale_type_enum, p_limit integer",
    "definition": "CREATE OR REPLACE FUNCTION clinical.get_scale_results_with_subscores(p_patient_id uuid, p_scale_type clinical.scale_type_enum DEFAULT NULL::clinical.scale_type_enum, p_limit integer DEFAULT 20)\n RETURNS TABLE(scale_id uuid, patient_id uuid, scale_type text, scale_version text, total_score numeric, assessed_at timestamp with time zone, assessed_by uuid, entered_by uuid, snomed_ct_code text, icd10_code text, assessment_notes text, entered_at timestamp with time zone, subscores jsonb)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical', 'public'\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT \n    sr.scale_id,\n    sr.patient_id,\n    sr.scale_type::TEXT,\n    sr.scale_version::TEXT,\n    sr.total_score,\n    sr.assessed_at,\n    sr.assessed_by,\n    sr.entered_by,\n    sr.snomed_ct_code,\n    sr.icd10_code,\n    sr.assessment_notes,\n    sr.entered_at,\n    COALESCE(\n      (\n        SELECT jsonb_agg(\n          jsonb_build_object(\n            'subscale_label', ss.subscale_label::TEXT,\n            'score', ss.score,\n            'max_score', ss.max_score,\n            'score_interpretation', ss.score_interpretation\n          )\n        )\n        FROM clinical.clinical_scale_subscore_results ss\n        WHERE ss.scale_id = sr.scale_id\n      ),\n      '[]'::JSONB\n    ) as subscores\n  FROM clinical.clinical_scale_results sr\n  WHERE \n    sr.patient_id = p_patient_id\n    AND (p_scale_type IS NULL OR sr.scale_type::TEXT = p_scale_type::TEXT)\n  ORDER BY sr.assessed_at DESC, sr.entered_at DESC\n  LIMIT p_limit;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "save_imaging_annotation",
    "args_signature": "p_image_id uuid, p_annotation_type clinical.annotation_type_enum, p_coordinates text, p_ai_flagged boolean, p_snomed_ct_code text, p_icd10_code text, p_notes text",
    "definition": "CREATE OR REPLACE FUNCTION clinical.save_imaging_annotation(p_image_id uuid, p_annotation_type clinical.annotation_type_enum, p_coordinates text DEFAULT NULL::text, p_ai_flagged boolean DEFAULT false, p_snomed_ct_code text DEFAULT NULL::text, p_icd10_code text DEFAULT NULL::text, p_notes text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical'\nAS $function$\nDECLARE\n  v_annotation_id UUID;\n  v_patient_id UUID;\nBEGIN\n  -- Verify user owns the imaging result\n  SELECT patient_id INTO v_patient_id\n  FROM clinical.neuro_imaging_results\n  WHERE image_id = p_image_id;\n  \n  IF v_patient_id IS NULL THEN\n    RAISE EXCEPTION 'Image not found';\n  END IF;\n  \n  IF v_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized access to image';\n  END IF;\n  \n  -- Insert annotation\n  INSERT INTO clinical.imaging_annotations (\n    image_id,\n    annotation_type,\n    coordinates,\n    ai_flagged,\n    snomed_ct_code,\n    icd10_code,\n    notes\n  ) VALUES (\n    p_image_id,\n    p_annotation_type,\n    p_coordinates,\n    p_ai_flagged,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_notes\n  ) RETURNING annotation_id INTO v_annotation_id;\n  \n  RETURN v_annotation_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "save_imaging_with_annotations",
    "args_signature": "p_patient_id uuid, p_study_type text, p_study_date date, p_image_url text, p_findings text, p_impression text, p_snomed_ct_code text, p_icd10_code text, p_study_condition_code text, p_ordering_physician uuid, p_uploaded_by uuid, p_annotations jsonb",
    "definition": "CREATE OR REPLACE FUNCTION clinical.save_imaging_with_annotations(p_patient_id uuid, p_study_type text, p_study_date date, p_image_url text, p_findings text DEFAULT NULL::text, p_impression text DEFAULT NULL::text, p_snomed_ct_code text DEFAULT NULL::text, p_icd10_code text DEFAULT NULL::text, p_study_condition_code text DEFAULT NULL::text, p_ordering_physician uuid DEFAULT NULL::uuid, p_uploaded_by uuid DEFAULT NULL::uuid, p_annotations jsonb DEFAULT '[]'::jsonb)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical', 'public'\nAS $function$\nDECLARE\n  v_image_id UUID;\n  v_annotation JSONB;\nBEGIN\n  -- Insert main imaging record\n  INSERT INTO clinical.neuro_imaging_results (\n    patient_id,\n    study_type,\n    study_date,\n    image_url,\n    findings,\n    impression,\n    snomed_ct_code,\n    icd10_code,\n    study_condition_code,\n    ordering_physician,\n    uploaded_by,\n    created_at\n  ) VALUES (\n    p_patient_id,\n    p_study_type,\n    p_study_date,\n    p_image_url,\n    p_findings,\n    p_impression,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_study_condition_code,\n    p_ordering_physician,\n    p_uploaded_by,\n    NOW()\n  ) RETURNING image_id INTO v_image_id;\n  \n  -- Insert annotations if provided\n  IF p_annotations IS NOT NULL AND jsonb_array_length(p_annotations) > 0 THEN\n    FOR v_annotation IN SELECT * FROM jsonb_array_elements(p_annotations)\n    LOOP\n      INSERT INTO clinical.imaging_annotations (\n        image_id,\n        annotation_type,\n        coordinates,\n        ai_flagged,\n        ai_confidence,\n        snomed_ct_code,\n        icd10_code,\n        notes\n      ) VALUES (\n        v_image_id,\n        (v_annotation->>'annotation_type')::clinical.annotation_type_enum,\n        v_annotation->>'coordinates',\n        COALESCE((v_annotation->>'ai_flagged')::BOOLEAN, false),\n        (v_annotation->>'ai_confidence')::NUMERIC,\n        v_annotation->>'snomed_ct_code',\n        v_annotation->>'icd10_code',\n        v_annotation->>'notes'\n      );\n    END LOOP;\n  END IF;\n  \n  RETURN v_image_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "save_pro_value",
    "args_signature": "p_pro_id uuid, p_domain_label text, p_value numeric, p_value_unit text, p_snomed_ct_code text, p_icd10_code text, p_collected_at timestamp with time zone",
    "definition": "CREATE OR REPLACE FUNCTION clinical.save_pro_value(p_pro_id uuid, p_domain_label text, p_value numeric, p_value_unit text DEFAULT NULL::text, p_snomed_ct_code text DEFAULT NULL::text, p_icd10_code text DEFAULT NULL::text, p_collected_at timestamp with time zone DEFAULT now())\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical'\nAS $function$\nDECLARE\n  v_value_id UUID;\n  v_patient_id UUID;\nBEGIN\n  -- Verify user owns the PRO timeline entry\n  SELECT patient_id INTO v_patient_id\n  FROM clinical.patient_pro_timeline\n  WHERE pro_id = p_pro_id;\n  \n  IF v_patient_id IS NULL THEN\n    RAISE EXCEPTION 'PRO timeline entry not found';\n  END IF;\n  \n  IF v_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized access';\n  END IF;\n  \n  -- Insert PRO value\n  INSERT INTO clinical.patient_pro_value (\n    pro_id,\n    domain_label,\n    value,\n    value_unit,\n    snomed_ct_code,\n    icd10_code,\n    collected_at\n  ) VALUES (\n    p_pro_id,\n    p_domain_label,\n    p_value,\n    p_value_unit,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_collected_at\n  ) RETURNING value_id INTO v_value_id;\n  \n  RETURN v_value_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "save_pro_with_values",
    "args_signature": "p_patient_id uuid, p_pro_type clinical.pro_type_enum, p_collection_method clinical.collection_method_enum, p_reported_at timestamp with time zone, p_snomed_ct_code text, p_icd10_code text, p_notes text, p_values jsonb",
    "definition": "CREATE OR REPLACE FUNCTION clinical.save_pro_with_values(p_patient_id uuid, p_pro_type clinical.pro_type_enum, p_collection_method clinical.collection_method_enum, p_reported_at timestamp with time zone, p_snomed_ct_code text DEFAULT NULL::text, p_icd10_code text DEFAULT NULL::text, p_notes text DEFAULT NULL::text, p_values jsonb DEFAULT '[]'::jsonb)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical', 'public'\nAS $function$\nDECLARE\n  v_pro_id UUID;\n  v_value JSONB;\nBEGIN\n  -- Insert main PRO timeline entry\n  INSERT INTO clinical.patient_pro_timeline (\n    patient_id,\n    pro_type,\n    collection_method,\n    reported_at,\n    snomed_ct_code,\n    icd10_code,\n    notes,\n    created_at\n  ) VALUES (\n    p_patient_id,\n    p_pro_type,\n    p_collection_method,\n    p_reported_at,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_notes,\n    NOW()\n  ) RETURNING pro_id INTO v_pro_id;\n  \n  -- Insert individual domain values if provided\n  IF p_values IS NOT NULL AND jsonb_array_length(p_values) > 0 THEN\n    FOR v_value IN SELECT * FROM jsonb_array_elements(p_values)\n    LOOP\n      INSERT INTO clinical.patient_pro_value (\n        pro_id,\n        domain_label,\n        value,\n        value_unit,\n        snomed_ct_code,\n        icd10_code\n      ) VALUES (\n        v_pro_id,\n        (v_value->>'domain_label')::clinical.pro_domain_label_enum,\n        (v_value->>'value')::NUMERIC,\n        v_value->>'value_unit',\n        v_value->>'snomed_ct_code',\n        v_value->>'icd10_code'\n      );\n    END LOOP;\n  END IF;\n  \n  RETURN v_pro_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "save_scale_result",
    "args_signature": "p_patient_id uuid, p_scale_type clinical.scale_type_enum, p_scale_version clinical.scale_version_enum, p_total_score numeric, p_assessed_at timestamp with time zone, p_assessed_by uuid, p_entered_by uuid, p_snomed_ct_code text, p_icd10_code text, p_notes text, p_subscores jsonb",
    "definition": "CREATE OR REPLACE FUNCTION clinical.save_scale_result(p_patient_id uuid, p_scale_type clinical.scale_type_enum, p_scale_version clinical.scale_version_enum, p_total_score numeric, p_assessed_at timestamp with time zone, p_assessed_by uuid, p_entered_by uuid, p_snomed_ct_code text DEFAULT NULL::text, p_icd10_code text DEFAULT NULL::text, p_notes text DEFAULT NULL::text, p_subscores jsonb DEFAULT '[]'::jsonb)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'clinical', 'public'\nAS $function$\nDECLARE\n  v_scale_id UUID;\n  v_subscore JSONB;\nBEGIN\n  -- Validate patient_id is not NULL\n  IF p_patient_id IS NULL THEN\n    RAISE EXCEPTION 'patient_id cannot be NULL';\n  END IF;\n  \n  -- Insert main scale result\n  INSERT INTO clinical.clinical_scale_results (\n    patient_id,\n    scale_type,\n    scale_version,\n    total_score,\n    assessed_at,\n    assessed_by,\n    entered_by,\n    snomed_ct_code,\n    icd10_code,\n    assessment_notes\n  ) VALUES (\n    p_patient_id,\n    p_scale_type,\n    p_scale_version,\n    p_total_score,\n    p_assessed_at,\n    p_assessed_by,\n    p_entered_by,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_notes\n  ) RETURNING scale_id INTO v_scale_id;\n  \n  -- Insert subscores if provided\n  IF p_subscores IS NOT NULL AND jsonb_array_length(p_subscores) > 0 THEN\n    FOR v_subscore IN SELECT * FROM jsonb_array_elements(p_subscores)\n    LOOP\n      INSERT INTO clinical.clinical_scale_subscore_results (\n        scale_id,\n        subscale_label,\n        score,\n        max_score,\n        score_interpretation\n      ) VALUES (\n        v_scale_id,\n        (v_subscore->>'subscale_label')::clinical.subscale_label_enum,\n        (v_subscore->>'score')::NUMERIC,\n        (v_subscore->>'max_score')::NUMERIC,\n        v_subscore->>'score_interpretation'\n      );\n    END LOOP;\n  END IF;\n  \n  RETURN v_scale_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "clinical",
    "function_name": "search_imaging_findings",
    "args_signature": "p_search_term text, p_parkinsons_only boolean, p_epilepsy_only boolean",
    "definition": "CREATE OR REPLACE FUNCTION clinical.search_imaging_findings(p_search_term text, p_parkinsons_only boolean DEFAULT false, p_epilepsy_only boolean DEFAULT false)\n RETURNS TABLE(finding_id uuid, finding_name text, annotation_type text, snomed_ct_code text, icd10_code text, description text)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT \n    f.finding_id,\n    f.finding_name,\n    f.annotation_type::TEXT,\n    f.snomed_ct_code,\n    f.icd10_code,\n    f.description\n  FROM public.imaging_findings_library f\n  WHERE \n    (p_search_term IS NULL OR \n     f.finding_name ILIKE '%' || p_search_term || '%' OR\n     p_search_term = ANY(f.search_keywords))\n    AND (NOT p_parkinsons_only OR f.typical_in_parkinsons = true)\n    AND (NOT p_epilepsy_only OR f.typical_in_epilepsy = true)\n  ORDER BY \n    CASE \n      WHEN f.finding_name ILIKE p_search_term THEN 1\n      WHEN f.finding_name ILIKE p_search_term || '%' THEN 2\n      ELSE 3\n    END,\n    f.finding_name\n  LIMIT 20;\nEND;\n$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea",
    "definition": "CREATE OR REPLACE FUNCTION extensions.armor(bytea)\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_armor$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "armor",
    "args_signature": "bytea, text[], text[]",
    "definition": "CREATE OR REPLACE FUNCTION extensions.armor(bytea, text[], text[])\n RETURNS text\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_armor$function$\n"
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
    "args_signature": "bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.digest(bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_digest$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "digest",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.digest(text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_digest$function$\n"
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
    "args_signature": "bytea, bytea, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.hmac(bytea, bytea, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_hmac$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "hmac",
    "args_signature": "text, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.hmac(text, text, text)\n RETURNS bytea\n LANGUAGE c\n IMMUTABLE PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pg_hmac$function$\n"
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
    "args_signature": "text, text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt(text, text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$\n"
  },
  {
    "schema_name": "extensions",
    "function_name": "pgp_sym_encrypt",
    "args_signature": "text, text",
    "definition": "CREATE OR REPLACE FUNCTION extensions.pgp_sym_encrypt(text, text)\n RETURNS bytea\n LANGUAGE c\n PARALLEL SAFE STRICT\nAS '$libdir/pgcrypto', $function$pgp_sym_encrypt_text$function$\n"
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
    "function_name": "save_patient_diagnosis",
    "args_signature": "p_patient_id uuid, p_diagnosis_code text, p_diagnosis_type text, p_diagnosed_date date, p_diagnosed_by uuid, p_snomed_ct_code text, p_icd10_code text, p_notes text",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.save_patient_diagnosis(p_patient_id uuid, p_diagnosis_code text, p_diagnosis_type text, p_diagnosed_date date DEFAULT CURRENT_DATE, p_diagnosed_by uuid DEFAULT NULL::uuid, p_snomed_ct_code text DEFAULT NULL::text, p_icd10_code text DEFAULT NULL::text, p_notes text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info'\nAS $function$\nDECLARE\n  v_diagnosis_id UUID;\nBEGIN\n  -- Verify user is the patient\n  IF p_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized: Can only add own diagnoses';\n  END IF;\n  \n  INSERT INTO private_health_info.patient_diagnoses (\n    patient_id,\n    diagnosis_code,\n    diagnosis_type,\n    diagnosed_date,\n    diagnosed_by,\n    snomed_ct_code,\n    icd10_code,\n    notes\n  ) VALUES (\n    p_patient_id,\n    p_diagnosis_code,\n    p_diagnosis_type,\n    p_diagnosed_date,\n    p_diagnosed_by,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_notes\n  ) RETURNING diagnosis_id INTO v_diagnosis_id;\n  \n  RETURN v_diagnosis_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "save_seizure_log",
    "args_signature": "p_patient_id uuid, p_seizure_type seizure_type_enum, p_occurred_at timestamp with time zone, p_duration_seconds integer, p_triggers text, p_notes text, p_snomed_ct_code text, p_icd10_code text, p_metadata jsonb",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.save_seizure_log(p_patient_id uuid, p_seizure_type seizure_type_enum, p_occurred_at timestamp with time zone, p_duration_seconds integer DEFAULT NULL::integer, p_triggers text DEFAULT NULL::text, p_notes text DEFAULT NULL::text, p_snomed_ct_code text DEFAULT '84757009'::text, p_icd10_code text DEFAULT 'G40'::text, p_metadata jsonb DEFAULT '{}'::jsonb)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info'\nAS $function$\nDECLARE\n  v_log_id UUID;\nBEGIN\n  IF p_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized';\n  END IF;\n  \n  INSERT INTO private_health_info.seizure_logs (\n    patient_id,\n    seizure_type,\n    occurred_at,\n    duration_seconds,\n    triggers,\n    notes,\n    snomed_ct_code,\n    icd10_code,\n    metadata\n  ) VALUES (\n    p_patient_id,\n    p_seizure_type,\n    p_occurred_at,\n    p_duration_seconds,\n    p_triggers,\n    p_notes,\n    p_snomed_ct_code,\n    p_icd10_code,\n    p_metadata\n  ) RETURNING log_id INTO v_log_id;\n  \n  RETURN v_log_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "schedule_medication_reminders",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.schedule_medication_reminders()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_prefs RECORD;\n    v_medication_name TEXT;\n    v_next_dose TIMESTAMPTZ;\nBEGIN\n    -- Get user preferences\n    SELECT * INTO v_prefs\n    FROM public.notification_preferences\n    WHERE user_id = NEW.user_id;\n    \n    -- If medication reminders disabled, skip\n    IF NOT FOUND OR NOT v_prefs.medication_reminders THEN\n        RETURN NEW;\n    END IF;\n    \n    -- Get medication name (NO PHI - just generic reference)\n    SELECT 'Medication Reminder' INTO v_medication_name;\n    \n    -- Calculate next dose time (example: if dose_times array exists)\n    -- For now, schedule for tomorrow at daily_checkin_time\n    v_next_dose := (CURRENT_DATE + INTERVAL '1 day' + v_prefs.daily_checkin_time::TIME)::TIMESTAMPTZ;\n    \n    -- Schedule notification (NO PHI in content!)\n    PERFORM public.schedule_notification(\n        NEW.user_id,\n        'medication_reminder',\n        'Medication Reminder',\n        'Time to take your medication. Tap to log.',\n        '/dashboard?action=medication',\n        NEW.id,\n        v_next_dose - (v_prefs.medication_reminder_minutes || ' minutes')::INTERVAL,\n        'normal'\n    );\n    \n    RETURN NEW;\nEND;\n$function$\n"
  },
  {
    "schema_name": "private_health_info",
    "function_name": "sync_onboarding_to_patient_phi",
    "args_signature": "",
    "definition": "CREATE OR REPLACE FUNCTION private_health_info.sync_onboarding_to_patient_phi()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public', 'pg_temp'\nAS $function$\nbegin\n  insert into private_health_info.patient_phi as phi (\n    user_id,\n    date_of_birth,\n    gender,\n    phone_number,\n    emergency_contact_name,\n    emergency_contact_phone,\n    emergency_contact_relationship,\n    updated_at\n  )\n  values (\n    new.user_id,\n    new.date_of_birth,\n    new.gender, -- now enum\n    new.phone_number,\n    new.emergency_contact_name,\n    new.emergency_contact_phone,\n    new.emergency_contact_relationship,\n    now()\n  )\n  on conflict (user_id)\n  do update set\n    date_of_birth = excluded.date_of_birth,\n    gender = excluded.gender,\n    phone_number = excluded.phone_number,\n    emergency_contact_name = excluded.emergency_contact_name,\n    emergency_contact_phone = excluded.emergency_contact_phone,\n    emergency_contact_relationship = excluded.emergency_contact_relationship,\n    updated_at = now();\n\n  return new;\nend;\n$function$\n"
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
    "function_name": "delete_symptom_log",
    "args_signature": "p_log_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.delete_symptom_log(p_log_id uuid)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n  v_patient_id UUID;\nBEGIN\n  -- Get patient_id and verify ownership\n  SELECT patient_id INTO v_patient_id\n  FROM private_health_info.daily_symptom_logs\n  WHERE log_id = p_log_id;\n  \n  IF NOT FOUND THEN\n    RAISE EXCEPTION 'Symptom log not found' USING ERRCODE = '42501';\n  END IF;\n  \n  IF v_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  -- Delete symptom log\n  DELETE FROM private_health_info.daily_symptom_logs\n  WHERE log_id = p_log_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_custom_tracking_history",
    "args_signature": "p_item_id uuid, p_start_date date, p_end_date date, p_limit integer",
    "definition": "CREATE OR REPLACE FUNCTION public.get_custom_tracking_history(p_item_id uuid, p_start_date date DEFAULT NULL::date, p_end_date date DEFAULT NULL::date, p_limit integer DEFAULT 100)\n RETURNS TABLE(value_id uuid, item_id uuid, item_name text, item_type text, numeric_value numeric, text_value text, boolean_value boolean, logged_at timestamp with time zone, log_date date, notes text)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n  v_user_id UUID;\nBEGIN\n  -- Get the user_id from the item\n  SELECT user_id INTO v_user_id\n  FROM public.custom_tracking_items\n  WHERE item_id = p_item_id;\n  \n  -- Verify user owns this item\n  IF v_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized access to custom tracking item';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    v.value_id,\n    v.item_id,\n    i.item_name,\n    i.item_type::TEXT,\n    v.numeric_value,\n    v.text_value,\n    v.boolean_value,\n    v.logged_at,\n    v.log_date,\n    v.notes\n  FROM public.custom_tracking_values v\n  JOIN public.custom_tracking_items i ON i.item_id = v.item_id\n  WHERE v.item_id = p_item_id\n    AND (p_start_date IS NULL OR v.log_date >= p_start_date)\n    AND (p_end_date IS NULL OR v.log_date <= p_end_date)\n  ORDER BY v.logged_at DESC\n  LIMIT p_limit;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_function_stats",
    "args_signature": "p_function_name text",
    "definition": "CREATE OR REPLACE FUNCTION public.get_function_stats(p_function_name text DEFAULT NULL::text)\n RETURNS TABLE(function_name text, total_executions bigint, successful bigint, failed bigint, avg_duration_ms numeric, max_duration_ms integer, last_execution timestamp with time zone)\n LANGUAGE sql\n SECURITY DEFINER\nAS $function$\n    SELECT \n        function_name,\n        COUNT(*) as total_executions,\n        SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,\n        SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed,\n        ROUND(AVG(duration_ms), 2) as avg_duration_ms,\n        MAX(duration_ms) as max_duration_ms,\n        MAX(started_at) as last_execution\n    FROM public.function_execution_logs\n    WHERE (p_function_name IS NULL OR function_name = p_function_name)\n    AND execution_status IN ('completed', 'failed')\n    GROUP BY function_name\n    ORDER BY last_execution DESC;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_gait_episodes",
    "args_signature": "p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_gait_episodes(p_patient_id uuid)\n RETURNS TABLE(gait_id uuid, patient_id uuid, occurred_at timestamp with time zone, duration_seconds integer, event_type text, severity integer, resulted_in_fall boolean, fall_direction text, injury_occurred boolean, injury_description text, required_assistance boolean, location text, activity text, environmental_factors jsonb, medication_status text, hours_since_medication integer, freezing_trigger text, broke_freeze_with text, video_recorded boolean, media_urls jsonb, notes text, shared_with_clinician boolean, visible_to_researchers boolean, created_at timestamp with time zone, updated_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    ge.gait_id,\n    ge.patient_id,\n    ge.occurred_at,\n    ge.duration_seconds,\n    ge.event_type,\n    ge.severity,\n    ge.resulted_in_fall,\n    ge.fall_direction,\n    ge.injury_occurred,\n    ge.injury_description,\n    ge.required_assistance,\n    ge.location,\n    ge.activity,\n    ge.environmental_factors,\n    ge.medication_status,\n    ge.hours_since_medication,\n    ge.freezing_trigger,\n    ge.broke_freeze_with,\n    ge.video_recorded,\n    ge.media_urls,\n    ge.notes,\n    ge.shared_with_clinician,\n    ge.visible_to_researchers,\n    ge.created_at,\n    ge.updated_at\n  FROM private_health_info.gait_episodes ge\n  WHERE ge.patient_id = p_patient_id\n  ORDER BY ge.occurred_at DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_medication_logs",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_medication_logs(p_user_id uuid)\n RETURNS TABLE(id uuid, user_id uuid, user_medication_id uuid, log_date date, log_time time without time zone, taken boolean, notes text, created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    ml.id,\n    ml.user_id,\n    ml.user_medication_id,\n    ml.log_date,\n    ml.log_time,\n    ml.taken,\n    ml.notes,\n    ml.created_at\n  FROM private_health_info.medication_logs ml\n  WHERE ml.user_id = p_user_id\n  ORDER BY ml.log_date DESC, ml.log_time DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_menstrual_logs",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_menstrual_logs(p_user_id uuid)\n RETURNS TABLE(id uuid, user_id uuid, cycle_start_date date, cycle_end_date date, cycle_length_days integer, flow_intensity text, cycle_phase text, overall_symptom_severity integer, seizure_count_during_cycle integer, seizure_clustered_around_menstruation boolean, catamenial_pattern_suspected boolean, notes text, created_at timestamp with time zone, updated_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    ml.id,\n    ml.user_id,\n    ml.cycle_start_date,\n    ml.cycle_end_date,\n    ml.cycle_length_days,\n    ml.flow_intensity::TEXT,\n    ml.cycle_phase::TEXT,\n    ml.overall_symptom_severity,\n    ml.seizure_count_during_cycle,\n    ml.seizure_clustered_around_menstruation,\n    ml.catamenial_pattern_suspected,\n    ml.notes,\n    ml.created_at,\n    ml.updated_at\n  FROM private_health_info.menstrual_cycle_logs ml\n  WHERE ml.user_id = p_user_id\n  ORDER BY ml.cycle_start_date DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_patient_onboarding",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_patient_onboarding(p_user_id uuid)\n RETURNS TABLE(user_id uuid, first_name text, last_name text, middle_name text, date_of_birth date, gender text, phone_number text, emergency_contact_name text, emergency_contact_phone text, emergency_contact_relationship text, created_at timestamp with time zone, completed_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    pod.user_id, pod.first_name, pod.last_name, pod.middle_name,\n    pod.date_of_birth, pod.gender, pod.phone_number,\n    pod.emergency_contact_name, pod.emergency_contact_phone,\n    pod.emergency_contact_relationship, pod.created_at, pod.completed_at\n  FROM private_health_info.patient_onboarding_data pod\n  WHERE pod.user_id = p_user_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_patient_onboarding_data",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_patient_onboarding_data(p_user_id uuid)\n RETURNS TABLE(user_id uuid, first_name text, middle_name text, last_name text, date_of_birth date, gender text, phone_number text, emergency_contact_name text, emergency_contact_phone text, emergency_contact_relationship text, selected_conditions uuid[], track_menstrual_cycle boolean, share_research_data boolean, research_data_types text[], completed_at timestamp with time zone, created_at timestamp with time zone, updated_at timestamp with time zone, onboarding_step integer)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  -- Security check: user can only access own data\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    pod.user_id,\n    pod.first_name,\n    pod.middle_name,\n    pod.last_name,\n    pod.date_of_birth,\n    pod.gender::TEXT,\n    pod.phone_number,\n    pod.emergency_contact_name,\n    pod.emergency_contact_phone,\n    pod.emergency_contact_relationship,\n    pod.selected_conditions,\n    pod.track_menstrual_cycle,\n    pod.share_research_data,\n    ARRAY(SELECT unnest(pod.research_data_types)::TEXT),\n    pod.completed_at,\n    pod.created_at,\n    pod.updated_at,\n    pod.onboarding_step\n  FROM private_health_info.patient_onboarding_data pod\n  WHERE pod.user_id = p_user_id;\nEND;\n$function$\n"
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
    "function_name": "get_seizure_logs",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_seizure_logs(p_user_id uuid)\n RETURNS TABLE(log_id uuid, user_id uuid, log_date date, log_time time without time zone, seizure_type text, consciousness_level text, duration_seconds integer, aura_present text, aura_description text, witnessed text, witness_role text, video_recorded text, location_type text, post_ictal_confusion_minutes integer, recovery_time_minutes integer, sleep_hours_prior numeric, medication_adherence_prior text, stress_level text, emergency_services_called text, rescue_medication_used text, rescue_medication_type text, hospitalized text, research_grade text, notes text, created_at timestamp with time zone, updated_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    sl.log_id,\n    sl.user_id,\n    sl.log_date,\n    sl.log_time,\n    sl.seizure_type::TEXT,\n    sl.consciousness_level::TEXT,\n    sl.duration_seconds,\n    sl.aura_present::TEXT,\n    sl.aura_description,\n    sl.witnessed::TEXT,\n    sl.witness_role::TEXT,\n    sl.video_recorded::TEXT,\n    sl.location_type::TEXT,\n    sl.post_ictal_confusion_minutes,\n    sl.recovery_time_minutes,\n    sl.sleep_hours_prior,\n    sl.medication_adherence_prior::TEXT,\n    sl.stress_level::TEXT,\n    sl.emergency_services_called::TEXT,\n    sl.rescue_medication_used::TEXT,\n    sl.rescue_medication_type::TEXT,\n    sl.hospitalized::TEXT,\n    sl.research_grade::TEXT,\n    sl.notes,\n    sl.created_at,\n    sl.updated_at\n  FROM private_health_info.seizure_logs_research sl\n  WHERE sl.user_id = p_user_id\n  ORDER BY sl.log_date DESC, sl.log_time DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_symptom_logs",
    "args_signature": "p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_symptom_logs(p_patient_id uuid)\n RETURNS TABLE(log_id uuid, patient_id uuid, log_date date, overall_feeling integer, mood integer, energy_level integer, fatigue_level integer, pain_level integer, sleep_quality integer, sleep_hours numeric, sleep_disturbances jsonb, motor_fluctuations_occurred boolean, on_time_hours numeric, off_time_hours numeric, dyskinesia_severity integer, stiffness_severity integer, slowness_severity integer, cognitive_issues jsonb, mood_issues jsonb, autonomic_symptoms jsonb, adl_independence_level integer, activities_difficult jsonb, all_medications_taken boolean, missed_doses text, medication_side_effects jsonb, other_symptoms jsonb, symptom_notes text, stress_level integer, exercise_minutes integer, notable_events text, shared_with_clinician boolean, visible_to_researchers boolean, created_at timestamp with time zone, updated_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    dsl.log_id,\n    dsl.patient_id,\n    dsl.log_date,\n    dsl.overall_feeling,\n    dsl.mood,\n    dsl.energy_level,\n    dsl.fatigue_level,\n    dsl.pain_level,\n    dsl.sleep_quality,\n    dsl.sleep_hours,\n    dsl.sleep_disturbances,\n    dsl.motor_fluctuations_occurred,\n    dsl.on_time_hours,\n    dsl.off_time_hours,\n    dsl.dyskinesia_severity,\n    dsl.stiffness_severity,\n    dsl.slowness_severity,\n    dsl.cognitive_issues,\n    dsl.mood_issues,\n    dsl.autonomic_symptoms,\n    dsl.adl_independence_level,\n    dsl.activities_difficult,\n    dsl.all_medications_taken,\n    dsl.missed_doses,\n    dsl.medication_side_effects,\n    dsl.other_symptoms,\n    dsl.symptom_notes,\n    dsl.stress_level,\n    dsl.exercise_minutes,\n    dsl.notable_events,\n    dsl.shared_with_clinician,\n    dsl.visible_to_researchers,\n    dsl.created_at,\n    dsl.updated_at\n  FROM private_health_info.daily_symptom_logs dsl\n  WHERE dsl.patient_id = p_patient_id\n  ORDER BY dsl.log_date DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_temperature_logs",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_temperature_logs(p_user_id uuid)\n RETURNS TABLE(id uuid, user_id uuid, log_date date, log_time time without time zone, temperature_celsius numeric, notes text, created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    btl.id,\n    btl.user_id,\n    btl.log_date,\n    btl.log_time,\n    btl.temperature_celsius,\n    btl.notes,\n    btl.created_at\n  FROM private_health_info.basal_temperature_logs btl\n  WHERE btl.user_id = p_user_id\n  ORDER BY btl.log_date DESC, btl.log_time DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_tracking_entries",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_tracking_entries(p_user_id uuid)\n RETURNS TABLE(id uuid, user_id uuid, tracking_type tracking_feature_enum, entry_date date, value numeric, severity integer, notes text, metadata jsonb, created_at timestamp with time zone, updated_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    te.id,\n    te.user_id,\n    te.tracking_type,\n    te.entry_date,\n    te.value,\n    te.severity,\n    te.notes,\n    te.metadata,\n    te.created_at,\n    te.updated_at\n  FROM private_health_info.tracking_entries te\n  WHERE te.user_id = p_user_id\n  ORDER BY te.entry_date DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_tremor_episodes",
    "args_signature": "p_patient_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_tremor_episodes(p_patient_id uuid)\n RETURNS TABLE(tremor_id uuid, patient_id uuid, occurred_at timestamp with time zone, duration_seconds integer, tremor_type text, severity integer, frequency_hz numeric, body_regions jsonb, dominant_side text, interfered_with_activities boolean, activities_affected jsonb, occurred_during text, medication_status text, hours_since_medication integer, possible_triggers jsonb, trigger_details text, video_recorded boolean, media_urls jsonb, notes text, created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    te.tremor_id,\n    te.patient_id,\n    te.occurred_at,\n    te.duration_seconds,\n    te.tremor_type,\n    te.severity,\n    te.frequency_hz,\n    te.body_regions,\n    te.dominant_side,\n    te.interfered_with_activities,\n    te.activities_affected,\n    te.occurred_during,\n    te.medication_status,\n    te.hours_since_medication,\n    te.possible_triggers,\n    te.trigger_details,\n    te.video_recorded,\n    te.media_urls,\n    te.notes,\n    te.created_at\n  FROM private_health_info.tremor_episodes te\n  WHERE te.patient_id = p_patient_id\n  ORDER BY te.occurred_at DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_user_conditions",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_user_conditions(p_user_id uuid)\n RETURNS TABLE(id uuid, user_id uuid, condition_id uuid, diagnosis_date date, severity integer, tracking_features_enabled tracking_feature_enum[], created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied: Users can only access their own conditions'\n      USING ERRCODE = '42501';\n  END IF;\n\n  RETURN QUERY\n  SELECT \n    uc.id,\n    uc.user_id,\n    uc.condition_id,\n    uc.diagnosis_date,\n    uc.severity,\n    uc.tracking_features_enabled,\n    uc.created_at\n  FROM private_health_info.user_conditions uc\n  WHERE uc.user_id = p_user_id\n  ORDER BY uc.created_at DESC;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_user_custom_tracking_items",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_user_custom_tracking_items(p_user_id uuid DEFAULT NULL::uuid)\n RETURNS TABLE(item_id uuid, item_name text, item_type text, description text, min_value numeric, max_value numeric, unit text, icon text, color text, display_order integer, is_active boolean)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n  v_user_id UUID;\nBEGIN\n  v_user_id := COALESCE(p_user_id, auth.uid());\n  \n  IF v_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized';\n  END IF;\n  \n  RETURN QUERY\n  SELECT \n    cti.item_id,\n    cti.item_name,\n    cti.item_type::TEXT,\n    cti.description,\n    cti.min_value,\n    cti.max_value,\n    cti.unit,\n    cti.icon,\n    cti.color,\n    cti.display_order,\n    cti.is_active\n  FROM public.custom_tracking_items cti\n  WHERE cti.user_id = v_user_id AND cti.is_active = true\n  ORDER BY cti.display_order, cti.item_name;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "get_user_medications",
    "args_signature": "p_user_id uuid",
    "definition": "CREATE OR REPLACE FUNCTION public.get_user_medications(p_user_id uuid)\n RETURNS TABLE(id uuid, user_id uuid, medication_id uuid, medication_name text, dosage_amount numeric, dosage_unit text, frequency text, times time without time zone[], start_date date, end_date date, is_active boolean, created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied: Users can only access their own medications'\n      USING ERRCODE = '42501';\n  END IF;\n\n  RETURN QUERY\n  SELECT \n    um.id,\n    um.user_id,\n    um.medication_id,\n    um.medication_name,\n    um.dosage_amount,\n    um.dosage_unit,\n    um.frequency,\n    um.times,\n    um.start_date,\n    um.end_date,\n    um.is_active,\n    um.created_at\n  FROM private_health_info.user_medications um\n  WHERE um.user_id = p_user_id\n    AND um.is_active = true\n  ORDER BY um.created_at DESC;\nEND;\n$function$\n"
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
    "function_name": "save_custom_tracking_value",
    "args_signature": "p_item_id uuid, p_numeric_value numeric, p_text_value text, p_boolean_value boolean, p_logged_at timestamp with time zone, p_notes text",
    "definition": "CREATE OR REPLACE FUNCTION public.save_custom_tracking_value(p_item_id uuid, p_numeric_value numeric DEFAULT NULL::numeric, p_text_value text DEFAULT NULL::text, p_boolean_value boolean DEFAULT NULL::boolean, p_logged_at timestamp with time zone DEFAULT now(), p_notes text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n  v_value_id UUID;\n  v_user_id UUID;\nBEGIN\n  -- Get the user_id from the item\n  SELECT user_id INTO v_user_id\n  FROM public.custom_tracking_items\n  WHERE item_id = p_item_id;\n  \n  IF v_user_id IS NULL THEN\n    RAISE EXCEPTION 'Custom tracking item not found';\n  END IF;\n  \n  -- Verify user owns this item\n  IF v_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Unauthorized access to custom tracking item';\n  END IF;\n  \n  -- Insert the value\n  INSERT INTO public.custom_tracking_values (\n    item_id,\n    user_id,\n    numeric_value,\n    text_value,\n    boolean_value,\n    logged_at,\n    log_date,\n    notes\n  ) VALUES (\n    p_item_id,\n    v_user_id,\n    p_numeric_value,\n    p_text_value,\n    p_boolean_value,\n    p_logged_at,\n    p_logged_at::DATE,\n    p_notes\n  ) RETURNING value_id INTO v_value_id;\n  \n  RETURN v_value_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_daily_tracking_preferences",
    "args_signature": "p_user_id uuid, p_tracking_times time without time zone[], p_basal_temp_time time without time zone",
    "definition": "CREATE OR REPLACE FUNCTION public.save_daily_tracking_preferences(p_user_id uuid, p_tracking_times time without time zone[], p_basal_temp_time time without time zone)\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nDECLARE\n    v_result JSON;\nBEGIN\n    INSERT INTO public.daily_tracking_preferences (\n        user_id,\n        tracking_times,\n        basal_temp_time\n    ) VALUES (\n        p_user_id,\n        p_tracking_times,\n        p_basal_temp_time\n    )\n    ON CONFLICT (user_id) DO UPDATE SET\n        tracking_times = EXCLUDED.tracking_times,\n        basal_temp_time = EXCLUDED.basal_temp_time,\n        updated_at = NOW();\n\n    v_result := json_build_object(\n        'success', true,\n        'message', 'Daily tracking preferences saved successfully'\n    );\n    \n    RETURN v_result;\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'error', SQLERRM\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_patient_onboarding",
    "args_signature": "p_user_id uuid, p_data jsonb",
    "definition": "CREATE OR REPLACE FUNCTION public.save_patient_onboarding(p_user_id uuid, p_data jsonb)\n RETURNS jsonb\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n    v_result JSONB := '{\"success\": false}'::jsonb;\nBEGIN\n    -- Update profiles table\n    UPDATE public.profiles\n    SET \n        first_name = p_data->>'firstName',\n        middle_name = p_data->>'middleName',\n        last_name = p_data->>'lastName',\n        phone_number = p_data->>'phoneNumber',\n        onboarding_completed = true,\n        updated_at = NOW()\n    WHERE id = p_user_id;\n\n    -- Update patient_profiles\n    INSERT INTO public.patient_profiles (\n        user_id,\n        first_name,\n        last_name,\n        date_of_birth,\n        gender\n    ) VALUES (\n        p_user_id,\n        p_data->>'firstName',\n        p_data->>'lastName',\n        (p_data->>'dateOfBirth')::date,\n        (p_data->>'gender')::gender_enum\n    )\n    ON CONFLICT (user_id) DO UPDATE\n    SET \n        first_name = EXCLUDED.first_name,\n        last_name = EXCLUDED.last_name,\n        date_of_birth = EXCLUDED.date_of_birth,\n        gender = EXCLUDED.gender,\n        updated_at = NOW();\n\n    -- Save to patient_onboarding_data\n    INSERT INTO private_health_info.patient_onboarding_data (\n        user_id,\n        first_name,\n        middle_name,\n        last_name,\n        date_of_birth,\n        gender,\n        phone_number,\n        emergency_contact_name,\n        emergency_contact_phone,\n        emergency_contact_relationship,\n        selected_conditions,\n        track_menstrual_cycle,\n        share_research_data,\n        completed_at\n    ) VALUES (\n        p_user_id,\n        p_data->>'firstName',\n        p_data->>'middleName',\n        p_data->>'lastName',\n        (p_data->>'dateOfBirth')::date,\n        (p_data->>'gender')::gender_enum,\n        p_data->>'phoneNumber',\n        p_data->>'emergencyContactName',\n        p_data->>'emergencyContactPhone',\n        p_data->>'emergencyContactRelationship',\n        ARRAY(SELECT jsonb_array_elements_text(p_data->'selectedConditions'))::uuid[],\n        (p_data->>'trackMenstrual')::boolean,\n        (p_data->>'shareResearch')::boolean,\n        NOW()\n    )\n    ON CONFLICT (user_id) DO UPDATE\n    SET \n        first_name = EXCLUDED.first_name,\n        middle_name = EXCLUDED.middle_name,\n        last_name = EXCLUDED.last_name,\n        date_of_birth = EXCLUDED.date_of_birth,\n        gender = EXCLUDED.gender,\n        phone_number = EXCLUDED.phone_number,\n        emergency_contact_name = EXCLUDED.emergency_contact_name,\n        emergency_contact_phone = EXCLUDED.emergency_contact_phone,\n        emergency_contact_relationship = EXCLUDED.emergency_contact_relationship,\n        selected_conditions = EXCLUDED.selected_conditions,\n        track_menstrual_cycle = EXCLUDED.track_menstrual_cycle,\n        share_research_data = EXCLUDED.share_research_data,\n        completed_at = EXCLUDED.completed_at,\n        updated_at = NOW();\n\n    v_result := '{\"success\": true}'::jsonb;\n    RETURN v_result;\nEXCEPTION\n    WHEN OTHERS THEN\n        v_result := jsonb_build_object(\n            'success', false,\n            'error', SQLERRM\n        );\n        RETURN v_result;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_patient_onboarding_data",
    "args_signature": "p_user_id uuid, p_first_name text, p_middle_name text, p_last_name text, p_date_of_birth date, p_gender text, p_selected_conditions uuid[], p_track_menstrual_cycle boolean, p_emergency_contact_name text, p_emergency_contact_phone text",
    "definition": "CREATE OR REPLACE FUNCTION public.save_patient_onboarding_data(p_user_id uuid, p_first_name text, p_middle_name text, p_last_name text, p_date_of_birth date, p_gender text, p_selected_conditions uuid[], p_track_menstrual_cycle boolean, p_emergency_contact_name text, p_emergency_contact_phone text)\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_result JSON;\nBEGIN\n    -- Insert/update patient onboarding data\n    INSERT INTO private_health_info.patient_onboarding_data (\n        user_id,\n        first_name,\n        middle_name,\n        last_name,\n        date_of_birth,\n        gender,\n        selected_conditions,\n        track_menstrual_cycle,\n        emergency_contact_name,\n        emergency_contact_phone,\n        completed_at\n    ) VALUES (\n        p_user_id,\n        p_first_name,\n        p_middle_name,\n        p_last_name,\n        p_date_of_birth,\n        p_gender::gender_enum,\n        p_selected_conditions,\n        p_track_menstrual_cycle,\n        p_emergency_contact_name,\n        p_emergency_contact_phone,\n        NOW()\n    )\n    ON CONFLICT (user_id) DO UPDATE SET\n        first_name = EXCLUDED.first_name,\n        middle_name = EXCLUDED.middle_name,\n        last_name = EXCLUDED.last_name,\n        date_of_birth = EXCLUDED.date_of_birth,\n        gender = EXCLUDED.gender,\n        selected_conditions = EXCLUDED.selected_conditions,\n        track_menstrual_cycle = EXCLUDED.track_menstrual_cycle,\n        emergency_contact_name = EXCLUDED.emergency_contact_name,\n        emergency_contact_phone = EXCLUDED.emergency_contact_phone,\n        completed_at = NOW();\n\n    v_result := json_build_object(\n        'success', true,\n        'message', 'Patient onboarding data saved successfully'\n    );\n    \n    RETURN v_result;\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'error', SQLERRM\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_patient_onboarding_data",
    "args_signature": "p_user_id uuid, p_first_name text, p_middle_name text, p_last_name text, p_date_of_birth date, p_gender text, p_selected_conditions uuid[], p_track_menstrual_cycle boolean, p_basal_temp_time time without time zone, p_tracking_times text[], p_emergency_contact_name text, p_emergency_contact_phone text",
    "definition": "CREATE OR REPLACE FUNCTION public.save_patient_onboarding_data(p_user_id uuid, p_first_name text, p_middle_name text, p_last_name text, p_date_of_birth date, p_gender text, p_selected_conditions uuid[], p_track_menstrual_cycle boolean, p_basal_temp_time time without time zone, p_tracking_times text[], p_emergency_contact_name text, p_emergency_contact_phone text)\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_result JSON;\nBEGIN\n    -- Insert/update patient onboarding data\n    INSERT INTO private_health_info.patient_onboarding_data (\n        user_id,\n        first_name,\n        middle_name,\n        last_name,\n        date_of_birth,\n        gender,\n        selected_conditions,\n        track_menstrual_cycle,\n        basal_temp_time,\n        tracking_times,\n        emergency_contact_name,\n        emergency_contact_phone,\n        completed_at\n    ) VALUES (\n        p_user_id,\n        p_first_name,\n        p_middle_name,\n        p_last_name,\n        p_date_of_birth,\n        p_gender::private_health_info.gender_enum,\n        p_selected_conditions,\n        p_track_menstrual_cycle,\n        p_basal_temp_time,\n        p_tracking_times,\n        p_emergency_contact_name,\n        p_emergency_contact_phone,\n        NOW()\n    )\n    ON CONFLICT (user_id) DO UPDATE SET\n        first_name = EXCLUDED.first_name,\n        middle_name = EXCLUDED.middle_name,\n        last_name = EXCLUDED.last_name,\n        date_of_birth = EXCLUDED.date_of_birth,\n        gender = EXCLUDED.gender,\n        selected_conditions = EXCLUDED.selected_conditions,\n        track_menstrual_cycle = EXCLUDED.track_menstrual_cycle,\n        basal_temp_time = EXCLUDED.basal_temp_time,\n        tracking_times = EXCLUDED.tracking_times,\n        emergency_contact_name = EXCLUDED.emergency_contact_name,\n        emergency_contact_phone = EXCLUDED.emergency_contact_phone,\n        completed_at = NOW();\n\n    v_result := json_build_object(\n        'success', true,\n        'message', 'Patient onboarding data saved successfully'\n    );\n    \n    RETURN v_result;\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'error', SQLERRM\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_seizure_log",
    "args_signature": "p_user_id uuid, p_occurred_at timestamp with time zone, p_duration_seconds integer, p_seizure_type text, p_consciousness_level text, p_warning_signs text[], p_post_ictal_symptoms text[], p_possible_triggers text[], p_location_during text, p_rescue_medication_given boolean, p_emergency_services_called boolean, p_notes text",
    "definition": "CREATE OR REPLACE FUNCTION public.save_seizure_log(p_user_id uuid, p_occurred_at timestamp with time zone, p_duration_seconds integer DEFAULT NULL::integer, p_seizure_type text DEFAULT NULL::text, p_consciousness_level text DEFAULT NULL::text, p_warning_signs text[] DEFAULT NULL::text[], p_post_ictal_symptoms text[] DEFAULT NULL::text[], p_possible_triggers text[] DEFAULT NULL::text[], p_location_during text DEFAULT NULL::text, p_rescue_medication_given boolean DEFAULT false, p_emergency_services_called boolean DEFAULT false, p_notes text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n  v_log_id UUID;\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  INSERT INTO private_health_info.seizure_logs_research (\n    user_id, occurred_at, duration_seconds, seizure_type,\n    consciousness_level, warning_signs, post_ictal_symptoms,\n    possible_triggers, location_during, rescue_medication_given,\n    emergency_services_called, notes\n  ) VALUES (\n    p_user_id, p_occurred_at, p_duration_seconds, p_seizure_type,\n    p_consciousness_level, p_warning_signs, p_post_ictal_symptoms,\n    p_possible_triggers, p_location_during, p_rescue_medication_given,\n    p_emergency_services_called, p_notes\n  ) RETURNING log_id INTO v_log_id;\n  \n  RETURN v_log_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_symptom_log",
    "args_signature": "p_patient_id uuid, p_log_date date, p_overall_feeling integer, p_mood integer, p_energy_level integer, p_sleep_hours numeric, p_sleep_quality integer, p_sleep_disturbances jsonb, p_other_symptoms jsonb, p_symptom_notes text, p_shared_with_clinician boolean, p_visible_to_researchers boolean",
    "definition": "CREATE OR REPLACE FUNCTION public.save_symptom_log(p_patient_id uuid, p_log_date date, p_overall_feeling integer DEFAULT NULL::integer, p_mood integer DEFAULT NULL::integer, p_energy_level integer DEFAULT NULL::integer, p_sleep_hours numeric DEFAULT NULL::numeric, p_sleep_quality integer DEFAULT NULL::integer, p_sleep_disturbances jsonb DEFAULT NULL::jsonb, p_other_symptoms jsonb DEFAULT NULL::jsonb, p_symptom_notes text DEFAULT NULL::text, p_shared_with_clinician boolean DEFAULT false, p_visible_to_researchers boolean DEFAULT false)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n  v_log_id UUID;\nBEGIN\n  -- Security check: user can only create logs for themselves\n  IF p_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  -- Insert symptom log\n  INSERT INTO private_health_info.daily_symptom_logs (\n    patient_id,\n    log_date,\n    overall_feeling,\n    mood,\n    energy_level,\n    sleep_hours,\n    sleep_quality,\n    sleep_disturbances,\n    other_symptoms,\n    symptom_notes,\n    shared_with_clinician,\n    visible_to_researchers,\n    created_at,\n    updated_at\n  ) VALUES (\n    p_patient_id,\n    p_log_date,\n    p_overall_feeling,\n    p_mood,\n    p_energy_level,\n    p_sleep_hours,\n    p_sleep_quality,\n    p_sleep_disturbances,\n    p_other_symptoms,\n    p_symptom_notes,\n    p_shared_with_clinician,\n    p_visible_to_researchers,\n    NOW(),\n    NOW()\n  )\n  RETURNING log_id INTO v_log_id;\n  \n  RETURN v_log_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_tracking_entry",
    "args_signature": "p_user_id uuid, p_entry_date date, p_mood_level text, p_energy_level text, p_sleep_quality text, p_sleep_hours numeric, p_symptoms text[], p_notes text",
    "definition": "CREATE OR REPLACE FUNCTION public.save_tracking_entry(p_user_id uuid, p_entry_date date, p_mood_level text DEFAULT NULL::text, p_energy_level text DEFAULT NULL::text, p_sleep_quality text DEFAULT NULL::text, p_sleep_hours numeric DEFAULT NULL::numeric, p_symptoms text[] DEFAULT NULL::text[], p_notes text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n  v_id UUID;\nBEGIN\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  INSERT INTO private_health_info.tracking_entries (\n    user_id, entry_date, mood_level, energy_level, \n    sleep_quality, sleep_hours, symptoms, notes\n  ) VALUES (\n    p_user_id, p_entry_date, p_mood_level, p_energy_level,\n    p_sleep_quality, p_sleep_hours, p_symptoms, p_notes\n  )\n  ON CONFLICT (user_id, entry_date) \n  DO UPDATE SET\n    mood_level = EXCLUDED.mood_level,\n    energy_level = EXCLUDED.energy_level,\n    sleep_quality = EXCLUDED.sleep_quality,\n    sleep_hours = EXCLUDED.sleep_hours,\n    symptoms = EXCLUDED.symptoms,\n    notes = EXCLUDED.notes\n  RETURNING id INTO v_id;\n  \n  RETURN v_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_user_condition",
    "args_signature": "p_user_id uuid, p_condition_id uuid, p_diagnosis_date date",
    "definition": "CREATE OR REPLACE FUNCTION public.save_user_condition(p_user_id uuid, p_condition_id uuid, p_diagnosis_date date DEFAULT CURRENT_DATE)\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_result JSON;\nBEGIN\n    INSERT INTO private_health_info.user_conditions (\n        user_id,\n        condition_id,\n        diagnosis_date,\n        is_active\n    ) VALUES (\n        p_user_id,\n        p_condition_id,\n        p_diagnosis_date,\n        true\n    )\n    ON CONFLICT (user_id, condition_id) DO UPDATE SET\n        is_active = true,\n        diagnosis_date = EXCLUDED.diagnosis_date;\n\n    v_result := json_build_object(\n        'success', true,\n        'message', 'User condition saved successfully'\n    );\n    \n    RETURN v_result;\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'error', SQLERRM\n    );\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_user_medication",
    "args_signature": "p_user_id uuid, p_medication_id uuid, p_medication_name text, p_dosage_amount numeric, p_dosage_unit text, p_frequency text, p_times text[], p_is_active boolean",
    "definition": "CREATE OR REPLACE FUNCTION public.save_user_medication(p_user_id uuid, p_medication_id uuid DEFAULT NULL::uuid, p_medication_name text DEFAULT NULL::text, p_dosage_amount numeric DEFAULT NULL::numeric, p_dosage_unit text DEFAULT NULL::text, p_frequency text DEFAULT NULL::text, p_times text[] DEFAULT NULL::text[], p_is_active boolean DEFAULT true)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n  v_new_id UUID;\nBEGIN\n  -- HIPAA Compliance: Verify requesting user owns this data\n  IF p_user_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied: Users can only create their own medication records'\n      USING ERRCODE = '42501';\n  END IF;\n\n  -- Validate required fields\n  IF p_medication_id IS NULL AND p_medication_name IS NULL THEN\n    RAISE EXCEPTION 'Either medication_id or medication_name must be provided'\n      USING ERRCODE = '22000'; -- data_exception\n  END IF;\n\n  -- Insert medication record\n  INSERT INTO private_health_info.user_medications (\n    user_id,\n    medication_id,\n    medication_name,\n    dosage_amount,\n    dosage_unit,\n    frequency,\n    times,\n    start_date,\n    is_active\n  ) VALUES (\n    p_user_id,\n    p_medication_id,\n    p_medication_name,\n    p_dosage_amount,\n    p_dosage_unit,\n    p_frequency,\n    p_times,\n    CURRENT_DATE,\n    p_is_active\n  )\n  RETURNING id INTO v_new_id;\n\n  -- Audit logging\n  -- INSERT INTO audit_log (user_id, action, table_name, record_id)\n  -- VALUES (auth.uid(), 'INSERT', 'user_medications', v_new_id);\n\n  RETURN v_new_id;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "save_user_medication",
    "args_signature": "p_user_id uuid, p_medication_id uuid, p_medication_name text, p_dosage_amount numeric, p_dosage_unit text, p_times text[]",
    "definition": "CREATE OR REPLACE FUNCTION public.save_user_medication(p_user_id uuid, p_medication_id uuid, p_medication_name text, p_dosage_amount numeric, p_dosage_unit text, p_times text[])\n RETURNS json\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n    v_result JSON;\nBEGIN\n    INSERT INTO private_health_info.user_medications (\n        user_id,\n        medication_id,\n        medication_name,\n        dosage_amount,\n        dosage_unit,\n        times,\n        is_active\n    ) VALUES (\n        p_user_id,\n        p_medication_id,\n        p_medication_name,\n        p_dosage_amount,\n        p_dosage_unit,\n        p_times,\n        true\n    )\n    ON CONFLICT (user_id, medication_id) DO UPDATE SET\n        medication_name = EXCLUDED.medication_name,\n        dosage_amount = EXCLUDED.dosage_amount,\n        dosage_unit = EXCLUDED.dosage_unit,\n        times = EXCLUDED.times,\n        is_active = true;\n\n    v_result := json_build_object(\n        'success', true,\n        'message', 'User medication saved successfully'\n    );\n    \n    RETURN v_result;\nEXCEPTION WHEN OTHERS THEN\n    RETURN json_build_object(\n        'success', false,\n        'error', SQLERRM\n    );\nEND;\n$function$\n"
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
    "function_name": "search_diagnoses",
    "args_signature": "p_search_term text",
    "definition": "CREATE OR REPLACE FUNCTION public.search_diagnoses(p_search_term text)\n RETURNS TABLE(diagnosis_code text, diagnosis_name text, disease_category text, snomed_ct_code text, icd10_code text)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT \n    dl.diagnosis_code,\n    dl.diagnosis_name,\n    dl.disease_category,\n    dl.snomed_ct_code,\n    dl.icd10_code\n  FROM public.diagnoses_library dl\n  WHERE \n    dl.diagnosis_name ILIKE '%' || p_search_term || '%'\n    OR dl.diagnosis_code ILIKE '%' || p_search_term || '%'\n    OR dl.search_keywords ILIKE '%' || p_search_term || '%'\n  ORDER BY \n    CASE \n      WHEN dl.diagnosis_name ILIKE p_search_term || '%' THEN 1\n      WHEN dl.diagnosis_name ILIKE '%' || p_search_term || '%' THEN 2\n      ELSE 3\n    END,\n    dl.diagnosis_name\n  LIMIT 50;\nEND;\n$function$\n"
  },
  {
    "schema_name": "public",
    "function_name": "search_symptoms",
    "args_signature": "p_search_term text",
    "definition": "CREATE OR REPLACE FUNCTION public.search_symptoms(p_search_term text)\n RETURNS TABLE(symptom_code text, symptom_name text, category text, snomed_ct_code text, icd10_code text)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT \n    sl.symptom_code,\n    sl.symptom_name,\n    sl.category,\n    sl.snomed_ct_code,\n    sl.icd10_code\n  FROM public.symptoms_library sl\n  WHERE \n    sl.symptom_name ILIKE '%' || p_search_term || '%'\n    OR sl.search_keywords ILIKE '%' || p_search_term || '%'\n    OR sl.symptom_code ILIKE '%' || p_search_term || '%'\n  ORDER BY \n    CASE \n      WHEN sl.symptom_name ILIKE p_search_term || '%' THEN 1\n      WHEN sl.symptom_name ILIKE '%' || p_search_term || '%' THEN 2\n      ELSE 3\n    END,\n    sl.symptom_name\n  LIMIT 50;\nEND;\n$function$\n"
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
    "schema_name": "public",
    "function_name": "update_symptom_log",
    "args_signature": "p_log_id uuid, p_overall_feeling integer, p_mood integer, p_energy_level integer, p_sleep_hours numeric, p_sleep_quality integer, p_sleep_disturbances jsonb, p_other_symptoms jsonb, p_symptom_notes text, p_shared_with_clinician boolean, p_visible_to_researchers boolean",
    "definition": "CREATE OR REPLACE FUNCTION public.update_symptom_log(p_log_id uuid, p_overall_feeling integer DEFAULT NULL::integer, p_mood integer DEFAULT NULL::integer, p_energy_level integer DEFAULT NULL::integer, p_sleep_hours numeric DEFAULT NULL::numeric, p_sleep_quality integer DEFAULT NULL::integer, p_sleep_disturbances jsonb DEFAULT NULL::jsonb, p_other_symptoms jsonb DEFAULT NULL::jsonb, p_symptom_notes text DEFAULT NULL::text, p_shared_with_clinician boolean DEFAULT NULL::boolean, p_visible_to_researchers boolean DEFAULT NULL::boolean)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'private_health_info', 'public'\nAS $function$\nDECLARE\n  v_patient_id UUID;\nBEGIN\n  -- Get patient_id and verify ownership\n  SELECT patient_id INTO v_patient_id\n  FROM private_health_info.daily_symptom_logs\n  WHERE log_id = p_log_id;\n  \n  IF NOT FOUND THEN\n    RAISE EXCEPTION 'Symptom log not found' USING ERRCODE = '42501';\n  END IF;\n  \n  IF v_patient_id != auth.uid() THEN\n    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';\n  END IF;\n  \n  -- Update symptom log (only update non-null parameters)\n  UPDATE private_health_info.daily_symptom_logs\n  SET\n    overall_feeling = COALESCE(p_overall_feeling, overall_feeling),\n    mood = COALESCE(p_mood, mood),\n    energy_level = COALESCE(p_energy_level, energy_level),\n    sleep_hours = COALESCE(p_sleep_hours, sleep_hours),\n    sleep_quality = COALESCE(p_sleep_quality, sleep_quality),\n    sleep_disturbances = COALESCE(p_sleep_disturbances, sleep_disturbances),\n    other_symptoms = COALESCE(p_other_symptoms, other_symptoms),\n    symptom_notes = COALESCE(p_symptom_notes, symptom_notes),\n    shared_with_clinician = COALESCE(p_shared_with_clinician, shared_with_clinician),\n    visible_to_researchers = COALESCE(p_visible_to_researchers, visible_to_researchers),\n    updated_at = NOW()\n  WHERE log_id = p_log_id;\nEND;\n$function$\n"
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
