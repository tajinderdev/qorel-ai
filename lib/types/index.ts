export interface Topic {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Distributed Systems' | 'Frontend Architecture' | 'AI & Vector Systems' | 'Cloud & DevOps' | 'Core Engineering';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Staff';
  estimatedMinutes: number;
  prerequisites: string[];
  skillsCovered: string[];
  tags: string[];
}

export type VisualType = 
  | '3d_cluster_network'
  | '3d_memory_layout'
  | '3d_pipeline_flow'
  | '2d_architecture_canvas';

export interface VisualSpec {
  type: VisualType;
  title?: string;
  props: Record<string, unknown>;
}

export interface LessonCheckpoint {
  id: string;
  type: 'multiple_choice' | 'code_prediction' | 'code_fix' | 'open_explanation';
  prompt: string;
  codeContext?: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  expectedKeywords?: string[];
  rubricCriteria?: string[];
  difficulty: 'basic' | 'intermediate' | 'expert';
}

export interface CanonicalSection {
  id: string;
  title: string;
  conceptKey: string;
  order: number;
  durationSeconds: number;
  narrationScript: string;
  contentMarkdown: string;
  codeSnippets?: {
    language: string;
    filename?: string;
    code: string;
    highlightLines?: number[];
  }[];
  visualSpec?: VisualSpec;
  checkpoint?: LessonCheckpoint;
}

export interface DiagnosticQuestion {
  id: string;
  conceptKey: string;
  type: 'multiple_choice' | 'code_prediction' | 'open_explanation';
  question: string;
  codeContext?: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  expectedKeywords?: string[];
  difficulty: 'basic' | 'intermediate' | 'expert';
}

export interface DiagnosticQuiz {
  topicSlug: string;
  title: string;
  description: string;
  questions: DiagnosticQuestion[];
}

export interface CanonicalCourse {
  topicSlug: string;
  version: number;
  diagnostic: DiagnosticQuiz;
  sections: CanonicalSection[];
}

export interface PersonalizedPath {
  topicSlug: string;
  totalSections: number;
  prunedSectionIds: string[]; // Sections skipped due to verified existing mastery
  activeSections: CanonicalSection[];
  initialMasteryEstimate: number;
  diagnosticScore: number;
}

export interface KnowledgeRecord {
  topicSlug: string;
  skillName: string;
  masteryScore: number; // 0 to 100
  confidence: 'Low' | 'Medium' | 'High';
  strongConcepts: string[];
  weakConcepts: string[];
  lastAssessedAt: string;
}

export interface EvidenceEvent {
  id: string;
  topicSlug: string;
  conceptId: string;
  eventType: 'DIAGNOSTIC' | 'CHECKPOINT_PASS' | 'CHECKPOINT_FAIL' | 'EXPLANATION_EVAL';
  scoreDelta: number;
  scoreBefore: number;
  scoreAfter: number;
  rationale: string;
  timestamp: string;
}

export interface UserLearnerState {
  userId: string;
  targetRole: string;
  knowledgeRecords: Record<string, KnowledgeRecord>; // Key: topicSlug
  evidenceLogs: EvidenceEvent[];
  completedSections: Record<string, string[]>; // Key: topicSlug -> sectionIds
}
