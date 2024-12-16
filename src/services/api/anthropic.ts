import { API_ENDPOINTS, getHeaders } from './config';

export async function generateClaudeResponse(prompt: string) {
  try {
    const response = await fetch(`${API_ENDPOINTS.ANTHROPIC}/messages`, {
      method: 'POST',
      headers: getHeaders('claude'),
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}