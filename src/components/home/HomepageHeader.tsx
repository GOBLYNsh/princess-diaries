'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart } from 'lucide-react';

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
  const [sparkleCount, setSparkleCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Create floating sparkles
    const interval = setInterval(() => {
      setSparkleCount(prev => (prev + 1) % 50);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sectionButtons = [
    { label: 'Scrapbook', onClick: onViewScrapbook, emoji: '📚' },
    { label: 'Gallery', onClick: onViewGallery, emoji: '📸' },
    { label: 'Letter', onClick: onViewLetter, emoji: '✉️' },
    { label: 'Reasons', onClick: onViewReasons, emoji: '❤️' },
    { label: 'Timeline', onClick: onViewTimeline, emoji: '⏳' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background with soft texture */}
      <div className="absolute inset-0 bg-scrapbook-paper" />

      {/* Floating hearts and sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {Math.random() > 0.5 ? '💖' : '⭐'}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center z-10 max-w-3xl"
      >
        {/* Main heading with decorative elements */}
        <motion.h1
          className="text-5xl md:text-6xl font-serif text-warm-brown-700 mb-6 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Happy Princess Day, {recipientName} ♡
          <div className="absolute -top-6 -right-6 text-pink-300/50">📜</div>
          <div className="absolute -bottom-6 -left-6 text-pink-300/50">🌸</div>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl font-body text-warm-brown-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Today isn't just about a princess. It's about celebrating someone who makes
          ordinary days feel magical.
        </motion.p>

        {/* Main call to action */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            onClick={onOpenEnvelope}
            className="bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 text-white font-handwriting text-xl px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1"
          >
            Open Your Little Surprise ♡
          </Button>
        </motion.div>

        {/* Section navigation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {sectionButtons.map((btn, index) => (
            <motion.div
              key={btn.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <Button
                onClick={btn.onClick}
                variant="outline"
                className="w-full py-3 text-sm font-body border-2 border-warm-brown-300 hover:border-primary-400 hover:bg-white/50 rounded-xl transition-all duration-300"
              >
                <span className="text-2xl mr-2">{btn.emoji}</span>
                {btn.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="text-primary-400" size={30} fill={0.3} />
      </motion.div>
    </div>
  );
}