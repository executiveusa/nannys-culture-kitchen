# A2A Handoff Contract — Architect → Instinct

This file defines how implementation work is handed to Instinct.

```yaml
protocol: A2A-NCK-v1
sender_role: Architect / Spec Governor
receiver_role: Instinct / Builder
project: Nanny's Culture Kitchen
repo: executiveusa/nannys-culture-kitchen
mode: brownfield
```

## Required packet

```yaml
task_id:
outcome:
user_job:
scope:
read_first:
protected_assets:
files_allowed:
files_protected:
design_lock:
content_lock:
truth_constraints:
acceptance_tests:
proof_required:
rollback:
human_approval_gates:
return_format:
```

## Builder law
Instinct implements the specification. Instinct does not reinterpret unresolved brand choices as permission to invent. If a required decision is missing, return `BLOCKED_BY_DECISION` with the smallest exact question.

## Required return
```text
DECISION
CHANGES
PROOF
STATUS
COMMERCIAL IMPACT
RISKS
ROLLBACK
NEXT
HUMAN APPROVAL
```

## Current slice
Outcome: public Puerto Vallarta Nanny's site + worksite lead capture while preserving `/nanny` AI OS.
Design authority: `20_design/design-lock.md`.
Truth authority: `10_strategy/evidence-ledger.md`.
Communication authority: `00_governance/communication-standard.md`.
