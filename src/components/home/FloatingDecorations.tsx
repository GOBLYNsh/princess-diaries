'use client';

import { motion } from 'framer-motion';

export default function FloatingDecorations() {
  const decorations = [
    { glyph: '❦', x: 6, y: 12, delay: 0 },
    { glyph: '✦', x: 18, y: 6, delay: 0.6 },
    { glyph: '❀', x: 30, y: 18, delay: 1.2 },
    { glyph: '✧', x: 42, y: 8, delay: 1.8 },
    { glyph: '❦', x: 54, y: 14, delay: 2.4 },
    { glyph: '✦', x: 68, y: 7, delay: 3.0 },
    { glyph: '❀', x: 80, y: 16, delay: 3.6 },
    { glyph: '✧', x: 92, y: 10, delay: 4.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((decoration, index) => (
        <motion.div
          key={index}
          className="absolute text-vintageGold-500/20 select-none font-serif"
          style={{
            left: `${decoration.x}%`,
            top: `${decoration.y}%`,
            fontSize: `${13 + (index % 3) * 3}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: decoration.delay,
          }}
        >
          {decoration.glyph}
        </motion.div>
      ))}
    </div>
  );
}
