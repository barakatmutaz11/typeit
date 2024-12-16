import React, { useRef, useEffect } from 'react';
import { Message } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg p-4
                  ${message.sender === 'user' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                {message.attachments?.map((attachment, index) => (
                  <div key={index} className="mb-3">
                    {attachment.type === 'image' && (
                      <img 
                        src={attachment.content}
                        alt="Attached"
                        className="max-w-full rounded-lg"
                      />
                    )}
                  </div>
                ))}
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="mt-1 text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}