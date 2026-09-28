# ARCHITECTURE DECISION RECORDS (ADR)

## ADR-001: Next.js 15 Full-Stack Architecture
- **Status**: Accepted
- **Context**: Need high velocity, SSR performance, API route handlers, and modern React 19 client components for 3D canvases.
- **Decision**: Use Next.js 15 App Router with TypeScript, Tailwind CSS v4, Lucide icons, Zustand, and Framer Motion.

## ADR-002: Multi-Provider AI Engine with High-Fidelity Mock Provider
- **Status**: Accepted
- **Context**: Need seamless local testing, automated Playwright CI/CD runs, and zero-friction evaluation alongside optional Gemini/OpenAI keys.
- **Decision**: Define strict `AIProvider` interface with deterministic domain mock provider and live API adapters.

## ADR-003: Procedural React Three Fiber 3D Visualization System
- **Status**: Accepted
- **Context**: Lessons require visual 3D mental models (clusters, distributed nodes, memory layouts).
- **Decision**: Implement reusable procedural 3D React Three Fiber scene components driven by declarative JSON visual schemas.

## ADR-004: Explainable Multi-Factor Knowledge Mastery Ledger
- **Status**: Accepted
- **Context**: Opaque percentage bars do not provide real insight or trust.
- **Decision**: Store discrete evidence logs (diagnostic results, checkpoint proofs, explanation scores) and compute explainable mastery with confidence levels.
