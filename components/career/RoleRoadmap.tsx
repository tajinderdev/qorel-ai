'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CareerEngineService, TECH_ROLES } from '@/lib/career/service';
import { useLearnerStore } from '@/lib/store/use-learner-store';
import {
  Briefcase,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Compass,
} from 'lucide-react';

export default function RoleRoadmap() {
  const { knowledgeRecords, targetRole, setTargetRole } = useLearnerStore();
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    TECH_ROLES.find((r) => r.title === targetRole)?.id || TECH_ROLES[0].id
  );

  const currentRole = TECH_ROLES.find((r) => r.id === selectedRoleId) || TECH_ROLES[0];
  const assessment = CareerEngineService.evaluateRoleFit(selectedRoleId, knowledgeRecords);

  const handleSelectRole = (roleId: string, title: string) => {
    setSelectedRoleId(roleId);
    setTargetRole(title);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-indigo-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <Target className="w-4 h-4" />
              <span>CAREER GAP & MARKET READINESS ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Target Role Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
              Understand the exact technical competencies, distributed patterns, and frameworks required to step into senior and staff engineering roles.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-background/80 p-4 rounded-2xl border border-white/5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Current Readiness</span>
              <p className="text-2xl font-bold text-emerald-400 font-mono">
                {assessment.fitPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TECH_ROLES.map((role) => {
          const isSelected = selectedRoleId === role.id;
          return (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.id, role.title)}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'glass-panel-glow border-indigo-500 text-foreground shadow-lg shadow-indigo-500/10'
                  : 'glass-panel border-border/80 text-slate-300 hover:bg-card hover:text-foreground'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
                    <DollarSign className="w-3 h-3" /> {role.averageSalaryUSD}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{role.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {role.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{role.requiredSkills.length} Required Skills</span>
                {isSelected ? (
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    Active Target <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="text-muted-foreground hover:text-slate-200">Select Role &rarr;</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Highest ROI Recommendation Box */}
      <div className="glass-panel-emerald rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4" /> Recommended Highest-ROI Next Step
            </span>
            <h2 className="text-xl font-bold text-foreground">
              {assessment.recommendedNextTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {assessment.recommendedNextTopic.reason}
            </p>
          </div>

          <Link
            href={`/diagnostic/${assessment.recommendedNextTopic.slug}`}
            id="launch-recommended-topic-btn"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <span>Take Topic Diagnostic</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Skill Gaps Breakdown Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border/80 space-y-6">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Competency Matrix for {currentRole.title}</span>
        </h3>

        <div className="space-y-4">
          {currentRole.requiredSkills.map((req) => {
            const userRec = knowledgeRecords[req.topicSlug];
            const currentMastery = userRec?.masteryScore || 0;
            const isMet = currentMastery >= req.requiredMastery;

            return (
              <div
                key={req.topicSlug}
                className="p-4 rounded-2xl bg-card/60 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground">{req.skillName}</h4>
                    {isMet ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        Target Met
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                        {req.requiredMastery - currentMastery}% Gap
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required Mastery: <span className="text-slate-300 font-mono">{req.requiredMastery}%</span> | Current: <span className="text-indigo-400 font-mono font-bold">{currentMastery}%</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-36 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`h-full ${isMet ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${Math.min(100, (currentMastery / req.requiredMastery) * 100)}%` }}
                    />
                  </div>

                  <Link
                    href={`/diagnostic/${req.topicSlug}`}
                    className="px-3.5 py-1.5 rounded-xl bg-card hover:bg-card-hover border border-border text-xs font-semibold text-slate-200 transition-colors shrink-0"
                  >
                    {currentMastery > 0 ? 'Improve Score' : 'Start Diagnostic'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
