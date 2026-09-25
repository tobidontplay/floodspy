# ADR 001: Flood reports require a Supabase user
- Date: 2026-09-25
- Status: Accepted
## Context
A crowdsourced map that accepts anonymous writes will fill with junk, and a public anon key must not be the only check.
## Decision
app/api/flood-reports/route.ts loads the user and continues only when getUser returns one. The page posts through that route.
## Consequences
- Positive: Writes are tied to an account.
- Negative: A resident who will not sign in cannot report. The overview doc's open community story is wider than this.
- Neutral: The map can still render for a reader. Whether the map query is public was not fully traced.
## Alternatives Considered
- Alternative A: Insert from the browser with the anon key. Rejected because the route already exists and checks the user.
- Alternative B: NextAuth, as the overview doc suggests. Rejected because the code uses Supabase auth.
