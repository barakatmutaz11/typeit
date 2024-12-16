import { useState } from 'react';
import { useMessagesStore } from '../store/messages.store';
import { useToolsStore } from '../store/tools.store';
import { useToolDrop } from './useToolDrop';
import { processWithAITool } from '../services/aiTools';

export function useChat() {
  const [isStarted, setIsStarted] = useState(false);
  const { messages, addMessage } = useMessagesStore();
  const { activeTools, removeActiveTools } = useToolsStore();
  const { dropRef, isDropping } = useToolDrop();

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !isStarted || activeTools.length === 0) return;

    // Add user message
    addMessage({
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    });

    // Process with each active tool
    for (const tool of activeTools) {
      try {
        const response = await processWithAITool(tool, content);
        addMessage({
          id: `${Date.now()}-${tool.id}`,
          content: response,
          sender: 'ai',
          timestamp: new Date(),
          toolId: tool.id
        });
      } catch (error) {
        console.error(`Error processing with ${tool.name}:`, error);
        addMessage({
          id: `${Date.now()}-error`,
          content: `Error: Failed to process with ${tool.name}`,
          sender: 'ai',
          timestamp: new Date(),
          toolId: tool.id,
          error: true
        });
      }
    }
  };

  return {
    messages,
    activeTools,
    isStarted,
    handleStart,
    handleSendMessage,
    handleRemoveTool: removeActiveTools,
    dropRef,
    isDropping
  };
}