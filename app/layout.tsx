import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Qorel AI — AI Interactive Learning Tutor for Engineers',
  description:
    'Master technical systems in minutes with adaptive diagnostics, procedural 3D visualizers, synchronized voice narration, and active AI checkpoints.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pb-16">{children}</main>
        <footer className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Qorel AI — Autonomous Interactive Learning Architecture</p>
        </footer>
      </body>
    </html>
  );
}
