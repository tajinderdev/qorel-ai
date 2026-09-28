import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TopicSearchCatalog from '@/components/home/TopicSearchCatalog';
import DiagnosticView from '@/components/diagnostic/DiagnosticView';
import LessonRunner from '@/components/lesson/LessonRunner';
import KnowledgeDashboard from '@/components/profile/KnowledgeDashboard';
import RoleRoadmap from '@/components/career/RoleRoadmap';
import { CANONICAL_COURSES, TOPIC_CATALOG } from '@/lib/warehouse/courses';
import { useLearnerStore } from '@/lib/store/use-learner-store';

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('Complete Learner Journey Integration Flow', () => {
  beforeEach(() => {
    useLearnerStore.getState().resetAll();
  });

  it('Step 1: Should render Topic Catalog and allow filtering by query', () => {
    render(<TopicSearchCatalog />);
    expect(screen.getByText(/Master Complex Systems in/i)).toBeDefined();

    const searchInput = screen.getByPlaceholderText(/Search concepts/i);
    fireEvent.change(searchInput, { target: { value: 'Redis' } });

    expect(screen.getByText('Redis Clustering & High Availability')).toBeDefined();
  });

  it('Step 2: Should complete diagnostic questions and update personalized path', async () => {
    const topic = TOPIC_CATALOG[0];
    const course = CANONICAL_COURSES[topic.slug];

    render(<DiagnosticView topic={topic} diagnostic={course.diagnostic} />);
    expect(screen.getByText(/Diagnostic Challenge 1 of 3/i)).toBeDefined();

    // Select Q1 option
    const q1Option = screen.getByText(/The client computes CRC16\(key\) mod 16384/i);
    fireEvent.click(q1Option);
    fireEvent.click(screen.getByText(/Next Question/i));

    // Q2
    expect(screen.getByText(/Diagnostic Challenge 2 of 3/i)).toBeDefined();
    const q2Option = screen.getByText(/PFAIL is a local suspicion by a single node/i);
    fireEvent.click(q2Option);
    fireEvent.click(screen.getByText(/Next Question/i));

    // Q3: Open text explanation
    expect(screen.getByText(/Diagnostic Challenge 3 of 3/i)).toBeDefined();
    const textArea = screen.getByPlaceholderText(/Explain the failure isolation mechanism/i);
    fireEvent.change(textArea, {
      target: {
        value:
          'Redis Cluster requires a majority of masters to agree on quorum before initiating a failover election to prevent split-brain writes.',
      },
    });

    fireEvent.click(screen.getByText(/Synthesize Personalized Path/i));

    await waitFor(() => {
      expect(screen.getByText(/Diagnostic Assessment Complete/i)).toBeDefined();
      expect(screen.getByText(/Initial Proficiency Estimate/i)).toBeDefined();
    });

    const storeState = useLearnerStore.getState();
    expect(storeState.currentPath).not.toBeNull();
    expect(storeState.evidenceLogs.length).toBeGreaterThan(0);
  });

  it('Step 3: Should run Interactive Lesson, submit Checkpoint, and show verified badge', async () => {
    const topic = TOPIC_CATALOG[0];
    const course = CANONICAL_COURSES[topic.slug];

    render(<LessonRunner topic={topic} sections={course.sections} />);
    expect(screen.getAllByText(/1\. Hash Slot Partitioning/i)[0]).toBeDefined();
    expect(screen.getByText(/AI Voice Narration/i)).toBeDefined();

    // Submit Checkpoint
    const checkpointOption = screen.getByText(/Use Hash Tags: "\{user_42\}:session"/i);
    fireEvent.click(checkpointOption);

    const submitBtn = screen.getByText(/Submit Understanding/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Checkpoint Verified/i)).toBeDefined();
    });

    const storeState = useLearnerStore.getState();
    expect(storeState.knowledgeRecords[topic.slug]?.masteryScore).toBeGreaterThan(0);
  });

  it('Step 4: Should display updated Knowledge Profile with evidence logs', () => {
    const topic = TOPIC_CATALOG[0];
    useLearnerStore.getState().recordEvidence(topic.slug, topic.title, {
      type: 'CHECKPOINT_PASS',
      conceptKey: 'hash-slots',
      score: 100,
      rationale: 'Verified hash tag atomic routing mechanism.',
    });

    render(<KnowledgeDashboard />);
    expect(screen.getByText(/Personal Knowledge Profile/i)).toBeDefined();
    expect(screen.getByText(/Verifiable Evidence Ledger/i)).toBeDefined();
    expect(screen.getByText(/Verified hash tag atomic routing mechanism/i)).toBeDefined();
  });

  it('Step 5: Should display Career Roadmap with calculated readiness and skill gap', () => {
    render(<RoleRoadmap />);
    expect(screen.getByText(/Target Role Roadmap/i)).toBeDefined();
    expect(screen.getByText(/Current Readiness/i)).toBeDefined();
    expect(screen.getByText(/Recommended Highest-ROI Next Step/i)).toBeDefined();
  });
});
