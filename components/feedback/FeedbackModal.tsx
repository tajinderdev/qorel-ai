'use client';

import React, { useState } from 'react';
import { MessageSquarePlus, X, CheckCircle, Send, AlertTriangle } from 'lucide-react';

export default function FeedbackModal({
  isOpen,
  onClose,
  topicSlug,
  sectionId,
}: {
  isOpen: boolean;
  onClose: () => void;
  topicSlug?: string;
  sectionId?: string;
}) {
  const [feedbackType, setFeedbackType] = useState('ACCURACY');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicSlug: topicSlug || 'general',
          sectionId,
          feedbackType,
          rating,
          comment,
        }),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setComment('');
        onClose();
      }, 1500);
    } catch {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#0f121f] border border-border/90 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <MessageSquarePlus className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-foreground">Course Feedback & QA</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-foreground">Feedback Recorded</h4>
            <p className="text-xs text-muted-foreground">
              Thank you! Our automated verification agent will review your submission to improve future canonical versions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1 font-medium">
                Feedback Category
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-indigo-500"
              >
                <option value="ACCURACY">Technical Inaccuracy / Outdated Code</option>
                <option value="CLARITY">Ambiguous Question or Explanation</option>
                <option value="VISUAL_GLITCH">3D Visual / Layout Issue</option>
                <option value="AUDIO_GLITCH">Audio Narration Issue</option>
                <option value="PACING">Pacing / Difficulty Level</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1 font-medium">
                Your Feedback / Reproduction Notes
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe what could be improved or any error encountered..."
                id="feedback-comment-input"
                className="w-full bg-card border border-border rounded-xl p-3 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              id="feedback-submit-btn"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Logging...' : 'Submit Feedback to QA'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
