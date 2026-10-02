# PROJECT-STATE — FloodSpy

Audit date: 2026-10-01. Fleet status supplied for this pass: paused. Evidence is the tree at `main` plus HTTP checks against `https://floodspy.vercel.app` on that date. No local server was started. No signed-in request was sent. Confidence is [HIGH], [MED], or [LOW].

## Identity

| Field | Value | Confidence |
|---|---|---|
| Name | FloodSpy | [HIGH] |
| Repository | `tobidontplay/floodspy` | [HIGH] |
| Package name | `my-v0-project` in `package.json` | [HIGH] |
| Owner recorded in-repo | GitHub account `tobidontplay` | [HIGH] |
| Git author on the two app commits | `User <user@example.com>` | [HIGH] |
| Personal name of the owner | Not recorded in this repo | [HIGH] |
| Generator mark | `generator: 'v0.dev'` in `app/layout.tsx` | [HIGH] |
| Product commits | `d64137b` 2025-03-29 initial; `6bd13ff` 2025-05-03 alerts route switched to the server Supabase client | [HIGH] |
| Docs commits after the app | `5464192` 2026-09-25 and `1ad788c` 2026-09-26, both Ariadne fleet onboarding | [HIGH] |
| Branches in this clone | `main` only, plus remote `cursor/ariadne-fleet-onboarding-8bb6` | [HIGH] |
| Fleet status | Paused, as supplied for this audit. The repo does not store that word | [HIGH] |
| Public URL checked | `https://floodspy.vercel.app` returned HTTP 200 HTML that matches this tree | [HIGH] |
| Where that URL is written | `docs/architecture/deployment.md` says a portfolio README links it. This pass did not open that other README | [MED] |

## Stack

| Layer | What the tree uses | What a vision doc claims instead | Confidence |
|---|---|---|---|
| Language | TypeScript, `strict: true` | Same | [HIGH] |
| App | Next.js 15.1.0 App Router, React 19 | Next.js | [HIGH] |
| Style | Tailwind CSS 3.4, Radix primitives, shadcn-style `components/ui` | Tailwind | [HIGH] |
| Package manager | pnpm (`pnpm-lock.yaml`). Scripts: `dev`, `build`, `start`, `lint` | Not stated | [HIGH] |
| Validation | `zod` on `POST /api/flood-reports` only | Not stated | [HIGH] |
| Data client | `@supabase/supabase-js` and `@supabase/ssr` | PostgreSQL and PostGIS | [HIGH] |
| Auth in code | Supabase Auth (`getUser` in routes, `getSession` in middleware) | NextAuth.js in `docs/project-overview.md` | [HIGH] |
| Auth libraries present but unused | `next-auth`, `bcryptjs` | NextAuth and bcrypt in overview and `docs/data-models.md` | [HIGH] |
| Maps | None. CSS background plus absolutely positioned dots | Mapbox or Leaflet, D3 | [HIGH] |
| Charts | `recharts` is a dependency and `components/ui/chart.tsx` wraps it. The dashboard does not import it | D3 | [HIGH] |
| State | Component `useState`. No Redux, no React Context store for flood data | Context or Redux | [HIGH] |
| Host | Vercel response headers on the URL above. No workflow file in the repo | Vercel or AWS | [HIGH] |
| Port | Not set in `next.config.mjs`. Next's own default is 3000 and `docs/development-setup.md` says that. `project.yaml` records `port: null` | 3000 in the setup doc | [HIGH] |
| Build safety | `next.config.mjs` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` | Not stated | [HIGH] |
| Tests | No test script, no test files, no ESLint package in `package.json` | `pnpm test` in `docs/development-setup.md` | [HIGH] |
| CI | No `.github/workflows`. `project.yaml` has `github.ci: null` | Not stated | [HIGH] |

## Components

| Component | Path | What it does in this tree | Wired to data? | Confidence |
|---|---|---|---|---|
| Root layout | `app/layout.tsx` | Inter font, theme provider, toaster, page title | No | [HIGH] |
| Home | `app/page.tsx` | Nav, stats, three tabs: map, report, alerts, link to `/feed` | Imports the four widgets below | [HIGH] |
| Main nav | `components/main-nav.tsx` | Links to `/` and `/feed`, theme toggle, Sign In button with no handler | No | [HIGH] |
| Theme | `components/theme-provider.tsx`, `components/theme-toggle.tsx` | `next-themes` light, dark, system | Local only | [HIGH] |
| Stats | `components/stats-overview.tsx` | After 800ms, shows 12, 87, 34, and 65%. First paint is zeros | No | [HIGH] |
| Flood map | `components/flood-map.tsx` | After 1500ms, five hardcoded Nigeria points on `placeholder.svg` | No | [HIGH] |
| Report form | `components/report-form.tsx` | Client checks, local image preview, success toast after 1500ms | Does not call the API | [HIGH] |
| Alerts list | `components/alerts-list.tsx` | After 1000ms, four hardcoded alerts. Location filter is real | No | [HIGH] |
| Relief feed page | `app/feed/page.tsx` | Renders `FeedLayout` | Mock module | [HIGH] |
| Feed layout | `components/feed/feed-layout.tsx` | For You / Following, project-creator toggle, bottom nav buttons with no handlers | Mock | [HIGH] |
| Content feed and card | `components/feed/content-feed.tsx`, `content-card.tsx`, `comments-section.tsx` | Mock posts, local likes, saves, comments | `lib/mock-data.ts` | [HIGH] |
| Project creator | `components/feed/project-creator.tsx` | Campaign form, creator cards, hardcoded dollars | `mockCreators` only | [HIGH] |
| Dashboard | `app/dashboard/page.tsx` | Hardcoded 2,853 reports, 24 alerts, 87% accuracy, chart placeholders | No | [HIGH] |
| Data processor | `components/flood-data-processor.tsx` | Progress timer, then a fixed "high risk" list | No | [HIGH] |
| Reports route | `app/api/flood-reports/route.ts` | GET and POST, require `getUser()`, Zod on POST, insert into `flood_reports` | Supabase, if a session exists | [HIGH] |
| Alerts route | `app/api/flood-alerts/route.ts` | GET only, require `getUser()`, query `flood_alerts` | Supabase, if a session exists | [HIGH] |
| Server auth helpers | `app/auth/supabase.ts` | Cookie client. `signIn`, `signUp`, `signOut`, `getSession`, `getUser` are exported and never imported | Used only as `supabaseServer` by the two routes | [HIGH] |
| Browser client | `lib/supabase.ts` | Throws if the two public env vars are missing. No app file imports it | Dead after commit `6bd13ff` | [HIGH] |
| Middleware | `middleware.ts` | Runs on `/api/:path*` and `/dashboard/:path*`. Returns 401 only when the path starts with `/api` and `getSession()` is empty | Live 401 observed. Dashboard stays open | [HIGH] |
| UI kit | `components/ui/*` | shadcn-style primitives. Product code uses a subset listed under Dead code | Kit | [HIGH] |

## Capabilities

Status words: done, partial, broken, planned, absent.

| ID | Capability | Status | Evidence | Confidence |
|---|---|---|---|---|
| home-shell | Home page shell with three tabs | done | Live HTML contains the title, tab triggers, and the map's loading state | [HIGH] |
| theme-toggle | Light, dark, and system theme | done | `ThemeToggle` is mounted from the nav and the feed header. Not clicked in this pass | [MED] |
| stats-overview | Home statistics | partial | Live HTML shows Active Alerts `0` before hydration. The component then writes fake numbers | [HIGH] |
| flood-map-display | A map of flood reports | partial | Placeholder image and five constants. Comment in the file says a real map library is not used | [HIGH] |
| flood-map-controls | Severity filter and satellite / terrain / risk views | broken | `view` state changes the badge style only. The `Select` has `defaultValue` and no change handler | [HIGH] |
| report-form | Submit a flood report from the page | partial | Form validates location and water level, then toasts success. `fetch` does not appear in the file | [HIGH] |
| report-api | Store a report for a signed-in user | broken | Route exists. Live unauthenticated POST returned 401. No sign-in page. Form never calls the route. Migration problems are in Data Model | [HIGH] |
| alerts-ui | Read recent alerts on the home page | partial | Four constants, including sources named NiMet and satellite. Those names are strings, not integrations | [HIGH] |
| alerts-filter | Filter the on-screen alerts by location text | done | `filteredAlerts` uses `includes` on the local array. Not clicked in this pass | [MED] |
| alerts-api | Read alerts from Supabase | partial | GET route exists. Live GET without a cookie returned 401. The list component does not call it. No POST | [HIGH] |
| auth-deny | Reject an API call with no session | done | Live GET and POST `/api/flood-reports` and GET `/api/flood-alerts` returned `{"error":"Unauthorized"}` and HTTP 401 | [HIGH] |
| sign-in | Create a session from the product UI | absent | Sign In button has no `onClick`. Live `/login` returned 404. Helpers in `app/auth/supabase.ts` have no callers | [HIGH] |
| geolocation | Fill location from the device | broken | Pin button has no handler. Helper text says the pin uses the current location | [HIGH] |
| photo-evidence | Upload a photo and estimate depth | absent | A `File` stays in React state. Copy says "Our AI analyzes water depth". No model and no upload route | [HIGH] |
| notifications | Deliver alerts off the page | absent | The switch flips local React state. No push, SMS, or email code | [HIGH] |
| relief-feed | Relief social feed | partial | `/feed` returned HTTP 200. Posts come from `lib/mock-data.ts`. Likes and comments stay in memory | [HIGH] |
| project-creator | Relief campaigns, creator invites, donations | partial | Inputs are uncontrolled. Analytics numbers are constants, including `$24,850` | [HIGH] |
| dashboard | Operator dashboard | partial | Live `/dashboard` returned HTTP 200 with `2,853`, `Prediction Accuracy`, and "Time-series chart would render here". No session required | [HIGH] |
| prediction | Forecast floods | absent | Dashboard and processor display fixed text. No model file | [HIGH] |
| multichannel-alerts | SMS and email alerts | absent | Named only in `docs/project-overview.md` | [HIGH] |
| sensors-weather | Sensors, weather, NiMet, satellite feeds | absent | Named in mock alert sources and in `docs/data-models.md`. No client for them | [HIGH] |
| map-library | Leaflet or Mapbox | absent | Not in `package.json` | [HIGH] |
| rls-policies | Row policies so the anon key can read and write | absent | Migration enables row level security and contains no `CREATE POLICY` | [HIGH] |
| account-row | A `public.users` row for the Supabase Auth user | absent | No trigger, no insert into `users`, and the report foreign key points at `public.users` | [HIGH] |
| tests | Automated tests | absent | No test files and no test script | [HIGH] |
| ci | Continuous integration | absent | No workflow directory | [HIGH] |
| env-bootstrap | A new clone can configure Supabase from the repo | broken | `docs/development-setup.md` says `cp .env.example .env.local`. That example file is not in the tree | [HIGH] |

## Endpoints

| Method | Path | Auth in code | What it returns | Called by the UI? | Live check 2026-10-01 | Confidence |
|---|---|---|---|---|---|---|
| GET | `/` | None | Home shell | n/a | HTTP 200, prerendered | [HIGH] |
| GET | `/feed` | None | Relief feed page | Linked from home and nav | HTTP 200 | [HIGH] |
| GET | `/dashboard` | Matcher includes it. The function does not reject a missing session | Hardcoded dashboard | Not linked from `MainNav` | HTTP 200 without a cookie | [HIGH] |
| GET | `/login` | n/a | No page | Sign In does not link here | HTTP 404 | [HIGH] |
| GET | `/api/flood-reports` | Middleware session, then `getUser()`. Optional query `location`, `severity` | `{ reports }` from `flood_reports`, all rows the query returns, not filtered by `user_id` | No | HTTP 401 without a cookie | [HIGH] |
| POST | `/api/flood-reports` | Same | Inserts location, a `POINT(lng lat)` string, water level, description, image URL, `user_id` | No | HTTP 401 without a cookie | [HIGH] |
| GET | `/api/flood-alerts` | Same. Optional `location`, `severity` | `{ alerts }` from `flood_alerts` | No | HTTP 401 without a cookie | [HIGH] |
| POST | `/api/flood-alerts` | n/a | No handler. `docs/architecture/api.md` says GET/POST | No | Not requested | [HIGH] |

## External Dependencies

| Dependency | Required by | Present in the repo? | Confidence |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Middleware and `app/auth/supabase.ts` | Named in code. No `.env` and no `.env.example` | [HIGH] |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same | Same | [HIGH] |
| Supabase project with the migration applied | The two routes | SQL file only. This pass could not see the hosted database | [LOW] |
| Supabase Auth users | `getUser()` | No signup UI in the tree | [HIGH] |
| Vercel | The checked URL | Response header `server: Vercel`. No project config file in the repo | [HIGH] |
| Google fonts | `next/font/google` Inter | Runtime fetch at build, not vendored | [MED] |
| Map, SMS, weather, or model APIs | Vision docs | Not referenced in application code | [HIGH] |
| NiMet | A string on a mock alert | Not an HTTP client | [HIGH] |

## Data Model

The migration `supabase/migrations/20250329162200_initial_schema.sql` is the only schema in code. `docs/data-models.md` describes users, locations, sensors, forecasts, and bcrypt passwords. Those tables are not in the SQL file.

| Table | Columns that matter | Constraints in the SQL | Used by code | Confidence |
|---|---|---|---|---|
| `users` | `id` uuid, `email` unique, `password` text, timestamps | Primary key. No link to `auth.users` | Foreign key target only. Nothing inserts a row | [HIGH] |
| `flood_alerts` | `severity`, `location`, `message`, `source`, `affected_areas` text array, timestamps | `severity` in `high`, `medium`, `low` | GET route selects it | [HIGH] |
| `flood_reports` | `location`, `coordinates` geography point 4326, `water_level`, `description`, `image_url`, `verified` default false, `user_id` | `water_level` in `ankle`, `knee`, `waist`. `user_id` references `users(id)` on delete set null | POST inserts those fields except `verified` | [HIGH] |
| Indexes | Alerts by location and severity. Reports by location. Reports coordinates GIST | Present in the migration | Not exercised here | [HIGH] |
| Row level security | Enabled on alerts and reports | No `CREATE POLICY` in the file | A policy-less enabled table denies the anon and authenticated roles in Postgres. Whether the hosted database matches this file was not checked | [HIGH] for the file. [LOW] for the hosted database |
| Report water levels in the form | `ankle`, `knee`, `waist`, `above-waist` | `above-waist` is outside Zod and outside the check constraint | A future POST of that value would fail validation | [HIGH] |
| Coordinates on insert | Route writes ``POINT(${lng} ${lat})`` as text | Column type is `geography(point, 4326)` | Whether PostgREST accepts that string was not executed | [MED] |

## Tests

| Check | Result | Confidence |
|---|---|---|
| Unit, integration, or end-to-end test files | None | [HIGH] |
| `package.json` test script | Absent. Setup doc still documents `pnpm test`, `pnpm test:watch`, `pnpm test:coverage` | [HIGH] |
| `docs/verification.md` | Header row only. No verification event | [HIGH] |
| Feature frontmatter `validation.tests` | `unknown` on both feature specs | [HIGH] |
| Lint script | `next lint` is defined. `eslint` is not a dependency. `next.config.mjs` ignores ESLint and TypeScript during builds. Lint was not run | [HIGH] for the files. [MED] that `pnpm lint` fails |
| This pass | HTTP reads of the public site. No browser clicks. No `pnpm dev` | [HIGH] |

## Dead code

| Item | Why it is dead | Confidence |
|---|---|---|
| `lib/supabase.ts` | No importer after alerts moved to `supabaseServer` | [HIGH] |
| `signIn`, `signUp`, `signOut`, `getSession`, `getUser` in `app/auth/supabase.ts` | Exported, never imported | [HIGH] |
| `next-auth`, `bcryptjs` | In `package.json` only | [HIGH] |
| `styles/globals.css` | Same contents as `app/globals.css`. `components.json` points Tailwind at `app/globals.css`. Nothing imports `styles/globals.css` | [HIGH] |
| Second `import './globals.css'` at the bottom of `app/layout.tsx` | The file already imports `@/app/globals.css` | [HIGH] |
| `components/ui/use-toast.ts` | Callers import `@/hooks/use-toast` | [HIGH] |
| `components/ui/use-mobile.tsx` | `sidebar.tsx` imports `@/hooks/use-mobile` | [HIGH] |
| `hooks/use-mobile.tsx` | Only imported by `components/ui/sidebar.tsx`, which no page imports | [HIGH] |
| UI files with no product importer | `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `breadcrumb`, `calendar`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `resizable`, `sheet`, `sidebar`, `skeleton`, `sonner`, `table`, `toggle`, `toggle-group` | [HIGH] |
| Matching unused libraries | `recharts`, `react-hook-form`, `@hookform/resolvers`, `embla-carousel-react`, `cmdk`, `vaul`, `input-otp`, `react-day-picker`, `sonner` are only reached from those unused UI files, or from nowhere | [HIGH] |
| `postId` on `CommentsSection` | Accepted and never read | [HIGH] |
| Docs linked from `docs/README.md` that are not files | `docs/architecture.md`, `docs/api/README.md`, `docs/testing.md`, `docs/deployment.md`, `docs/contributing.md`, `docs/design/figma/`, `docs/design/user-flows/` | [HIGH] |

## What works E2E

"E2E" here means an HTTP exchange with the deployed site on 2026-10-01, or a behavior that is entirely inside one component and was still not clicked. Clicked browser flows were not run.

| Flow | Result | Evidence class | Confidence |
|---|---|---|---|
| Open `/` | HTTP 200. Title "FloodSpy - Crowdsourced Flood Monitoring". Map tab shows "Loading flood data...". Stats show 0 | Live HTTP | [HIGH] |
| Open `/feed` | HTTP 200 | Live HTTP | [HIGH] |
| Open `/dashboard` with no cookie | HTTP 200. Body includes `2,853`, `Prediction Accuracy`, and the chart placeholder sentence | Live HTTP | [HIGH] |
| Call the three API methods with no cookie | HTTP 401 and `{"error":"Unauthorized"}` | Live HTTP | [HIGH] |
| Open `/login` | HTTP 404 | Live HTTP | [HIGH] |
| Theme toggle, tab change, report toast, alert text filter, feed like | Present in source. Not clicked | Source only | [MED] |

## What is broken

| Break | Why it fails a user | Confidence |
|---|---|---|
| The home page never calls the API | Map, stats, form, and alerts finish inside `setTimeout` or a toast | [HIGH] |
| There is no way to sign in | Button, no route, unused helpers. The API then has nobody to authorize | [HIGH] |
| A report cannot be stored from this UI | The form does not send coordinates, does not send `imageUrl`, and offers `above-waist`, which the route and the SQL check both reject | [HIGH] |
| GET reports is not "this user's reports" | The query has no `.eq('user_id', user.id)`. Specs and `docs/architecture/api.md` say it lists that user's reports | [HIGH] |
| Migration is not a working Supabase Auth schema | RLS is on with zero policies. `user_id` points at `public.users`, and nothing creates that row from Auth. Hosted database may differ | [HIGH] for the file. [LOW] for production |
| ADR 001 says the page posts through the route | `components/report-form.tsx` does not | [HIGH] |
| Feature specs say status Done and stage implemented | `docs/verification.md` is empty. `validation.manual` is `unknown`. The UI behavior above is still simulated | [HIGH] |
| Dashboard claims prediction accuracy | The number 87% is a literal. Middleware does not protect the page even though the matcher lists it | [HIGH] |
| Map controls do nothing | View badges and the severity select do not change markers or the image | [HIGH] |
| Badge variants `warning` and `success` | `components/ui/badge.tsx` defines `default`, `secondary`, `destructive`, `outline` only. Medium and low badges pass unknown variants | [HIGH] |
| Setup doc cannot be followed | Missing `.env.example`, missing test scripts, missing `pnpm format`, and a `develop` branch that `docs/git-strategy.md` requires and this clone does not have | [HIGH] |
| `lib/supabase.ts` throws on import when env is missing | Harmless today because nothing imports it. A later import would crash module load | [HIGH] |
