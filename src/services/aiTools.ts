import { AITool } from '../types';
import { generateGPT4Response, generateDallEImage } from './api/openai';
import { generateClaudeResponse } from './api/anthropic';
import { generateMidjourneyImage } from './api/midjourney';

export async function processWithAITool(tool: AITool, message: string): Promise<string> {
  try {
    switch (tool.id) {
      case 'gpt-4':
        return await generateGPT4Response(message);
      
      case 'claude':
        return await generateClaudeResponse(message);
      
      case 'midjourney': {
        const imageUrl = await generateMidjourneyImage(message);
        return `Generated image: ${imageUrl}`;
      }
      
      case 'dall-e': {
        const imageUrl = await generateDallEImage(message);
        return `Generated image: ${imageUrl}`;
      }
      
      default:
        throw new Error(`Unsupported tool: ${tool.id}`);
    }
  } catch (error) {
    console.error(`Error processing with ${tool.name}:`, error);
    throw error;
  }
}