'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown, Heart, ArrowRight, RotateCcw } from 'lucide-react';

interface FinalCelebrationProps {
  recipientName: string;
  onComplete: () => void;
}

function seeded(i: number, salt: number, mod: number) {
  return ((i * 1664525 + salt * 1013904223) & 0x7fffffff) % mod;
}

export default function FinalCelebration({ recipientName, onComplete }: FinalCelebrationProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const confettiColors = ['#713F49', '#C5A16D', '#D6A0A0', '#E8D6C5', '#80645B', '#F8F1E8'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-newspaper-paper text-cocoa-800 p-6 sm:p-12">
      {/* Outer Editorial Borders */}
      <div className="absolute inset-4 md:inset-8 border border-burgundy-900/15 pointer-events-none rounded-sm" />
      <div className="absolute inset-5 md:inset-9 border border-vintageGold-500/20 pointer-events-none rounded-sm" />

      {/* Floating stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-vintageGold-500/30 select-none"
            style={{
              left: `${seeded(i, 1, 100)}%`,
              top: `${seeded(i, 2, 100)}%`,
              fontSize: `${12 + (i % 4) * 4}px`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.45, 0.15],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i % 8) * 0.4,
            }}
          >
            {i % 3 === 0 ? '✦' : i % 3 === 1 ? '❦' : '❀'}
          </motion.div>
        ))}
      </div>

      {mounted && (
        <div className="relative z-10 max-w-2xl w-full text-center my-auto">
          {/* Royal Crown Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-champagne-100/80 border-2 border-dashed border-vintageGold-500/60 shadow-sm mb-6"
          >
            <Crown size={36} className="text-vintageGold-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-vintageGold-700 font-sans mb-3"
          >
            THE OFFICIAL ROYAL PROCLAMATION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-editorial text-4xl sm:text-6xl md:text-7xl text-burgundy-900 font-bold mb-4 leading-tight"
          >
            Happy Princess Day, <br />
            <span className="font-cormorant italic text-vintageGold-600 font-normal">
              {recipientName}
            </span>
          </motion.h1>

          <div className="flex items-center justify-center gap-4 my-6 opacity-75">
            <div className="h-px w-16 bg-vintageGold-500" />
            <span className="text-vintageGold-600 text-sm">❦</span>
            <div className="h-px w-16 bg-vintageGold-500" />
          </div>

          {/* Editorial Card Note */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-ivory-50 border border-burgundy-900/20 p-6 sm:p-10 shadow-editorial rounded-sm mb-10 text-center relative max-w-lg mx-auto"
          >
            <div className="w-20 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 rotate-[-1deg]" />

            <p className="font-cormorant italic text-xl sm:text-2xl text-cocoa-700 leading-relaxed mb-4">
              &ldquo;Today is all about celebrating the special magic you bring to the world.
              May every day feel like a royal celebration, filled with laughter, love, and wonder.&rdquo;
            </p>

            <div className="font-handwriting text-2xl text-dusty-rose-600">
              you are loved beyond measure ♡
            </div>
          </motion.div>

          {/* Action Button: Return to Cover / Celebrate Again */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-[0.2em] rounded-sm transition-all shadow-editorial hover:shadow-2xl hover:-translate-y-0.5"
            >
              <RotateCcw size={14} className="text-vintageGold-300" />
              <span>Read Gazette Again From Beginning</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* Elegant Vintage Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(120)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-xs"
                style={{
                  left: `${seeded(i, 4, 100)}%`,
                  top: `${seeded(i, 5, 100)}%`,
                  backgroundColor: confettiColors[i % confettiColors.length],
                }}
                animate={{
                  y: '100vh',
                  x: `${seeded(i, 6, 160) - 80}px`,
                  rotate: 360,
                }}
                transition={{
                  duration: 4 + (i % 4),
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
