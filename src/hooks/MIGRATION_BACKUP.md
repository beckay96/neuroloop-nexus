# Backup of Hook File Migrations

This file contains the migration status and changes for all hook files.

## Files to Update:
1. ✅ useConditions.tsx - PARTIALLY DONE (addCondition and deleteCondition still need updating)
2. ⏳ useTrackingEntries.tsx - 4 locations
3. ⏳ useSeizureLogs.tsx - 4 locations
4. ⏳ useSeizureResearch.tsx - 7 locations
5. ⏳ useSymptomLogs.tsx - 4 locations
6. ⏳ useTremorLogs.tsx - 4 locations
7. ⏳ useGaitLogs.tsx - 4 locations
8. ⏳ useMenstrualLogs.tsx - 4 locations
9. ⏳ useTemperatureLogs.tsx - 4 locations
10. ⏳ useMedicationLogs.tsx - 4 locations
11. ⏳ usePatientConnections.tsx - 1 location

## Pattern to follow:
```typescript
// BEFORE:
.schema('private_health_info')
.from('table_name')
.select('*')
.eq('user_id', userId)

// AFTER:
.rpc('get_table_data', { p_user_id: userId })
```
