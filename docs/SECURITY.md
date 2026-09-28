# SECURITY & ENVIRONMENT SPECIFICATION

## 1. Secrets Management
- AI provider API keys (`OPENAI_API_KEY`, `GEMINI_API_KEY`, `ELEVENLABS_API_KEY`) and database credentials (`DATABASE_URL`, `NEXTAUTH_SECRET`) are strictly kept in server-side runtime environments and never exposed to client bundles.
- All client AI interactions route through validated Next.js Route Handlers / Server Actions with rate limiting and input sanitization.

## 2. Environment Variables (.env.example)
```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qorel_ai?schema=public"
# Local fallback (if postgres container is not running): file:./dev.db

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-random-key-for-development"

# AI Providers (Optional - MockProvider active if omitted)
GEMINI_API_KEY=""
OPENAI_API_KEY=""
ELEVENLABS_API_KEY=""
DEFAULT_AI_PROVIDER="mock" # "mock" | "gemini" | "openai"
```
