# Security
The report route requires a user. The anon key is public and only safe if row security matches that assumption. middleware.ts refreshes the Supabase session. No service role key was seen in the client file.
