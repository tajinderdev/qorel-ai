# NON-FUNCTIONAL REQUIREMENTS

## NFR-1: Performance & Latency
- Initial page load < 1.5s with optimized code-splitting and dynamic 3D canvas loading.
- Instant fallback for AI / Voice operations: zero hang or crash if an external API key is invalid or absent.
- 60 FPS smooth rendering for 3D React Three Fiber scenes on standard desktop and laptop GPUs.

## NFR-2: Visual Aesthetics & UX Polish
- Sleek modern dark mode (Obsidian / Indigo / Emerald glow accents, glassmorphism panels, crisp typography).
- Responsive layout adapting seamlessly from desktop to mobile screens.
- Micro-animations via Framer Motion for state changes, mastery score updates, and lesson transitions.

## NFR-3: Reliability & Resilient Fallbacks
- Comprehensive high-fidelity Mock Provider that deterministically answers all diagnostic, lesson, and evaluation calls for automated testing and offline demo.
- Prisma ORM configured for PostgreSQL with automated database seeding and migration scripts.

## NFR-4: Code Quality & Architecture
- Strict TypeScript types across all schemas (Topic, Lesson, Checkpoint, KnowledgeProfile, AIProvider).
- Clean separation of concerns: Provider abstraction layer, Zustand client stores, Next.js server actions / route handlers.
- Comprehensive Vitest unit tests and Playwright end-to-end user journey tests.
