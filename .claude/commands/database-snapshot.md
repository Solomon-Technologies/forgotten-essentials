---
description: Create database snapshot before any schema work
allowed-tools: Bash(supabase:*), Bash(psql:*), Bash(mkdir:*), Write
---

# Create Timestamp Directory
!`mkdir -p ./forge-state/db-snapshots/$(date +%Y%m%d_%H%M%S)`

!`SNAPSHOT_DIR=$(ls -td ./forge-state/db-snapshots/*/ 2>/dev/null | head -1) && echo "Snapshot dir: $SNAPSHOT_DIR"`

Create a complete database snapshot:

1. **Schema dump** (data only if needed)
2. **Table statistics** (row counts, sizes)  
3. **Foreign key map** (relationships)
4. **Current RLS policies** (security rules)

Save all outputs to the snapshot directory.
Update symlink: `ln -sfn $SNAPSHOT_DIR ./forge-state/db-snapshots/LATEST`

Report:
- Tables captured
- Total rows across database
- Any tables without RLS (flag as warning)
- Any functional issues in infrastructure 