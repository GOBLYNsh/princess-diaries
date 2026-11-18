'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, Heart, Flower, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SurprisesSectionProps {
  recipientName: string;
  surpriseMessages: {
    heart_click: string;
    gift_open: string;
    bouquet_interaction: string;
  };
  onBack: () => void;
  onComplete: () => void;
}

export default function SurprisesSection({
  recipientName,
  surpriseMessages,
  onBack,
  onComplete,
}: SurprisesSectionProps) {
  const [giftOpened, setGiftOpened] = useState(false);
  const [bouquetInteracted, setBouquetInteracted] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);

  const handleGiftClick = () => {
    setGiftOpened(true);
  };

  const handleHeartClick = () => {
    setHeartClicks(prev => prev + 1);
    if (heartClicks >= 3 && !giftOpened) {
      setTimeout(() => setGiftOpened(true), 500);
    }
  };

  const handleBouquetHover = () => {
    if (!bouquetInteracted) {
      setTimeout(() => setBouquetInteracted(true), 1000);
    }
  };

  const allCompleted = giftOpened && heartClicks >= 3;

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-pink-50 via-cream-50 to-champagne-100" />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${14 + (i % 8) * 3}px`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          >
            💫
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

        <motion.h1
          className="text-3xl font-serif text-warm-brown-700 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Interactive Surprises
        </motion.h1>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Gift Box */}
        <motion.div className="flex flex-col items-center">
          <motion.div
            className="bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl p-8 cursor-pointer shadow-2xl mb-6"
            onClick={handleGiftClick}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-inner">
              <Gift size={48} className="mx-auto text-primary-500" />
              <div className="text-center mt-4">
                <h3 className="font-serif text-xl text-warm-brown-700">Gift Box</h3>
                <p className="text-sm text-warm-brown-500 font-body">Open it!</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {giftOpened && (
              <motion.div
                className="bg-white rounded-xl p-6 shadow-xl text-center max-w-xs"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <p className="text-primary-600 font-serif text-base">{surpriseMessages.gift_open}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Virtual Bouquet */}
        <motion.div
          className="flex flex-col items-center"
          onHoverStart={handleBouquetHover}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl mb-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            animate={bouquetInteracted ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 2, repeat: bouquetInteracted ? Infinity : 0 }}
          >
            <div className="text-6xl mb-4">🌸🌹🌺🌷🌻</div>
            <h3 className="font-serif text-xl text-warm-brown-700">Bouquet</h3>
            <p className="text-sm text-warm-brown-500 font-body">Hover to receive flowers</p>
          </motion.div>

          <AnimatePresence>
            {bouquetInteracted && (
              <motion.div
                className="bg-pink-50 rounded-xl p-4 shadow-xl text-center max-w-xs"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -20 }}
              >
                <p className="text-secondary-600 font-body text-sm">{surpriseMessages.bouquet_interaction}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hearts */}
        <motion.div className="flex flex-col items-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl mb-6">
            <div className="text-center mb-4">
              <h3 className="font-serif text-xl text-warm-brown-700 mb-2">Click Hearts</h3>
              <p className="text-sm text-warm-brown-500 font-body">
                {heartClicks}/5 clicks
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[...5].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={handleHeartClick}
                  className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  animate={heartClicks > i ? { scale: [1, 1.3, 1], backgroundColor: '#e86aa8' } : {}}
                >
                  <Heart
                    size={24}
                    fill={heartClicks > i ? '#fff' : '#e86aa8'}
                    className="transition-all"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {heartClicks >= 3 && (
              <motion.div
                className="bg-white rounded-xl p-4 shadow-xl text-center max-w-xs"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <p className="text-primary-600 font-serif text-sm">{surpriseMessages.heart_click}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Continue button */}
      <AnimatePresence>
        {allCompleted && (
          <motion.button
            onClick={onComplete}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 text-white px-8 py-4 rounded-full shadow-2xl font-body text-lg transition-all duration-300 hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Continue to Celebration
          </motion.button>
        )}
      </AnimatePresence>

      {/* Completion indicator */}
      {allCompleted && (
        <motion.div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full px-6 py-3 shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...3].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-secondary-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 1, delay: i * 0.2 }}
                />
              ))}
            </div>
            <span className="font-serif text-sm text-primary-600">Surprise completed!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}