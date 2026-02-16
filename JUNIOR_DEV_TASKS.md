# Junior Developer Learning Tasks - Spotia3

A curated list of tasks for junior developers to learn and practice real-world development skills. Tasks are organized by difficulty level and skill area.

---

## Difficulty Legend

| Level | Description |
|-------|-------------|
| 🟢 **Beginner** | Good first issues. Minimal context needed. |
| 🟡 **Intermediate** | Requires understanding of existing patterns. |
| 🔴 **Advanced** | Involves architecture decisions or multiple systems. |

---

## 🟢 Beginner Tasks

### 1. Fix the `TopGenere` component naming typo
**Skills:** TypeScript, refactoring, file renaming
**File:** `src/app/_components/TopGenere.tsx`, `src/utils/topGenere.ts`

"Genere" should be "Genre" throughout the codebase. Rename the files, component, and all imports that reference them.

**What you'll learn:**
- How imports work across a project
- Safe refactoring practices
- Running tests after changes to confirm nothing broke

---

### 2. Remove the `console.log` in the AI client
**Skills:** Code cleanup, debugging awareness
**File:** `src/lib/aiClient.ts:55`

There's a `console.log("Respuesta de Gemini:", data)` that should not be in production code. Remove it or replace it with a proper conditional logger.

**What you'll learn:**
- Why debug logs shouldn't ship to production
- How to find and clean up debug code

---

### 3. Add TypeScript types to the `ButtonPruebaIA` component
**Skills:** TypeScript, React state typing
**File:** `src/app/_components/buttonPruebaIA.tsx`

The `useState()` on line 6 has no type annotation. The `handelClick` function name has a typo (should be `handleClick`). Add proper types and fix the naming.

**What you'll learn:**
- TypeScript generics with React hooks (`useState<string>`)
- Importance of consistent naming conventions
- How to add loading and error states to a component

---

### 4. Improve the loading component with accessibility
**Skills:** HTML accessibility, React
**File:** `src/app/_components/loading.tsx`

Add proper ARIA attributes (`aria-live`, `role="status"`) to the loading spinner so screen readers can announce loading states.

**What you'll learn:**
- Web accessibility (a11y) fundamentals
- ARIA roles and live regions
- Why accessibility matters for all users

---

### 5. Write unit tests for the `topGenere` utility
**Skills:** Testing with Vitest
**File:** `src/utils/topGenere.ts`, `src/utils/topGenere.test.ts`

Expand the existing tests to cover edge cases: empty arrays, artists with no genres, duplicate genres, and single-artist inputs.

**What you'll learn:**
- Writing meaningful unit tests
- Thinking about edge cases
- Using Vitest assertions and test structure

---

### 6. Add a "Back to Top" button on the dashboard
**Skills:** React, CSS, DOM APIs
**Where:** Dashboard page

When the user scrolls down past their top artists/tracks, show a floating button that smoothly scrolls back to the top.

**What you'll learn:**
- `window.scrollTo` and scroll event listeners
- Conditional rendering in React
- CSS positioning (`fixed`, `z-index`)

---

## 🟡 Intermediate Tasks

### 7. Implement a "Recently Played Tracks" section
**Skills:** Spotify API, React Query, component creation
**Files:** New API route + new component + new hook

The Spotify OAuth scope already includes `user-read-recently-played`. Create:
1. An API route at `src/app/api/spotify/recently-played/route.ts`
2. A React Query hook `useRecentlyPlayed.ts`
3. A component to display the recently played tracks with timestamps

**What you'll learn:**
- Working with external APIs (Spotify Web API)
- Following existing patterns in a codebase (look at `top-tracks` for reference)
- React Query data fetching and caching

---

### 8. Implement the "Music Analyses" database table
**Skills:** Database design, Drizzle ORM, migrations
**File:** `src/db/schema.ts:85-87`

There's a placeholder comment for a music analyses table. Design and implement it to store AI-generated personality profiles for users based on their listening data.

Suggested fields: `id`, `userId`, `analysisText`, `generatedAt`, `provider` (which AI was used), `timeRange`.

**What you'll learn:**
- Database schema design
- Drizzle ORM table definitions
- Running migrations with `drizzle-kit`
- Foreign key relationships

---

### 9. Connect the AI feature to real user data
**Skills:** API integration, prompt engineering
**Files:** `src/lib/aiClient.ts`, `src/app/api/askAI/route.ts`

Currently the AI endpoint uses hardcoded song lists. Modify it to:
1. Accept the user's actual top tracks/artists as input
2. Build a dynamic prompt from the user's real Spotify data
3. Return a personalized music personality description

**What you'll learn:**
- API design (request/response payloads)
- Prompt engineering for AI models
- Connecting frontend data to backend processing

---

### 10. Add a dark mode / theme toggle
**Skills:** CSS, Tailwind, React Context
**Where:** Layout and all components

Implement a theme toggle that switches between light and dark modes. Store the preference in `localStorage`.

**What you'll learn:**
- Tailwind CSS dark mode (`dark:` prefix)
- React Context API for global state
- `localStorage` for persisting user preferences
- CSS custom properties / theming patterns

---

### 11. Complete the internationalization (i18n) system
**Skills:** Next.js routing, JSON, React
**Where:** `src/app/[locale]/` and new translation files

The locale routing structure exists but translations are incomplete. Create:
1. Translation JSON files for `es` and `en`
2. A translation hook or utility function
3. A language switcher component in the UI

**What you'll learn:**
- Internationalization patterns in Next.js
- Dynamic routing with `[locale]`
- Managing translation strings
- Building a language selector UI

---

### 12. Add error boundary components
**Skills:** React error handling, UX
**Where:** Dashboard sections

Create React Error Boundary components that catch rendering errors in each dashboard section (artists, tracks, playlists) independently, so one section failing doesn't break the whole page.

**What you'll learn:**
- React Error Boundaries (`componentDidCatch`)
- Graceful degradation patterns
- User-friendly error messages with retry buttons

---

### 13. Implement playlist detail view with track listing
**Skills:** Dynamic routing, Spotify API, React
**Where:** New page under dashboard

When a user clicks on a playlist, navigate to a detail page that shows all tracks in that playlist with album art, duration, and artist names. The API route `play-list/[id]/tracks` already exists.

**What you'll learn:**
- Next.js dynamic routes (`[id]`)
- Paginated API calls (Spotify paginates playlist tracks)
- Building detail views from list views

---

### 14. Add data export functionality (CSV/JSON)
**Skills:** File generation, browser APIs
**Where:** Dashboard with export buttons

Let users export their top artists, tracks, or playlist data as CSV or JSON files.

**What you'll learn:**
- Generating files in the browser (`Blob`, `URL.createObjectURL`)
- CSV formatting logic
- JSON serialization
- Download triggers via anchor elements

---

## 🔴 Advanced Tasks

### 15. Implement listening history trends with charts
**Skills:** Chart.js, data aggregation, time series
**Where:** New dashboard section

Create a new section that shows how the user's top artists/genres have changed over different time periods (last month vs. 6 months vs. all time) using line or bar charts.

**What you'll learn:**
- Data visualization with Chart.js
- Comparing datasets across time ranges
- Chart configuration and customization
- Responsive chart layouts

---

### 16. Add OAuth with additional providers (Google, GitHub)
**Skills:** NextAuth.js, OAuth, database
**Files:** `src/lib/auth.ts`, `src/db/schema.ts`

Allow users to sign in with Google or GitHub in addition to Spotify, then link their Spotify account separately.

**What you'll learn:**
- OAuth 2.0 flow with multiple providers
- NextAuth.js provider configuration
- Account linking strategies
- Session management with multiple auth sources

---

### 17. Build a music recommendation engine
**Skills:** Algorithm design, Spotify API, AI
**Where:** New API route + new dashboard section

Use the user's top genres and artists to find and suggest new music via the Spotify Recommendations API endpoint.

**What you'll learn:**
- Spotify's recommendation endpoints
- Seed-based recommendation algorithms
- Presenting recommendations in a compelling UI
- Combining multiple data sources

---

### 18. Implement rate limiting and caching for API routes
**Skills:** Backend architecture, performance
**Where:** API middleware or route handlers

Add rate limiting to prevent API abuse and implement server-side caching (in-memory or Redis) for Spotify API responses to reduce external calls.

**What you'll learn:**
- Rate limiting strategies (token bucket, sliding window)
- Server-side caching patterns
- Middleware in Next.js
- Performance optimization

---

### 19. Add end-to-end testing with Playwright
**Skills:** E2E testing, CI/CD
**Where:** New test directory and CI workflow

Set up Playwright for end-to-end tests covering:
- Login flow (mocked OAuth)
- Dashboard rendering
- Time range filtering
- Navigation between sections

**What you'll learn:**
- E2E testing concepts vs. unit testing
- Playwright test authoring and selectors
- Mocking authentication in tests
- Integrating E2E tests into CI/CD pipelines

---

### 20. Build a shareable profile card
**Skills:** Canvas API or server-side image generation, social sharing
**Where:** New component + API route

Generate a visual "music profile card" (like Spotify Wrapped) that users can download or share on social media, showing their top artists, genres, and AI-generated personality.

**What you'll learn:**
- HTML Canvas or `@vercel/og` image generation
- Social media sharing APIs
- Image composition and styling
- Server-side rendering of dynamic images

---

## Additional Ideas for Future Development

These are broader feature ideas that could become multiple tasks:

1. **Listening stats dashboard** - Total hours listened, unique artists count, genre diversity score
2. **Friend comparison** - Compare music tastes with another Spotia user
3. **Music mood timeline** - Map tracks to moods using Spotify's audio features API (energy, valence, danceability)
4. **Playlist generator** - AI-powered playlist creation based on mood, activity, or genre preferences
5. **Mobile PWA support** - Add service workers, app manifest, and offline capabilities
6. **Real-time listening activity** - Show what the user is currently playing using Spotify's player API
7. **Music discovery feed** - A feed of new releases from the user's followed artists
8. **Achievement system** - Badges for milestones (e.g., "Listened to 100 artists", "Genre Explorer")
9. **Animated transitions** - Expand on Framer Motion usage with page transitions and micro-interactions
10. **API documentation** - Set up Swagger/OpenAPI docs for the backend API routes

---

## How to Get Started

1. Pick a task that matches your current skill level
2. Create a new branch: `git checkout -b feature/<task-name>`
3. Read the existing code in the referenced files first
4. Follow the existing patterns and conventions in the codebase
5. Write tests for your changes
6. Run `pnpm lint` and `pnpm test` before submitting
7. Open a Pull Request using the PR template
