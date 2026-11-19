'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen && !showContent) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showContent]);

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative p-6 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-pink-100 via-cream-50 to-champagne-100" />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            💌
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        {/* Envelope flap opening animation */}
        <motion.div
          className="relative mb-8"
          animate={isOpening ? 'open' : 'closed'}
        >
          <motion.div
            className="relative w-64 h-48 bg-gradient-to-r from-primary-300 to-secondary-400 rounded-b-2xl mx-auto shadow-2xl flex items-center justify-center"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-blush-pink-300 rounded-b-lg"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <div className="text-center z-10">
              <Mail size={40} className="mx-auto mb-2 text-white" />
              <h2 className="text-2xl font-serif text-white font-bold">
                For {recipientName}
              </h2>
            </div>
          </motion.div>

          {/* Envelopes */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-32 bg-white rounded-t-2xl shadow-xl"
               style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }}>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-3 bg-secondary-300 rounded" />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl border border-warm-brown-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="prose max-w-none text-center">
                <h3 className="text-xl font-serif text-primary-600 mb-4">
                  Your Little Surprise
                </h3>
                <p className="text-warm-brown-700 leading-relaxed mb-6 whitespace-pre-line">
                  {content}
                </p>
                <div className="flex justify-center gap-2 mb-6">
                  <Heart size={16} className="text-pink-400" fill="currentColor" />
                  <Heart size={16} className="text-pink-400" fill="currentColor" />
                  <Heart size={16} className="text-pink-400" fill="currentColor" />
                </div>
              </div>

              {/* Decorations */}
              <div className="absolute -top-4 -right-4 text-3xl">🌸</div>
              <div className="absolute -bottom-4 -left-4 text-3xl">💖</div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  onClick={onClose}
                  className="flex-1 py-3 text-base font-body"
                  variant="outline"
                >
                  Continue Exploring
                </Button>
                <Button
                  onClick={onViewScrapbook}
                  className="flex-1 py-3 text-base font-body bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600"
                >
                  View Scrapbook
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute -top-12 -right-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          whileHover={{ rotate: 90 }}
        >
          <X size={20} className="text-primary-500" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}