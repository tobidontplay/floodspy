# System Architecture Overview
## 1. Purpose
Crowdsourced flood monitoring. The home page maps floods, takes a report, and lists alerts. Supabase backs the API routes.
## 2. High-Level Diagram
```mermaid
graph TD
    Page[app/page.tsx] --> Map[components/flood-map.tsx]\n    Page --> Report[components/report-form.tsx]\n    Page --> Alerts[components/alerts-list.tsx]\n    Report --> Api[app/api/flood-reports]\n    Api --> Supabase
```
## 3. Components
| Component | Responsibility | Tech | Location |
|---|---|---|---|
| Home | Tabs for map, report, and alerts | Next.js | app/page.tsx |
| Map | Flood map | React | components/flood-map.tsx |
| Reports API | List and create reports for the signed-in user | Next route | app/api/flood-reports/route.ts |
| Alerts API | Flood alerts route | Next route | app/api/flood-alerts/route.ts |
| Auth | Supabase session in middleware | Supabase SSR | middleware.ts |
## 4. Data Flow
1. The home page renders the map, the report form, and the alerts list.
2. Report routes call supabase.auth.getUser() before reading or writing.
3. The browser client uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (lib/supabase.ts).
## 5. Key Decisions
- Report reads and writes go through the route and require a user. See the route and ADR 001.
- The vision doc is not the spec. Feature specs cover the pages and routes that exist.
## 6. Future Considerations
- Either build the overview's SMS and prediction work as new specs, or mark that doc as a vision.
- Add tests before project.yaml can name a test command.
