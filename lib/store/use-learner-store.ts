import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  EvidenceEvent,
  KnowledgeRecord,
  PersonalizedPath,
  UserLearnerState,
} from '../types';
import { KnowledgeService } from '../knowledge/service';

interface LearnerStoreState extends UserLearnerState {
  currentPath: PersonalizedPath | null;
  activeSectionIndex: number;
  isAudioPlaying: boolean;
  audioRate: number;
  currentCaption: string;

  // Actions
  setTargetRole: (role: string) => void;
  setCurrentPath: (path: PersonalizedPath | null) => void;
  setActiveSectionIndex: (index: number) => void;
  setAudioPlaying: (playing: boolean) => void;
  setAudioRate: (rate: number) => void;
  setCurrentCaption: (caption: string) => void;
  
  markSectionCompleted: (topicSlug: string, sectionId: string) => void;
  recordEvidence: (
    topicSlug: string,
    skillName: string,
    event: {
      type: EvidenceEvent['eventType'];
      conceptKey: string;
      score: number;
      rationale: string;
    }
  ) => void;
  resetTopicProgress: (topicSlug: string) => void;
  resetAll: () => void;
}

const INITIAL_STATE: UserLearnerState = {
  userId: 'user_dev_01',
  targetRole: 'Senior Full-Stack Engineer',
  knowledgeRecords: {
    'nextjs-app-architecture': {
      topicSlug: 'nextjs-app-architecture',
      skillName: 'Next.js 15 & RSC Architecture',
      masteryScore: 72,
      confidence: 'Medium',
      strongConcepts: ['RSC Boundaries', 'Server Actions'],
      weakConcepts: ['Route Interception'],
      lastAssessedAt: new Date().toISOString(),
    },
  },
  evidenceLogs: [
    {
      id: 'ev-init-1',
      topicSlug: 'nextjs-app-architecture',
      conceptId: 'RSC Boundaries',
      eventType: 'CHECKPOINT_PASS',
      scoreDelta: 15,
      scoreBefore: 55,
      scoreAfter: 70,
      rationale: 'Correctly discriminated client vs server module execution boundaries.',
      timestamp: new Date().toISOString(),
    },
  ],
  completedSections: {
    'nextjs-app-architecture': ['sec-nextjs-1'],
  },
};

export const useLearnerStore = create<LearnerStoreState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      currentPath: null,
      activeSectionIndex: 0,
      isAudioPlaying: false,
      audioRate: 1,
      currentCaption: '',

      setTargetRole: (targetRole) => set({ targetRole }),

      setCurrentPath: (currentPath) => set({ currentPath, activeSectionIndex: 0 }),

      setActiveSectionIndex: (activeSectionIndex) => set({ activeSectionIndex }),

      setAudioPlaying: (isAudioPlaying) => set({ isAudioPlaying }),

      setAudioRate: (audioRate) => set({ audioRate }),

      setCurrentCaption: (currentCaption) => set({ currentCaption }),

      markSectionCompleted: (topicSlug, sectionId) => {
        const completed = { ...get().completedSections };
        const list = completed[topicSlug] || [];
        if (!list.includes(sectionId)) {
          completed[topicSlug] = [...list, sectionId];
          set({ completedSections: completed });
        }
      },

      recordEvidence: (topicSlug, skillName, event) => {
        const { knowledgeRecords, evidenceLogs } = get();
        const existingRecord = knowledgeRecords[topicSlug];

        const { updatedRecord, evidenceEvent } = KnowledgeService.applyEvidence(
          existingRecord,
          topicSlug,
          skillName,
          event
        );

        set({
          knowledgeRecords: {
            ...knowledgeRecords,
            [topicSlug]: updatedRecord,
          },
          evidenceLogs: [evidenceEvent, ...evidenceLogs],
        });
      },

      resetTopicProgress: (topicSlug) => {
        const { completedSections, knowledgeRecords } = get();
        const newCompleted = { ...completedSections };
        delete newCompleted[topicSlug];
        const newKnowledge = { ...knowledgeRecords };
        delete newKnowledge[topicSlug];
        set({ completedSections: newCompleted, knowledgeRecords: newKnowledge });
      },

      resetAll: () => set({ ...INITIAL_STATE, currentPath: null, activeSectionIndex: 0 }),
    }),
    {
      name: 'qorel-learner-store-v1',
    }
  )
);
