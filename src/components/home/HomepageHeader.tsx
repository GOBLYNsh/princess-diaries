'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Compass, BookOpen, Camera, Feather, Calendar, Gift } from 'lucide-react';

interface HomepageHeaderProps {
  recipientName: string;
  princessTitle: string;
  onOpenEnvelope: () => void;
  onViewScrapbook: () => void;
  onViewGallery: () => void;
  onViewLetter: () => void;
  onViewReasons: () => void;
  onViewTimeline: () => void;
  onViewSurprises: () => void;
}

export default function HomepageHeader({
  recipientName,
  princessTitle,
  onOpenEnvelope,
  onViewScrapbook,
  onViewGallery,
  onViewLetter,
  onViewReasons,
  onViewTimeline,
  onViewSurprises,
}: HomepageHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chapters = [
    { num: 'I', label: 'The Gazette', desc: 'Vintage Scrapbook', onClick: onViewScrapbook, icon: BookOpen },
    { num: 'II', label: 'Portraiture', desc: 'Aesthetic Gallery', onClick: onViewGallery, icon: Camera },
    { num: 'III', label: 'Dispatches', desc: 'A Personal Letter', onClick: onViewLetter, icon: Feather },
    { num: 'IV', label: 'The Chronicle', desc: 'Thirty Reasons Why', onClick: onViewReasons, icon: Heart },
    { num: 'V', label: 'Milestones', desc: 'Memory Timeline', onClick: onViewTimeline, icon: Calendar },
    { num: 'VI', label: 'Treasures', desc: 'Little Surprises', onClick: onViewSurprises, icon: Gift },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 md:py-20 bg-newspaper-paper">
      {/* Decorative vintage frame border */}
      <div className="absolute inset-4 md:inset-8 border border-burgundy-900/15 pointer-events-none rounded-sm" />
      <div className="absolute inset-5 md:inset-9 border border-vintageGold-500/20 pointer-events-none rounded-sm" />
      
      {/* Corner vintage botanical ornaments */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 text-vintageGold-500/40 text-xs md:text-sm font-serif select-none pointer-events-none">
        ❦ N° 01
      </div>
      <div className="absolute top-6 right-6 md:top-10 md:right-10 text-vintageGold-500/40 text-xs md:text-sm font-serif select-none pointer-events-none">
        VOL. XXIV ❧
      </div>
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-burgundy-900/30 text-xs font-serif tracking-widest uppercase select-none pointer-events-none hidden sm:block">
        EST. TODAY • ROYAL ARCHIVE
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-burgundy-900/30 text-xs font-serif tracking-widest uppercase select-none pointer-events-none hidden sm:block">
        PARIS • LONDON • IN MY HEART
      </div>

      {/* Floating subtle romantic flecks (deterministic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-dusty-rose-400/25 select-none"
            style={{
              left: `${(i * 19 + 7) % 100}%`,
              top: `${(i * 29 + 11) % 100}%`,
              fontSize: `${11 + (i % 4) * 3}px`,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, 0.45, 0.15],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 7 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i * 0.3),
            }}
          >
            {i % 4 === 0 ? '✦' : i % 4 === 1 ? '❦' : i % 4 === 2 ? '❀' : '✧'}
          </motion.div>
        ))}
      </div>

      {/* Hero Container */}
      <div className="relative z-10 max-w-4xl w-full text-center px-4 my-auto">
        {/* Editorial Top Masthead Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 md:gap-6 mb-6 text-xs md:text-sm tracking-[0.25em] uppercase text-cocoa-500 font-sans border-y border-burgundy-900/15 py-2.5"
        >
          <span>The Princess Gazette</span>
          <span className="text-vintageGold-500">•</span>
          <span className="font-serif italic capitalize tracking-normal text-burgundy-600">The Royal Edition</span>
          <span className="text-vintageGold-500">•</span>
          <span>A Keepsake for {recipientName}</span>
        </motion.div>

        {/* Handwritten lead-in note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-handwriting text-2xl md:text-3xl text-dusty-rose-600 mb-3 rotate-[-1.5deg]"
        >
          for the one who makes ordinary days feel magical —
        </motion.p>

        {/* Oversized Editorial Typography Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-burgundy-900 leading-[1.08] tracking-tight mb-6"
        >
          An Extraordinary Girl <br />
          <span className="font-cormorant italic font-normal text-cocoa-600">Deserves an</span>{' '}
          <span className="underline decoration-vintageGold-400 decoration-1 underline-offset-8">
            Extraordinary Day.
          </span>
        </motion.h1>

        {/* Vintage Divider */}
        <div className="flex items-center justify-center gap-4 my-6 opacity-75">
          <div className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-vintageGold-500" />
          <span className="text-vintageGold-500 text-base">❦</span>
          <div className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-vintageGold-500" />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-cormorant italic text-xl md:text-2xl text-cocoa-600 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          &ldquo;A little collection of memories, feelings and everything that makes you special.&rdquo;
        </motion.p>

        {/* Primary Call-to-Action: Enter Your Little World */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onOpenEnvelope}
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-burgundy-600 hover:bg-burgundy-700 text-ivory-100 font-sans text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-300 shadow-editorial hover:shadow-2xl hover:-translate-y-0.5 rounded-sm overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-3">
              <span>Enter Your Little World ♡</span>
              <span className="text-vintageGold-300 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>

          <button
            onClick={onViewScrapbook}
            className="inline-flex items-center justify-center px-7 py-4 border border-burgundy-900/25 hover:border-burgundy-900/50 bg-ivory-50/60 hover:bg-ivory-50 text-burgundy-900 font-sans text-xs md:text-sm tracking-[0.15em] uppercase transition-all duration-300 rounded-sm"
          >
            Read The Gazette 📰
          </button>
        </motion.div>

        {/* Chapter Index: Magazine-Style Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-6 border-t border-burgundy-900/15"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-cocoa-400 font-sans">
              Table of Contents
            </span>
            <span className="font-handwriting text-lg text-dusty-rose-600">
              choose where to begin ↴
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {chapters.map((ch) => {
              const Icon = ch.icon;
              return (
                <button
                  key={ch.num}
                  onClick={ch.onClick}
                  className="group relative text-left p-3.5 bg-ivory-50/80 hover:bg-ivory-50 border border-burgundy-900/10 hover:border-vintageGold-500/50 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-scrapbook"
                >
                  <div className="flex items-center justify-between text-xs text-vintageGold-600 font-serif mb-1.5">
                    <span>CH. {ch.num}</span>
                    <Icon size={13} className="text-cocoa-400 group-hover:text-burgundy-600 transition-colors" />
                  </div>
                  <h4 className="font-editorial text-sm font-semibold text-burgundy-900 group-hover:text-burgundy-600 transition-colors leading-tight mb-0.5">
                    {ch.label}
                  </h4>
                  <p className="text-[11px] font-sans text-cocoa-500 truncate">
                    {ch.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
