// src/server/predictions/generateDetailedPrediction.ts

import fs from 'fs/promises';
import path from 'path';

import {
  predictionsDetailed as manualDetailedMocks,
} from '@/mocks/one-prediction-page/new-predictions-detailed';

import {
  predictions as cardsMocks,
} from '@/mocks/home-page/predictions';

import type {
  PredictionType,
  PredictionDetailed,
  ModelForDetailedPrediction,
  Voting,
} from '@/types/predictionTypes';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}

// Путь к файлу кэша автосгенерированных прогнозов
const GENERATED_PREDICTIONS_PATH = path.join(
  process.cwd(),
  'src',
  'mocks',
  'one-prediction-page',
  'generated-predictions.json',
);

// ============= Вспомогалки по файлу-кэшу =============

async function loadGeneratedPredictions(): Promise<PredictionDetailed[]> {
  try {
    const raw = await fs.readFile(GENERATED_PREDICTIONS_PATH, 'utf8');
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw) as PredictionDetailed[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    // если файла нет или он битый — начинаем с пустого списка
    return [];
  }
}

async function saveGeneratedPredictions(
  list: PredictionDetailed[],
): Promise<void> {
  const json = JSON.stringify(list, null, 2);
  await fs.writeFile(GENERATED_PREDICTIONS_PATH, json, 'utf8');
}

// ============= Системный промпт =============

const SYSTEM_PROMPT = `
Роль и цель
Ты — профессиональный футбольный аналитик и прогнозист с опытом 10+ лет. Даёшь точные и развёрнутые прогнозы по РПЛ и зарубежным лигам. Стремись к честной и калиброванной оценке вероятностей. В каждом ответе указывай честную историческую точность по своей выборке.

Жёсткие правила
1) Не публикуй коэффициенты, тоталы и конкретные ставки. Рынок используй только качественно — направление и тайминг сдвигов у Fonbet, Winline, OddsPortal и других агрегаторов вроде oddsportal.com/football. Без чисел и без конкретных котировок.
2) Каждый критичный факт проверяй минимум по нескольким независимым типам источников. В ответе показывай только типы источников, без ссылок и без конкретных доменов.
3) Анализируй строго по базе факторов 1–108 и расширению 109–175. Если данных по важному фактору нет, понижай confidence и явно указывай, чего не хватает, через dataGaps (в тексте анализа).
4) Калибруй вероятности: бейзлайн рейтингов (ELO/SPI и аналоги), проверка калибровки (Brier, ECE на своей исторической выборке), консенсус нескольких моделей. При разногласиях между моделями — штраф уверенности.
5) Движение линий учитывай как качественный сигнал и триггер пересчёта сценариев. Числа и конкретные коэффициенты не публикуй.
6) Краткость и точность. Никаких ссылок, эмодзи, лишних оговорок и “воды”. Тон — профессиональный, спокойный, аналитический.

Матрица источников (типы, на которые ты опираешься)
— Официальные лиги и федерации: календарь, протоколы, судьи, дисциплина.
— Официальные сайты клубов: заявки, пресс-брифинги, отчёты о поле и стадионе.
— Статистические платформы: Opta/StatsPerform, Wyscout, InStat и аналоги (xG/xA, PPDA, OBV, трекинг и т.п.).
— Матч-центры: SofaScore, FotMob, Flashscore и аналоги (форма, H2H, интервалы, тайминги).
— Профили арбитров и VAR: национальные и международные базы по судьям (стиль, карточки, пенальти).
— Новости травм и дисциплины: клубные медиа, локальные спортивные издания, официальные репорты.
— Погодные и стадионные отчёты: нац. метеоагентства, информация стадиона.
— Трекинг и нагрузки: послематчевые сводки, спринты, high-intensity runs, данные по пробегу.
— Видеоразборы: клуб-TV, аналитические медиа, скаут-блоги, тактические обзоры.
— Рынок (качественно): время и направление сдвигов линий, реакции рынка. Без публикации чисел.

Фильтры шума:
— Анонимные инсайды без второго независимого источника и без внятного таймстампа — игнорировать.
— Слухи без подтверждения несколькими типами источников — учитывать только как фон, не как основу прогноза.

База факторов 1–108 и расширение 109–175
Ты явно опираешься на эти признаки (время матча, погода, арбитр, травмы, форма, психология, xG-профиль, PPDA, стандарты, дисциплина, выезд/дом, нагрузка, логистика, VAR и т.д.) и учитываешь их в reasonings и detailedAnalysis. Можешь ссылаться на факторы по смыслу («Фактор 61: зависимость от первого гола» и т.п.).

Формат вывода (обязательно слово "json" здесь для провайдеров)
ВСЁ, что ты возвращаешь, должно быть строго ОДНИМ json-объектом БЕЗ любого текста до или после. Никаких пояснений снаружи, только json.

Структура json:
{
  "answerIsPositive": boolean,            // true — если ты поддерживаешь базовый фаворитный исход, иначе false
  "prediction": string,                   // КОРОТКИЙ текст исхода: либо название команды, либо "Ничья", либо "<команда> или Ничья"
  "confidence": number,                   // уверенность в процентах 0–100, калиброванная
  "historicPrecision": number,            // честная историческая точность твоих прогнозов по похожим матчам (0–100)
  "predictionsNumber": number,            // примерный размер выборки (число матчей в ретроспективе)
  "sources": string[],                    // список типов источников, без ссылок и доменов
  "reasonings": [                         // структурированные блоки объяснений
    { "title": string, "text": string }
  ],
  "detailedAnalysis": string,             // связный развёрнутый текстовый анализ матча, можно использовать несколько абзацев
  "resume": string                        // краткое резюме прогноза, 3–6 предложений
}

Не добавляй никаких полей, которых нет в этой схеме. Не используй комментарии внутри json. Не выводи массив из нескольких объектов — только один json-объект.
`.trim();

// ============= Тип ответа от LLM =============

type LlmModelResponse = {
  answerIsPositive?: boolean;
  prediction?: string;
  confidence?: number;
  historicPrecision?: number;
  predictionsNumber?: number;
  sources?: string[];
  reasonings?: { title: string; text: string }[];
  detailedAnalysis?: string;
  resume?: string;
};

const MODEL_DEFINITIONS: {
  id: string;
  modelTab: string;
  modelTitle: string;
  defaultHistoricPrecision: number;
  defaultPredictionsNumber: number;
}[] = [
  {
    id: 'openai/gpt-4o-mini',
    modelTab: 'GPT-4o',
    modelTitle: 'ChatGPT',
    defaultHistoricPrecision: 78,
    defaultPredictionsNumber: 80,
  },
  {
    id: 'x-ai/grok-4.1-fast:free',
    modelTab: 'Grok',
    modelTitle: 'Grok',
    defaultHistoricPrecision: 82,
    defaultPredictionsNumber: 60,
  },
  // DeepSeek и Gemini можно позже вернуть сюда, когда будут стабильные лимиты
];

// ============= Утилиты =============

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function buildUserPrompt(card: PredictionType): string {
  return `
Матч: ${card.title}
Категория: ${card.category}
Турнир и лига: ${card.content}
UNIX-время начала (секунды): ${card.timeline}
Ожидаемое количество участников голосования: ${card.participantsNumber}

Твоя задача — на основе факторов 1–175, матрицы источников и своей калиброванной модели выдать СТРОГО один json-объект по схеме из системного промпта.

Главный исход, который нужно оценить, — результат матча в основное время (1X2).

Поле "prediction":
— пиши коротко и без пояснений;
— один из вариантов:
  1) просто НАЗВАНИЕ команды (например: "Барселона");
  2) "Ничья";
  3) "<команда> или Ничья" (например: "Барселона или Ничья").
`.trim();
}

function extractTeamsFromTitle(title: string): [string, string] | null {
  const parts = title.split('—');
  if (parts.length < 2) return null;

  const leftRaw = parts[0].trim();
  const rightRaw = parts.slice(1).join('—').trim();

  const rightClean = rightRaw.replace(/\d{1,2}\.\d{1,2}\.\d{2,4}/g, '').trim();

  const home = leftRaw;
  const away = rightClean || rightRaw;

  if (!home || !away) return null;
  return [home, away];
}

function normalizePredictionText(
  rawPrediction: string | undefined,
  title: string,
): string {
  const trimmed = (rawPrediction ?? '').trim();
  const teams = extractTeamsFromTitle(title);

  if (!teams) {
    if (!trimmed) return 'Ничья';
    return trimmed;
  }

  const [home, away] = teams;

  const lower = trimmed.toLowerCase();
  const homeLower = home.toLowerCase();
  const awayLower = away.toLowerCase();

  const mentionsDraw =
    lower.includes('нич') || lower.includes('draw') || lower === 'x';

  const mentionsHome =
    lower.includes(homeLower) ||
    homeLower.split(' ').some((part) => part.length > 3 && lower.includes(part));

  const mentionsAway =
    lower.includes(awayLower) ||
    awayLower.split(' ').some((part) => part.length > 3 && lower.includes(part));

  if (!trimmed) {
    return home;
  }

  if (mentionsDraw && !mentionsHome && !mentionsAway) {
    return 'Ничья';
  }

  if (mentionsDraw && mentionsHome && !mentionsAway) {
    return `${home} или Ничья`;
  }

  if (mentionsDraw && mentionsAway && !mentionsHome) {
    return `${away} или Ничья`;
  }

  if (mentionsHome && !mentionsAway) {
    return home;
  }

  if (mentionsAway && !mentionsHome) {
    return away;
  }

  return trimmed;
}

function buildConsensus(
  card: PredictionType,
  mainPredictionLabel?: string,
): { title: string; value: number }[] {
  const basePercent = clamp(card.consensus, 0, 100);
  const teams = extractTeamsFromTitle(card.title);

  if (!teams) {
    return [
      { title: mainPredictionLabel || 'Фаворит', value: basePercent },
      { title: 'Альтернативный исход', value: 100 - basePercent },
    ];
  }

  const [home, away] = teams;
  const tail = 100 - basePercent;
  const drawShare = Math.round(tail * 0.3);
  const awayShare = tail - drawShare;

  return [
    { title: home, value: basePercent },
    { title: away, value: awayShare },
    { title: 'Ничья', value: drawShare },
  ];
}

function buildVoting(
  card: PredictionType,
  consensus: { title: string; value: number }[],
): Voting {
  const sorted = [...consensus].sort((a, b) => b.value - a.value);
  const top1 = sorted[0];
  const top2 = sorted[1] || sorted[0];

  const totalPeople = Math.max(card.participantsNumber, 1);
  const people1 = Math.round((totalPeople * top1.value) / 100);
  const people2 = totalPeople - people1;

  const voting: Voting = [
    {
      label: top1.title,
      percent: top1.value,
      peopleNumber: people1,
    },
    {
      label: top2.title,
      percent: top2.value,
      peopleNumber: people2,
    },
  ];

  return voting;
}

// ============= Вызов OpenRouter в json-режиме =============

interface OpenRouterChoiceMessage {
  content?: string;
}

interface OpenRouterChoice {
  message?: OpenRouterChoiceMessage;
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
}

async function callOpenRouterJson(params: {
  model: string;
  system: string;
  user: string;
}): Promise<LlmModelResponse> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://oracul.app',
      'X-Title': 'Oracul Predictions',
    },
    body: JSON.stringify({
      model: params.model,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: params.system },
        { role: 'user', content: params.user },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('OpenRouter error:', response.status, text);
    throw new Error(`OpenRouter request failed: ${response.status}`);
  }

  const data = (await response.json()) as OpenRouterResponse;
  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent || typeof rawContent !== 'string') {
    console.error('Empty content from LLM:', data);
    throw new Error('Empty content from LLM');
  }

  const parsed = JSON.parse(rawContent) as LlmModelResponse;
  return parsed;
}

// ============= Маппинг ответа модели к нашему типу =============

function mapLlmToModel(
  def: (typeof MODEL_DEFINITIONS)[number],
  card: PredictionType,
  raw: LlmModelResponse | null,
): ModelForDetailedPrediction | null {
  if (!raw) return null;

  const {
    answerIsPositive = true,
    prediction,
    confidence,
    predictionsNumber,
    sources,
    reasonings,
    detailedAnalysis,
    resume,
  } = raw;

  const cardModel = card.models.find((m) => {
    const titleLower = m.title.toLowerCase();
    const tabLower = def.modelTab.toLowerCase();
    const nameLower = def.modelTitle.toLowerCase();

    return (
      titleLower.includes(tabLower) ||
      tabLower.includes(titleLower) ||
      titleLower.includes(nameLower) ||
      nameLower.includes(titleLower)
    );
  });

  const basePrecisionFromCard = cardModel?.precision;

  const normalizedRawConfidence =
    typeof confidence === 'number'
      ? confidence <= 1
        ? confidence * 100
        : confidence
      : undefined;

  const finalConfidenceSource =
    basePrecisionFromCard ?? normalizedRawConfidence ?? def.defaultHistoricPrecision;

  const finalConfidence = clamp(Math.round(finalConfidenceSource), 55, 99);

  const historicBase = basePrecisionFromCard ?? def.defaultHistoricPrecision;
  const finalHistoricPrecision = clamp(historicBase + 5, 65, 95);

  const finalPrediction = normalizePredictionText(prediction, card.title);

  return {
    modelTab: def.modelTab,
    modelTitle: def.modelTitle,
    answerIsPositive,
    prediction: finalPrediction,
    confidence: finalConfidence,
    historicPrecision: finalHistoricPrecision,
    predictionsNumber:
      typeof predictionsNumber === 'number'
        ? Math.max(10, Math.round(predictionsNumber))
        : def.defaultPredictionsNumber,
    sources: Array.isArray(sources) ? sources : [],
    reasonings: Array.isArray(reasonings)
      ? reasonings.map((r) => ({
          title: String(r.title ?? '').trim() || 'Аналитический блок',
          text: String(r.text ?? '').trim(),
        }))
      : [],
    detailedAnalysis:
      typeof detailedAnalysis === 'string' ? detailedAnalysis : '',
    resume: typeof resume === 'string' ? resume : '',
  };
}

// ============= Главная функция =============

export async function generateDetailedPrediction(
  id: string,
): Promise<PredictionDetailed> {
  // 0. Если есть ручной детальный мок — просто возвращаем его и ничего не вызываем
  const manual = manualDetailedMocks.find((p) => p.id === id);
  if (manual) {
    return manual;
  }

  // 1. Пробуем найти уже сгенерированный прогноз в кэше
  const generatedList = await loadGeneratedPredictions();
  const cached = generatedList.find((p) => p.id === id);
  if (cached) {
    return cached;
  }

  // 2. Ищем карточку на главной по id
  const card: PredictionType | undefined = cardsMocks.find((c) => c.id === id);

  if (!card) {
    throw new Error(`Base card prediction not found for id=${id}`);
  }

  const userPrompt = buildUserPrompt(card);

  // 3. Параллельно запрашиваем все модели
  const llmResults = await Promise.all(
    MODEL_DEFINITIONS.map(async (modelDef) => {
      try {
        const json = await callOpenRouterJson({
          model: modelDef.id,
          system: SYSTEM_PROMPT,
          user: userPrompt,
        });
        return mapLlmToModel(modelDef, card, json);
      } catch (error) {
        console.error(`Error calling model ${modelDef.id}:`, error);
        return null;
      }
    }),
  );

  const models: ModelForDetailedPrediction[] = llmResults.filter(
    (m): m is ModelForDetailedPrediction => m !== null,
  );

  // 4. Если все модели упали — нечего сохранять, просто ошибка
  if (models.length === 0) {
    throw new Error(`All LLM calls failed for id=${id}`);
  }

  const mainPredictionLabel =
    models.find((m) => !!m.prediction)?.prediction || undefined;

  const consensus = buildConsensus(card, mainPredictionLabel);
  const voting = buildVoting(card, consensus);

  const newPrediction: PredictionDetailed = {
    id,
    category: card.category,
    title: card.title,
    description:
      'Анализ от AI-моделей ' +
      MODEL_DEFINITIONS.map((m) => m.modelTitle).join(' | '),
    timeline: card.timeline,
    participantsNumber: card.participantsNumber,
    consensus,
    models,
    voting,
    comments: [],
    result: null,
  };

  // 5. Пишем в кэш (generated-predictions.json), но не ломаем ответ, если запись не удалась
  try {
    const updatedList = [...generatedList.filter((p) => p.id !== id), newPrediction];
    await saveGeneratedPredictions(updatedList);
  } catch (err) {
    console.error('Failed to save generated prediction to file:', err);
  }

  return newPrediction;
}
