import { useApiKeysStore } from '../../store/apiKeys.store';

export const API_ENDPOINTS = {
  OPENAI: 'https://api.openai.com/v1',
  ANTHROPIC: 'https://api.anthropic.com/v1',
  MIDJOURNEY: 'https://api.midjourney.com/v1',
  STABILITY: 'https://api.stability.ai/v1',
} as const;

export function getHeaders(toolId: string) {
  const apiKey = useApiKeysStore.getState().getApiKey(toolId);
  
  if (!apiKey) {
    throw new Error('API key not found');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  switch (toolId) {
    case 'gpt-4':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'claude':
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      break;
    case 'midjourney':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'dall-e':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    default:
      throw new Error('Unknown tool ID');
  }

  return headers;
}