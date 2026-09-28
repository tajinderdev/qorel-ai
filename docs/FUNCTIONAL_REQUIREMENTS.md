# FUNCTIONAL REQUIREMENTS

## FR-1: Authentication & User Profiles
- NextAuth.js / Auth.js integration with email/password credentials and instant 1-click Demo Profiles (e.g. "Senior Frontend Eng", "Junior Backend Eng", "DevOps Eng").
- Persistent user state, session management, and role/goal preferences.

## FR-2: Topic Search & Intelligence
- Search input with auto-suggestions, category filters (Frontend, Backend, AI/ML, DevOps, Distributed Systems), and difficulty indicators.
- Canonical topic resolution with semantic aliases (e.g., "React Hooks", "useEffect", "useMemo" -> React Architecture).

## FR-3: Adaptive Diagnostic Engine
- Multi-question diagnostic assessment: Code prediction, architectural tradeoff, and open-ended conceptual explanations.
- Dynamic scoring algorithm that outputs initial mastery % and concept-level strength/weakness tags.

## FR-4: Course Warehouse & Dynamic Path Personalizer
- Canonical course structure representation with prerequisites, concepts, visual bindings, and checkpoint questions.
- Dynamic path pruning: Automatically skips concepts where learner has verified proficiency (>75%).

## FR-5: Interactive Lesson Engine & Multi-Modal Runtime
- Rich content cards with markdown, syntax-highlighted code snippets, and callouts.
- Curated procedural 3D React Three Fiber visualizers (Cluster/Network Flow, Distributed Architecture, Memory Layout, State Machine, Step Pipeline).
- Full interactive 3D camera controls (orbit, pan, zoom, node selection, animation scrubbing).
- Voice narration with SpeechSynthesis fallback and ElevenLabs/OpenAI TTS support, with synchronized subtitles and audio player controls.

## FR-6: AI Tutor & Active Checkpoint Evaluation
- Real-time AI evaluation of freeform answers and code fixes using structured JSON responses.
- "Explain Differently" feature: Generates alternative mental models, analogies, or concrete code breakdowns if learner fails a checkpoint.
- In-lesson Q&A: Learner can ask the AI Tutor questions at any moment during the lesson without losing context.

## FR-7: User Knowledge Model & Evidence Ledger
- Persistent knowledge records per skill, topic, and concept.
- Multi-factor mastery calculation with transparent evidence breakdown (Diagnostic, Checkpoint Proofs, Lesson Completion, Time Spent).

## FR-8: Goal & Target Role Roadmap Engine
- Role tracking (e.g. "AI Engineer", "Senior Full-Stack Engineer", "Staff Backend Architect").
- Dynamic skill gap visualization comparing mastered skills vs. required role stack.

## FR-9: Feedback & Course Quality
- Structured feedback submission (clarity, technical accuracy, pacing).
- Automated verification pipeline logging reported issues to the course warehouse ledger.
