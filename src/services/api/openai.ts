import { API_ENDPOINTS, getHeaders } from './config';

export async function generateGPT4Response(prompt: string) {
  try {
    const response = await fetch(`${API_ENDPOINTS.OPENAI}/chat/completions`, {
      method: 'POST',
      headers: getHeaders('gpt-4'),
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('GPT-4 API error:', error);
    throw error;
  }
}

export async function generateDallEImage(prompt: string) {
  try {
    const response = await fetch(`${API_ENDPOINTS.OPENAI}/images/generations`, {
      method: 'POST',
      headers: getHeaders('dall-e'),
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '1024x1024',
        model: 'dall-e-3',
      }),
    });

    if (!response.ok) {
      throw new Error(`DALL-E API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('DALL-E API error:', error);
    throw error;
  }
}