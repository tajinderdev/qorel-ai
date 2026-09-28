import { KnowledgeRecord } from '../types';

export interface TechRole {
  id: string;
  title: string;
  tagline: string;
  description: string;
  averageSalaryUSD: string;
  requiredSkills: {
    skillName: string;
    requiredMastery: number; // 0-100
    topicSlug: string;
    weight: number; // 1-5
  }[];
}

export const TECH_ROLES: TechRole[] = [
  {
    id: 'role-senior-fullstack',
    title: 'Senior Full-Stack Engineer',
    tagline: 'Lead modern high-throughput web applications and real-time interactive user experiences.',
    description: 'Expertise in modern React concurrency, Next.js 15 server architecture, distributed caching, and relational data modeling.',
    averageSalaryUSD: '$175,000 - $225,000',
    requiredSkills: [
      { skillName: 'Next.js 15 & RSC Architecture', requiredMastery: 85, topicSlug: 'nextjs-app-architecture', weight: 4 },
      { skillName: 'React 19 Concurrency', requiredMastery: 80, topicSlug: 'react-19-concurrency', weight: 3 },
      { skillName: 'Redis Caching & Clustering', requiredMastery: 75, topicSlug: 'redis-clustering', weight: 4 },
      { skillName: 'Vector Search & PostgreSQL', requiredMastery: 70, topicSlug: 'postgres-pgvector', weight: 3 },
    ],
  },
  {
    id: 'role-ai-vector-engineer',
    title: 'AI Systems & Vector Engineer',
    tagline: 'Architect enterprise RAG pipelines, semantic search engines, and multi-modal LLM agents.',
    description: 'Specializes in high-dimensional vector embeddings, HNSW index optimization, hybrid lexical-semantic retrieval, and LLM application orchestration.',
    averageSalaryUSD: '$190,000 - $250,000',
    requiredSkills: [
      { skillName: 'Vector Search & PostgreSQL', requiredMastery: 90, topicSlug: 'postgres-pgvector', weight: 5 },
      { skillName: 'Distributed Consensus & Caching', requiredMastery: 75, topicSlug: 'redis-clustering', weight: 3 },
      { skillName: 'Modern Frontend Architecture', requiredMastery: 70, topicSlug: 'nextjs-app-architecture', weight: 2 },
    ],
  },
  {
    id: 'role-distributed-backend-architect',
    title: 'Staff Distributed Systems Architect',
    tagline: 'Design resilient, partition-tolerant distributed data storage and cloud infrastructure.',
    description: 'Mastery of consensus protocols, cluster failovers, CNI network topologies, and horizontal partitioning.',
    averageSalaryUSD: '$210,000 - $285,000',
    requiredSkills: [
      { skillName: 'Redis Caching & Clustering', requiredMastery: 90, topicSlug: 'redis-clustering', weight: 5 },
      { skillName: 'Kubernetes Pod Networking', requiredMastery: 85, topicSlug: 'kubernetes-pod-networking', weight: 5 },
      { skillName: 'PostgreSQL Internals', requiredMastery: 80, topicSlug: 'postgres-pgvector', weight: 4 },
    ],
  },
];

export interface RoleFitAssessment {
  role: TechRole;
  fitPercentage: number;
  missingSkills: {
    skillName: string;
    currentMastery: number;
    targetMastery: number;
    topicSlug: string;
    gap: number;
  }[];
  masteredSkills: {
    skillName: string;
    currentMastery: number;
  }[];
  recommendedNextTopic: {
    slug: string;
    title: string;
    reason: string;
  };
}

export class CareerEngineService {
  static getRoles(): TechRole[] {
    return TECH_ROLES;
  }

  static getRoleById(id: string): TechRole | undefined {
    return TECH_ROLES.find((r) => r.id === id);
  }

  static evaluateRoleFit(
    roleId: string,
    records: Record<string, KnowledgeRecord>
  ): RoleFitAssessment {
    const role = this.getRoleById(roleId) || TECH_ROLES[0];

    let totalWeightedScore = 0;
    let totalMaxPossible = 0;

    const missingSkills: RoleFitAssessment['missingSkills'] = [];
    const masteredSkills: RoleFitAssessment['masteredSkills'] = [];

    for (const req of role.requiredSkills) {
      const userRec = records[req.topicSlug];
      const currentMastery = userRec?.masteryScore || 0;
      const effectiveScore = Math.min(currentMastery, req.requiredMastery);

      totalWeightedScore += effectiveScore * req.weight;
      totalMaxPossible += req.requiredMastery * req.weight;

      if (currentMastery >= req.requiredMastery) {
        masteredSkills.push({
          skillName: req.skillName,
          currentMastery,
        });
      } else {
        missingSkills.push({
          skillName: req.skillName,
          currentMastery,
          targetMastery: req.requiredMastery,
          topicSlug: req.topicSlug,
          gap: req.requiredMastery - currentMastery,
        });
      }
    }

    const fitPercentage =
      totalMaxPossible > 0 ? Math.round((totalWeightedScore / totalMaxPossible) * 100) : 0;

    // Highest gap skill becomes recommendation
    missingSkills.sort((a, b) => b.gap - a.gap);
    const topMissing = missingSkills[0];

    const recommendedNextTopic = topMissing
      ? {
          slug: topMissing.topicSlug,
          title: topMissing.skillName,
          reason: `Closing your ${topMissing.gap}% mastery gap in ${topMissing.skillName} will provide the highest ROI (+${Math.round((topMissing.gap / totalMaxPossible) * 100)}% role readiness).`,
        }
      : {
          slug: role.requiredSkills[0].topicSlug,
          title: role.requiredSkills[0].skillName,
          reason: 'You have achieved target readiness! Review advanced edge cases to maintain high confidence.',
        };

    return {
      role,
      fitPercentage,
      missingSkills,
      masteredSkills,
      recommendedNextTopic,
    };
  }
}
