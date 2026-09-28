'use client';

import React, { useState } from 'react';
import { LessonCheckpoint } from '@/lib/types';
import { AnswerEvaluationResult } from '@/lib/ai/types';
import { MockAIProvider } from '@/lib/ai/mock-provider';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface CheckpointViewProps {
  checkpoint: LessonCheckpoint;
  topicSlug: string;
  conceptKey: string;
  onPassed: () => void;
  onRequestExplainDifferently: () => void;
}

export default function CheckpointView({
  checkpoint,
  topicSlug,
  conceptKey,
  onPassed,
  onRequestExplainDifferently,
}: CheckpointViewProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [openText, setOpenText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluationResult | null>(null);

  const { recordEvidence } = useLearnerStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (checkpoint.type === 'multiple_choice' || checkpoint.type === 'code_prediction') {
        const option = checkpoint.options?.find((o) => o.id === selectedOptionId);
        const isCorrect = !!option?.isCorrect;
        const score = isCorrect ? 100 : 25;

        const result: AnswerEvaluationResult = {
          isCorrect,
          score,
          feedback: option?.explanation || (isCorrect ? 'Correct!' : 'Incorrect option selected.'),
          missingConcepts: isCorrect ? [] : ['Review core constraint'],
          demonstratedStrengths: isCorrect ? ['Accurate discriminator'] : [],
        };

        setEvaluation(result);

        recordEvidence(topicSlug, 'Redis Clustering & High Availability', {
          type: isCorrect ? 'CHECKPOINT_PASS' : 'CHECKPOINT_FAIL',
          conceptKey,
          score,
          rationale: result.feedback,
        });

        if (isCorrect) {
          setTimeout(onPassed, 1200);
        }
      } else {
        // Open conceptual explanation
        const mock = new MockAIProvider();
        const res = await mock.evaluateAnswer({
          question: checkpoint.prompt,
          expectedKeywords: checkpoint.expectedKeywords,
          userAnswer: openText,
          context: `Concept: ${conceptKey}`,
        });

        setEvaluation(res);

        recordEvidence(topicSlug, 'Redis Clustering & High Availability', {
          type: 'EXPLANATION_EVAL',
          conceptKey,
          score: res.score,
          rationale: res.feedback,
        });

        if (res.isCorrect) {
          setTimeout(onPassed, 1500);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 rounded-2xl glass-panel-glow border border-indigo-500/30">
      {/* Badge Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <HelpCircle className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Active Understanding Checkpoint
          </span>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-slate-300 font-mono capitalize">
          {checkpoint.difficulty} level
        </span>
      </div>

      <h3 className="text-sm font-semibold text-foreground leading-snug mb-3">
        {checkpoint.prompt}
      </h3>

      {checkpoint.codeContext && (
        <div className="p-3 mb-4 rounded-xl bg-background/90 border border-border font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
          {checkpoint.codeContext}
        </div>
      )}

      {/* Form Controls */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {checkpoint.options && checkpoint.options.length > 0 ? (
          <div className="space-y-2">
            {checkpoint.options.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedOptionId === opt.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-foreground shadow-md shadow-indigo-500/10'
                    : 'bg-card/50 border-border/80 text-slate-300 hover:bg-card hover:text-foreground'
                }`}
              >
                <input
                  type="radio"
                  name="checkpoint-option"
                  value={opt.id}
                  checked={selectedOptionId === opt.id}
                  onChange={() => setSelectedOptionId(opt.id)}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="leading-relaxed">{opt.text}</span>
              </label>
            ))}
          </div>
        ) : (
          <div>
            <textarea
              rows={4}
              value={openText}
              onChange={(e) => setOpenText(e.target.value)}
              placeholder="Explain the architectural mechanism in your own words (e.g. how consensus is achieved and why)..."
              id="checkpoint-open-answer-input"
              className="w-full bg-background/90 border border-border rounded-xl p-3.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
            />
          </div>
        )}

        {/* Evaluation Output Result */}
        {evaluation && (
          <div
            className={`p-4 rounded-xl border text-xs animate-in fade-in ${
              evaluation.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 font-bold">
                {evaluation.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Checkpoint Verified ({evaluation.score}% Score)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-400" />
                    <span>Needs Clarification ({evaluation.score}% Score)</span>
                  </>
                )}
              </div>
            </div>

            <p className="leading-relaxed">{evaluation.feedback}</p>

            {evaluation.missingConcepts.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                <span className="font-semibold text-slate-400">Missing Elements:</span>
                {evaluation.missingConcepts.map((m) => (
                  <span
                    key={m}
                    className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {!evaluation.isCorrect && (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={onRequestExplainDifferently}
                  id="explain-differently-btn"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> Explain Differently
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onRequestExplainDifferently}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" /> Stuck? Explain with Analogy
          </button>

          <button
            type="submit"
            id="checkpoint-submit-btn"
            disabled={isSubmitting || (!selectedOptionId && !openText.trim())}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" /> Evaluating...
              </>
            ) : (
              <>
                <span>Submit Understanding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
