# AI ARCHITECTURE & PROVIDER ABSTRACTION

## 1. Multi-Provider Design
Qorel AI decouples core learning logic from specific LLM providers via the `AIProvider` interface:

```typescript
export interface AIProvider {
  name: 'gemini' | 'openai' | 'claude' | 'mock';
  
  // Evaluates freeform user explanation for technical depth and misconceptions
  evaluateAnswer(params: {
    question: string;
    expectedConcepts: string[];
    userAnswer: string;
    context: string;
  }): Promise<AnswerEvaluationResult>;

  // Generates dynamic alternative explanations ("Explain Differently")
  explainDifferently(params: {
    concept: string;
    currentExplanation: string;
    failedReason: string;
    style: 'analogy' | 'code_first' | 'visual_first' | 'first_principles';
  }): Promise<AlternativeExplanationResult>;

  // In-lesson contextual assistant
  answerTutorQuestion(params: {
    topic: string;
    currentSection: string;
    learnerQuestion: string;
    masteryLevel: number;
  }): Promise<TutorResponseResult>;
  
  // Generates canonical or adaptive diagnostic questions
  generateDiagnostic(params: {
    topicSlug: string;
    targetRole?: string;
  }): Promise<DiagnosticQuiz>;
}
```

## 2. Structured JSON Output Contracts
All AI operations enforce strict TypeScript/JSON schemas with validation to guarantee runtime stability.

## 3. Deterministic Mock Provider
The `MockProvider` ships with comprehensive, domain-accurate technical seeds for core topics (Next.js App Architecture, Redis Clustering & Sentinel, PostgreSQL Vector Search, Kubernetes Pod Networking, React 19 Concurrency). This allows 100% test coverage, fast offline development, and bulletproof demonstration without requiring an active API key or risking rate limits.
