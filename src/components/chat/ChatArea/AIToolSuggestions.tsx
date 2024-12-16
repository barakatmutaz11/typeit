import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AITool } from '../../../types';
import { useToolsStore } from '../../../store/tools.store';

interface AIToolSuggestionsProps {
  message: string;
}

export function AIToolSuggestions({ message }: AIToolSuggestionsProps) {
  const { tools, addActiveTools } = useToolsStore();
  
  // Simple suggestion logic based on message content
  const suggestedTools = tools.filter(tool => {
    const keywords = {
      'image': ['create', 'generate', 'draw', 'picture', 'art'],
      'language': ['write', 'explain', 'analyze', 'translate'],
      'code': ['code', 'program', 'debug', 'function'],
      'audio': ['speak', 'voice', 'sound', 'music'],
      'video': ['video', 'animation', 'movie'],
    };

    const category = tool.category as keyof typeof keywords;
    return keywords[category]?.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }).slice(0, 3);

  if (suggestedTools.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Sparkles size={14} />
        <span>Suggested tools for this task:</span>
      </div>
      <div className="flex gap-2">
        {suggestedTools.map(tool => (
          <button
            key={tool.id}
            onClick={() => addActiveTools(tool)}
            className={`
              px-3 py-1.5 rounded-full text-sm text-white
              ${tool.color} hover:opacity-90 transition-opacity
              flex items-center gap-1.5
            `}
          >
            <tool.icon size={14} />
            <span>{tool.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}