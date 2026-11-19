'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Mail, Sparkles, Feather } from 'lucide-react';

interface EnvelopeProps {
  recipientName: string;
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onViewScrapbook: () => void;
}

export default function Envelope({
  recipientName,
  isOpen,
  onClose,
  content,
  onViewScrapbook,
}: EnvelopeProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen && !showContent) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showContent]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative p-4 sm:p-6 overflow-hidden bg-newspaper-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Frame Borders */}
      <div className="absolute inset-4 md:inset-8 border border-burgundy-900/15 pointer-events-none rounded-sm" />

      {/* Floating subtle romantic flecks (deterministic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-vintageGold-500/25 select-none"
            style={{
              left: `${(i * 23 + 9) % 100}%`,
              top: `${(i * 17 + 15) % 100}%`,
              fontSize: `${14 + (i % 3) * 6}px`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {i % 2 === 0 ? '❦' : '✦'}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        {/* Vintage Envelope Packet */}
        <div className="relative mb-6">
          <div className="bg-ivory-50 border-2 border-burgundy-900/30 p-6 rounded-sm shadow-editorial relative overflow-hidden">
            {/* Airmail stripes top border */}
            <div className="h-2 w-full bg-repeating-linear-gradient mb-4 -mt-2 -mx-2 border-b border-burgundy-900/20"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(45deg, #713F49, #713F49 10px, #F8F1E8 10px, #F8F1E8 20px, #C5A16D 20px, #C5A16D 30px, #F8F1E8 30px, #F8F1E8 40px)',
                 }}
            />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-vintageGold-700 font-sans block">
                  PAR AVION • BY ROYAL MESSENGER
                </span>
                <span className="font-serif italic text-xs text-cocoa-500">
                  Deliver without delay to:
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-burgundy-900 font-bold mt-1">
                  {recipientName}
                </h3>
              </div>

              {/* Vintage Wax Seal / Postage Stamp */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-16 border border-dashed border-burgundy-700 bg-champagne-100 flex flex-col items-center justify-center text-center p-1 shadow-sm">
                  <span className="text-[8px] font-sans text-burgundy-800 tracking-wider">SPECIAL</span>
                  <span className="text-xl">👑</span>
                  <span className="text-[7px] font-serif text-cocoa-600">ROYAL POST</span>
                </div>
                <div className="mt-1 font-handwriting text-xs text-dusty-rose-600">
                  postage paid ♡
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Unfolded Letter */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="bg-white p-6 sm:p-10 border border-burgundy-900/25 shadow-2xl relative rounded-xs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* Washi tape header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 washi-tape rotate-[1deg] border-x border-cocoa-300/40" />

              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-vintageGold-600 font-sans">
                  The Royal Gazette Dispatch
                </span>
                <h4 className="font-editorial text-2xl text-burgundy-900 font-bold mt-1">
                  A Little Note Just For You
                </h4>
                <div className="flex items-center justify-center gap-3 my-2 opacity-60">
                  <div className="h-px w-12 bg-vintageGold-500" />
                  <span className="text-vintageGold-600 text-xs">❦</span>
                  <div className="h-px w-12 bg-vintageGold-500" />
                </div>
              </div>

              <div className="font-cormorant italic text-lg sm:text-xl text-cocoa-700 leading-relaxed text-center whitespace-pre-line mb-8">
                &ldquo;{content}&rdquo;
              </div>

              <div className="font-handwriting text-xl text-dusty-rose-600 text-center mb-8">
                with the highest admiration & all our love —
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-burgundy-900/15">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-burgundy-900/30 text-burgundy-900 font-sans text-xs uppercase tracking-widest hover:bg-ivory-100 rounded-sm transition-all"
                >
                  Close Letter
                </button>
                <button
                  onClick={onViewScrapbook}
                  className="flex-1 py-3 px-4 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-widest rounded-sm transition-all shadow-md"
                >
                  Open The Gazette 📰
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button in corner */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 w-8 h-8 rounded-full border border-burgundy-900/30 bg-ivory-50 text-burgundy-900 flex items-center justify-center hover:bg-white text-xs font-sans transition-all"
        >
          <X size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
}
