import React from 'react';
import { useStore } from '../../store/useStore';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useToolDrop } from '../../hooks/useToolDrop';

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
    activeTools.forEach((tool) => {
      setTimeout(() => {
        const messageId = Date.now().toString() + '-' + tool.id;
        addMessage({
          id: messageId,
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
        flex-1 flex flex-col bg-gray-50 dark:bg-gray-900
        ${isDropping ? 'bg-primary-50/50 dark:bg-primary-900/20 border-2 border-dashed border-primary-500' : ''}
        transition-all duration-200
      `}
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