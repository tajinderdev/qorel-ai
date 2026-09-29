'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Mic, Layers, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground flex flex-col">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-300 font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Interactive Learning</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Master Technical Systems
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
              In Minutes, Not Months.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Qorel AI provides procedural 3D visualizers, synchronized voice narration, and active AI checkpoints tailored to your learning style.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {session ? (
              <Link
                href="/dashboard"
                className="group relative px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Go to Dashboard</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="group relative px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-card hover:bg-card-hover border border-border text-foreground rounded-2xl font-bold transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto w-full"
        >
          <FeatureCard 
            icon={<BrainCircuit className="w-6 h-6 text-teal-400" />}
            title="Omniscient AI Tutor"
            desc="Chat with an AI that knows your entire learning history and adapts to your knowledge gaps."
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-indigo-400" />}
            title="Procedural 3D Visuals"
            desc="Understand complex systems through dynamic, interactive WebGL 3D models."
          />
          <FeatureCard 
            icon={<Mic className="w-6 h-6 text-orange-400" />}
            title="Voice Narration"
            desc="Turn any topic into an immersive presentation with high-quality text-to-speech narration."
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-panel p-8 rounded-3xl text-left border border-border/40 hover:border-teal-500/30 transition-colors flex flex-col gap-4 group">
      <div className="w-12 h-12 rounded-2xl bg-black/20 dark:bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
