'use client';

import React, { useState } from 'react';
import { Sparkles, X, Code, Lightbulb, Compass, Eye } from 'lucide-react';
import { AlternativeExplanationResult } from '@/lib/ai/types';
import { MockAIProvider } from '@/lib/ai/mock-provider';

interface ExplainDifferentlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  conceptKey: string;
  conceptTitle: string;
}

export default function ExplainDifferentlyModal({
  isOpen,
  onClose,
  conceptKey,
  conceptTitle,
}: ExplainDifferentlyModalProps) {
  const [selectedStyle, setSelectedStyle] = useState<
    'analogy' | 'first_principles' | 'code_first' | 'visual_first'
  >('analogy');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AlternativeExplanationResult | null>(null);

  const fetchAlternative = async (
    style: 'analogy' | 'first_principles' | 'code_first' | 'visual_first'
  ) => {
    setSelectedStyle(style);
    setLoading(true);
    try {
      // In client mode, we call MockAIProvider or internal route
      const mock = new MockAIProvider();
      const res = await mock.explainDifferently({
        concept: conceptTitle,
        currentExplanation: `Core mechanism of ${conceptKey}`,
        style,
      });
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      fetchAlternative('analogy');
    }
  }, [isOpen, conceptTitle]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f121f] border border-indigo-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Explain Differently</h3>
              <p className="text-xs text-muted-foreground">
                Alternative mental models for <span className="text-indigo-300 font-medium">{conceptTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Style Selector Tabs */}
        <div className="grid grid-cols-4 gap-2 my-5">
          {[
            { id: 'analogy', label: 'Real-World Analogy', icon: Lightbulb },
            { id: 'code_first', label: 'Code Breakdown', icon: Code },
            { id: 'first_principles', label: 'First Principles', icon: Compass },
            { id: 'visual_first', label: 'Visual Step-by-Step', icon: Eye },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedStyle === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  fetchAlternative(
                    tab.id as 'analogy' | 'first_principles' | 'code_first' | 'visual_first'
                  )
                }
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10'
                    : 'bg-card/40 border-border/80 text-muted-foreground hover:bg-card hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-center leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Content Body */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-spin" />
            <span className="text-sm">Synthesizing {selectedStyle} explanation...</span>
          </div>
        ) : result ? (
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            <h4 className="text-sm font-semibold text-indigo-300">{result.headline}</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{result.explanation}</p>

            <div className="p-3.5 rounded-xl bg-background/80 border border-white/5 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
              {result.concreteExample}
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2">
              <span className="font-bold text-indigo-400 shrink-0">Key Takeaway:</span>
              <span>{result.keyTakeaway}</span>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
          >
            I Understand Now — Resume Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
