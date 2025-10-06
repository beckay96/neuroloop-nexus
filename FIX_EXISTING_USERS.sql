-- Fix existing users by manually calling initialize_new_user
-- This will also test if the function works and create logs

-- User 1
SELECT public.initialize_new_user(
    '13bfb2c7-e216-4975-ac49-8a7c06b15466'::uuid,
    'rebea96@hotmail.com',
    'patient'
);

-- User 2
SELECT public.initialize_new_user(
    'a7ab7736-8fd4-43b3-942a-0ce1e6d1e028'::uuid,
    'rebeay96@hotmail.com',
    'patient'
);

-- User 3
SELECT public.initialize_new_user(
    '0eeee938-76d3-403c-9b0f-4ef2581b7913'::uuid,
    'rebec6@hotmail.com',
    'patient'
);

-- Check if it worked
SELECT 
    u.email,
    p.user_type,
    p.onboarding_completed,
    pp.id as patient_profile_exists
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
LEFT JOIN public.patient_profiles pp ON u.id = pp.user_id
WHERE u.id IN (
    '13bfb2c7-e216-4975-ac49-8a7c06b15466',
    'a7ab7736-8fd4-43b3-942a-0ce1e6d1e028',
    '0eeee938-76d3-403c-9b0f-4ef2581b7913'
);

-- Check logs after running
SELECT * FROM public.system_logs 
WHERE function_name = 'initialize_new_user'
ORDER BY created_at DESC
LIMIT 20;
