import {
  AIProvider,
  AnswerEvaluationResult,
  AlternativeExplanationResult,
  TutorResponseResult,
} from './types';

export class MockAIProvider implements AIProvider {
  name: 'mock' = 'mock';

  async evaluateAnswer(params: {
    question: string;
    expectedKeywords?: string[];
    userAnswer: string;
    context?: string;
  }): Promise<AnswerEvaluationResult> {
    const answer = params.userAnswer.toLowerCase().trim();
    const keywords = params.expectedKeywords?.map((k) => k.toLowerCase()) || [];

    if (!answer || answer.length < 5) {
      return {
        isCorrect: false,
        score: 15,
        feedback:
          'Your answer was too brief. To verify real understanding, explain the mechanism and why the architecture behaves this way.',
        missingConcepts: params.expectedKeywords || ['Core mechanism', 'Failure isolation'],
        demonstratedStrengths: [],
        suggestedFollowUp: 'Try describing the step-by-step state transition when the failure occurs.',
      };
    }

    const matchedKeywords = keywords.filter((k) => answer.includes(k));
    const matchRatio = keywords.length > 0 ? matchedKeywords.length / keywords.length : 0.7;

    const hasDepth = answer.length > 50;
    const score = Math.min(
      100,
      Math.round(matchRatio * 70 + (hasDepth ? 25 : 10) + Math.min(answer.split(' ').length, 10))
    );
    const isCorrect = score >= 65;

    const missing = keywords.filter((k) => !matchedKeywords.includes(k));

    return {
      isCorrect,
      score,
      feedback: isCorrect
        ? `Strong conceptual grasp! You accurately identified ${matchedKeywords.length > 0 ? matchedKeywords.join(', ') : 'the core trade-off'}. ${missing.length ? `For mastery, consider also: ${missing.join(', ')}.` : 'Your technical breakdown is solid.'}`
        : `Partially aligned, but missing key architectural constraints: ${missing.join(', ')}. Review how state consistency is preserved.`,
      missingConcepts: missing,
      demonstratedStrengths: matchedKeywords.length > 0 ? matchedKeywords : ['Initial intuition'],
      suggestedFollowUp: !isCorrect ? 'Would you like an analogy or code-level walkthrough of this failure mode?' : undefined,
    };
  }

  async explainDifferently(params: {
    concept: string;
    currentExplanation: string;
    failedReason?: string;
    style: 'analogy' | 'first_principles' | 'code_first' | 'visual_first';
  }): Promise<AlternativeExplanationResult> {
    const { concept, style } = params;

    switch (style) {
      case 'analogy':
        return {
          style: 'analogy',
          headline: `Mental Model: ${concept} as a Distributed Airport Luggage Carousel`,
          explanation: `Imagine 16,384 luggage tags distributed across 3 distinct baggage claim carousels. Instead of one giant room where every passenger crowds, your boarding pass hash determines exactly which carousel receives your bag. If Carousel 2 experiences a mechanical jam, an automated standby carousel takes over that exact tag range without disrupting Carousel 1 or 3.`,
          concreteExample: `HashSlot = CRC16("user:1024") % 16384 -> Assigned to Shard #2`,
          keyTakeaway: `Data is partitioned deterministically; no single coordinator is a single point of failure.`,
        };

      case 'code_first':
        return {
          style: 'code_first',
          headline: `Code Breakdown: ${concept}`,
          explanation: `Here is the exact state transition implemented in minimal TypeScript pseudo-code showing how the protocol handles slot routing and failover election:`,
          concreteExample: `// Deterministic hash slot routing\nfunction getTargetNode(key: string, clusterNodes: Node[]): Node {\n  const slot = crc16(key) % 16384;\n  return clusterNodes.find(n => slot >= n.slotStart && slot <= n.slotEnd)!;\n}\n\n// Sentinel Quorum vote\nif (heartbeatMissedCount > FAIL_THRESHOLD) {\n  broadcastVoteRequest({ candidateId: myId, currentEpoch });\n}`,
          keyTakeaway: `Routing is mathematically calculated client-side via slot map caching, reducing network hops from O(N) to O(1).`,
        };

      case 'first_principles':
        return {
          style: 'first_principles',
          headline: `First Principles Analysis: ${concept}`,
          explanation: `In any distributed system, you cannot escape the CAP theorem tradeoffs. To achieve horizontal write throughput without global locking, you must partition state into discrete immutable shards. Gossip protocol propagates node heartbeats using randomized dissemination, balancing $O(1)$ node overhead with $O(\\log N)$ convergence time.`,
          concreteExample: `Packet payload: [Epoch: 4, Node_State: PFAIL, Slot_Bitmap: 0x3F8A...]`,
          keyTakeaway: `High availability is achieved through decentralized consensus rather than synchronous master locking.`,
        };

      case 'visual_first':
      default:
        return {
          style: 'visual_first',
          headline: `Visual Step-by-Step: ${concept}`,
          explanation: `Observe the active 3D topology: watch the ping packet travel from Node 1 to Node 3. When Node 3 fails to ACK within 500ms, Node 1 flags Node 3 as PFAIL (Possible Fail). Once 3 independent nodes agree on PFAIL, it transitions to FAIL and the replica initiates election.`,
          concreteExample: `Visual Flow: [Node 1] -> (PING) -> [Node 3] (TIMEOUT) -> Broadcast [PFAIL Node 3]`,
          keyTakeaway: `Consensus requires multiple independent witnesses before triggering expensive failover routines.`,
        };
    }
  }

  async answerTutorQuestion(params: {
    topic: string;
    currentSectionTitle: string;
    learnerQuestion: string;
    masteryLevel: number;
  }): Promise<TutorResponseResult> {
    const q = params.learnerQuestion.toLowerCase();

    if (q.includes('why') || q.includes('reason')) {
      return {
        answer: `Great question regarding **${params.currentSectionTitle}**. The key design constraint here is fault isolation. By decoupling cluster health detection from client request paths, the system avoids cascading latency spikes when a single node experiences high garbage collection pauses.`,
        relatedConcepts: ['Gossip Ping/Pong', 'PFAIL vs FAIL status', 'Split-brain prevention'],
        clarifyingQuestion: 'Would you like to see what happens when network partitions isolate a minority replica?',
      };
    }

    return {
      answer: `In the context of **${params.topic}** (${params.currentSectionTitle}), this works by maintaining an in-memory slot map. Every client driver caches the slot-to-node topology. If a request is sent to the wrong node, the node responds with a \`-MOVED <slot> <target_ip>\` redirection header, enabling the client to refresh its local cache.`,
      relatedConcepts: ['-MOVED Redirection', '-ASK Redirection', 'Slot Migration'],
      clarifyingQuestion: 'Does the distinction between -MOVED (permanent) and -ASK (temporary during slot resharding) make sense?',
    };
  }
}
