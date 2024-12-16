import React from 'react';
import { Message } from '../types';
import { formatDistanceToNow } from '../utils/date';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-900 border border-gray-200'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            <div className="mt-1 flex items-center gap-2 text-xs opacity-75">
              <span>{formatDistanceToNow(message.timestamp)}</span>
              {message.creditsUsed && (
                <>
                  <span>•</span>
                  <span>{message.creditsUsed} credits used</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}