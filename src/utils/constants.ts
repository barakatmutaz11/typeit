export const CREDITS = {
  MIN_PURCHASE: 100,
  MAX_PURCHASE: 10000,
  BULK_DISCOUNT_THRESHOLD: 1000,
  BULK_DISCOUNT_PERCENTAGE: 10
} as const;

export const CATEGORIES = {
  LANGUAGE: 'language',
  IMAGE: 'image',
  CODE: 'code',
  AUDIO: 'audio',
  VIDEO: 'video',
  RESEARCH: 'research',
  SECURITY: 'security'
} as const;

export const PROVIDERS = {
  OPENAI: 'OpenAI',
  ANTHROPIC: 'Anthropic',
  GOOGLE: 'Google',
  MICROSOFT: 'Microsoft',
  MIDJOURNEY: 'Midjourney',
  STABILITY: 'Stability AI'
} as const;