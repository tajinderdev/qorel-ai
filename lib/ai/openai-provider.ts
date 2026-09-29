import {
  AIProvider,
  AnswerEvaluationResult,
  AlternativeExplanationResult,
  TutorResponseResult,
} from './types';
import { MockAIProvider } from './mock-provider';

export class OpenAIProvider implements AIProvider {
  name: 'openai' = 'openai';
  private apiKey: string;
  private fallback: MockAIProvider;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    this.fallback = new MockAIProvider();
  }

  async evaluateAnswer(params: {
    question: string;
    expectedKeywords?: string[];
    userAnswer: string;
    context?: string;
  }): Promise<AnswerEvaluationResult> {
    if (!this.apiKey) return this.fallback.evaluateAnswer(params);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are an expert technical interviewer evaluating an engineer. Respond in JSON with keys: isCorrect (boolean), score (0-100), feedback (string), missingConcepts (string[]), demonstratedStrengths (string[]), suggestedFollowUp (string).',
            },
            {
              role: 'user',
              content: `Question: ${params.question}\nExpected: ${JSON.stringify(params.expectedKeywords)}\nContext: ${params.context}\nUser Answer: ${params.userAnswer}`,
            },
          ],
        }),
      });
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) return JSON.parse(content);
      return this.fallback.evaluateAnswer(params);
    } catch {
      return this.fallback.evaluateAnswer(params);
    }
  }

  async explainDifferently(params: {
    concept: string;
    currentExplanation: string;
    failedReason?: string;
    style: 'analogy' | 'first_principles' | 'code_first' | 'visual_first';
  }): Promise<AlternativeExplanationResult> {
    if (!this.apiKey) return this.fallback.explainDifferently(params);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'Respond in JSON with keys: style, headline, explanation, concreteExample, keyTakeaway.',
            },
            {
              role: 'user',
              content: `Explain "${params.concept}" with style "${params.style}". Context: "${params.currentExplanation}". Reason: "${params.failedReason}"`,
            },
          ],
        }),
      });
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) return JSON.parse(content);
      return this.fallback.explainDifferently(params);
    } catch {
      return this.fallback.explainDifferently(params);
    }
  }

  async answerTutorQuestion(params: {
    topic: string;
    currentSectionTitle: string;
    learnerQuestion: string;
    masteryLevel: number;
  }): Promise<TutorResponseResult> {
    if (!this.apiKey) return this.fallback.answerTutorQuestion(params);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: 'Respond in JSON with keys: answer, relatedConcepts, clarifyingQuestion.',
            },
            {
              role: 'user',
              content: `Topic: ${params.topic}, Section: ${params.currentSectionTitle}, Mastery: ${params.masteryLevel}%, Question: ${params.learnerQuestion}`,
            },
          ],
        }),
      });
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content) return JSON.parse(content);
      return this.fallback.answerTutorQuestion(params);
    } catch {
      return this.fallback.answerTutorQuestion(params);
    }
  }

  async generateCourseContent(params: {
    topicSlug: string;
    topicTitle: string;
  }): Promise<import('../types').CanonicalCourse> {
    if (!this.apiKey) return this.fallback.generateCourseContent(params);
    
    // For MVP, we use the fallback's mock generation to avoid long complex JSON generation timeouts,
    // but in production we would prompt OpenAI to build the CanonicalCourse JSON.
    return this.fallback.generateCourseContent(params);
  }
}
