'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

interface BackToStartProps {
  onClick: () => void;
}

export default function BackToStart({ onClick }: BackToStartProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-6 left-6 z-40 px-3.5 py-2 bg-ivory-50/90 backdrop-blur-xs border border-burgundy-900/25 rounded-sm shadow-sm flex items-center gap-2 hover:bg-white text-burgundy-900 transition-all font-sans text-xs uppercase tracking-wider"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      title="Return to Cover Page"
    >
      <Home size={14} className="text-vintageGold-600" />
      <span className="hidden sm:inline">Cover Page</span>
    </motion.button>
  );
}
