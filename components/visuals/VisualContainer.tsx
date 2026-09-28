'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { VisualSpec } from '@/lib/types';
import { Eye, Layers, Sparkles } from 'lucide-react';

const DynamicCluster3D = dynamic(() => import('./3d/ClusterNetwork3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl bg-card/60 border border-border/80 flex flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
      <Sparkles className="w-6 h-6 text-indigo-400 animate-spin" />
      <span className="text-sm font-medium">Mounting 3D Interactive Topology...</span>
    </div>
  ),
});

const DynamicMemory3D = dynamic(() => import('./3d/MemoryLayout3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] rounded-2xl bg-card/60 border border-border/80 flex flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
      <Layers className="w-6 h-6 text-indigo-400 animate-spin" />
      <span className="text-sm font-medium">Initializing 3D Memory Layout...</span>
    </div>
  ),
});

const DynamicPipeline3D = dynamic(() => import('./3d/PipelineFlow3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] rounded-2xl bg-card/60 border border-border/80 flex flex-col items-center justify-center gap-3 text-muted-foreground animate-pulse">
      <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
      <span className="text-sm font-medium">Rendering 3D Pipeline Stages...</span>
    </div>
  ),
});

export default function VisualContainer({ spec }: { spec?: VisualSpec }) {
  if (!spec) return null;

  return (
    <div className="my-6 space-y-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5" />
          <span>{spec.title || 'Interactive Mental Model Simulation'}</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono">
          WebGL 3D Active
        </span>
      </div>

      {spec.type === '3d_cluster_network' && (
        <DynamicCluster3D {...(spec.props as Record<string, unknown>)} />
      )}
      {spec.type === '3d_memory_layout' && (
        <DynamicMemory3D {...(spec.props as Record<string, unknown>)} />
      )}
      {spec.type === '3d_pipeline_flow' && (
        <DynamicPipeline3D {...(spec.props as Record<string, unknown>)} />
      )}
    </div>
  );
}
