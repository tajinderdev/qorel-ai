# SYSTEM ARCHITECTURE

```mermaid
graph TD
    Client[Next.js 15 Client / React 19] --> AppRouter[Next.js App Router API & Server Actions]
    
    subgraph UI Layer
        Search[Topic Search & Catalog]
        DiagUI[Diagnostic Assessment View]
        LessonUI[Interactive Lesson Runner]
        R3F[React Three Fiber 3D Canvas]
        VoiceEngine[Voice Narration & Sync Subtitles]
        ProfileUI[Knowledge Profile & Mastery Ledger]
        RoadmapUI[Goal & Career Gap Roadmap]
    end
    
    subgraph Core Engines
        DiagEngine[Adaptive Diagnostic Engine]
        PathEngine[Dynamic Path Personalizer]
        TutorEngine[AI Tutor & Evaluation Engine]
        KnowledgeEngine[Knowledge & Mastery Calculation Engine]
        CareerEngine[Target Role Skill Gap Engine]
        WarehouseEngine[Course Warehouse & Feedback Engine]
    end
    
    subgraph Abstraction & Providers
        AIAdapter[AI Provider Abstraction Layer]
        Gemini[Gemini Provider]
        OpenAI[OpenAI Provider]
        Claude[Claude Provider]
        MockAI[Deterministic Mock Provider]
        TTSAdapter[TTS Audio Abstraction]
    end
    
    subgraph Persistence Layer
        Prisma[Prisma ORM]
        DB[(PostgreSQL / SQLite Storage)]
        LocalStore[Zustand Client Sync]
    end

    AppRouter --> CoreEngines
    CoreEngines --> AIAdapter
    AIAdapter --> Gemini
    AIAdapter --> OpenAI
    AIAdapter --> Claude
    AIAdapter --> MockAI
    CoreEngines --> Prisma
    Prisma --> DB
```

## Architecture Principles
1. **Unbreakable Fallbacks**: System operates deterministically with zero API keys using the high-fidelity Mock Provider, while seamlessly tapping Gemini/OpenAI when keys are present.
2. **Data-Driven Visuals**: The AI Tutor selects from a curated catalog of procedural 3D React Three Fiber visual templates rather than generating unverified raw 3D code.
3. **Multi-Factor State Persistence**: Knowledge scores are computed from verifiable evidence (diagnostics, checkpoint proofs, exercises) stored in the relational database.
