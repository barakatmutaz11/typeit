import React from 'react';
import { useStore } from '../../../store/useStore';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useToolDrop } from '../../../hooks/useToolDrop';

export function ChatArea() {
  const { messages, addMessage, activeTools, removeActiveTools } = useStore();
  const { dropRef, isDropping } = useToolDrop();

  const handleSendMessage = (content: string, attachments?: Array<{ type: string; content: string }>) => {
    if ((!content.trim() && (!attachments || attachments.length === 0)) || activeTools.length === 0) return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      attachments
    });

    // Simulate AI response for each active tool
    activeTools.forEach(async (tool) => {
      setTimeout(() => {
        addMessage({
          id: `${Date.now()}-${tool.id}`,
          content: `${tool.name} response: "${content}"`,
          sender: 'ai',
          timestamp: new Date(),
          toolId: tool.id
        });
      }, 1000);
    });
  };

  return (
    <div 
      ref={dropRef}
      className={`
        flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 
        dark:from-gray-900 dark:to-gray-800
        ${isDropping ? 'bg-primary-50/50 dark:bg-primary-900/20 scale-[1.02]' : ''}
        transition-all duration-300 ease-out
        relative
        before:absolute before:inset-0 before:bg-gradient-to-b 
        before:from-white/20 before:to-transparent before:opacity-50
      `}
    >
      <ChatHeader 
        activeTools={activeTools}
        onRemoveTool={removeActiveTools}
      />
      
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
      </div>
      
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