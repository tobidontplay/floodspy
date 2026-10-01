# Entry 0002 — Deep analysis and teaching kit
- Date: 2026-10-01 19:35
- Agent: Cursor
- Model: Grok 4.7
- Session Goal: Write a five-file audit and teaching kit for FloodSpy without changing application code.
- Duration: one cloud-agent session
## Prompt(s) Sent
> 1. TASK: Deep analysis and teaching kit for one project. You are a senior engineer performing a full audit of a single codebase. Your output is not application code. It is a layered documentation kit for three readers: the owner (CS student learning to sound senior), a future AI agent, and a Tutor who will quiz from these docs. The repo is floodspy at the repository root (GitHub tobidontplay/floodspy). Status in Ariadne fleet: paused — still analyze honestly. Produce five files at the repo root. Additive docs only. Do not modify application code. Allowed: create PROJECT-STATE.md, PROJECT-GOALS.md, PROJECT-GAP.md, PROJECT-TEACH.md, PROJECT-CONTEXT.yaml; append Project Analysis Artifacts section to AGENTS.md; create ai-log entry and update index. READ FIRST (do not skim): every file; git log --oneline -100; specs/, docs/, README, CHANGELOG, CASE-STUDY, TODO if present. FILE 1 through FILE 5 and STEP 6 and STEP 7 as specified in the task. DO NOT modify app code, delete, reorganize, add deps, start servers, touch Ariadne. DONE: PR commit "docs: deep analysis and teaching kit for floodspy". Final report with line counts, what it is, 3 gaps, blocking gap, [LOW] claims, questions, defend paragraph.
## Reply Summary
> FloodSpy is a paused prototype. The public pages render a demo. The API rejects anonymous callers and the UI never calls it. Wrote PROJECT-STATE.md, PROJECT-GOALS.md, PROJECT-GAP.md, PROJECT-TEACH.md, and PROJECT-CONTEXT.yaml. Appended AGENTS.md section 11 and this log. Did not change application code, feature frontmatter, project.yaml, or the verification log.
## Full Reply / Key Excerpts
> The blocking gap is that a resident cannot create a session and store a flood report. The three largest gaps are the disconnected demo and API, a migration that is not set up for Supabase Auth, and vision docs that describe a third product. Live checks on 2026-10-01: GET / , /feed, and /dashboard returned 200; /login returned 404; the three API methods returned 401 without a cookie. Hosted database contents were not inspected.
## Considerations
- Feature specs say Done. The verification log is empty. The kit records that contradiction and does not edit the frontmatter, because the task said not to touch Ariadne.
- concepts.md was not given a new row for the same reason. The teaching file holds the concepts instead.
- No local server was started. Evidence from outside the tree is HTTP against the already deployed URL.
- docs/content/ideas.md got one row because AGENTS.md section 7 says every session produces a content angle. That file is not an Ariadne status surface.
## Alternatives Considered
- Alternative A: Mark map, alerts, and reports as done because the feature frontmatter says Done. Rejected because the components resolve fake data and the form does not call the route.
- Alternative B: Claim the hosted database denies rows because the migration enables RLS with no policy. Rejected as a production fact. The SQL file says that. The hosted database was not queried. The kit marks that claim [LOW] if asserted about production.
- Alternative C: Boot pnpm dev and click the tabs. Rejected because the task said not to start servers. The public URL was already up, so HTTP checks were used instead of a local process.
## Learning Notes (For the Human)
- Concept introduced: a success toast is not a write. The report form waits 1.5 seconds and then thanks the user. Persistence would be a POST that returns the stored row.
- Why it matters: a demo that looks finished will be quoted as shipped. The senior move is to name the layer that is real. Here the 401 is real and the map dots are not.
- Where to read more: PROJECT-TEACH.md, components/report-form.tsx, app/api/flood-reports/route.ts, supabase/migrations/20250329162200_initial_schema.sql.
## Content Angles
> At least one. This feeds /docs/content/ideas.md.
- Type: teaching
- Idea: a success toast that never calls the server
- Hook: The form says the flood report was submitted, and the network tab stays empty.
## Files Changed
- PROJECT-STATE.md — identity, stack, capabilities, endpoints, and breaks, in tables
- PROJECT-GOALS.md — stated and inferred goals, non-goals, questions
- PROJECT-GAP.md — one gap per capability, three largest, blocking gap
- PROJECT-TEACH.md — mental model, architecture, decisions, failure modes
- PROJECT-CONTEXT.yaml — analysis_version 1 context for a tutor or agent
- AGENTS.md — section 11 pointing at those files
- docs/ai-log/entries/0002-2026-10-01-deep-analysis-teaching-kit.md — this entry
- docs/ai-log/index.md — row 0002
- docs/content/ideas.md — one teaching row
## Verification
> No application tests. Manual HTTP against https://floodspy.vercel.app on 2026-10-01: home, feed, and dashboard 200; login 404; API routes 401 without a cookie. YAML parsed with Python. No browser clicks. No pnpm dev.
## Follow-ups / Open Questions
- [ ] Owner: is the pause a stop or a hold?
- [ ] Should map and alert reads be public?
- [ ] Does the hosted database match the migration?
- [ ] Is the relief feed in scope?
- [ ] Which port should project.yaml record?
