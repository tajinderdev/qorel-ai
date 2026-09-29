'use client';

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Sparkles } from 'lucide-react';
import { SpeechEngine } from '@/lib/audio/speech-engine';
import { useLearnerStore } from '@/lib/store/use-learner-store';

interface AudioPlayerBarProps {
  script: string;
  title: string;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export default function AudioPlayerBar({ script, title, onComplete, autoPlay }: AudioPlayerBarProps) {
  const { isAudioPlaying, setAudioPlaying, audioRate, setAudioRate, currentCaption, setCurrentCaption } =
    useLearnerStore();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // When section changes, update caption to preview
    setCurrentCaption(script.slice(0, 140) + (script.length > 140 ? '...' : ''));
    
    if (autoPlay) {
      setTimeout(() => {
        if (!isAudioPlaying) handleTogglePlay();
      }, 500);
    }
    
    return () => {
      SpeechEngine.getInstance().stop();
      setAudioPlaying(false);
    };
  }, [script, setCurrentCaption, setAudioPlaying, autoPlay]);

  const handleTogglePlay = () => {
    const engine = SpeechEngine.getInstance();
    if (isAudioPlaying) {
      engine.stop();
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      engine.speak(script, isMuted ? 0 : audioRate, {
        onStart: () => setAudioPlaying(true),
        onEnd: () => {
          setAudioPlaying(false);
          setCurrentCaption('Narration completed.');
          if (onComplete) onComplete();
        },
        onError: () => setAudioPlaying(false),
        onBoundary: (charIndex, text) => {
          // Display the surrounding sentence as subtitle
          const sub = text.slice(charIndex, charIndex + 120);
          setCurrentCaption(sub);
        },
      });
    }
  };

  const handleCycleRate = () => {
    const rates = [1.0, 1.25, 1.5, 0.85];
    const nextIdx = (rates.indexOf(audioRate) + 1) % rates.length;
    const newRate = rates[nextIdx];
    setAudioRate(newRate);
    if (isAudioPlaying) {
      handleTogglePlay();
      setTimeout(handleTogglePlay, 50);
    }
  };

  const handleRestart = () => {
    SpeechEngine.getInstance().stop();
    setAudioPlaying(false);
    setTimeout(handleTogglePlay, 100);
  };

  return (
    <div className="w-full glass-panel-glow rounded-2xl p-4 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Player status & Track title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePlay}
            id="audio-play-toggle-btn"
            className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
            aria-label={isAudioPlaying ? 'Pause narration' : 'Play narration'}
          >
            {isAudioPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Voice Narration
              </span>
              {isAudioPlaying && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-foreground truncate max-w-sm">{title}</p>
          </div>
        </div>

        {/* Right: Audio controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={handleCycleRate}
            id="audio-speed-btn"
            className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-muted hover:bg-card border border-border text-slate-300 transition-colors"
          >
            {audioRate}x
          </button>

          <button
            onClick={handleRestart}
            id="audio-restart-btn"
            className="p-2 rounded-lg bg-muted hover:bg-card border border-border text-slate-300 transition-colors"
            title="Restart Narration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg bg-muted hover:bg-card border border-border text-slate-300 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Synchronized Subtitles Banner */}
      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-start gap-2">
        <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded shrink-0">
          Sync Subtitles
        </span>
        <p className="text-xs text-slate-300 italic line-clamp-2 leading-relaxed">
          {`"${currentCaption || script.slice(0, 120)}..."`}
        </p>
      </div>
    </div>
  );
}
