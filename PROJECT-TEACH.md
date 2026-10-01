# PROJECT-TEACH — FloodSpy

Audit date: 2026-10-01. Fleet status supplied for this pass: paused. This is the document a tutor can quiz from. Every claim below is defendable from a file, a commit, or an HTTP check on that date. If a sentence would require the hosted database, it says so and stays [LOW].

Jargon used here:

- A **route handler** is a server function in the Next.js `app` directory. `app/api/flood-reports/route.ts` answers HTTP for that URL.
- **Supabase** is a hosted Postgres database plus login. The **anon key** is a public key shipped to the browser. It is not a password for admin access. It identifies the project. **Row level security (RLS)** is the Postgres switch that decides which rows that key may touch.
- A **foreign key** means a column may only hold an id that already exists in another table.
- **Hydration** is the moment React in the browser takes over HTML that the server already sent.
- A **prototype** here means the pages render and the data on them is invented in the browser.

## Mental model

FloodSpy is three layers that do not meet.

1. **The demo layer** is what a visitor gets. `app/page.tsx` draws a nav, four stat cards, and tabs. The map, the form, the alerts, the stats, the feed, and the dashboard each invent their data with `useState` and `setTimeout`, or with literals. Opening `https://floodspy.vercel.app/` on 2026-10-01 returned that shell. The map's first HTML says "Loading flood data..." and the stat for active alerts is `0`, which is the React initial state, before the timer writes 12.

2. **The API layer** is two route handlers and middleware. They ask Supabase who the caller is. If there is no session they return 401. That deny path is live: the same host returned `{"error":"Unauthorized"}` for GET and POST `/api/flood-reports` and GET `/api/flood-alerts` when no cookie was sent.

3. **The vision layer** is `docs/project-overview.md`, `docs/user-stories.md`, and `docs/data-models.md`. It describes sensors, forecasts, SMS, NextAuth, and bcrypt. The SQL file does not create those tables. The package file installs NextAuth and bcrypt and no application file imports them.

A senior reading of this repo starts with layer 1 and layer 2, and treats layer 3 as a backlog. `CASE-STUDY.md` and `specs/project-brief.md` already say that. Older docs do not.

The feature specs are a fourth voice. Their frontmatter says status Done and stage `implemented`. Their validation block says tests, manual, and user opinion are `unknown`, and `verified_by` is null. `docs/verification.md` defines shipped as all three of those passing, and its table is empty. Done in the spec is not the same word as shipped in the verification log.

## Architecture

```text
Browser
  app/page.tsx ---------> FloodMap, ReportForm, AlertsList, StatsOverview
  app/feed/page.tsx ----> mockFeedData, mockCreators
  app/dashboard/page.tsx > literals and FloodDataProcessor
        |
        |  none of those components call fetch()
        |
  middleware.ts  on /api/* and /dashboard/*
        |
        |  401 only if path starts with /api and getSession() is empty
        |
  app/api/flood-reports/route.ts   GET, POST   getUser() then flood_reports
  app/api/flood-alerts/route.ts    GET         getUser() then flood_alerts
        |
        |  anon key + user cookie, via app/auth/supabase.ts
        |
  Supabase Postgres (not visible from this clone)
```

Defendable consequences:

- The architecture diagram in `docs/architecture/overview.md` draws an arrow from the report form to the reports route. The form file has no such call. The diagram is the intended design. The code is the demo. [HIGH]
- Middleware's `config.matcher` includes `/dashboard/:path*`, and the function body only returns 401 for paths that start with `/api`. The public dashboard returned HTTP 200 with no cookie. [HIGH]
- GET `/api/flood-reports` does not add `.eq('user_id', user.id)`. Any signed-in caller who got past RLS would receive every report the query returns. The spec and `docs/architecture/api.md` say the list is that user's reports. [HIGH]
- The alerts route file begins with a space before `import`. The module still loads: the live GET returned JSON 401 from this route's error shape, not a compile error. [HIGH]
- `lib/supabase.ts` is the browser client and it throws if the public env vars are missing. Nothing imports it. Commit `6bd13ff` moved the alerts route off that import and onto `supabaseServer`. [HIGH]
- There is no `pages/` directory. Routing is the App Router only. [HIGH]

## Key decisions

| Decision | Where it lives | What it costs | Confidence |
|---|---|---|---|
| Reports and alerts require a Supabase user | Routes and ADR 001 | A resident who will not sign in cannot use the API. The ADR also says the page posts through the route. That sentence is false | [HIGH] |
| The anon key stays on the server routes, not in a browser insert | `app/auth/supabase.ts` uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` inside a server client | The key is still public by Supabase's design. Safety depends on RLS. The migration enables RLS and adds no policy | [HIGH] |
| Do not treat the overview as the spec | `specs/project-brief.md`, `CASE-STUDY.md`, `TODO.md` | Anyone who only reads `docs/project-overview.md` will still think SMS and prediction shipped | [HIGH] |
| Ignore TypeScript and ESLint failures during `next build` | `next.config.mjs` | A bad badge variant or a type error will not fail the deploy. `warning` and `success` are passed to `Badge` and are not in `badgeVariants` | [HIGH] |
| Generate the UI with v0 and keep the kit | `generator: 'v0.dev'`, package name `my-v0-project`, a large `components/ui` directory | Most of that kit is unused. The product looks bigger than the behavior | [HIGH] |
| Cap feature stage at implemented until a person validates | Frontmatter `target_stage: verified`, `verified_by: null` | An agent must not mark these accepted. This audit does not | [HIGH] |

ADR 001 rejected two alternatives that are still visible in the repo: inserting from the browser with the anon key, and using NextAuth. The code agrees with that rejection. The overview and the unused dependencies do not.

## Technologies

| Technology | Why it is here | What a beginner should notice | Confidence |
|---|---|---|---|
| Next.js 15 App Router | Pages and route handlers in one project | `"use client"` marks a file that runs in the browser. The map, form, alerts, stats, feed, and dashboard widgets are client components. The route files are server code | [HIGH] |
| React 19 | UI | State in the form is the only copy of a report. Refreshing the page drops it | [HIGH] |
| Tailwind and Radix | Styling and controls | `components.json` is the shadcn config. It points CSS at `app/globals.css` | [HIGH] |
| Zod | POST body check | The schema requires `coordinates.lat` and `coordinates.lng` and a water level of `ankle`, `knee`, or `waist`. A thrown Zod error is caught and returned as HTTP 500 with a generic message, not 400. That path was not executed live | [HIGH] for the source. [MED] for the status code in production |
| Supabase SSR | Cookie session on the server | `getSession()` in middleware reads the cookie. `getUser()` in the routes asks the Auth server. Supabase documents `getUser()` as the check that does not trust the cookie alone. The routes do call `getUser()` | [HIGH] |
| PostGIS geography | The migration column type | The insert sends a text point. This pass did not execute the insert, so the cast is unproven | [MED] |
| pnpm | The lockfile | `docs/development-setup.md` matches `pnpm dev` and `pnpm build`. It also documents test and format scripts that `package.json` does not have | [HIGH] |
| Vercel | The live host | Response headers on 2026-10-01 included `server: Vercel` and `x-nextjs-prerender: 1` for `/` | [HIGH] |

Not in the application, even if a doc names them: Mapbox, Leaflet, D3, Redux, NextAuth as a wired login, a password hash, an SMS provider, a weather API.

## Failure modes

| Mode | What the user sees | Mechanism | Confidence |
|---|---|---|---|
| Demo success | "Report submitted" toast | `setTimeout` in `handleSubmit`. No network | [HIGH] |
| Honest denial | JSON 401 | Middleware and the route both check for a user. Live check confirmed the deny | [HIGH] |
| Silent map filter | Severity dropdown does not change dots | `Select` has no `onValueChange` | [HIGH] |
| Wrong water level | If the form were wired, "Above waist" would not validate | Form value `above-waist` is outside the Zod enum and outside the SQL check | [HIGH] |
| Missing coordinates | If the form were wired, POST would fail Zod | The form state has no lat or lng. The pin button does not call geolocation | [HIGH] |
| Foreign key failure | A signed-in insert could fail even with a valid body | `user_id` references `public.users`. Auth's user id is not inserted anywhere in this repo | [HIGH] for the file. [LOW] that production has the same constraint |
| RLS denial | A signed-in select or insert could return a permission error | RLS is enabled and the migration has no policy. Hosted database not inspected | [HIGH] for the file. [LOW] for production |
| Empty env on a future import | Process crash at import | `lib/supabase.ts` throws when the URL or anon key is missing. It is currently unimported | [HIGH] |
| Build hides type errors | Deploy succeeds with broken types | `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` | [HIGH] |
| Dashboard overclaim | "Prediction Accuracy 87%" | A literal in `app/dashboard/page.tsx`. Live HTML contained that phrase | [HIGH] |
| Docs send a new contributor to missing files | Broken links and a missing `.env.example` | `docs/README.md` and `docs/development-setup.md` | [HIGH] |

The relative timestamps on alerts are not a clock from the server. `formatTimeAgo` subtracts a `Date` that the effect just created with `Date.now() - hours`. They will say "2 hours ago" on every page load. [HIGH]

## Conventions

| Convention | What to copy | What not to copy | Confidence |
|---|---|---|---|
| Paths | `@/` maps to the repo root in `tsconfig.json` | Do not add a second `lib/supabase` client. The server helper is `app/auth/supabase.ts` | [HIGH] |
| Specs before features | `AGENTS.md` says no feature without `specs/features/NNN-name.md` | The feed and the dashboard have no feature spec. That is a gap, not a pattern to extend | [HIGH] |
| Feature status | Frontmatter fields `stage`, `validation`, `verified_by` | Do not mark `accepted` or fill `verified_by` without the user | [HIGH] |
| Logging | `docs/ai-log/entries/` plus a row in `docs/ai-log/index.md` | The template's prompt section should hold the real prompt | [HIGH] |
| Git | This repo's real history is `main` plus docs commits. Commit style in the docs commits is `chore:` and `docs:` | `docs/git-strategy.md` describes `develop`, `feature/*`, and `release/*`. Those branches are not in this clone | [HIGH] |
| Secrets | `.gitignore` ignores `.env*` | Do not commit a service-role key. None is in the tree. The setup doc's example file is missing, so a new clone has no template either | [HIGH] |
| UI kit | Import from `components/ui` when a primitive exists | Do not add another copy of `use-toast`. `hooks/use-toast.ts` is the one the toaster uses | [HIGH] |

## Open questions

These are the questions a tutor should ask the owner, not questions the code already answers.

| Question | Why it is still open | Confidence that it is open |
|---|---|---|
| Is the pause "stop" or "not yet"? | `TODO.md` asks it. This audit was told the fleet status is paused. The public URL still serves the demo | [HIGH] |
| Should reads of the map and alerts be public? | The page is public and fake. The API is private. ADR 001 says it did not fully trace whether the map query is public. The component shows it is not a query | [HIGH] |
| Does the hosted database match the migration? | No env file, no Supabase dashboard, and the 401 returns before a query | [HIGH] that this is unknown |
| Will `POINT(lng lat)` insert into a geography column through PostgREST? | The route sends that string. It was not executed | [HIGH] that this is unproven |
| Is the relief feed in the product? | It is on the home page and in no feature spec | [HIGH] |
| Which port belongs in `project.yaml`? | The config does not set one. The setup doc says 3000 | [HIGH] |
| Who is the git author `User <user@example.com>`? | The commits use that placeholder. The GitHub account in `AGENTS.md` is `tobidontplay`. This file does not invent a personal name | [HIGH] |

## Claims this kit refuses

- That a signed-in report has been stored. Not observed.
- That row level security in production matches the SQL file. Not observed. [LOW] if someone asserts that it does.
- That the placeholder map's coordinates are a correct projection. The formula is a demo clamp, and the file says so.
- That 87% is a measured accuracy.
- That `pnpm lint` fails. ESLint is not listed as a dependency and the command was not run. [MED] at most.
- That clicking a tab shows the form. Inactive tab panels were empty in the prerendered HTML. The source will render them after a click. The click was not performed. [MED] for the runtime, [HIGH] for the source.
