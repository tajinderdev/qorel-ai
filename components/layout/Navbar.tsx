'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import FeedbackModal from '../feedback/FeedbackModal';
import {
  Sparkles,
  BookOpen,
  Brain,
  Target,
  MessageSquarePlus,
  Compass,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { targetRole } = useLearnerStore();
  const [showFeedback, setShowFeedback] = useState(false);

  const navItems = [
    { label: 'Topics Catalog', href: '/', icon: BookOpen },
    { label: 'Knowledge Profile', href: '/profile', icon: Brain },
    { label: 'Career Roadmap', href: '/roadmap', icon: Target },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#08090e]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg text-foreground tracking-tight">Qorel</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-card/40 p-1 rounded-2xl border border-border/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Target Role Pill & Feedback Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/roadmap"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/80 hover:bg-card border border-border text-[11px] text-slate-300 font-mono transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-muted-foreground">Goal:</span>
              <span className="text-indigo-300 font-medium truncate max-w-[120px]">
                {targetRole}
              </span>
            </Link>

            <button
              onClick={() => setShowFeedback(true)}
              id="open-feedback-btn"
              className="p-2 rounded-xl bg-card hover:bg-card-hover border border-border text-muted-foreground hover:text-foreground text-xs transition-colors"
              title="Submit Feedback / Report Issue"
            >
              <MessageSquarePlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </>
  );
}
