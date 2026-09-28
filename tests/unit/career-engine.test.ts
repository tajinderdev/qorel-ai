import { describe, it, expect } from 'vitest';
import { CareerEngineService } from '@/lib/career/service';
import { KnowledgeRecord } from '@/lib/types';

describe('CareerEngineService Role Fit', () => {
  it('should return 0% fit for brand new user with no completed topics', () => {
    const assessment = CareerEngineService.evaluateRoleFit('role-senior-fullstack', {});
    expect(assessment.fitPercentage).toBe(0);
    expect(assessment.missingSkills.length).toBeGreaterThan(0);
    expect(assessment.recommendedNextTopic.slug).toBeDefined();
  });

  it('should calculate accurate readiness percentage when user masters skills', () => {
    const mockRecords: Record<string, KnowledgeRecord> = {
      'nextjs-app-architecture': {
        topicSlug: 'nextjs-app-architecture',
        skillName: 'Next.js 15 & RSC Architecture',
        masteryScore: 85,
        confidence: 'High',
        strongConcepts: [],
        weakConcepts: [],
        lastAssessedAt: new Date().toISOString(),
      },
      'react-19-concurrency': {
        topicSlug: 'react-19-concurrency',
        skillName: 'React 19 Concurrency',
        masteryScore: 80,
        confidence: 'High',
        strongConcepts: [],
        weakConcepts: [],
        lastAssessedAt: new Date().toISOString(),
      },
    };

    const assessment = CareerEngineService.evaluateRoleFit(
      'role-senior-fullstack',
      mockRecords
    );
    expect(assessment.fitPercentage).toBeGreaterThan(40);
    expect(assessment.masteredSkills.length).toBe(2);
  });
});
