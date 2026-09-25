---
id: feat-001
title: "Flood map and alerts"
status: Done
stage: implemented
target_stage: verified
final_result: "The home page shows a flood map and an alerts list."
acceptance:
  - "app/page.tsx titles the product Crowdsourced Flood Monitoring."
  - "components/flood-map.tsx renders the map."
  - "components/alerts-list.tsx renders alerts."
  - "app/api/flood-alerts/route.ts exists."
validation:
  tests: unknown
  manual: unknown
  user_opinion: unknown
  verified_by: null
---

# Feature Spec: Flood map and alerts
- Status: Done
- Owner: FloodSpy
- Linked ADRs: none yet
- Linked AI Log Entries: [docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md](../../docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md)
## 1. Objective
The home page shows a flood map and an alerts list.
## 2. Requirements
### Functional
- app/page.tsx titles the product Crowdsourced Flood Monitoring.
- components/flood-map.tsx renders the map.
- components/alerts-list.tsx renders alerts.
- app/api/flood-alerts/route.ts exists.
### Non-Functional
- No test script. Do not claim forecast accuracy.
## 3. Technical Plan
- Affected Files: app/page.tsx, components/flood-map.tsx, components/alerts-list.tsx, app/api/flood-alerts/route.ts
- Data Model Changes: Supabase. Tables not transcribed.
- API Changes: Alerts route as above.
- Steps:
  1. Render the tabs.
  2. Load map data.
  3. Load alerts through the route.
## 4. Verification Plan
No tests. Manual: pnpm dev and open the map tab. Not run in this pass.
## 5. Content Angle
Hook: the overview doc promises a prediction platform. The page is a map, a form, and a list.
## 6. Open Questions
- What does the map query, and is that query public?
