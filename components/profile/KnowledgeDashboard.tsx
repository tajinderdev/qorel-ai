'use client';

import React from 'react';
import Link from 'next/link';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import {
  Brain,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export default function KnowledgeDashboard() {
  const { knowledgeRecords, evidenceLogs, targetRole, resetTopicProgress } = useLearnerStore();

  const recordList = Object.values(knowledgeRecords);
  const avgMastery =
    recordList.length > 0
      ? Math.round(recordList.reduce((acc, r) => acc + r.masteryScore, 0) / recordList.length)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <Brain className="w-4 h-4" />
            <span>EXPLAINABLE KNOWLEDGE LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Personal Knowledge Profile
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Continuous verifiable record of your engineering skills, concept retention, and active
            checkpoint proofs across modern architectures.
          </p>
        </div>

        {/* Global Stats Counter */}
        <div className="flex items-center gap-4 bg-background/60 p-4 rounded-2xl border border-white/5 shrink-0">
          <div>
            <span className="text-xs text-muted-foreground">Overall Mastery</span>
            <p className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">{avgMastery}%</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <span className="text-xs text-muted-foreground">Target Role</span>
            <p className="text-xs font-bold text-indigo-300 truncate max-w-[140px] mt-1">
              {targetRole}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Topic Mastery Cards, Right Evidence Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Topic Knowledge Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Tracked Technologies & Stacks</span>
            </h2>
            <span className="text-xs text-muted-foreground">{recordList.length} Active Modules</span>
          </div>

          {recordList.length === 0 ? (
            <div className="glass-panel rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">No topics assessed yet.</p>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Browse Topics Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recordList.map((rec) => (
                <div
                  key={rec.topicSlug}
                  className="glass-panel rounded-2xl p-5 border border-border/80 hover:border-indigo-500/40 transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {rec.skillName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-slate-300 font-mono">
                          Confidence: {rec.confidence}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Last assessed {new Date(rec.lastAssessedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-bold font-mono text-emerald-400">
                        {rec.masteryScore}%
                      </span>
                      <span className="block text-[10px] text-muted-foreground uppercase">
                        Mastery
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                      style={{ width: `${rec.masteryScore}%` }}
                    />
                  </div>

                  {/* Strong vs Weak concepts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1 mb-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Strong Areas:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rec.strongConcepts.length > 0 ? (
                          rec.strongConcepts.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                            >
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-[11px]">No verified strengths yet</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-amber-400 font-semibold flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Growth Areas:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rec.weakConcepts.length > 0 ? (
                          rec.weakConcepts.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]"
                            >
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-[11px]">None identified!</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => resetTopicProgress(rec.topicSlug)}
                      className="text-[11px] text-muted-foreground hover:text-rose-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Topic History
                    </button>

                    <Link
                      href={`/lesson/${rec.topicSlug}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Review / Continue Lesson
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Evidence Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Verifiable Evidence Ledger</span>
            </h2>
            <span className="text-xs text-muted-foreground">{evidenceLogs.length} Events</span>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-border/80 max-h-[600px] overflow-y-auto space-y-3">
            {evidenceLogs.map((ev) => (
              <div
                key={ev.id}
                className="p-3.5 rounded-xl bg-card/70 border border-border/80 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono font-bold uppercase text-[10px] px-2 py-0.5 rounded ${
                      ev.eventType === 'CHECKPOINT_PASS'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : ev.eventType === 'DIAGNOSTIC'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : ev.eventType === 'EXPLANATION_EVAL'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {ev.eventType.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="font-semibold text-foreground">{ev.conceptId}</p>
                <p className="text-muted-foreground leading-relaxed">{ev.rationale}</p>

                <div className="flex items-center gap-2 pt-1 font-mono text-[11px]">
                  <span className="text-muted-foreground">
                    {ev.scoreBefore}% &rarr; {ev.scoreAfter}%
                  </span>
                  <span
                    className={`font-bold ${
                      ev.scoreDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {ev.scoreDelta >= 0 ? `+${ev.scoreDelta}%` : `${ev.scoreDelta}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
