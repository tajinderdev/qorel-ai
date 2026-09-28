# MVP SCOPE SPECIFICATION

## In Scope for MVP (3-4 Hour Autonomous Build)
1. **Core Learner Journey**:
   - Topic Search & Catalog across high-demand tech topics (e.g. Next.js Architecture, Redis Clustering, PostgreSQL Vector Indices, Docker & Kubernetes Pod Networking, React Concurrency & Server Components).
   - Interactive Diagnostic with 3 question types (Multiple Choice, Code Snippet / Output Bug, Open-ended concept explanation).
   - Dynamic Course Path Personalizer (pruning already-known concepts).
   - Interactive Lesson Engine with Rich Text, Code snippets, and Checkpoints.
2. **Multi-Modal Visual & Audio Engine**:
   - Procedural 3D React Three Fiber Visualizers (Cluster Network, Memory/State Graph, Pipeline Flow).
   - Interactive 3D controls (Orbit, node selection, animation scrubber).
   - Synchronized Voice Narration (Web SpeechSynthesis with subtitles + OpenAI/ElevenLabs TTS adapter).
3. **AI Tutor Interactivity**:
   - Real-time Checkpoint evaluation with feedback & explanation quality score.
   - "Explain Differently" dynamic alternative breakdowns.
   - Live in-lesson AI Tutor chat assistant.
4. **Knowledge Profile & Memory Ledger**:
   - Explainable concept mastery tracking with evidence logs (diagnostics, quizzes, exercises).
   - Topic memory on repeated visits (skips mastered modules, highlights weak points).
5. **Goal & Target Role Roadmap**:
   - Skill gap analyzer towards selected tech roles (Full-Stack, AI Engineer, Backend Systems).
6. **Course Warehouse & Feedback**:
   - Canonical course storage with feedback submission & verification queue.
7. **Auth & Deployment Readiness**:
   - NextAuth with Demo Profiles + Credentials.
   - PostgreSQL schema with Prisma ORM and SQLite local fallback.
   - Vitest unit tests + Playwright E2E 14-step automated tests.

## Out of Scope for MVP (Post-MVP Roadmap)
- Arbitrary text-to-3D mesh generative model generation (uses procedural curated 3D engine instead).
- Live real-time WebRTC audio streaming tutor (uses synchronized TTS & Speech-to-Text instead).
- Multi-tenant enterprise organization billing / Stripe subscription management.
