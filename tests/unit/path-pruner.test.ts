import { describe, it, expect } from 'vitest';
import { CourseWarehouseService } from '@/lib/warehouse/service';

describe('CourseWarehouseService Path Personalization', () => {
  it('should return all sections when learner has low diagnostic score', () => {
    const path = CourseWarehouseService.personalizePath({
      topicSlug: 'redis-clustering',
      diagnosticScore: 30,
      knownConcepts: [],
      weakConcepts: ['hash-slots', 'gossip-protocol'],
    });

    expect(path.prunedSectionIds).toHaveLength(0);
    expect(path.activeSections.length).toBe(path.totalSections);
  });

  it('should prune known concepts when learner achieves high diagnostic score (>80%)', () => {
    const path = CourseWarehouseService.personalizePath({
      topicSlug: 'redis-clustering',
      diagnosticScore: 85,
      knownConcepts: ['hash-slots'],
      weakConcepts: ['sentinel-failover'],
    });

    expect(path.prunedSectionIds).toContain('sec-redis-1');
    expect(path.activeSections.some((s) => s.id === 'sec-redis-1')).toBe(false);
  });
});
