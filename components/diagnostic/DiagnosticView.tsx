'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosticQuiz, DiagnosticQuestion, Topic } from '@/lib/types';
import { CourseWarehouseService } from '@/lib/warehouse/service';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import { MockAIProvider } from '@/lib/ai/mock-provider';
import {
  Brain,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Code,
  Check,
  AlertCircle,
} from 'lucide-react';

interface DiagnosticViewProps {
  topic: Topic;
  diagnostic: DiagnosticQuiz;
}

export default function DiagnosticView({ topic, diagnostic }: DiagnosticViewProps) {
  const router = useRouter();
  const { setCurrentPath, recordEvidence } = useLearnerStore();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { optionId?: string; text?: string }>>({});
  const [evaluating, setEvaluating] = useState(false);
  const [completedResults, setCompletedResults] = useState<{
    score: number;
    knownConcepts: string[];
    weakConcepts: string[];
  } | null>(null);

  const question = diagnostic.questions[currentQIndex];
  const totalQuestions = diagnostic.questions.length;
  const currentAnswer = answers[question.id] || {};

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: { optionId },
    }));
  };

  const handleTextChange = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: { text },
    }));
  };

  const handleNextOrFinish = async () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Evaluate all answers
      setEvaluating(true);
      try {
        let correctCount = 0;
        const known: string[] = [];
        const weak: string[] = [];

        for (const q of diagnostic.questions) {
          const ans = answers[q.id];
          if (q.type === 'multiple_choice' || q.type === 'code_prediction') {
            const opt = q.options?.find((o) => o.id === ans?.optionId);
            if (opt?.isCorrect) {
              correctCount++;
              known.push(q.conceptKey);
            } else {
              weak.push(q.conceptKey);
            }
          } else {
            // Open explanation
            const mock = new MockAIProvider();
            const res = await mock.evaluateAnswer({
              question: q.question,
              expectedKeywords: q.expectedKeywords,
              userAnswer: ans?.text || '',
            });
            if (res.isCorrect) {
              correctCount += 0.8;
              known.push(q.conceptKey);
            } else {
              weak.push(q.conceptKey);
            }
          }
        }

        const score = Math.round((correctCount / totalQuestions) * 100);
        setCompletedResults({
          score,
          knownConcepts: known,
          weakConcepts: weak,
        });

        // Record diagnostic evidence
        recordEvidence(topic.slug, topic.title, {
          type: 'DIAGNOSTIC',
          conceptKey: 'Diagnostic Assessment',
          score,
          rationale: `Diagnostic completed with ${score}% initial proficiency. Known: ${known.join(', ') || 'None'}. Weak: ${weak.join(', ')}.`,
        });

        // Generate personalized learning path
        const path = CourseWarehouseService.personalizePath({
          topicSlug: topic.slug,
          diagnosticScore: score,
          knownConcepts: known,
          weakConcepts: weak,
        });

        setCurrentPath(path);
      } finally {
        setEvaluating(false);
      }
    }
  };

  const handleStartPersonalizedLesson = () => {
    router.push(`/lesson/${topic.slug}`);
  };

  if (completedResults) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-10 border border-indigo-500/30 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/20">
            <Brain className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Diagnostic Assessment Complete
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6">
            We evaluated your current grasp of <span className="text-indigo-300 font-medium">{topic.title}</span>. Your personalized learning path has been tailored.
          </p>

          <div className="p-6 rounded-2xl bg-card border border-border/80 text-left space-y-4 mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-xs text-muted-foreground">Initial Proficiency Estimate</span>
              <span className="text-lg font-mono font-bold text-indigo-400">
                {completedResults.score}%
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Concepts (Will be Skipped/Condensed):
              </span>
              {completedResults.knownConcepts.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {completedResults.knownConcepts.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">None detected — you will get comprehensive step-by-step guidance.</p>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Priority Focus Areas (Interactive 3D Visuals & Deep Checkpoints):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {completedResults.weakConcepts.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleStartPersonalizedLesson}
            id="start-personalized-lesson-btn"
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Launch Personalized 3D Interactive Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Progress & Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono text-indigo-400">
            Diagnostic Challenge {currentQIndex + 1} of {totalQuestions}
          </span>
          <span className="capitalize">{question.difficulty} difficulty</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-indigo-500/30 space-y-6">
        <div>
          <span className="text-[11px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
            Concept: {question.conceptKey}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-foreground mt-3 leading-snug">
            {question.question}
          </h2>
        </div>

        {question.codeContext && (
          <div className="p-4 rounded-2xl bg-[#090b12] border border-border font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre-wrap">
            {question.codeContext}
          </div>
        )}

        {/* Options */}
        {question.options && (
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = currentAnswer.optionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-foreground shadow-md shadow-indigo-500/10'
                      : 'bg-card/60 border-border/80 text-slate-300 hover:bg-card hover:text-foreground'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-600 text-white'
                        : 'border-muted-foreground/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'open_explanation' && (
          <div>
            <textarea
              rows={5}
              value={currentAnswer.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Explain the failure isolation mechanism and consensus rules..."
              id="diagnostic-open-answer-input"
              className="w-full bg-background/90 border border-border rounded-2xl p-4 text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Answers help skip content you already know
          </span>

          <button
            onClick={handleNextOrFinish}
            disabled={
              evaluating ||
              (question.type !== 'open_explanation' && !currentAnswer.optionId) ||
              (question.type === 'open_explanation' && !currentAnswer.text?.trim())
            }
            id="diagnostic-next-btn"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 active:scale-95"
          >
            {evaluating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Evaluating Knowledge Profile...
              </>
            ) : currentQIndex < totalQuestions - 1 ? (
              <>
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Synthesize Personalized Path</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
