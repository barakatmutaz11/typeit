import React from 'react';
import { X } from 'lucide-react';
import { AITool } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHeaderProps {
  activeTools: AITool[];
  onRemoveTool: (toolId: string) => void;
}

export function ChatHeader({ activeTools, onRemoveTool }: ChatHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 shadow-sm">
      <div className="max-w-2xl mx-auto flex gap-2 flex-wrap min-h-[40px]">
        <AnimatePresence>
          {activeTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`
                  px-3 py-1 rounded-full text-sm text-white flex items-center gap-2
                  ${tool.color} transition-transform duration-200 hover:scale-105
                `}
              >
                <Icon size={16} className="animate-bounce-in" />
                <span>{tool.name}</span>
                <span className="text-xs opacity-75">
                  ({tool.credits.available} credits)
                </span>
                <button
                  onClick={() => onRemoveTool(tool.id)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
                  aria-label={`Remove ${tool.name}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {activeTools.length === 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400 p-2 animate-fade-in">
            Drag and drop AI tools here to start chatting
          </div>
        )}
      </div>
    </div>
  );
}