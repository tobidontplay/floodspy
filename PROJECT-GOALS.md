# PROJECT-GOALS — FloodSpy

Audit date: 2026-10-01. Fleet status supplied for this pass: paused. This file separates what the repo says it is for from what the code can do. Status of features stays in `specs/features/*.md` frontmatter. This file does not change that frontmatter.

## Stated goals

These sentences are in the repo. They are not all the same product.

| ID | Goal | Where it is stated | Confidence |
|---|---|---|---|
| S1 | The home page maps floods, takes a report, and lists alerts, with Supabase behind the API routes | `AGENTS.md`, `README.md`, `docs/architecture/overview.md` | [HIGH] |
| S2 | A signed-in user can open the map, submit a report, and see alerts. An unsigned request to create a report is rejected | `specs/project-brief.md` success criteria, both still unchecked | [HIGH] |
| S3 | Flood reports require a Supabase user, because a public anon key must not be the only check | `docs/architecture/decisions/001-authenticated-reports.md` | [HIGH] |
| S4 | Give residents, responders, planners, and analysts real-time monitoring, personalized alerts, SMS and email, sensors, weather, and predictive models | `docs/project-overview.md`, `docs/user-stories.md` | [HIGH] |
| S5 | The overview's SMS, prediction, and planner tools are out of scope for the current tree | `specs/project-brief.md` Out of Scope, `CASE-STUDY.md`, `TODO.md` | [HIGH] |
| S6 | Confirm the owner still wants FloodSpy in the fleet. Last application commit is 2025-05-03 | `TODO.md` Now | [HIGH] |

S1 and S2 describe the app that was started. S4 describes a platform that was written up and not built. S5 is the later correction. S6 is the open question the fleet docs already asked. The pause status supplied for this audit matches S6 more than it matches a shipping product.

## Inferred goals

Inferred means the tree suggests the goal, and nobody wrote it as a finished decision.

| ID | Inference | Why it is only an inference | Confidence |
|---|---|---|---|
| I1 | Ship a believable demo of a Nigeria flood monitor that a reviewer can click | The map, alerts, stats, dashboard, and feed all render without credentials, using Lagos, Lekki, Abuja, and Port Harcourt placeholders | [MED] |
| I2 | Keep a real write path ready for a later Supabase project | The migration, Zod schema, and 401 gate exist even though the form does not call them. Commit `6bd13ff` is named "Restore original Supabase functionality for deployment" | [MED] |
| I3 | The relief feed and project creator were an extra v0 screen, not the monitoring MVP | They are reachable from the home page, they use a separate mock file, and no spec in `specs/features/` covers them | [MED] |
| I4 | The owner wanted the demo on the public internet | `https://floodspy.vercel.app` answered on 2026-10-01 with this app's HTML. The repo does not contain a Vercel project file, so intent is inferred from the deploy plus the May 2025 commit message | [MED] |
| I5 | Teaching and fleet paperwork became a goal of their own in September 2026 | Two docs-only commits add Ariadne files and do not change application behavior | [HIGH] |

## Success criteria

A criterion is met only if a stranger can do it against this tree or the public URL. The brief's checkboxes are still empty, and that matches the code.

| Criterion | Met? | What would count | Confidence |
|---|---|---|---|
| Anonymous API create is rejected | Yes, on the public URL | Live POST `/api/flood-reports` with no cookie returned HTTP 401 | [HIGH] |
| Anonymous API read is rejected | Yes, on the public URL | Live GET of both API routes returned HTTP 401 | [HIGH] |
| A signed-in user can submit a report that is stored | No | Needs a sign-in screen, a form that POSTs, a users row, and a row policy. None of those are complete in the tree | [HIGH] |
| The map shows stored reports | No | `components/flood-map.tsx` uses a constant array | [HIGH] |
| Alerts on the page are the alerts in the database | No | `components/alerts-list.tsx` uses a constant array | [HIGH] |
| The overview's adoption, accuracy, and incident metrics | No | No analytics pipeline. The dashboard numbers are literals | [HIGH] |
| Tests plus a manual check plus a user opinion, which `docs/verification.md` calls shipped | No | The verification table has no rows. Both feature specs leave `verified_by` null | [HIGH] |

## Non-goals

These are out of scope for the code that exists. They are still written as product goals in older docs. A reader should treat the older docs as a wish list.

| Non-goal for the current tree | Where the wish list still states it | Confidence |
|---|---|---|
| SMS and email delivery | `docs/project-overview.md` | [HIGH] |
| Predictive flood models | Overview, dashboard copy, `docs/data-models.md` Forecast table | [HIGH] |
| Sensor networks and weather ingestion | Overview, user stories, `docs/data-models.md` | [HIGH] |
| City-planner tools and exports | `docs/user-stories.md` Epic 5 | [HIGH] |
| A native mobile app | Overview phase 3 | [HIGH] |
| NextAuth and a hand-rolled password hash | Overview stack, `docs/data-models.md` security section. `bcryptjs` and `next-auth` are installed and unused | [HIGH] |
| A test suite, until someone adds one | `specs/project-brief.md` Out of Scope says "A test suite." | [HIGH] |
| Marking a feature accepted | `AGENTS.md` section 10. This audit does not do that | [HIGH] |

## Target user

| User | What they can do today | Confidence |
|---|---|---|
| A resident who opens the public site | Read a shell that says crowdsourced flood monitoring, see a loading map, and open a feed of placeholder posts. They cannot create an account | [HIGH] |
| A signed-in resident, the user in `specs/project-brief.md` | Not reachable from the UI. If they already had a Supabase session cookie, the routes would try to run. This pass did not have such a cookie | [HIGH] for the UI. [LOW] for what a real session would store |
| An emergency responder, planner, or analyst | Named in the overview and user stories. No role, no extra route, and no data export exists | [HIGH] |
| A future agent or tutor | This is the reader of the September 2026 docs and of this kit | [HIGH] |
| The owner, a CS student learning to sound senior | The repo's job, per the task for this kit, is to show the difference between a vision doc and a tree | [HIGH] |

## Stage

| Reading | Stage | Why | Confidence |
|---|---|---|---|
| Fleet | Paused | Supplied for this audit. `TODO.md` still asks whether the project stays in the fleet. Last application change is 2025-05-03 | [HIGH] |
| Product maturity | Prototype | The public pages render. The data they show is local and fake. The database path is written and not connected | [HIGH] |
| Feature frontmatter | `implemented`, status Done, `target_stage: verified` | That is what `specs/features/001-flood-map.md` and `002-flood-reports.md` say. Verification fields are `unknown` and `verified_by` is null. Do not read Done as accepted | [HIGH] |
| Overview phases | Phase 1 not finished | The overview's MVP includes real auth, location management, and a map of current flood data. Those are not in the tree | [HIGH] |

## Questions for the user

1. Is the pause a decision to leave FloodSpy as a demo, or a hold until the report write path is real?
2. Should a visitor see map and alerts without an account? Today the page shows fake data, and the API refuses everyone who is not signed in.
3. Is `public.users` with a password column intentional, or should `flood_reports.user_id` reference Supabase `auth.users`?
4. Are `/feed` and the project creator part of the product, or a side screen that should leave the home page story?
5. Is `https://floodspy.vercel.app` still the deployment you mean? It was serving this UI on 2026-10-01.
6. What port should `project.yaml` record? The config file does not set one. The setup doc assumes 3000.
7. Should `docs/project-overview.md` and `docs/data-models.md` be labeled vision, so they stop reading as the schema and the stack?
8. The feature specs say Done. The verification log is empty. Do you want that frontmatter left alone until you have watched a signed-in report?
