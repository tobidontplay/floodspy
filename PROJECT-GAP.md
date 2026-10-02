# PROJECT-GAP — FloodSpy

Audit date: 2026-10-01. Fleet status supplied for this pass: paused. Every capability in `PROJECT-STATE.md` has one row here. Gap means the distance between the claim a reader would make and the behavior in the tree.

| ID | Capability | Status | Claim a reader might make | Gap | Confidence |
|---|---|---|---|---|---|
| home-shell | Home page shell | done | The product opens on a monitoring page | None for the shell. The page does not yet monitor anything | [HIGH] |
| theme-toggle | Theme | done | The app supports light and dark | The control is implemented. This pass did not click it | [MED] |
| stats-overview | Home statistics | partial | The numbers are live counts | First paint is zero. The next numbers are constants inside `setTimeout` | [HIGH] |
| flood-map-display | Flood map | partial | The map shows current reports | It shows five hardcoded places on a placeholder image, positioned with a linear formula the file itself calls a demo | [HIGH] |
| flood-map-controls | Map controls | broken | Satellite, terrain, risk, and severity change the map | They change badge color or do nothing. The image does not change | [HIGH] |
| report-form | Report form | partial | Submitting the form files a report | It checks two fields and shows a thank-you toast. It does not send HTTP | [HIGH] |
| report-api | Store a report | broken | A signed-in POST stores a row | The handler is real and the live site returns 401 with no cookie. The UI never calls it. The form cannot satisfy the Zod body. The migration's foreign key and row security are not set up for Supabase Auth | [HIGH] |
| alerts-ui | Alerts on the page | partial | The list is recent warnings | Four constants. "2 hours ago" style text is computed from those constants, so the relative time looks real | [HIGH] |
| alerts-filter | Location filter | done | Typing a place filters alerts | It filters the in-memory array only | [MED] |
| alerts-api | Alerts from Supabase | partial | The page loads `/api/flood-alerts` | The route exists and rejects anonymous callers. The component does not fetch. There is no way to insert an alert | [HIGH] |
| auth-deny | Anonymous API rejection | done | Unsigned writes are refused | This part of the brief is met on the public URL | [HIGH] |
| sign-in | Sign in and sign up | absent | The nav button signs the user in | No handler, no page, live `/login` is 404, helpers are unused | [HIGH] |
| geolocation | Current location | broken | The pin button uses the device location | The button has no handler. The sentence under it is copy | [HIGH] |
| photo-evidence | Photo and depth AI | absent | A photo is stored and a model reads the depth | The file stays in the browser. The three checkmarks are static text | [HIGH] |
| notifications | Off-page alerts | absent | The switch enables notifications | It toggles a label. Nothing is subscribed or sent | [HIGH] |
| relief-feed | Relief feed | partial | The feed is live community video | Posts, likes, and comments are `lib/mock-data.ts` plus React state. Share menu items have no handlers. Bottom nav buttons have no handlers | [HIGH] |
| project-creator | Campaigns and donations | partial | A user can launch a relief campaign and pay creators | Save, invite, and launch do not persist. Totals are literals | [HIGH] |
| dashboard | Operator dashboard | partial | Operators see real volume and accuracy | Live HTML shows 2,853 and 87% as text, and says a chart would render in production. The page is not linked in the nav and is not behind a login | [HIGH] |
| prediction | Forecast | absent | The product predicts floods | No model. The processor ends on a fixed list of Lagos neighborhoods | [HIGH] |
| multichannel-alerts | SMS and email | absent | Alerts go out by SMS and email | Overview only | [HIGH] |
| sensors-weather | Sensors and weather | absent | NiMet and satellite data feed the alerts | Those words are `source` strings on mock alerts | [HIGH] |
| map-library | Real map | absent | Mapbox or Leaflet is the map | Not a dependency | [HIGH] |
| rls-policies | Row policies | absent | Enabling row level security secures the tables | The migration turns RLS on and adds no policy. In Postgres that denies the anon and authenticated API roles. The hosted database was not inspected | [HIGH] for the file. [LOW] for production |
| account-row | Auth user row | absent | `getUser().id` can be stored on a report | The foreign key targets `public.users`. No code inserts that row when someone signs up in Supabase Auth | [HIGH] |
| tests | Tests | absent | The setup doc's `pnpm test` runs a suite | There is no suite and no script | [HIGH] |
| ci | CI | absent | GitHub checks the build | No workflow file | [HIGH] |
| env-bootstrap | Env example | broken | `cp .env.example .env.local` works | The example file is not in the repo | [HIGH] |

## Three biggest gaps

1. **The screen and the server are two apps.** A visitor can use every control on `/`, `/feed`, and `/dashboard` and never touch Supabase. The routes, the migration, and the 401 gate are a second app that the buttons do not call. Specs and the architecture diagram say the page posts to the route. `components/report-form.tsx` does not. That is the gap that makes the rest of the paperwork sound finished.

2. **The database file would still reject a real report.** Even after someone wires `fetch`, three facts in the repo block a stored row: there is no sign-in screen, `flood_reports.user_id` references `public.users` while Auth users live in `auth.users`, and row level security is enabled with no policies. The form also collects `above-waist` and never collects coordinates, so the current form state is not a valid POST body. Confidence that the hosted database matches the file is [LOW]. Confidence that the file says this is [HIGH].

3. **The long docs describe a third product.** `docs/project-overview.md`, `docs/user-stories.md`, and `docs/data-models.md` specify sensors, forecasts, NextAuth, bcrypt, SMS, and planner tools. `docs/README.md` links to files that are not in the tree. Feature frontmatter says Done. `docs/verification.md` has no rows. A tutor who quizzes from the overview will mark a correct student wrong, and the other way around.

## Blocking gap

The blocking gap is **a resident cannot create a session and store a flood report**.

`specs/project-brief.md` says success is a signed-in user opening the map, submitting a report, and seeing alerts. The map and the alerts can be opened only as a demo. The submit path stops before the network. The deny path works: an anonymous POST is 401. The allow path has no UI, no matching user row, and no row policy in the migration.

Until that path exists, SMS, prediction, the feed, and the dashboard are later work. The fleet pause does not remove the gap. It explains why the gap is still here.
