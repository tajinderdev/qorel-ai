export interface AnswerEvaluationResult {
  isCorrect: boolean;
  score: number; // 0 to 100
  feedback: string;
  missingConcepts: string[];
  demonstratedStrengths: string[];
  suggestedFollowUp?: string;
}

export interface AlternativeExplanationResult {
  style: 'analogy' | 'first_principles' | 'code_first' | 'visual_first';
  headline: string;
  explanation: string;
  concreteExample: string;
  keyTakeaway: string;
}

export interface TutorResponseResult {
  answer: string;
  relatedConcepts: string[];
  clarifyingQuestion?: string;
}

export interface AIProvider {
  name: 'gemini' | 'openai' | 'claude' | 'mock';
  
  evaluateAnswer(params: {
    question: string;
    expectedKeywords?: string[];
    userAnswer: string;
    context?: string;
  }): Promise<AnswerEvaluationResult>;

  explainDifferently(params: {
    concept: string;
    currentExplanation: string;
    failedReason?: string;
    style: 'analogy' | 'first_principles' | 'code_first' | 'visual_first';
  }): Promise<AlternativeExplanationResult>;

  answerTutorQuestion(params: {
    topic: string;
    currentSectionTitle: string;
    learnerQuestion: string;
    masteryLevel: number;
  }): Promise<TutorResponseResult>;
}
