// src/server/llm/openrouter.ts

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}

export type SupportedModelId =
  | 'openai/gpt-4o-mini'
  | 'qwen/qwen3-235b-a22b:free'
  | 'x-ai/grok-4.1-fast:free'
  | 'google/gemini-2.0-flash-exp:free';

export const MODEL_DISPLAY: Record<
  SupportedModelId,
  { modelTab: string; modelTitle: string }
> = {
  'openai/gpt-4o-mini': {
    modelTab: 'GPT-4o',
    modelTitle: 'GPT-4o (ChatGPT)',
  },
  'qwen/qwen3-235b-a22b:free': {
    modelTab: 'DeepSeek',
    modelTitle: 'DeepSeek',
  },
  'x-ai/grok-4.1-fast:free': {
    modelTab: 'Grok',
    modelTitle: 'Grok',
  },
  'google/gemini-2.0-flash-exp:free': {
    modelTab: 'Gemini',
    modelTitle: 'Gemini',
  },
};

// Общий вызов OpenRouter, который возвращает JSON
export async function callModelJson<T>(params: {
  model: SupportedModelId;
  systemPrompt: string;
  userPrompt: string;
}): Promise<T> {
  const { model, systemPrompt, userPrompt } = params;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      // Необязательно, но полезно для OpenRouter:
      'HTTP-Referer': 'https://oracul.app',
      'X-Title': 'Oracul Predictions',
    },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      temperature: 0.4,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('OpenRouter error:', response.status, text);
    throw new Error(`OpenRouter request failed: ${response.status}`);
  }

  const data: any = await response.json();
  let content: string | undefined = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response content from OpenRouter');
  }

  // Иногда модели возвращают ```json ...```
  let cleaned = content.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json/i, '');
    cleaned = cleaned.replace(/^```/, '');
    cleaned = cleaned.replace(/```$/, '');
    cleaned = cleaned.trim();
  }

  try {
    return JSON.parse(cleaned) as T;
  } catch (e) {
    console.error('Failed to parse JSON from model:', cleaned);
    throw new Error('Invalid JSON from OpenRouter model');
  }
}