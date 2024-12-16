import React from 'react';
import { Message } from '../../../types';
import { useToolsStore } from '../../../store/tools.store';
import { formatDistanceToNow } from '../../../utils/date';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { tools } = useToolsStore();
  const tool = message.toolId ? tools.find(t => t.id === message.toolId) : null;
  const isUser = message.sender === 'user';
  
  const hasAttachments = message.attachments && message.attachments.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && tool && (
        <div className={`w-8 h-8 rounded-full ${tool.color} flex items-center justify-center flex-shrink-0`}>
          <tool.icon size={16} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        {tool && !isUser && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {tool.name}
          </div>
        )}
        
        <div
          className={`
            inline-block rounded-lg overflow-hidden
            ${isUser 
              ? 'bg-primary-600 dark:bg-primary-500 text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
            }
          `}
        >
          {hasAttachments && (
            <div className="space-y-2 p-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="relative group">
                  {attachment.type === 'image' ? (
                    <div className="relative">
                      <img 
                        src={attachment.content} 
                        alt="Attached" 
                        className="max-h-[200px] w-auto rounded-lg cursor-pointer object-contain"
                        onClick={() => window.open(attachment.content, '_blank')}
                      />
                      <button 
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white 
                                 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(attachment.content, '_blank')}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                      <FileText size={20} className="text-gray-400" />
                      <div className="flex-1 truncate text-sm">
                        {attachment.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {message.content && (
            <div className="p-4">
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          )}
          
          <div className="px-4 pb-2 text-xs opacity-75 flex items-center gap-2">
            <span>{formatDistanceToNow(message.timestamp)}</span>
            {message.attachments?.length > 0 && (
              <>
                <span>•</span>
                <span>{message.attachments.length} attachment{message.attachments.length !== 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}