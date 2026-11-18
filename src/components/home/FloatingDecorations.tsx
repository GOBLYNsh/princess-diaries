'use client';

import { motion } from 'framer-motion';

export default function FloatingDecorations() {
  const decorations = [
    { type: 'heart', x: 5, y: 10, delay: 0 },
    { type: 'star', x: 15, y: 5, delay: 0.5 },
    { type: 'flower', x: 25, y: 15, delay: 1 },
    { type: 'sparkle', x: 35, y: 8, delay: 1.5 },
    { type: 'heart', x: 45, y: 12, delay: 2 },
    { type: 'star', x: 55, y: 6, delay: 2.5 },
    { type: 'flower', x: 65, y: 14, delay: 3 },
    { type: 'sparkle', x: 75, y: 9, delay: 3.5 },
    { type: 'heart', x: 85, y: 11, delay: 4 },
    { type: 'star', x: 95, y: 7, delay: 4.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {decorations.map((decoration, index) => (
        <motion.div
          key={index}
          className="absolute text-pink-200/40"
          style={{
            left: `${decoration.x}%`,
            top: `${decoration.y}%`,
            fontSize: `${16 + (index % 4) * 8}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0, 1, 0.7, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: decoration.delay,
          }}
        >
          {decoration.type === 'heart' && '💖'}
          {decoration.type === 'star' && '⭐'}
          {decoration.type === 'flower' && '🌸'}
          {decoration.type === 'sparkle' && '✨'}
        </motion.div>
      ))}
    </div>
  );
}