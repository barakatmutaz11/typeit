import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface StartButtonProps {
  onStart: () => void;
}

export function StartButton({ onStart }: StartButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-x-0 bottom-24 flex justify-center"
    >
      <button
        onClick={onStart}
        className="
          bg-primary-600 dark:bg-primary-500 text-white
          px-8 py-3 rounded-full shadow-lg
          hover:bg-primary-700 dark:hover:bg-primary-600
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          transition-all duration-200
          flex items-center gap-2
          group
        "
      >
        <Play size={20} className="transition-transform group-hover:translate-x-1" />
        <span className="font-medium">Start Chat</span>
      </button>
    </motion.div>
  );
}