#!/bin/bash

# Apply carer_invitations migration to remote database
# Project: evcdikzpnjjpotbkkshs (neuroloop-database-compliant)

echo "Applying carer_invitations migration..."

psql "postgresql://postgres.evcdikzpnjjpotbkkshs:[YOUR-PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres" \
  -f supabase/migrations/20250106_carer_invitations.sql

echo "Migration applied!"
