'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Heart, Star, Flower, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteSettings } from '@/types';

interface LetterSectionProps {
  settings: SiteSettings;
  onBack: () => void;
  onComplete: () => void;
}

export default function LetterSection({ settings, onBack, onComplete }: LetterSectionProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Auto-open letter after delay
    const timer = setTimeout(() => {
      setIsLetterOpen(true);
      setTimeout(() => {
        setIsLetterOpen(true);
        setTimeout(onComplete, 1000);
      }, 3000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background with parchment texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZmlsdGVyIHGpdHRlcj0ibGluZWFyIj4KICAgIDxzZWNtYSAxMDAlIiBvcGFjaXR5PSIwLjAxIiBmaWxsPSIjMDBhMTAwIi8+CiAgICA8c2Vjb25kYXJ5IG5hbWU9ImxpbmVhciIgbWluPD4KICAgICAgICA8c2Vjb25kYXJ5IHRodW1iIGluPSI0Ii8+CiAgICA8L3NlY29uZGFyeT4KICA8L2ZpbHRlcj4KICA8cm9jdGxliuKApCI+CiAgICA8cm9jdGxsIHc9IjEwMCIgeD0iMCIgeT0iMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiLz4KICA8L3JvY3Rsb3k+Cjwvc3ZnPgo=')] bg-repeat" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-rosy-300/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${14 + (particle.id % 6) * 3}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + (particle.id % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          >
            {particle.id % 3 === 0 && '✨'}
            {particle.id % 3 === 1 && '⭐'}
            {particle.id % 3 === 2 && '💫'}
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
          Letter to {settings.recipient_name || 'My Princess'}
        </motion.h1>

        <div className="w-24" />
      </div>

      {/* Letter envelope and content */}
      <div className="relative z-10 min-h-[60vh] flex items-center justify-center">
        <AnimatePresence>
          {isLetterOpen ? (
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              {/* Letter paper */}
              <motion.div
                className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl max-w-2xl mx-4 overflow-hidden letter-shadow"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)',
                }}
              >
                {/* Watermark corners */}
                <div className="absolute top-6 left-6 text-2xl opacity-10">🌸</div>
                <div className="absolute top-6 right-6 text-2xl opacity-10 transform -rotate-45">📜</div>
                <div className="absolute bottom-6 left-6 text-2xl opacity-10">💖</div>
                <div className="absolute bottom-6 right-6 text-2xl opacity-10 transform rotate-45">⭐</div>

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-block mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Flower className="w-16 h-16 text-secondary-400 mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl font-serif text-primary-600 mb-2">
                      My Dear {settings.recipient_name || 'Beloved Princess'},
                    </h2>
                    <p className="text-secondary-500 font-body text-sm">
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <motion.div
                    className="space-y-6 text-warm-brown-700 font-body leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <p className="text-xl">
                      {settings.letter_content || `My dearest princess,

Today is special because it celebrates the amazing light you bring into every life you touch. Your presence transforms ordinary moments into magical memories, and your kindness makes the world a brighter place.

Your beautiful smile has the power to turn any frown upside down, and your gentle heart inspires everyone who knows you. Today, know that you are cherished, appreciated, and deeply loved.

May this Princess Day be as wonderful as you are - filled with laughter, delight, and all the happiness you deserve.

With all my love,
The Royal Court`}
                    </p>

                    <div className="border-t border-warm-brown-200 pt-6">
                      <p className="text-right">
                        <span className="font-serif text-2xl text-primary-500">💖</span>
                      </p>
                      <p className="text-right text-3xl font-serif text-secondary-500 mt-2">
                        Forever Yours
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorations */}
              <motion.div
                className="absolute -top-8 -right-8 text-4xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌸
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 text-4xl"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💕
              </motion.div>
            </motion.div>
          ) : (
            <div className="text-center">
              <motion.div
                className="inline-block w-48 h-48 bg-gradient-to-br from-primary-200 to-secondary-300 rounded-full flex items-center justify-center cursor-pointer mb-8 shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLetterOpen(true)}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(232, 106, 168, 0.4)',
                    '0 0 0 30px rgba(232, 106, 168, 0)',
                    '0 0 0 0 rgba(232, 106, 168, 0)',
                  ],
                }}
              >
                <div className="text-center">
                  <Mail size={48} className="mx-auto mb-2 text-white" />
                  <span className="block text-sm font-body text-white mt-2">
                    Open Letter
                  </span>
                </div>
              </motion.div>

              <h3 className="text-xl font-serif text-warm-brown-600 mb-4">
                A Letter Just For You
              </h3>
              <p className="text-warm-brown-500 font-body max-w-md mx-auto">
                Click the envelope to read a special message written just for {settings.recipient_name || 'you'}.
              </p>
            </div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        <motion.button
          onClick={onComplete}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 text-white px-8 py-4 rounded-full shadow-2xl font-body text-lg transition-all duration-300 hover:scale-105"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}