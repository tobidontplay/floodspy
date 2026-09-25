---
id: feat-002
title: "Authenticated flood reports"
status: Done
stage: implemented
target_stage: verified
final_result: "A signed-in user can submit a flood report that the API stores."
acceptance:
  - "components/report-form.tsx is the form."
  - "POST /api/flood-reports checks supabase.auth.getUser()."
  - "GET lists that user's reports."
validation:
  tests: unknown
  manual: unknown
  user_opinion: unknown
  verified_by: null
---

# Feature Spec: Authenticated flood reports
- Status: Done
- Owner: FloodSpy
- Linked ADRs: docs/architecture/decisions/001-authenticated-reports.md
- Linked AI Log Entries: [docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md](../../docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md)
## 1. Objective
A signed-in user can submit a flood report that the API stores.
## 2. Requirements
### Functional
- components/report-form.tsx is the form.
- POST /api/flood-reports checks supabase.auth.getUser().
- GET lists that user's reports.
### Non-Functional
- Anonymous create is not the contract of this route.
## 3. Technical Plan
- Affected Files: components/report-form.tsx, app/api/flood-reports/route.ts, middleware.ts
- Data Model Changes: Supabase report rows.
- API Changes: GET and POST /api/flood-reports.
- Steps:
  1. Require a user.
  2. Insert the report.
  3. List it back.
## 4. Verification Plan
No tests. Manual: sign in, submit, confirm the row. Not run in this pass.
## 5. Content Angle
Hook: the anon key is in the browser, so the write has to be checked on the server anyway.
## 6. Open Questions
- Confirm the reports table name in supabase/migrations before quoting it.
