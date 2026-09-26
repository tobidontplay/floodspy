# Tech Stack
| Layer | Choice | Where |
|---|---|---|
| App | Next.js, React, TypeScript | package.json |
| Style | Tailwind, Radix | package.json |
| Data | Supabase | lib/supabase.ts, supabase/ |

docs/project-overview.md also names Mapbox, Redux, NextAuth, and PostGIS. The code audited uses Supabase auth and the components above. Treat the extra tools as doc claims, not as detected dependencies, unless package.json lists them.
