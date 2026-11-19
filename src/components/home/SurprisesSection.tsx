'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, Heart, Sparkles, Flower2 } from 'lucide-react';

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
    setHeartClicks((prev) => prev + 1);
  };

  const handleBouquetHover = () => {
    if (!bouquetInteracted) {
      setTimeout(() => setBouquetInteracted(true), 600);
    }
  };

  const allCompleted = giftOpened && heartClicks >= 3;

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-14 bg-newspaper-paper text-cocoa-800 relative overflow-x-hidden flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full">
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-burgundy-900/25 pb-4 mb-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-burgundy-900/25 hover:border-burgundy-900/60 bg-ivory-50 text-burgundy-900 rounded-sm text-xs uppercase tracking-widest font-sans transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-vintageGold-600 font-sans block">
              Chapter VI • Little Treasures
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-burgundy-900 font-bold">
              Interactive Surprises
            </h1>
            <p className="font-cormorant italic text-xs sm:text-sm text-cocoa-600 mt-1">
              Delightful little interactive keepsakes prepared for {recipientName}
            </p>
          </div>

          <button
            onClick={onComplete}
            className="text-xs font-sans uppercase tracking-widest text-burgundy-800 hover:text-burgundy-900 underline underline-offset-4"
          >
            Grand Finale →
          </button>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
          {/* 1. Gift Box */}
          <div className="bg-ivory-50 border border-burgundy-900/20 p-6 sm:p-8 shadow-editorial rounded-sm text-center flex flex-col justify-between relative group">
            <div className="w-16 h-4 washi-tape absolute -top-2 left-8 rotate-[-2deg]" />

            <div>
              <div className="text-[10px] uppercase tracking-widest text-vintageGold-700 font-sans mb-1">
                KEEPSAKE N° 01
              </div>
              <h3 className="font-editorial text-xl text-burgundy-900 font-bold mb-4">
                The Royal Gift Box
              </h3>

              <motion.div
                onClick={handleGiftClick}
                className="cursor-pointer my-4 p-6 bg-champagne-100/70 border border-burgundy-900/15 rounded-sm shadow-sm inline-block w-full hover:border-vintageGold-500 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-5xl mb-3">🎁</div>
                <div className="font-sans text-xs uppercase tracking-widest text-burgundy-800 font-medium">
                  {giftOpened ? 'Parcel Unwrapped' : 'Tap to Open Parcel'}
                </div>
              </motion.div>
            </div>

            <div className="min-h-[70px] flex items-center justify-center">
              <AnimatePresence>
                {giftOpened ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-white border border-dashed border-burgundy-700/40 text-xs font-cormorant italic text-burgundy-900 text-center"
                  >
                    &ldquo;{surpriseMessages.gift_open || 'A royal parcel overflowing with love, smiles, and endless joy.'}&rdquo;
                  </motion.div>
                ) : (
                  <p className="font-handwriting text-base text-dusty-rose-600">
                    a little surprise awaits inside ✨
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 2. Virtual Bouquet */}
          <div
            onMouseEnter={handleBouquetHover}
            className="bg-ivory-50 border border-burgundy-900/20 p-6 sm:p-8 shadow-editorial rounded-sm text-center flex flex-col justify-between relative group"
          >
            <div className="w-16 h-4 washi-tape absolute -top-2 right-8 rotate-[2deg]" />

            <div>
              <div className="text-[10px] uppercase tracking-widest text-vintageGold-700 font-sans mb-1">
                KEEPSAKE N° 02
              </div>
              <h3 className="font-editorial text-xl text-burgundy-900 font-bold mb-4">
                Fresh Botanical Bouquet
              </h3>

              <div className="my-4 p-6 bg-champagne-100/70 border border-burgundy-900/15 rounded-sm shadow-sm">
                <div className="text-5xl mb-3">💐</div>
                <div className="font-sans text-xs uppercase tracking-widest text-burgundy-800 font-medium">
                  Handpicked Florals
                </div>
              </div>
            </div>

            <div className="min-h-[70px] flex items-center justify-center">
              <AnimatePresence>
                {bouquetInteracted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-white border border-dashed border-burgundy-700/40 text-xs font-cormorant italic text-burgundy-900 text-center"
                  >
                    &ldquo;{surpriseMessages.bouquet_interaction || 'Roses, peonies, and wildflowers picked in honor of her grace.'}&rdquo;
                  </motion.div>
                ) : (
                  <p className="font-handwriting text-base text-dusty-rose-600">
                    hover to receive your bouquet 🌸
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Click Hearts */}
          <div className="bg-ivory-50 border border-burgundy-900/20 p-6 sm:p-8 shadow-editorial rounded-sm text-center flex flex-col justify-between relative group">
            <div className="w-16 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 rotate-[-1deg]" />

            <div>
              <div className="text-[10px] uppercase tracking-widest text-vintageGold-700 font-sans mb-1">
                KEEPSAKE N° 03
              </div>
              <h3 className="font-editorial text-xl text-burgundy-900 font-bold mb-4">
                Tokens of Affection
              </h3>

              <div className="my-4 p-4 bg-champagne-100/70 border border-burgundy-900/15 rounded-sm shadow-sm">
                <div className="grid grid-cols-5 gap-1.5 justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={handleHeartClick}
                      className={`w-9 h-9 rounded-sm flex items-center justify-center transition-all ${
                        heartClicks > i
                          ? 'bg-burgundy-700 text-ivory-100 shadow-sm'
                          : 'bg-white border border-burgundy-900/20 text-cocoa-400 hover:text-burgundy-700'
                      }`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={16} fill={heartClicks > i ? 'currentColor' : 'none'} />
                    </motion.button>
                  ))}
                </div>
                <div className="font-sans text-[11px] text-cocoa-500 uppercase tracking-wider">
                  {Math.min(heartClicks, 5)} / 5 Hearts Gathered
                </div>
              </div>
            </div>

            <div className="min-h-[70px] flex items-center justify-center">
              <AnimatePresence>
                {heartClicks >= 3 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-white border border-dashed border-burgundy-700/40 text-xs font-cormorant italic text-burgundy-900 text-center"
                  >
                    &ldquo;{surpriseMessages.heart_click || 'Every single heart belongs to you, always.'}&rdquo;
                  </motion.div>
                ) : (
                  <p className="font-handwriting text-base text-dusty-rose-600">
                    tap the hearts to collect them ♡
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Grand Finale Trigger Banner */}
        <div className="mt-10 pt-6 border-t border-burgundy-900/20 text-center">
          <button
            onClick={onComplete}
            className="px-10 py-4 bg-burgundy-700 hover:bg-burgundy-800 text-ivory-100 font-sans text-xs uppercase tracking-[0.2em] rounded-sm transition-all shadow-editorial hover:shadow-2xl"
          >
            Enter The Grand Celebration 👑
          </button>
        </div>
      </div>
    </div>
  );
}
