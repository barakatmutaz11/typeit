import { API_ENDPOINTS, getHeaders } from './config';

export async function generateMidjourneyImage(prompt: string) {
  try {
    const response = await fetch(`${API_ENDPOINTS.MIDJOURNEY}/imagine`, {
      method: 'POST',
      headers: getHeaders('midjourney'),
      body: JSON.stringify({
        prompt,
        version: 'v6',
        quality: 'max',
      }),
    });

    if (!response.ok) {
      throw new Error(`Midjourney API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Midjourney API error:', error);
    throw error;
  }
}