# DETAILED STAGED IMPLEMENTATION PLAN

## Overview
This plan defines the phases for constructing **Qorel AI** into a production-ready application within an autonomous execution loop.

---

### PHASE 0: Requirements & Architecture Documentation
- **Objective**: Freeze all specifications, data contracts, and UX flows.
- **Affected Files**: `docs/*.md`
- **Status**: COMPLETED

### PHASE 1: Project Foundation & Design System
- **Objective**: Initialize Next.js 15 App Router, Tailwind CSS, Lucide icons, Framer Motion, Three.js, React Three Fiber, and `@react-three/drei`.
- **Affected Files**: `package.json`, `tsconfig.json`, `app/layout.tsx`, `app/globals.css`, `components/ui/*`
- **Dependencies**: React 19 / Next.js 15
- **Status**: READY FOR EXECUTION

### PHASE 2: Data Modeling, Prisma & Storage Abstraction
- **Objective**: Define Prisma schema for User, Topic, CanonicalCourse, CourseProgress, KnowledgeProfile, EvidenceLog, CourseFeedback.
- **Affected Files**: `prisma/schema.prisma`, `lib/db.ts`, `prisma/seed.ts`
- **Status**: READY FOR EXECUTION

### PHASE 3: AI Provider Abstraction & Seed Knowledge
- **Objective**: Build AIProvider interface with MockProvider (canonical seeds for Next.js, Redis, pgvector, Kubernetes, React 19) and Gemini / OpenAI adapters.
- **Affected Files**: `lib/ai/types.ts`, `lib/ai/mock-provider.ts`, `lib/ai/gemini-provider.ts`, `lib/ai/openai-provider.ts`, `lib/ai/factory.ts`
- **Status**: READY FOR EXECUTION

### PHASE 4: Topic Catalog & Course Warehouse
- **Objective**: Canonical Course Warehouse service, dynamic path personalizer, and search/filter API.
- **Affected Files**: `lib/warehouse/*`, `app/api/topics/*`
- **Status**: READY FOR EXECUTION

### PHASE 5: Adaptive Diagnostic & Assessment Engine
- **Objective**: Diagnostic quiz UI with Multiple Choice, Code Prediction / Bug Spotting, and AI-evaluated open explanations.
- **Affected Files**: `components/diagnostic/*`, `app/diagnostic/[slug]/page.tsx`, `app/api/diagnostic/evaluate/route.ts`
- **Status**: READY FOR EXECUTION

### PHASE 6: Multi-Modal Interactive Lesson Runtime
- **Objective**: Full lesson player with markdown rendering, syntax-highlighted code blocks, checkpoint gates, and live AI tutor chat.
- **Affected Files**: `components/lesson/*`, `app/lesson/[slug]/page.tsx`
- **Status**: READY FOR EXECUTION

### PHASE 7: Curated Procedural 3D & 2D Visual Engines
- **Objective**: High-performance React Three Fiber 3D visualizers: Cluster Network Flow, Memory Layout Graph, and Pipeline Stages.
- **Affected Files**: `components/visuals/3d/*`, `components/visuals/2d/*`
- **Status**: READY FOR EXECUTION

### PHASE 8: Voice Narration & Subtitle Sync Engine
- **Objective**: Audio speech synthesis engine with Web SpeechSynthesis fallback, speed controls, play/pause, and synchronized visual captions.
- **Affected Files**: `components/audio/*`, `lib/audio/*`
- **Status**: READY FOR EXECUTION

### PHASE 9: User Knowledge Profile, Mastery & Memory Ledger
- **Objective**: Granular concept mastery dashboard, evidence logs, topic memory verification on repeat visits.
- **Affected Files**: `components/profile/*`, `app/profile/page.tsx`, `lib/knowledge/*`
- **Status**: READY FOR EXECUTION

### PHASE 10: Goal & Target Role Roadmap Engine
- **Objective**: Target role skill gap analyzer and interactive roadmap launcher.
- **Affected Files**: `components/career/*`, `app/roadmap/page.tsx`, `lib/career/*`
- **Status**: READY FOR EXECUTION

### PHASE 11: Feedback & QA Pipeline
- **Objective**: Feedback modal, issue reporting, and verification ledger.
- **Affected Files**: `components/feedback/*`, `app/api/feedback/route.ts`
- **Status**: READY FOR EXECUTION

### PHASE 12: Automated Vitest Unit Tests & Playwright E2E Suite
- **Objective**: Comprehensive test suites running full 14-step user journey.
- **Affected Files**: `tests/unit/*`, `playwright.config.ts`, `tests/e2e/learner-journey.spec.ts`
- **Status**: READY FOR EXECUTION

### PHASE 13: UX Polish, Production Build & Verification
- **Objective**: Ensure seamless responsive design, flawless dark mode, zero console errors, and successful production `npm run build`.
- **Status**: READY FOR EXECUTION
