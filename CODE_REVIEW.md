# Code Review Analysis - Spotia3

Code quality review focused on architectural patterns, code organization, and best practices for developer feedback.

---

## CRITICAL

| # | Title | Location |
|---|-------|----------|
| 1 | `console.log` with debug messages left in production code | `src/lib/aiClient.ts:36-41` — logs `"1. entrando a callGemini"` inside `callGPT` (wrong function name too) |
| 2 | Copy-paste error in error logging across API routes | `top-tracks/route.ts:34` and `play-list/route.ts:37` both say `"Error top artists:"` instead of their own entity |
| 3 | Inconsistent error handling across AI providers | `callGemini` validates with Zod + handles 429; `callGPT` returns raw string; `callClaude` accesses `data.content[0].text` with no null-check |
| 4 | Claude API called with wrong auth header | `aiClient.ts:99` uses `Authorization: Bearer` but Anthropic requires `x-api-key` header |

## HIGH

| # | Title | Location |
|---|-------|----------|
| 5 | `fetchWithToken` utility duplicated 3 times | Same function in `top-artists/route.ts`, `top-tracks/route.ts`, `play-list/route.ts` — extract to shared `src/lib/spotify/client.ts` |
| 6 | API route handlers nearly identical with no shared middleware | `top-artists`, `top-tracks`, `play-list` routes repeat 15+ lines of session/auth/error boilerplate each |
| 7 | Direct DOM manipulation in a React component | `Iframe.tsx:27-36` uses `document.createElement`, `appendChild`, `removeChild` + module-level mutable state — bypasses React's virtual DOM |
| 8 | Hardcoded API URLs scattered across files | Spotify token URL, Gemini API URL, Anthropic URL all hardcoded inline instead of centralized constants |
| 9 | Non-null assertions (`!`) on environment variables | `route.ts:8-9` uses `process.env.SPOTIFY_CLIENT_ID!` — silently becomes `undefined` if missing. Project has `env.js` with Zod but doesn't use it consistently |

## MEDIUM

| # | Title | Location |
|---|-------|----------|
| 10 | NavBar repeats same button pattern 3x — no reusable NavItem | `navBar.tsx:16-52` — extract a `<NavItem>` component with path, label, icons as props |
| 11 | MusicPredictions repeats identical card markup 3x | `MusicPredictions.tsx:14-41` — same card structure, only colors/emoji/label differ. Map over config array instead |
| 12 | `TimeRange` type defined inline in multiple places | `"short_term" \| "medium_term" \| "long_term"` repeated in 3+ files — should be shared in `src/types/` |
| 13 | Component mixes data fetching with UI rendering | `PerfilMusicalIA.tsx` fetches data, triggers mutations, AND renders UI. Use container/presenter pattern |
| 14 | Inline styles mixed with Tailwind | `PerfilMusicalIA.tsx:100-103` uses `style={{ width, transition }}` while rest uses Tailwind. Stay consistent |
| 15 | `SPOTIFY_API` constant duplicated in 3 files | Each Spotify lib file declares `const SPOTIFY_API = "https://api.spotify.com/v1"` independently |
| 16 | Dashboard lifts AI state unnecessarily | `dashboard/page.tsx` manages `iaText`/`iaDate` and passes callbacks down then data back up — inverted flow. Colocate or use context |

## LOW

| # | Title | Location |
|---|-------|----------|
| 17 | Inconsistent `type` vs `interface` style | `MusicPredictions.tsx` uses `type Props`, `PerfilMusicalIA.tsx` uses `interface Props` — pick one convention |
| 18 | Inconsistent naming conventions (Spanish/English mix) | `rangoTiempo` vs `timeRange`, `limite` vs `limit`, `IsActive` (PascalCase) should be `isActive` |
| 19 | Files named `route.ts` in `src/lib/` are not route handlers | `src/lib/spotify/*/route.ts` are service functions, not Next.js routes. Rename to `service.ts` |
| 20 | Missing return types on exported functions | `getTopArtists`, `getTopTracks`, `askAI` lack explicit return types |
| 21 | `useFetchQuery` doesn't include dynamic params in queryKey | Uses `queryKey: [key]` — React Query won't refetch when query params change unless they're in the key |
| 22 | No centralized error boundary | App relies on per-component `if (isError)` checks instead of React Error Boundaries |
