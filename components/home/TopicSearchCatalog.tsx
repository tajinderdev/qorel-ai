'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TOPIC_CATALOG } from '@/lib/warehouse/courses';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import {
  Search,
  Brain,
  Clock,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Distributed Systems',
  'Frontend Architecture',
  'AI & Vector Systems',
  'Cloud & DevOps',
];

export default function TopicSearchCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { knowledgeRecords } = useLearnerStore();

  const filteredTopics = TOPIC_CATALOG.filter((topic) => {
    const matchesSearch =
      !searchQuery ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || topic.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Interactive Learning Tutor for Engineers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          Master Complex Systems in <span className="text-gradient">Minutes, Not Hours</span>.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Diagnostic assessment detects what you already know. Skip redundant basics and learn
          through procedural 3D visualizers, synchronized voice narration, and active AI checkpoints.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto pt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. Redis Cluster, pgvector, Next.js RSC, Kubernetes CNI)..."
              id="topic-search-input"
              className="w-full bg-card/80 border border-indigo-500/30 rounded-2xl pl-12 pr-4 py-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-xl shadow-black/40"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-card/60 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-card'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const userRec = knowledgeRecords[topic.slug];
          const hasMemory = !!userRec;

          return (
            <div
              key={topic.id}
              className="glass-panel rounded-3xl p-6 border border-border/80 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {topic.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {topic.estimatedMinutes} min
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {topic.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-lg bg-card text-slate-300 border border-border text-[11px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer & Action with Memory Indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                {hasMemory ? (
                  <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Learned Previously</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">
                      {userRec.masteryScore}% Mastery
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/diagnostic/${topic.slug}`}
                    id={`start-diagnostic-${topic.slug}`}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>{hasMemory ? 'Re-Assess & Skip' : 'Take Diagnostic'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/lesson/${topic.slug}`}
                    id={`direct-lesson-${topic.slug}`}
                    className="px-3.5 py-2.5 rounded-xl bg-card hover:bg-card-hover border border-border text-xs font-semibold text-slate-300 transition-colors"
                    title="Direct Lesson View"
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
