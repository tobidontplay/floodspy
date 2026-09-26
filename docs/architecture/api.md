# API
Next.js route handlers under app/api. flood-reports checks the Supabase user on GET and POST. flood-alerts exists as app/api/flood-alerts/route.ts. This pass did not paste every query.

| Method | Path | Purpose |
|---|---|---|
| GET | /api/flood-reports | List reports for the signed-in user. |
| POST | /api/flood-reports | Create a report for the signed-in user. |
| GET/POST | /api/flood-alerts | Alerts route. Handler body was not fully transcribed. |
