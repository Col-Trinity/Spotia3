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

## 🏗️ Architecture & Design Pattern Tasks

> **Why this section exists:** Writing code is only part of being a software developer. In a world where AI can generate code for you, the developers who stand out are those who understand **why** systems are structured a certain way, can reason about **trade-offs**, and can **design** before they code. These tasks are designed to make you think like a software architect, not just a coder. Each task asks you to restructure something in the project using a real-world design pattern or architectural principle. The goal is not just to make the code work — it already works — but to make it **maintainable, testable, and scalable**.

---

### 21. Refactor the AI client using the Strategy Pattern

**Skills:** Design patterns, SOLID principles, TypeScript interfaces
**File:** `src/lib/aiClient.ts`
**Pattern:** Strategy Pattern + Factory Pattern

**The problem:** The current `aiClient.ts` uses a `switch` statement to decide which AI provider to call. Every time you add a new provider (e.g., Llama, Mistral), you have to modify this function. The file mixes configuration, HTTP calls, and response parsing all in one place. This violates the **Open/Closed Principle** — the code should be open for extension but closed for modification.

**The task:**
1. Define a TypeScript interface `AIProvider` with a single method: `generate(prompt: string): Promise<string>`
2. Create separate classes that implement this interface: `GeminiProvider`, `ClaudeProvider`, `GPTProvider`
3. Each class handles its own authentication headers, request format, and response parsing
4. Create a `createAIProvider(providerName: string): AIProvider` factory function that returns the correct instance
5. The `askAI` function becomes a one-liner that calls the factory and then calls `generate()`

**What you'll learn to think about:**
- **Open/Closed Principle:** Adding a new AI provider means creating one new file, not touching existing code
- **Dependency Inversion:** The system depends on the `AIProvider` abstraction, not on specific implementations
- **Why `switch` statements are a code smell:** They often signal a missing abstraction. When you see a `switch` that grows over time, think "strategy pattern"
- **Testability:** You can now test each provider in isolation, and mock the interface in integration tests

**Architecture question to answer before coding:** _Draw a diagram showing how `askAI` currently works vs. how it will work after refactoring. Which version is easier to extend?_

---

### 22. Implement a Service Layer between API routes and external APIs

**Skills:** Layered architecture, separation of concerns, dependency injection
**Files:** New `src/services/` directory
**Pattern:** Service Layer (from Domain-Driven Design)

**The problem:** API route handlers are doing too many things at once — they authenticate the user, call the Spotify API, transform the data, handle errors, and return the response. If you want to reuse the "get top artists" logic somewhere else (e.g., in the AI analysis feature), you'd have to duplicate code.

**The task:**
1. Create a `src/services/` directory
2. Build a `SpotifyService` class with methods like `getTopArtists(token, timeRange)`, `getTopTracks(token, timeRange)`, `getPlaylists(token)` — this service wraps all Spotify API calls, handles token refresh, and transforms Spotify's raw response into your app's internal types
3. Build an `AnalysisService` class that orchestrates the flow: get user data from `SpotifyService` → build a prompt → call the AI provider → return the result
4. Refactor API route handlers to become **thin**: they validate the request, call the appropriate service, and return the response. A route handler should be 10-15 lines maximum

**What you'll learn to think about:**
- **Separation of concerns:** Each layer has one job. Routes handle HTTP. Services handle business logic. Providers handle external APIs
- **The "change test":** If Spotify changes their API response format tomorrow, how many files do you have to modify? With a service layer, the answer is one: `SpotifyService`
- **Reusability:** The `AnalysisService` can call `SpotifyService` without knowing anything about HTTP or Spotify's JSON format
- **Single Responsibility Principle:** A function should have one reason to change

**Architecture question to answer before coding:** _List every responsibility that a single API route handler currently has. Then assign each responsibility to a layer. How many layers did you end up with?_

---

### 23. Design and implement the Repository Pattern for database access

**Skills:** Data access patterns, abstraction layers, testability
**Files:** New `src/repositories/` directory
**Pattern:** Repository Pattern

**The problem:** Database queries (e.g., `db.select().from(users).where(...)`) are likely called directly inside API routes or service functions. This means your business logic is tightly coupled to Drizzle ORM and PostgreSQL. If you ever want to change your ORM, add a caching layer in front of the database, or write tests that don't need a real database, you're stuck.

**The task:**
1. Create a `src/repositories/` directory
2. Define a `UserRepository` with methods: `findById(id)`, `findByEmail(email)`, `create(data)`, `update(id, data)`
3. Define an `AnalysisRepository` (after task #8) with methods: `save(analysis)`, `findByUserId(userId)`, `findLatest(userId)`
4. Each repository method wraps the Drizzle ORM calls and returns typed objects
5. Services call repositories — they never import `db` or `drizzle` directly

**What you'll learn to think about:**
- **Abstraction boundaries:** Your business logic asks "give me the user with this email." It doesn't care if that comes from PostgreSQL, MongoDB, or an in-memory array
- **Testability:** You can create a `FakeUserRepository` that stores data in a `Map` for tests — no database needed
- **The layered architecture picture:** Route → Service → Repository → Database. Each layer only talks to the layer directly below it
- **Interface segregation:** A repository exposes only what the service needs, not every possible database operation

**Architecture question to answer before coding:** _If you wanted to add Redis caching so that `findById` checks the cache before hitting the database, which layer would you modify? Which layers would remain unchanged?_

---

### 24. Create Architecture Decision Records (ADRs)

**Skills:** Technical writing, trade-off analysis, team communication
**Files:** New `docs/adr/` directory
**Pattern:** ADR (Architecture Decision Record)

**The problem:** When someone joins the project six months from now and asks "why did you use Drizzle instead of Prisma?" or "why is the AI client structured this way?", there is no written record. The knowledge lives only in the heads of whoever made the decision. This is called **tribal knowledge** and it's one of the biggest risks in software teams.

**The task:**
1. Create a `docs/adr/` directory
2. Create a template file `docs/adr/000-template.md` with sections: **Title**, **Date**, **Status** (proposed/accepted/deprecated), **Context** (what situation prompted this decision), **Decision** (what you chose), **Alternatives Considered** (what else you could have done and why you didn't), **Consequences** (trade-offs, what becomes easier, what becomes harder)
3. Write ADRs for decisions already made in the project:
   - `001-use-drizzle-orm.md` — Why Drizzle over Prisma or raw SQL?
   - `002-spotify-oauth-with-nextauth.md` — Why NextAuth for authentication?
   - `003-multi-ai-provider-support.md` — Why support multiple AI providers?
4. For every future architectural task you implement (service layer, repository pattern, etc.), write an ADR **before** writing code

**What you'll learn to think about:**
- **Architecture is about trade-offs, not right answers.** Every decision has downsides. A good architect acknowledges them
- **Writing forces clarity.** If you can't explain why you chose something in writing, you probably don't fully understand the decision
- **This is a real industry practice.** Companies like GitHub, Spotify, and Amazon use ADRs. Senior engineers write these regularly. Most juniors never practice this skill, and that's exactly why you should
- **Future-you will thank present-you.** You will forget why you made a decision within weeks. The ADR won't forget

**Architecture question to answer before coding:** _Pick any technology in this project (Next.js, Tailwind, PostgreSQL). Write down three alternatives you could have used instead. For each alternative, list one advantage it has over the current choice._

---

### 25. Implement the Middleware Pipeline Pattern for API routes

**Skills:** Functional composition, cross-cutting concerns, reusable middleware
**Files:** New `src/middleware/` directory, refactored API routes
**Pattern:** Decorator Pattern / Chain of Responsibility

**The problem:** Every API route needs to do the same boilerplate work: check if the user is authenticated, validate the request body, catch errors and return a consistent format, maybe log the request. Right now, each route handler probably repeats this logic (or worse, some routes skip it). This duplication is a bug waiting to happen — forget to add auth checking in one route and you have a security hole.

**The task:**
1. Create a `src/middleware/` directory
2. Build composable middleware functions:
   - `withAuth(handler)` — checks the session, returns 401 if unauthenticated, passes the user to the handler
   - `withValidation(schema, handler)` — validates the request body against a Zod schema, returns 400 with errors if invalid
   - `withErrorHandler(handler)` — wraps the handler in a try/catch, maps known error types to HTTP status codes, returns consistent error JSON
   - `withRateLimit(options, handler)` — limits requests per user per time window
3. Compose them: `export const POST = withErrorHandler(withAuth(withValidation(schema, handler)))`
4. Refactor at least 3 existing API routes to use this pipeline

**What you'll learn to think about:**
- **Composition over inheritance:** Small, focused functions that combine into powerful pipelines
- **Cross-cutting concerns:** Auth, logging, error handling, and validation aren't specific to any one feature — they cut across all features. They deserve their own layer
- **The Decorator pattern:** Each middleware wraps the handler and adds behavior without modifying it
- **DRY principle in practice:** Instead of 10 routes each checking auth differently, one `withAuth` function handles it correctly everywhere
- **How frameworks work:** Express, Koa, Hono — they all use this exact pattern. Now you understand what's happening under the hood

**Architecture question to answer before coding:** _In what order should the middleware execute? Why should `withErrorHandler` be the outermost wrapper? What happens if you put `withAuth` outside of `withErrorHandler`?_

---

### 26. Design a proper Error Handling Architecture

**Skills:** Error classification, HTTP semantics, user experience
**Files:** New `src/errors/` directory, middleware integration
**Pattern:** Custom Error Hierarchy

**The problem:** When something goes wrong, the app probably throws generic `Error` objects or returns inconsistent error shapes from different routes. The frontend has no reliable way to know if an error is a "you're not logged in" error, a "Spotify is down" error, or a "you sent bad data" error. Some errors might even leak internal details (stack traces, database errors) to the user.

**The task:**
1. Create a `src/errors/` directory
2. Define a base class `AppError` with properties: `statusCode`, `userMessage` (safe to show), `internalMessage` (for logging), `errorCode` (like `SPOTIFY_TOKEN_EXPIRED`)
3. Create specific error classes that extend `AppError`:
   - `NotFoundError` (404) — resource doesn't exist
   - `UnauthorizedError` (401) — not logged in
   - `ForbiddenError` (403) — logged in but not allowed
   - `ValidationError` (400) — bad input data
   - `SpotifyApiError` (502) — Spotify returned an error
   - `AIProviderError` (502) — AI service failed
4. Update the `withErrorHandler` middleware to detect `AppError` instances and return the correct status code and user-safe message. Unknown errors return a generic 500
5. Define a consistent error response shape for the frontend: `{ error: { code: string, message: string } }`

**What you'll learn to think about:**
- **Error handling is architecture, not an afterthought.** A system without an error strategy is like a building without fire exits
- **The two audiences for errors:** Users need friendly, actionable messages ("Your session expired, please log in again"). Developers need detailed internal information (stack trace, request ID, which Spotify endpoint failed)
- **HTTP status codes have meaning:** 400 means the client sent bad data. 401 means not authenticated. 502 means an upstream service failed. Using the right codes helps frontend developers handle errors correctly
- **Fail-fast vs. graceful degradation:** If the AI service is down, should the whole page fail? Or should the AI section show "temporarily unavailable" while the rest of the dashboard works fine?

**Architecture question to answer before coding:** _Map every external dependency (Spotify API, AI providers, database) to a failure mode. For each failure, decide: should the app fail fast or degrade gracefully? Write your answers down._

---

### 27. Implement a Caching Layer with Cache Invalidation Strategy

**Skills:** Performance optimization, abstraction, TTL management
**Files:** New `src/cache/` directory, `SpotifyService` integration
**Pattern:** Cache-Aside Pattern + Provider Interface

**The problem:** Every time a user loads the dashboard, the app calls the Spotify API for top artists, top tracks, and playlists. But this data barely changes — your top artists from this month are the same if you check five minutes later. Making redundant API calls wastes time (slow user experience), wastes Spotify API quota, and makes the app fragile (if Spotify is slow, the whole app is slow).

**The task:**
1. Create a `src/cache/` directory
2. Define a `CacheProvider` interface: `get<T>(key: string): Promise<T | null>`, `set<T>(key: string, value: T, ttlSeconds: number): Promise<void>`, `invalidate(key: string): Promise<void>`, `invalidatePattern(pattern: string): Promise<void>`
3. Implement an `InMemoryCacheProvider` using a `Map` with expiration timestamps (this is good enough for single-server deployments)
4. Design a cache key convention: `user:{userId}:top-artists:{timeRange}` — structured, predictable, easy to invalidate
5. Integrate caching into `SpotifyService`: check cache first, call Spotify API only on cache miss, store the result
6. Decide TTLs for each data type:
   - Top artists/tracks: 30 minutes (changes slowly)
   - Playlists: 10 minutes (can change more often)
   - User profile: 1 hour (rarely changes)

**What you'll learn to think about:**
- **"There are only two hard things in computer science: cache invalidation and naming things."** When a user updates their Spotify data, when does the cache know?
- **The cache-aside pattern:** The application manages the cache explicitly (check → miss → fetch → store). This is the most common caching pattern
- **TTL trade-offs:** Short TTL = fresher data but more API calls. Long TTL = fewer calls but stale data. There is no "correct" TTL — only the right one for each use case
- **Interface abstraction:** Today it's an `InMemoryCache`. Tomorrow it could be Redis. Because you coded against the `CacheProvider` interface, swapping is a one-line change
- **Cache stampede problem:** What if 100 requests hit a cold cache at the same time? All 100 call Spotify. How do you prevent this? (Hint: look up "cache stampede" — this is an advanced discussion topic, not something you need to implement)

**Architecture question to answer before coding:** _If a user changes their Spotify time range from "last month" to "last 6 months," should that invalidate the "last month" cache? Why or why not? Draw a diagram of the data flow with and without cache._

---

### 28. Design a DTO and Data Transformation Layer

**Skills:** Data modeling, boundary defense, type safety
**Files:** New `src/types/` and `src/mappers/` directories
**Pattern:** Data Transfer Objects (DTO) + Mapper Pattern

**The problem:** Spotify's API returns huge JSON objects with fields you don't need, fields named differently than what your app uses, and nested structures that are awkward to work with. If you pass Spotify's raw response directly to the frontend, you're coupling your entire UI to Spotify's data format. If Spotify renames a field, adds a field, or deprecates a field, your frontend breaks.

**The task:**
1. Create a `src/types/` directory with three categories:
   - `src/types/external/` — types that mirror external API responses exactly (`SpotifyArtistResponse`, `SpotifyTrackResponse`)
   - `src/types/domain/` — your app's internal types (`Artist`, `Track`, `Playlist`) — only the fields your app actually needs
   - `src/types/api/` — types for your API responses to the frontend (`ArtistResponse`, `TrackResponse`)
2. Create a `src/mappers/` directory with transformation functions:
   - `toArtist(spotifyArtist: SpotifyArtistResponse): Artist` — external → domain
   - `toArtistResponse(artist: Artist): ArtistResponse` — domain → API response
3. Mappers are used at the boundaries: when data enters the system (from Spotify) and when data leaves (to the frontend)

**What you'll learn to think about:**
- **Bounded Contexts (from Domain-Driven Design):** Your app's concept of an "Artist" is not Spotify's concept of an "Artist." Spotify's artist has 30 fields. Your app needs 5. These are different things that happen to share a name
- **Boundary defense:** External data is untrusted and unstable. Transform it into your format at the boundary, and the rest of your code never worries about Spotify's quirks
- **The anti-corruption layer:** This is the DDD term for exactly what you're building. It "corrupts" (transforms) external data so it doesn't corrupt your internal domain
- **Type safety in practice:** With proper types, TypeScript will tell you at compile time if Spotify changed something and your mapper is broken. Without them, you find out at runtime when users see errors

**Architecture question to answer before coding:** _Look at a real Spotify API response for "top artists." Count how many fields are in the response. Now list only the fields your app actually uses. What percentage of the data are you throwing away? Why is it still worth defining the full external type?_

---

### 29. Implement an Event System (Observer Pattern) for analytics

**Skills:** Event-driven architecture, decoupling, extensibility
**Files:** New `src/events/` directory
**Pattern:** Observer Pattern / Event Bus

**The problem:** Imagine you want to track user behavior: when someone views their top artists, requests an AI analysis, or changes the time range filter. The naive approach is to sprinkle tracking code inside every component and route handler. But now your component code is cluttered with analytics logic that has nothing to do with its primary purpose. Worse, if you want to change your analytics provider, you have to modify dozens of files.

**The task:**
1. Create a `src/events/` directory
2. Define event types: `UserLoggedIn`, `DashboardViewed`, `TopArtistsViewed`, `AIAnalysisRequested`, `AIAnalysisCompleted`, `TimeRangeChanged`, `PlaylistViewed`
3. Build an `EventBus` class with methods: `emit(event)`, `on(eventType, listener)`, `off(eventType, listener)`
4. Create listeners:
   - `ConsoleLogger` — logs events during development
   - `AnalyticsSaver` — saves events to the database for tracking
5. Components and services emit events (`eventBus.emit({ type: 'AIAnalysisRequested', userId, provider })`). They don't know or care who's listening
6. Register listeners at app startup

**What you'll learn to think about:**
- **Decoupling:** The login code doesn't know about analytics. The analytics code doesn't know about login. They communicate through events. Neither depends on the other
- **The Observer pattern in the real world:** This is the foundation of how systems like Kafka, RabbitMQ, and AWS EventBridge work. Understanding this pattern at a small scale prepares you for distributed systems
- **Extensibility without modification:** Want to add email notifications when an AI analysis completes? Add a new listener. Zero changes to existing code
- **The difference between synchronous and asynchronous events:** Should `emit` wait for all listeners to finish? What if a listener throws an error — should it prevent other listeners from running? These are real design decisions

**Architecture question to answer before coding:** _Think about a real app you use (Instagram, Spotify, YouTube). List 5 events that probably happen behind the scenes when you interact with it. For each event, imagine what different parts of the system might be listening._

---

### 30. Design a Feature Flag System

**Skills:** Runtime configuration, trunk-based development, safe deployments
**Files:** New `src/features/` directory
**Pattern:** Feature Toggle Pattern

**The problem:** Right now, if a developer is working on a feature that takes two weeks (like the AI analysis), they either work on a long-lived branch (merge conflicts, divergence from main) or they merge half-finished code into main (broken features visible to users). Neither option is good. Feature flags solve this by letting you deploy code that's hidden behind a toggle.

**The task:**
1. Create a `src/features/` directory
2. Define a feature flags configuration: `{ "ai_analysis": true, "dark_mode": false, "recently_played": true }`
3. Build a `FeatureFlags` service with methods: `isEnabled(flagName: string): boolean`, `getAllFlags(): Record<string, boolean>`
4. Start with a JSON config file. Later this could be a database table or a service like LaunchDarkly
5. Create a React component `<FeatureGate flag="ai_analysis">` that conditionally renders its children
6. Create a server-side check `if (featureFlags.isEnabled('ai_analysis'))` for API routes
7. Build a simple developer-only page at `/dev/features` that shows all flags and their status

**What you'll learn to think about:**
- **Trunk-based development:** The most productive teams commit to `main` daily. Feature flags let you do this safely because unfinished features are invisible to users
- **Deployment is not release:** You can deploy code (put it on the server) without releasing it (making it available to users). Feature flags separate these two concepts
- **A/B testing foundations:** If you can toggle a feature per-user, you can show feature A to 50% of users and feature B to the other 50%. This is how companies test new features
- **Runtime vs compile-time configuration:** Environment variables are decided at build time. Feature flags can change at runtime without a new deployment
- **Kill switches:** If a new feature causes a production incident, you flip the flag off in seconds instead of rolling back a deployment

**Architecture question to answer before coding:** _You just deployed a new AI feature, but the AI provider starts returning errors 50% of the time. Without feature flags, what are your options? With feature flags, what can you do instead? Which response is faster?_

---

### The Meta-Task: Draw the Architecture

**Before and after implementing any of the tasks above, draw the system architecture.**

This is not optional — it's the most important exercise in this entire document. Get a whiteboard, a piece of paper, or a tool like Excalidraw, and draw:

1. **Before:** How does data flow from the Spotify API to the user's screen today? Which file calls which? Where are the boundaries?
2. **After:** After implementing the service layer, repository pattern, and middleware pipeline, draw the new architecture. Show every layer and what it talks to.

Answer these questions with your diagram:
- If Spotify changes their API, which layers are affected?
- If you switch from PostgreSQL to MongoDB, which layers change?
- If you add a new AI provider, which files do you touch?
- If you want to add caching, where does it go?
- If a new developer joins the team, can they understand the system from this diagram?

**A developer who can draw the architecture of what they're building is already thinking like a mid-level engineer.** This is the skill that separates someone who writes code from someone who designs systems.

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
