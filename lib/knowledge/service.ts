import { EvidenceEvent, KnowledgeRecord } from '../types';

export class KnowledgeService {
  /**
   * Calculates explainable mastery score from composite evidence weights.
   */
  static calculateMastery(params: {
    diagnosticScore?: number;
    checkpointScores?: number[];
    explanationScores?: number[];
  }): { masteryScore: number; confidence: 'Low' | 'Medium' | 'High' } {
    const { diagnosticScore = 50, checkpointScores = [], explanationScores = [] } = params;

    const wd = 0.25;
    const wc = 0.45;
    const we = 0.3;

    const avgCheckpoints =
      checkpointScores.length > 0
        ? checkpointScores.reduce((a, b) => a + b, 0) / checkpointScores.length
        : diagnosticScore;

    const avgExplanation =
      explanationScores.length > 0
        ? explanationScores.reduce((a, b) => a + b, 0) / explanationScores.length
        : diagnosticScore;

    const rawMastery = wd * diagnosticScore + wc * avgCheckpoints + we * avgExplanation;
    const masteryScore = Math.min(100, Math.max(0, Math.round(rawMastery)));

    const totalEvidenceCount =
      (diagnosticScore > 0 ? 1 : 0) + checkpointScores.length + explanationScores.length;

    let confidence: 'Low' | 'Medium' | 'High' = 'Low';
    if (totalEvidenceCount >= 4) {
      confidence = 'High';
    } else if (totalEvidenceCount >= 2) {
      confidence = 'Medium';
    }

    return { masteryScore, confidence };
  }

  /**
   * Updates or initializes a knowledge record with a new evidence event
   */
  static applyEvidence(
    existing: KnowledgeRecord | undefined,
    topicSlug: string,
    skillName: string,
    event: {
      type: EvidenceEvent['eventType'];
      conceptKey: string;
      score: number;
      rationale: string;
    }
  ): { updatedRecord: KnowledgeRecord; evidenceEvent: EvidenceEvent } {
    const scoreBefore = existing?.masteryScore || 20;
    const scoreDelta = event.score >= 70 ? Math.round((event.score - scoreBefore) * 0.35) : -5;
    const scoreAfter = Math.min(100, Math.max(10, scoreBefore + scoreDelta));

    const strong = new Set(existing?.strongConcepts || []);
    const weak = new Set(existing?.weakConcepts || []);

    if (event.score >= 75) {
      strong.add(event.conceptKey);
      weak.delete(event.conceptKey);
    } else {
      weak.add(event.conceptKey);
      strong.delete(event.conceptKey);
    }

    const { confidence } = this.calculateMastery({
      diagnosticScore: scoreAfter,
      checkpointScores: event.score >= 70 ? [event.score] : [],
    });

    const updatedRecord: KnowledgeRecord = {
      topicSlug,
      skillName,
      masteryScore: scoreAfter,
      confidence,
      strongConcepts: Array.from(strong),
      weakConcepts: Array.from(weak),
      lastAssessedAt: new Date().toISOString(),
    };

    const evidenceEvent: EvidenceEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      topicSlug,
      conceptId: event.conceptKey,
      eventType: event.type,
      scoreDelta,
      scoreBefore,
      scoreAfter,
      rationale: event.rationale,
      timestamp: new Date().toISOString(),
    };

    return { updatedRecord, evidenceEvent };
  }
}
