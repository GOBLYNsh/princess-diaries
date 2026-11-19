'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Feather, Sparkles, Send } from 'lucide-react';
import { SiteSettings } from '@/types';

interface LetterSectionProps {
  settings: SiteSettings;
  onBack: () => void;
  onComplete: () => void;
}

export default function LetterSection({ settings, onBack, onComplete }: LetterSectionProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const recipient = settings.recipient_name || 'My Princess';
  const defaultLetter = `My dearest ${recipient},

Today is special not because of parties or presents, but because it is a celebration of YOU. You bring magic to every ordinary moment with your beautiful smile, your deep empathy, and your gentle, radiant heart.

In a fast and hurried world, your presence feels like a slow morning, a warm cup of coffee, and soft sunlight after days of winter rain. You make kindness look effortless and grace look natural.

May this day surround you with all the warmth, joy, and wonder you so generously give to everyone around you.

With the highest admiration and all my love,
The Royal Court`;

  const letterText = settings.letter_content || defaultLetter;

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-14 bg-newspaper-paper text-cocoa-800 relative overflow-x-hidden flex flex-col justify-between">
      {/* Decorative Outer Border */}
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-burgundy-900/25 pb-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-burgundy-900/25 hover:border-burgundy-900/60 bg-ivory-50 text-burgundy-900 rounded-sm text-xs uppercase tracking-widest font-sans transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-vintageGold-600 font-sans block">
              Chapter III • Private Dispatch
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl text-burgundy-900 font-bold">
              A Personal Letter
            </h1>
          </div>

          <button
            onClick={onComplete}
            className="text-xs font-sans uppercase tracking-widest text-burgundy-800 hover:text-burgundy-900 underline underline-offset-4"
          >
            Next: Reasons →
          </button>
        </div>

        {/* Unopened vs Opened Presentation */}
        <div className="my-auto py-6 sm:py-10">
          <AnimatePresence mode="wait">
            {!isLetterOpen ? (
              <motion.div
                key="sealed"
                className="text-center max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {/* Airmail Wax Seal Envelope Box */}
                <div
                  onClick={() => setIsLetterOpen(true)}
                  className="group cursor-pointer bg-ivory-50 border-2 border-burgundy-900/30 p-8 sm:p-12 shadow-editorial hover:shadow-2xl transition-all duration-300 relative rounded-sm hover:-translate-y-1"
                >
                  {/* Stamp top right */}
                  <div className="absolute top-4 right-4 w-14 h-16 border border-dashed border-burgundy-700 bg-champagne-100 flex flex-col items-center justify-center p-1 rotate-3">
                    <span className="text-[8px] font-sans text-burgundy-900 tracking-wider">ROYAL</span>
                    <span className="text-xl">✉️</span>
                    <span className="text-[7px] font-serif text-cocoa-600">AIRMAIL</span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.3em] text-vintageGold-600 font-sans block mb-2">
                    SEALED ROYAL DISPATCH
                  </span>

                  <h3 className="font-editorial text-3xl sm:text-4xl text-burgundy-900 font-bold mb-3">
                    For {recipient}
                  </h3>

                  <p className="font-cormorant italic text-cocoa-600 text-lg mb-8">
                    &ldquo;Words penned with affection, sealed by royal decree.&rdquo;
                  </p>

                  {/* Wax Seal Button */}
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-widest rounded-sm transition-all shadow-md group-hover:scale-105">
                    <Feather size={14} className="text-vintageGold-300" />
                    <span>Break the Seal & Read</span>
                  </div>
                </div>

                <p className="font-handwriting text-xl text-dusty-rose-600 mt-4">
                  click to unfold your letter ✍︎
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="open"
                className="bg-ivory-50 border border-burgundy-900/30 p-6 sm:p-12 shadow-2xl relative rounded-sm max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Washi tape on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape rotate-[-1deg] border-x border-cocoa-300/40" />

                {/* Letter Header */}
                <div className="flex items-center justify-between border-b border-burgundy-900/20 pb-4 mb-8 text-xs font-serif italic text-cocoa-500">
                  <span>From The Royal Desk</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-vintageGold-700">
                    CERTIFIED CONFIDENTIAL
                  </span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>

                {/* Letter Body (Parchment typography) */}
                <div className="font-cormorant text-xl sm:text-2xl text-cocoa-800 leading-relaxed space-y-6 whitespace-pre-line">
                  {letterText}
                </div>

                {/* Sign-off */}
                <div className="mt-10 pt-6 border-t border-dashed border-burgundy-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="font-handwriting text-2xl text-burgundy-700">
                    Forever celebrating you ♡
                  </div>

                  <button
                    onClick={onComplete}
                    className="px-6 py-2.5 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-widest rounded-sm transition-all shadow-sm"
                  >
                    Continue to Reasons →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
