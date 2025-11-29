// src/server/llm/openrouter.ts

// Общий лёгкий клиент для OpenRouter, без any и с типами

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}

export type OpenRouterRole = 'system' | 'user' | 'assistant' | 'tool';

export interface OpenRouterMessage {
  role: OpenRouterRole;
  content: string;
}

export interface OpenRouterChoiceMessage {
  role: 'assistant' | 'tool' | 'user' | 'system';
  content?: string;
}

export interface OpenRouterChoice {
  index: number;
  message: OpenRouterChoiceMessage;
}

export interface OpenRouterChatCompletionResponse {
  id: string;
  choices: OpenRouterChoice[];
}

/**
 * Универсальный вызов OpenRouter в chat-режиме.
 * Возвращает сырой ответ, дальше уже вызывающий код сам парсит content.
 */
export async function callModelJson(params: {
  model: string;
  messages: OpenRouterMessage[];
  responseFormat?: { type: 'json_object' };
}): Promise<OpenRouterChatCompletionResponse> {
  const { model, messages, responseFormat } = params;

  const body: Record<string, unknown> = {
    model,
    messages,
  };

  if (responseFormat) {
    body.response_format = responseFormat;
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('OpenRouter error:', response.status, text);
    throw new Error(`OpenRouter request failed: ${response.status}`);
  }

  const data = (await response.json()) as OpenRouterChatCompletionResponse;
  return data;
}
