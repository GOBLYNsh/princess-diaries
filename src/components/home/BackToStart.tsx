'use client';

import { motion } from 'framer-motion';

interface BackToStartProps {
  onClick: () => void;
}

export default function BackToStart({ onClick }: BackToStartProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-6 left-6 z-40 w-12 h-12 bg-white/80 backdrop-blur-xs rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-6 h-6 flex flex-col items-center justify-center">
        <motion.div
          className="w-4 h-0.5 bg-primary-500 rounded-full"
          animate={{ rotate: [0, -90, -90] }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-0.5 h-4 bg-primary-500 rounded-full"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </div>
    </motion.button>
  );
}