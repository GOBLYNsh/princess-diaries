'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reason } from '@/types';

interface ReasonsSectionProps {
  reasons: Reason[];
  onBack: () => void;
  onComplete: () => void;
}

export default function ReasonsSection({ reasons, onBack, onComplete }: ReasonsSectionProps) {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);

  const handleNext = () => {
    if (currentReasonIndex < reasons.length - 1) {
      setCurrentReasonIndex(currentReasonIndex + 1);
      setViewedCount(viewedCount + 1);
    }
  };

  const handlePrevious = () => {
    if (currentReasonIndex > 0) {
      setCurrentReasonIndex(currentReasonIndex - 1);
      setViewedCount(viewedCount - 1);
    }
  };

  const handleKnow = () => {
    setViewedCount(prev => Math.min(prev + 1, reasons.length));
    if (currentReasonIndex < reasons.length - 1) {
      setCurrentReasonIndex(currentReasonIndex + 1);
    }
  };

  // Fallback reasons if none provided
  const displayReasons = reasons.length > 0 ? reasons : [
    { id: '1', reason: 'Your beautiful smile that lights up every room', order_index: 1, created_at: new Date().toISOString() },
    { id: '2', reason: 'Your random conversations that always make me laugh', order_index: 2, created_at: new Date().toISOString() },
    { id: '3', reason: 'Your adorable expressions when you concentrate', order_index: 3, created_at: new Date().toISOString() },
    { id: '4', reason: 'The way you make ordinary moments feel special', order_index: 4, created_at: new Date().toISOString() },
    { id: '5', reason: 'Simply being yourself - authentically and wonderfully you', order_index: 5, created_at: new Date().toISOString() },
  ];

  const currentReason = displayReasons[currentReasonIndex];

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-pink-50 via-cream-50 to-champagne-100" />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + (i % 5) * 4}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360, 0],
              scale: [1, 1.2, 1],
              opacity: [0, 1, 0.7, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 z-10 relative">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xs shadow-md hover:bg-white transition-all duration-300"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} className="text-primary-500" />
          <span className="font-body text-sm">Back</span>
        </motion.button>

        <motion.div className="text-center">
          <h1 className="text-3xl font-serif text-warm-brown-700">
            Little Things I Love About You
          </h1>
          <p className="text-sm text-warm-brown-500 font-body mt-1">
            {viewedCount} of {displayReasons.length} discovered
          </p>
        </motion.div>

        <div className="w-24" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto mb-12 z-10 relative h-4 bg-warm-brown-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(viewedCount / displayReasons.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Reason display */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReasonIndex}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-4 text-center"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
          {/* Decorative header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star size={20} className="text-secondary-400" />
            <Heart size={16} className="text-pink-300" fill="currentColor" />
            <Sparkles size={16} className="text-primary-300" />
          </div>

            <h3 className="text-xl font-serif text-primary-600 mb-4 leading-relaxed">
              {currentReason.reason}
            </h3>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentReasonIndex === 0}
                className="w-12 h-12 rounded-full border-2 border-warm-brown-300 hover:border-primary-400 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹
              </Button>

              <Button
                onClick={handleKnow}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 font-body text-sm"
              >
                I Know 💖
              </Button>

              <Button
                onClick={handleNext}
                disabled={currentReasonIndex === displayReasons.length - 1}
                className="w-12 h-12 rounded-full border-2 border-warm-brown-300 hover:border-secondary-400 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ›
              </Button>
            </div>
          </motion.div>

          {/* Checkmark celebration */}
          <AnimatePresence>
            {viewedCount > 0 && (
              <motion.div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Check size={24} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatePresence>

        {/* Decorations */}
        <div className="absolute -top-10 -right-10 text-4xl opacity-20">🌸</div>
        <div className="absolute -bottom-10 -left-10 text-4xl opacity-20">💕</div>
      </div>

      {/* All discovered overlay */}
      {viewedCount === displayReasons.length && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full px-8 py-4 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onComplete}
            className="bg-transparent hover:bg-white/10 text-white font-serif text-lg"
          >
            Continue to Timeline
          </Button>
        </motion.div>
      )}
    </div>
  );
}