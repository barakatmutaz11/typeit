import { AITool, Message } from '../types';

export function validateTool(tool: AITool): boolean {
  return (
    typeof tool.id === 'string' &&
    typeof tool.name === 'string' &&
    typeof tool.description === 'string' &&
    typeof tool.provider === 'string' &&
    typeof tool.color === 'string' &&
    typeof tool.credits === 'object' &&
    typeof tool.credits.available === 'number' &&
    typeof tool.credits.used === 'number' &&
    typeof tool.credits.total === 'number' &&
    typeof tool.costPerRequest === 'number'
  );
}

export function validateMessage(message: Message): boolean {
  return (
    typeof message.id === 'string' &&
    typeof message.content === 'string' &&
    (message.sender === 'user' || message.sender === 'ai') &&
    message.timestamp instanceof Date &&
    (message.creditsUsed === undefined || typeof message.creditsUsed === 'number')
  );
}