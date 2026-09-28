'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Bot, User } from 'lucide-react';
import { MockAIProvider } from '@/lib/ai/mock-provider';

interface Message {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  relatedConcepts?: string[];
}

export default function TutorAssistant({
  topicTitle,
  sectionTitle,
}: {
  topicTitle: string;
  sectionTitle: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-msg',
      sender: 'tutor',
      text: `Hi! I'm your AI Tutor for **${topicTitle}**. Feel free to ask any question about **${sectionTitle}** or related architectural trade-offs!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const mock = new MockAIProvider();
      const res = await mock.answerTutorQuestion({
        topic: topicTitle,
        currentSectionTitle: sectionTitle,
        learnerQuestion: userText,
        masteryLevel: 75,
      });

      const tutorMsg: Message = {
        id: `t-${Date.now()}`,
        sender: 'tutor',
        text: res.answer,
        relatedConcepts: res.relatedConcepts,
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[480px] glass-panel rounded-2xl border border-border/80 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-3.5 bg-card/80 border-b border-border/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">AI Tutor Assistant</h4>
            <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">{sectionTitle}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
        </span>
      </div>

      {/* Message History */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-card border border-border/80 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
              {m.relatedConcepts && m.relatedConcepts.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap gap-1">
                  <span className="text-[10px] text-muted-foreground mr-1">Related:</span>
                  {m.relatedConcepts.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse p-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>AI Tutor is formulating response...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-2.5 bg-card/60 border-t border-border/80 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this concept..."
          id="tutor-chat-input"
          className="flex-1 bg-background/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          id="tutor-chat-send-btn"
          className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shadow-indigo-500/20"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
