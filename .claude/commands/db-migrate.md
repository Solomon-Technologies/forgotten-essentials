---
description: Generate safe migration from current state
allowed-tools: Bash(supabase:*), Read, Write
argument-hint: [description of change needed]
---

# Load Current Schema
Read ./forge-state/db-snapshots/LATEST/schema.sql if exists

Based on: $ARGUMENTS

Generate a SAFE migration that:

1. **Creates UP migration** (apply changes)
2. **Creates DOWN migration** (rollback)
3. **Preserves existing data**
4. **Adds appropriate indexes**
5. **Includes RLS policies if new table**

⚠️ SAFETY RULES:
- Never DROP without explicit confirmation
- Never ALTER columns with >1000 rows without review
- Always use transactions
- Always include rollback

Output migration to: ./supabase/migrations/[timestamp]_[description].sql

Ask for human approval before running:
`supabase db push`