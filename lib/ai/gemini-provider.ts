import {
  AIProvider,
  AnswerEvaluationResult,
  AlternativeExplanationResult,
  TutorResponseResult,
} from './types';
import { MockAIProvider } from './mock-provider';

export class GeminiProvider implements AIProvider {
  name: 'gemini' = 'gemini';
  private apiKey: string;
  private fallback: MockAIProvider;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.fallback = new MockAIProvider();
  }

  async evaluateAnswer(params: {
    question: string;
    expectedKeywords?: string[];
    userAnswer: string;
    context?: string;
  }): Promise<AnswerEvaluationResult> {
    if (!this.apiKey) {
      return this.fallback.evaluateAnswer(params);
    }
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert technical interviewer evaluating a software engineer's answer.
Question: "${params.question}"
Expected Key Concepts: ${JSON.stringify(params.expectedKeywords || [])}
Context: "${params.context || ''}"
Learner's Answer: "${params.userAnswer}"

Respond ONLY in valid JSON with this exact schema:
{
  "isCorrect": boolean,
  "score": number (0-100),
  "feedback": string (concise, direct technical review),
  "missingConcepts": string[],
  "demonstratedStrengths": string[],
  "suggestedFollowUp": string
}`,
                  },
                ],
              },
            ],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return JSON.parse(rawText);
      }
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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Explain concept: "${params.concept}" using style: "${params.style}".
Current Context: "${params.currentExplanation}"
Learner struggle reason: "${params.failedReason || 'Needs clearer intuition'}"

Respond ONLY in valid JSON matching schema:
{
  "style": "${params.style}",
  "headline": string,
  "explanation": string,
  "concreteExample": string,
  "keyTakeaway": string
}`,
                  },
                ],
              },
            ],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) return JSON.parse(rawText);
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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert AI tutor teaching "${params.topic}" (Section: "${params.currentSectionTitle}").
Learner Mastery: ${params.masteryLevel}%.
Learner Question: "${params.learnerQuestion}"

Respond ONLY in valid JSON matching schema:
{
  "answer": string (concise, insightful, 2-3 paragraphs max),
  "relatedConcepts": string[],
  "clarifyingQuestion": string
}`,
                  },
                ],
              },
            ],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) return JSON.parse(rawText);
      return this.fallback.answerTutorQuestion(params);
    } catch {
      return this.fallback.answerTutorQuestion(params);
    }
  }
}
