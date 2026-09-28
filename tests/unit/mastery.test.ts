import { describe, it, expect } from 'vitest';
import { KnowledgeService } from '@/lib/knowledge/service';

describe('KnowledgeService Mastery Calculation', () => {
  it('should calculate weighted mastery score accurately', () => {
    const res = KnowledgeService.calculateMastery({
      diagnosticScore: 80,
      checkpointScores: [90, 85],
      explanationScores: [80],
    });

    expect(res.masteryScore).toBeGreaterThanOrEqual(80);
    expect(res.masteryScore).toBeLessThanOrEqual(95);
    expect(res.confidence).toBe('High');
  });

  it('should assign Low confidence when evidence count is low', () => {
    const res = KnowledgeService.calculateMastery({
      diagnosticScore: 50,
      checkpointScores: [],
      explanationScores: [],
    });

    expect(res.confidence).toBe('Low');
    expect(res.masteryScore).toBe(50);
  });

  it('should update knowledge records with positive delta on checkpoint pass', () => {
    const { updatedRecord, evidenceEvent } = KnowledgeService.applyEvidence(
      undefined,
      'redis-clustering',
      'Redis Clustering',
      {
        type: 'CHECKPOINT_PASS',
        conceptKey: 'hash-slots',
        score: 95,
        rationale: 'Passed hash slot calculation checkpoint',
      }
    );

    expect(updatedRecord.masteryScore).toBeGreaterThan(20);
    expect(updatedRecord.strongConcepts).toContain('hash-slots');
    expect(updatedRecord.weakConcepts).not.toContain('hash-slots');
    expect(evidenceEvent.scoreDelta).toBeGreaterThan(0);
  });
});
