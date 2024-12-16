import React from 'react';
import { ThumbsUp, ThumbsDown, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIToolFeedbackProps {
  messageId: string;
  onFeedback: (messageId: string, type: 'like' | 'dislike' | 'report') => void;
}

export function AIToolFeedback({ messageId, onFeedback }: AIToolFeedbackProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 mt-2"
    >
      <button
        onClick={() => onFeedback(messageId, 'like')}
        className="p-1 text-gray-400 hover:text-green-500 transition-colors"
        title="Helpful"
      >
        <ThumbsUp size={14} />
      </button>
      <button
        onClick={() => onFeedback(messageId, 'dislike')}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        title="Not helpful"
      >
        <ThumbsDown size={14} />
      </button>
      <button
        onClick={() => onFeedback(messageId, 'report')}
        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
        title="Report"
      >
        <Flag size={14} />
      </button>
    </motion.div>
  );
}