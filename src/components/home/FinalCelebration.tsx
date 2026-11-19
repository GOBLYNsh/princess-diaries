'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FinalCelebrationProps {
  recipientName: string;
  onComplete: () => void;
}

export default function FinalCelebration({ recipientName, onComplete }: FinalCelebrationProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowConfetti(true);
      }, 1500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blush-pink-100 to-champagne-200" />

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 10,
            }}
          >
            {['💖', '⭐', '🌸', '💫', '🌟', '💕', '✨', '🌺'][i % 8]}
          </motion.div>
        ))}
      </div>

      {mounted && (
        <motion.div
          className="text-center z-10 px-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          {/* Crown decoration */}
          <motion.div
            className="mb-12"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-32 h-16 bg-gradient-to-r from-primary-300 to-secondary-400 rounded-full mx-auto relative">
              <div className="absolute top-0 left-0 right-0 h-4 bg-yellow-400 rounded-full" />
              <div className="absolute top-4 left-4 right-4 h-2 bg-yellow-400" />
              <div className="absolute top-6 left-6 right-6 h-1.5 bg-yellow-400" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }} />
            </div>
          </motion.div>

          {/* Main message */}
          <AnimatePresence>
            {showMessage && (
              <motion.h1
                className="text-5xl md:text-6xl font-serif text-warm-brown-700 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1 }}
              >
                Happy Princess Day, {recipientName}!
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-2xl mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 1 }}
              >
                <p className="text-lg font-body text-warm-brown-600 leading-relaxed">
                  Today is all about celebrating the special magic you bring to the world.
                  May every day feel like a royal celebration, filled with joy, love, and wonder.
                </p>

                <div className="mt-6">
                  <div className="flex justify-center gap-4 text-3xl">
                    👑💖🌟🌸💕
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hearts raining down */}
          <AnimatePresence>
            {showMessage && (
              <motion.div className="absolute top-1/2 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
                {[...Array(100)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-pink-300/60 text-2xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-20%`,
                    }}
                    animate={{
                      y: [0, 120, 240],
                      rotate: [0, 360, 720],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      delay: Math.random() * 5,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Restart button */}
          <motion.button
            onClick={onComplete}
            className="mt-8 bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 text-white px-10 py-4 rounded-full shadow-2xl font-body text-lg transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: showMessage ? 0.5 : 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Celebrate Again
          </motion.button>
        </motion.div>
      )}

      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(200)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: [
                    '#e86aa8',
                    '#f89449',
                    '#e04597',
                    '#d23485',
                    '#ffbe2a',
                    '#eab324',
                  ][Math.floor(Math.random() * 6)],
                }}
                animate={{
                  y: '100vh',
                  x: `${(Math.random() - 0.5) * 200}px`,
                  rotate: 360,
                }}
                transition={{
                  duration: 3 + Math.random(),
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