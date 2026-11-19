'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Check, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Reason } from '@/types';

interface ReasonsSectionProps {
  reasons: Reason[];
  onBack: () => void;
  onComplete: () => void;
}

export default function ReasonsSection({ reasons, onBack, onComplete }: ReasonsSectionProps) {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [viewedCount, setViewedCount] = useState(1);

  // Fallback reasons with rich romantic editorial voice
  const displayReasons = reasons.length > 0 ? reasons : [
    { id: '1', reason: 'The unmistakable warmth in your smile that softens every crowded room.', order_index: 1, created_at: new Date().toISOString() },
    { id: '2', reason: 'The way you laugh from your whole chest at jokes nobody else caught.', order_index: 2, created_at: new Date().toISOString() },
    { id: '3', reason: 'Your thoughtful habit of checking in on the people you hold close.', order_index: 3, created_at: new Date().toISOString() },
    { id: '4', reason: 'How you manage to turn the most mundane Tuesday into an unforgettable adventure.', order_index: 4, created_at: new Date().toISOString() },
    { id: '5', reason: 'The gentle courage and quiet dignity you carry yourself with every day.', order_index: 5, created_at: new Date().toISOString() },
    { id: '6', reason: 'Your adorable expressions whenever you are deeply focused on a creative idea.', order_index: 6, created_at: new Date().toISOString() },
    { id: '7', reason: 'Simply being yourself — the sweetest, kindest, most radiant girl in the world.', order_index: 7, created_at: new Date().toISOString() },
  ];

  const handleNext = () => {
    if (currentReasonIndex < displayReasons.length - 1) {
      setCurrentReasonIndex((prev) => prev + 1);
      setViewedCount((prev) => Math.max(prev, currentReasonIndex + 2));
    }
  };

  const handlePrevious = () => {
    if (currentReasonIndex > 0) {
      setCurrentReasonIndex((prev) => prev - 1);
    }
  };

  const currentReason = displayReasons[currentReasonIndex];
  const progressPercent = Math.round(((currentReasonIndex + 1) / displayReasons.length) * 100);

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-14 bg-newspaper-paper text-cocoa-800 relative overflow-x-hidden flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full">
        {/* Navigation Header */}
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
              Chapter IV • The Gazette Archive
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl text-burgundy-900 font-bold">
              Thirty Reasons Why
            </h1>
          </div>

          <button
            onClick={onComplete}
            className="text-xs font-sans uppercase tracking-widest text-burgundy-800 hover:text-burgundy-900 underline underline-offset-4"
          >
            Next: Milestones →
          </button>
        </div>

        {/* Vintage Progress Indicator */}
        <div className="flex items-center justify-between text-xs font-serif italic text-cocoa-600 mb-2">
          <span>Folio Entry {currentReasonIndex + 1} of {displayReasons.length}</span>
          <span>{progressPercent}% Explored</span>
        </div>
        <div className="w-full h-1.5 bg-champagne-200/80 rounded-full overflow-hidden mb-10 border border-burgundy-900/10">
          <motion.div
            className="h-full bg-burgundy-700"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Vintage Editorial Card */}
        <div className="my-auto py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReasonIndex}
              className="bg-ivory-50 border-2 border-burgundy-900/25 p-8 sm:p-14 shadow-editorial rounded-sm text-center relative max-w-xl mx-auto"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              {/* Washi tape header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 washi-tape rotate-[-2deg] border-x border-cocoa-300/40" />

              <div className="text-[11px] uppercase tracking-[0.25em] text-vintageGold-700 font-sans mb-3">
                RECORDED MEMORANDUM N° {String(currentReasonIndex + 1).padStart(2, '0')}
              </div>

              <div className="font-editorial text-4xl sm:text-5xl text-burgundy-900/20 font-serif leading-none mb-2">
                “
              </div>

              <h3 className="font-cormorant text-2xl sm:text-3xl text-burgundy-950 font-normal leading-relaxed mb-6 -mt-4 px-2">
                {currentReason.reason}
              </h3>

              <div className="flex items-center justify-center gap-3 my-4 opacity-60">
                <div className="h-px w-10 bg-vintageGold-500" />
                <span className="text-vintageGold-600 text-xs">❦</span>
                <div className="h-px w-10 bg-vintageGold-500" />
              </div>

              <div className="font-handwriting text-xl text-dusty-rose-600">
                one of a hundred reasons you are unforgettable ♡
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-burgundy-900/15">
                <button
                  onClick={handlePrevious}
                  disabled={currentReasonIndex === 0}
                  className="p-2.5 border border-burgundy-900/25 text-burgundy-900 rounded-sm hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Previous reason"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-widest rounded-sm transition-all shadow-sm flex items-center gap-2"
                >
                  <span>{currentReasonIndex === displayReasons.length - 1 ? 'Read All Reasons' : 'Next Reason'}</span>
                  <Heart size={13} fill="currentColor" className="text-dusty-rose-300" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentReasonIndex === displayReasons.length - 1}
                  className="p-2.5 border border-burgundy-900/25 text-burgundy-900 rounded-sm hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Next reason"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* All discovered link */}
        <div className="text-center mt-8">
          <button
            onClick={onComplete}
            className="text-xs uppercase tracking-widest text-burgundy-800 font-sans border-b border-burgundy-800/40 pb-0.5 hover:text-burgundy-950"
          >
            Continue to Memory Timeline →
          </button>
        </div>
      </div>
    </div>
  );
}
