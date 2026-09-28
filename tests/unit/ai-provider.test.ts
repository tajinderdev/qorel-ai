import { describe, it, expect } from 'vitest';
import { MockAIProvider } from '@/lib/ai/mock-provider';

describe('MockAIProvider Interactivity', () => {
  const provider = new MockAIProvider();

  it('should evaluate detailed answers with high score and feedback', async () => {
    const result = await provider.evaluateAnswer({
      question: 'Explain split brain prevention in Redis Cluster',
      expectedKeywords: ['majority', 'quorum', 'failover'],
      userAnswer:
        'Redis Cluster requires a majority of masters to agree on quorum before initiating a failover election, preventing split-brain writes.',
    });

    expect(result.isCorrect).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.demonstratedStrengths.length).toBeGreaterThan(0);
  });

  it('should flag answers that are too brief or lack required keywords', async () => {
    const result = await provider.evaluateAnswer({
      question: 'Explain split brain prevention in Redis Cluster',
      expectedKeywords: ['majority', 'quorum'],
      userAnswer: 'nodes talk',
    });

    expect(result.isCorrect).toBe(false);
    expect(result.score).toBeLessThan(50);
  });

  it('should generate multiple styles for Explain Differently', async () => {
    const analogy = await provider.explainDifferently({
      concept: 'Hash Slots',
      currentExplanation: '16384 partitions',
      style: 'analogy',
    });
    expect(analogy.style).toBe('analogy');
    expect(analogy.headline).toContain('Luggage Carousel');

    const code = await provider.explainDifferently({
      concept: 'Hash Slots',
      currentExplanation: '16384 partitions',
      style: 'code_first',
    });
    expect(code.style).toBe('code_first');
    expect(code.concreteExample).toContain('crc16');
  });
});
