'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CanonicalSection, Topic } from '@/lib/types';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import VisualContainer from '../visuals/VisualContainer';
import AudioPlayerBar from '../audio/AudioPlayerBar';
import CheckpointView from './CheckpointView';
import TutorAssistant from './TutorAssistant';
import ExplainDifferentlyModal from './ExplainDifferentlyModal';
import {
  CheckCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Award,
  ArrowRight,
  Check,
  Copy,
  MessageSquare,
  MessageCircle,
} from 'lucide-react';

interface LessonRunnerProps {
  topic: Topic;
  sections: CanonicalSection[];
}

export default function LessonRunner({ topic, sections }: LessonRunnerProps) {
  const {
    activeSectionIndex,
    setActiveSectionIndex,
    completedSections,
    markSectionCompleted,
  } = useLearnerStore();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTutorChat, setShowTutorChat] = useState(true);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const activeSection = sections[activeSectionIndex] || sections[0];
  const topicCompleted = completedSections[topic.slug] || [];

  const handleNextSection = () => {
    markSectionCompleted(topic.slug, activeSection.id);
    if (activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    } else {
      setIsCompleted(true);
      setIsPresentationMode(false); // Stop presentation when done
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'frontend': '#3b82f6', // blue
      'backend': '#10b981', // emerald
      'devops': '#8b5cf6', // violet
      'architecture': '#f59e0b', // amber
    };
    return colors[category?.toLowerCase()] || '#0d9488'; // fallback teal
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="glass-panel-emerald rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Lesson Completed
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-4 mb-2">
            Mastery Verified: {topic.title}
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
            You successfully completed all interactive checkpoints and visual simulations. Your
            Knowledge Profile and Role Readiness scores have been updated.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
            <div className="p-4 rounded-xl bg-card border border-border">
              <span className="text-xs text-muted-foreground">Estimated Mastery</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">82%</p>
              <span className="text-[11px] text-emerald-400/80">+22% gain</span>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <span className="text-xs text-muted-foreground">Evidence Logged</span>
              <p className="text-xl font-bold text-indigo-300 mt-1">3 Checkpoints</p>
              <span className="text-[11px] text-slate-400">100% pass rate</span>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <span className="text-xs text-muted-foreground">Target Role Impact</span>
              <p className="text-xl font-bold text-cyan-300 mt-1">+14%</p>
              <span className="text-[11px] text-slate-400">Senior Full-Stack</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/profile"
              id="view-profile-summary-btn"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <span>View Knowledge Profile & Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/roadmap"
              id="view-career-roadmap-btn"
              className="px-6 py-3 rounded-xl bg-muted hover:bg-card border border-border text-slate-200 text-xs font-semibold transition-colors"
            >
              View Target Role Roadmap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="max-w-7xl mx-auto px-4 py-6"
      style={{ '--topic-theme': getCategoryColor(topic.category) } as React.CSSProperties}
    >
      {/* Top Breadcrumbs & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Topics
            </Link>
            <span>/</span>
            <span className="font-medium" style={{ color: 'var(--topic-theme)' }}>{topic.title}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: 'var(--topic-theme)' }} />
            <span>{activeSection.title}</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setIsPresentationMode(!isPresentationMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border ${
              isPresentationMode 
                ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-500/20' 
                : 'bg-card text-muted-foreground border-border/80 hover:text-foreground hover:border-teal-500/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isPresentationMode ? 'Presentation Active' : 'Start Presentation'}
          </button>

          {/* Section Steps Navigation Indicator */}
          <div className="flex items-center gap-2 bg-card/60 p-1.5 rounded-2xl border border-border/80">
            {sections.map((sec, idx) => {
              const isCurrent = idx === activeSectionIndex;
              const isDone = topicCompleted.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isCurrent
                      ? 'text-white shadow-md'
                      : isDone
                      ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20'
                      : 'text-muted-foreground hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  style={isCurrent ? { backgroundColor: 'var(--topic-theme)' } : {}}
                >
                  {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : <span>{idx + 1}</span>}
                  <span className="hidden md:inline truncate max-w-[120px]">{sec.conceptKey}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Content (65%), Right AI Assistant (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Audio + Visual 3D + Markdown + Checkpoint */}
        <div className="lg:col-span-8 space-y-6">
          {/* Synchronized Voice Narration Bar */}
          <AudioPlayerBar
            script={activeSection.narrationScript}
            title={activeSection.title}
            autoPlay={isPresentationMode}
            onComplete={() => { if (isPresentationMode) handleNextSection(); }}
          />

          {/* Interactive Procedural 3D/2D Canvas Visualizer */}
          <VisualContainer spec={activeSection.visualSpec} />

          {/* Section Markdown Card */}
          <div className="glass-panel rounded-2xl p-6 border border-border/80 space-y-4">
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-wrap">
              {activeSection.contentMarkdown}
            </div>

            {/* Code Snippets with Copy */}
            {activeSection.codeSnippets?.map((snip, idx) => (
              <div
                key={idx}
                className="mt-4 rounded-xl overflow-hidden border border-border/90 bg-[#0b0d14]"
              >
                <div className="px-4 py-2 bg-card/90 border-b border-border flex items-center justify-between">
                  <span className="font-mono text-xs text-indigo-300">
                    {snip.filename || `${snip.language} example`}
                  </span>
                  <button
                    onClick={() => handleCopyCode(snip.code, idx)}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{snip.code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Active Checkpoint Gate */}
          {activeSection.checkpoint && (
            <CheckpointView
              checkpoint={activeSection.checkpoint}
              topicSlug={topic.slug}
              conceptKey={activeSection.conceptKey}
              onPassed={handleNextSection}
              onRequestExplainDifferently={() => setShowExplainModal(true)}
            />
          )}

          {/* Bottom Pagination Controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePrevSection}
              disabled={activeSectionIndex === 0}
              className="px-4 py-2 rounded-xl bg-card hover:bg-card-hover disabled:opacity-30 border border-border text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={handleNextSection}
              id="next-section-btn"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
            >
              <span>{activeSectionIndex < sections.length - 1 ? 'Continue to Next Concept' : 'Complete Lesson & Verify'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: AI Tutor Chat & Explain Differently trigger */}
        <div className="lg:col-span-4 space-y-4">
          <TutorAssistant
            topicTitle={topic.title}
            sectionTitle={activeSection.title}
          />
        </div>
      </div>

      {/* Explain Differently Modal */}
      <ExplainDifferentlyModal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        conceptKey={activeSection.conceptKey}
        conceptTitle={activeSection.title}
      />
    </div>
  );
}
