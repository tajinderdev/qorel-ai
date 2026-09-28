import { AIProvider } from './types';
import { MockAIProvider } from './mock-provider';
import { GeminiProvider } from './gemini-provider';
import { OpenAIProvider } from './openai-provider';

export function getAIProvider(): AIProvider {
  const providerType = process.env.DEFAULT_AI_PROVIDER || 'mock';

  if (providerType === 'gemini' && process.env.GEMINI_API_KEY) {
    return new GeminiProvider();
  }
  if (providerType === 'openai' && process.env.OPENAI_API_KEY) {
    return new OpenAIProvider();
  }
  return new MockAIProvider();
}
