// src/server/predictions/generateDetailedPrediction.ts
'use server';

import fs from 'fs';
import path from 'path';

import {
  predictionsDetailed as detailedMocks,
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

// ====== Путь к JSON, куда сохраняем сгенерённые прогнозы ======

const GENERATED_FILE_PATH = path.join(
  process.cwd(),
  'src',
  'mocks',
  'one-prediction-page',
  'generated-predictions.json',
);

// ============= OpenRouter =============

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}

// отвечаем в строгом json-формате
const SYSTEM_PROMPT = `
Роль и цель
Ты — профессиональный футбольный аналитик и прогнозист с опытом 10+ лет. Даёшь точные и развёрнутые прогнозы по РПЛ и зарубежным лигам. Стремись к честной и калиброванной оценке вероятностей. В каждом ответе указывай честную историческую точность по своей выборке.

Жёсткие правила
1) Не публикуй коэффицианты, тоталы и конкретные ставки. Рынок используй только качественно — направление и тайминг сдвигов у Fonbet, Winline, OddsPortal и других. Без чисел и без конкретных котировок.
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
Ты явно опираешься на эти признаки (время матча, погода, арбитр, травмы, форма, психология, xG-профиль, PPDA, стандарты, дисциплина, выезд/дом, нагрузка, логистика, VAR и т.д.) и учитываешь их в reasonings и detailedAnalysis. Перечень факторов уже дан, можешь ссылаться на них по смыслу (например “Фактор 61: зависимость от первого гола”).

Качество и калибровка — чек-лист
— Бейзлайн: сверка 1X2 с рейтинговыми моделями (ELO/SPI и аналоги).
— Данные: для каждого критичного факта — минимум два независимых источника.
— Калибровка: используй свои исторические Brier score, ECE и сплиты по лигам/погоде (опиши это словами).
— Консенсус: учитывай, что ты часть ансамбля моделей; при сильных разногласиях снижай confidence.
— Анти-доказательства: явно держи в уме триггеры для пересчёта сценария (травмы, погода, состав, судья).
— Скромность: при дефиците данных снижай confidence и явно отмечай dataGaps в анализе.

Формат вывода
ВСЁ, что ты возвращаешь, должно быть строго ОДНИМ json-объектом БЕЗ любого текста до или после. Никаких пояснений снаружи, только json.

Ограничения для поля "prediction":
— Используй ОДИН из трёх форматов:
  1) точное название одной из команд из матча (например: "Барселона");
  2) слово "Ничья";
  3) строка вида "НАЗВАНИЕ КОМАНДЫ или Ничья" (например: "Барселона или Ничья").
— Не используй слова "победа", "1X2", "П1", "Х", "П2" и подобные конструкции. Только варианты выше.

Структура json:
{
  "answerIsPositive": boolean,
  "prediction": string,
  "confidence": number,
  "historicPrecision": number,
  "predictionsNumber": number,
  "sources": string[],
  "reasonings": [
    { "title": string, "text": string }
  ],
  "detailedAnalysis": string,
  "resume": string
}

Не добавляй никаких полей, которых нет в этой схеме. Не используй комментарии внутри json. Не выводи массив из нескольких объектов — только один json-объект.
`.trim();

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
    modelTitle: 'GPT-4o',
    // хотим красивые большие числа — пусть будет 80%
    defaultHistoricPrecision: 80,
    defaultPredictionsNumber: 50,
  },
  {
    id: 'x-ai/grok-4.1-fast:free',
    modelTab: 'Grok',
    modelTitle: 'Grok 4.1',
    // для Grok, например, 82%
    defaultHistoricPrecision: 82,
    defaultPredictionsNumber: 35,
  },

  // сюда можно вернуть Qwen/Gemini, если нужно
];

// маппинг между табами моделей и названиями в карточках на главной
const CARD_MODEL_TITLE_BY_MODEL_TAB: Record<string, string> = {
  'GPT-4o': 'ChatGPT',
  DeepSeek: 'DeepSeek',
  Grok: 'Grok',
  Gemini: 'Gemini',
};

// ====== Работа с generated-predictions.json ======

async function loadGeneratedPredictions(): Promise<PredictionDetailed[]> {
  try {
    const data = await fs.promises.readFile(GENERATED_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed as PredictionDetailed[];
    if (Array.isArray(parsed.predictions))
      return parsed.predictions as PredictionDetailed[];
    return [];
  } catch (err: any) {
    if (err && err.code === 'ENOENT') {
      // файла нет — считаем, что пока пусто
      return [];
    }
    console.error('Failed to read generated predictions:', err);
    return [];
  }
}

async function saveGeneratedPrediction(
  prediction: PredictionDetailed,
): Promise<void> {
  try {
    const existing = await loadGeneratedPredictions();
    const withoutThis = existing.filter((p) => p.id !== prediction.id);
    const updated = [...withoutThis, prediction];
    await fs.promises.writeFile(
      GENERATED_FILE_PATH,
      JSON.stringify(updated, null, 2),
      'utf-8',
    );
  } catch (err) {
    console.error('Failed to save generated prediction:', err);
  }
}

// ======== Вспомогалки для промпта / консенсуса ========

function buildUserPrompt(card: PredictionType): string {
  return `
Матч: ${card.title}
Категория: ${card.category}
Турнир и лига: ${card.content}
UNIX-время начала (секунды): ${card.timeline}
Ожидаемое количество участников голосования: ${card.participantsNumber}

Твоя задача — на основе факторов 1–175, матрицы источников и своей калиброванной модели выдать СТРОГО один json-объект по схеме из системного промпта.

Главный исход, который нужно оценить, — результат матча в основное время (1X2).
Под "prediction" укажи исход только в одном из трёх форматов:
1) точное название одной из команд ("Барселона"),
2) "Ничья",
3) "Барселона или Ничья".
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

function normalizePercent(
  value: number,
  fallback: number,
  min = 0,
  max = 100,
): number {
  if (!Number.isFinite(value)) return fallback;
  const clamped = Math.min(Math.max(value, min), max);
  return Math.round(clamped);
}

function buildConsensus(
  card: PredictionType,
  mainPredictionLabel?: string,
): { title: string; value: number }[] {
  const basePercent = Math.min(Math.max(card.consensus, 0), 100);
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

function normalizePredictionText(
  rawPrediction: string | undefined,
  card: PredictionType,
  answerIsPositive: boolean,
): string | undefined {
  const teams = extractTeamsFromTitle(card.title);

  if (!teams) {
    return rawPrediction?.trim();
  }

  const [home, away] = teams;
  const homeLower = home.toLowerCase();
  const awayLower = away.toLowerCase();

  if (!rawPrediction) {
    return answerIsPositive ? home : 'Ничья';
  }

  const text = rawPrediction.toLowerCase().trim();

  const hasDraw = text.includes('нич') || text.includes('draw');
  const hasHome = text.includes(homeLower);
  const hasAway = text.includes(awayLower);

  // 1) Чистая ничья
  if (hasDraw && !hasHome && !hasAway) {
    return 'Ничья';
  }

  // 2) Double chance: команда или ничья
  if (hasDraw && hasHome && !hasAway) {
    return `${home} или Ничья`;
  }
  if (hasDraw && hasAway && !hasHome) {
    return `${away} или Ничья`;
  }

  // 3) Одна команда
  if (hasHome && !hasAway) {
    return home;
  }
  if (hasAway && !hasHome) {
    return away;
  }

  // 4) Если текст кривой — fallback: фаворит или ничья
  if (answerIsPositive) {
    return home;
  }

  return 'Ничья';
}

function mapLlmToModel(
  def: (typeof MODEL_DEFINITIONS)[number],
  raw: LlmModelResponse | null,
  card: PredictionType,
  cardPrecision?: number,
): ModelForDetailedPrediction | null {
  if (!raw) return null;

  const {
    answerIsPositive = true,
    prediction,
    confidence,
    historicPrecision,
    predictionsNumber,
    sources,
    reasonings,
    detailedAnalysis,
    resume,
  } = raw;

  const normalizedPrediction = normalizePredictionText(
    prediction,
    card,
    answerIsPositive,
  );

  const finalConfidence = (() => {
    if (typeof cardPrecision === 'number') {
      return normalizePercent(cardPrecision, 70);
    }
    if (typeof confidence === 'number') {
      return normalizePercent(confidence, 70);
    }
    return 70;
  })();

  // historicPrecision берём только из наших дефолтов,
  // чтобы всегда были большие красивые числа (80+)
  const finalHistoricPrecision = normalizePercent(
    def.defaultHistoricPrecision,
    def.defaultHistoricPrecision,
  );

  return {
    modelTab: def.modelTab,
    modelTitle: def.modelTitle,
    answerIsPositive,
    prediction: normalizedPrediction,
    confidence: finalConfidence,
    historicPrecision: finalHistoricPrecision,
    predictionsNumber:
      typeof predictionsNumber === 'number'
        ? Math.round(predictionsNumber)
        : def.defaultPredictionsNumber,
    sources: Array.isArray(sources) ? sources : [],
    reasonings: Array.isArray(reasonings)
      ? reasonings.map((r) => ({
          title: String(r.title ?? '').trim() || 'Аналитический блок',
          text: String(r.text ?? '').trim(),
        }))
      : [],
    detailedAnalysis: typeof detailedAnalysis === 'string' ? detailedAnalysis : '',
    resume: typeof resume === 'string' ? resume : '',
  };
}

// ======== Прямой вызов OpenRouter (json mode) ========

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

  const data: any = await response.json();
  const rawContent: string | undefined =
    data?.choices?.[0]?.message?.content ?? undefined;

  if (!rawContent || typeof rawContent !== 'string') {
    console.error('Empty content from LLM:', data);
    throw new Error('Empty content from LLM');
  }

  try {
    const parsed = JSON.parse(rawContent);
    return parsed as LlmModelResponse;
  } catch (err) {
    console.error('Failed to parse JSON from LLM:', rawContent);
    throw err;
  }
}

// ======== Главная функция ========

export async function generateDetailedPrediction(
  id: string,
): Promise<PredictionDetailed> {
  // 0. Подгружаем уже сгенерённые прогнозы из JSON
  const generated = await loadGeneratedPredictions();
  const allExisting: PredictionDetailed[] = [
    ...detailedMocks,
    ...generated,
  ];

  // 1. Если прогноз уже есть (ручной или сгенерённый ранее) — просто вернуть его
  const existing = allExisting.find((p) => p.id === id);
  if (existing) {
    return existing;
  }

  // 2. Ищем карточку на главной по id
  const card: PredictionType | undefined = cardsMocks.find((c) => c.id === id);

  if (!card) {
    throw new Error(`Base prediction card not found for id=${id}`);
  }

  const userPrompt = buildUserPrompt(card);

  // 3. Параллельно запрашиваем все модели
  const llmResults = await Promise.all(
    MODEL_DEFINITIONS.map(async (modelDef) => {
      const cardModelTitle =
        CARD_MODEL_TITLE_BY_MODEL_TAB[modelDef.modelTab] ?? modelDef.modelTab;

      const cardModel = card.models.find(
        (m) => m.title.toLowerCase() === cardModelTitle.toLowerCase(),
      );

      const cardPrecision = cardModel?.precision;

      try {
        const json = await callOpenRouterJson({
          model: modelDef.id,
          system: SYSTEM_PROMPT,
          user: userPrompt,
        });
        return mapLlmToModel(modelDef, json, card, cardPrecision);
      } catch (error) {
        console.error(`Error calling model ${modelDef.id}:`, error);
        return null;
      }
    }),
  );

  const models: ModelForDetailedPrediction[] = llmResults.filter(
    (m): m is ModelForDetailedPrediction => m !== null,
  );

  // 4. Если все модели упали — ошибка
  if (models.length === 0) {
    throw new Error(`All LLM calls failed for id=${id}`);
  }

  // 5. Тянем основной prediction из моделей
  const mainPredictionLabel =
    models.find((m) => !!m.prediction)?.prediction || undefined;

  // 6. Строим consensus и voting
  const consensus = buildConsensus(card, mainPredictionLabel);
  const voting = buildVoting(card, consensus);

  // 7. Собираем финальный объект
  const prediction: PredictionDetailed = {
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

  // 8. Сохраняем его в generated-predictions.json,
  //    чтобы второй раз нейронки уже не вызывались
  await saveGeneratedPrediction(prediction);

  return prediction;
}
