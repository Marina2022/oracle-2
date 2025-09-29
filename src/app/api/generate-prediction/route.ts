import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}

export async function POST(request: NextRequest) {
  try {
    const { question, description } = await request.json();

    if (!question || !description) {
      return NextResponse.json({ error: 'Missing question or description' }, { status: 400 });
    }

    const prompt = `Ты — эксперт по прогнозам. Вопрос: "${question}". Описание: "${description}".
Дай ответ в формате JSON без дополнительных комментариев:
{
  "prediction": "ДА" или "НЕТ" или конкретный ответ (например, название команды),
  "confidence": число от 0 до 100,
  "sources": ["источник1", "источник2", "источник3"],
  "reasonings": [
    {"title": "Анализ данных", "text": "Описание анализа"},
    {"title": "Корреляционный анализ", "text": "Описание корреляции"},
    {"title": "Прогнозирование", "text": "Описание прогнозирования"}
  ],
  "detailedAnalysis": "Подробный анализ на основе данных",
  "resume": "Краткое заключение"
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://oracul.pro',
        'X-Title': 'Oracle AI Prediction Platform',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter error:', error);
      return NextResponse.json({ error: 'Failed to generate prediction' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'No content in response' }, { status: 500 });
    }

    // Try to parse JSON
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse JSON:', content);
      return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}