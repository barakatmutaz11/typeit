import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';
import { useToolDrag } from '../hooks/useToolDrag';

export function ChatArea() {
  const { messages, addMessage, activeTools, removeActiveTools } = useStore();
  const [isStarted, setIsStarted] = useState(false);
  
  const { isDragging, dragHandlers } = useToolDrag((tool) => {
    addActiveTools(tool);
  });

  const handleSendMessage = (content: string) => {
    if (!content.trim() || activeTools.length === 0) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    addMessage(userMessage);

    // Simulate AI responses
    activeTools.forEach(async (tool) => {
      // Add typing indicator
      const typingId = `typing-${Date.now()}`;
      addMessage({
        id: typingId,
        content: '...',
        sender: 'ai',
        timestamp: new Date(),
        toolId: tool.id,
        isTyping: true
      });

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add AI response
      addMessage({
        id: Date.now().toString(),
        content: `${tool.name} response: "${content}"`,
        sender: 'ai',
        timestamp: new Date(),
        toolId: tool.id
      });
    });
  };

  return (
    <div 
      className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${isDragging ? 'bg-primary-50/50' : ''}`}
      {...dragHandlers}
    >
      <ChatHeader 
        activeTools={activeTools}
        onRemoveTool={removeActiveTools}
      />
      
      <ChatMessages messages={messages} />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={activeTools.length === 0}
        placeholder={
          activeTools.length === 0 
            ? "Drag and drop AI tools to start chatting..." 
            : "Type your message..."
        }
      />
    </div>
  );
}