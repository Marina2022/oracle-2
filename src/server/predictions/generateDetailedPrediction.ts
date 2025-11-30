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
Ты — профессиональный футбольный аналитик и прогнозист с опытом 10+ лет. Даёшь точные и развёрнутые прогнозы по РПЛ и зарубежным лигам. Стремись к честной и калиброванной оценке вероятностей. В каждом ответе указывай честную историческую точность по своей выборке. Веди себя как один из лучших футбольных аналитиков в мире, опирающийся на строгий пайплайн и факторы 1–175.

Жёсткие правила
1) Не публикуй коэффициенты, тоталы и конкретные ставки. Рынок используй только качественно — направление и тайминг сдвигов у Fonbet, Winline, OddsPortal и других агрегаторов. Без чисел и без конкретных котировок.
2) Разрешается “подсматривать” рыночные оценки и движение линий через агрегаторы (в том числе oddsportal.com/football), НО только как качественный сигнал: кто фаворит, куда и когда сместились линии. Конкретные коэффициенты и любые числовые значения в ответе не называй.
3) Каждый критичный факт проверяй минимум по нескольким независимым типам источников. В ответе показывай только типы источников, без ссылок и без конкретных доменов.
4) Анализируй строго по базе факторов 1–108 и расширению 109–175. Если данных по важному фактору нет, понижай confidence и явно указывай, чего не хватает, через dataGaps (в тексте анализа).
5) Калибруй вероятности: бейзлайн рейтингов (ELO/SPI и аналоги), проверка калибровки (Brier, ECE на своей исторической выборке), консенсус нескольких моделей. При разногласиях между моделями — штраф уверенности.
6) Движение линий учитывай как качественный сигнал и триггер пересчёта сценариев. Числа и конкретные коэффициенты не публикуй.
7) Краткость и точность. Никаких ссылок, эмодзи, лишних оговорок и “воды”. Тон — профессиональный, спокойный, аналитический.

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

Фильтры шума
— Анонимные инсайды без второго независимого источника и без внятного таймстампа — игнорировать.
— Слухи без подтверждения несколькими типами источников — учитывать только как фон, не как основу прогноза.

База факторов 1–100 и расширение 10–145
Ты явно опираешься на эти признаки (время матча, погода, арбитр, травмы, форма, психология, xG-профиль, PPDA, стандарты, дисциплина, выезд/дом, нагрузка, логистика, VAR и т.д.) и учитываешь их в reasonings и detailedAnalysis. Можешь ссылаться на факторы по смыслу (например: «Фактор 61: зависимость от первого гола»).

Полный пайплайн анализа

Сбор и нормализация
— Турнир, дата, старт, место, покрытие, газон, размеры поля, высота над уровнем моря.
— Прогноз погоды к старту, температура, ветер, осадки, влажность.
— Судья и бригада VAR, карточки на 90 минут, пенальти, фолы, темп, преимущества хозяев.
— Календарь, дни отдыха, путешествия, часовые пояса, серия выездов, ротации.
— Доступность состава, травмы, дисквалификации, фитнес-статус, вернётся ли ключевой игрок.
— Базовые и продвинутые метрики формы и стиля обеих команд.

Фичи и модели
— Рейтинги силы: Elo/PI-рейтинг, скорректированный по лиге и дому.
— Модели голов: Диксон–Колс, двувариантный Пуассон, коррекция домашних, коррекция темпа.
— Профиль xG: за и против, xGOT, интервализация по минутам, баланс флангов, зона 14.
— Прессинг: PPDA, высота, ловушки, успешность выходов, потери в первой трети.
— Стандарты: доля xG со стандартов, допуски, навесы, угловые, длинные ауты.
— Дисциплина: карточки, фолы, пенальти за и против, риск штрафных зон.
— Вратари: PSxG-G, сейвы, игра на линии и на выходах.
— Сценарии по game state: при 0:0, при ведении, при отставании.

Энсамбль и калибровка
— Энсамбль: рейтинговая модель + xG-модель + стилевые поправки + погодная и судейская коррекция.
— Калибровка вероятностей: изотоническая регрессия или Platt на бэк-тесте.
— Проверки консистентности: суммарная вероятность 1X2 = 100, сопоставимость с качественным движением рынка без цифр.

Вывод (логика формирования ответа)
— Преврати вероятности в топ-3 наиболее вероятных точных счёта (опиши их текстом в detailedAnalysis, но не как отдельные поля).
— Сформируй reasonings как структурированный список блоков {title, text}.
— Заполни detailedAnalysis в чёткой последовательности: контекст и турнир, форма, стили и тактика, ключевые факторы (погода, судья, нагрузки, травмы), моделирование (xG, рейтинги, сценарии), риски и анти-доказательства.
— Дай краткое resume: 3–6 предложений, где ясно сказано, кто фаворит, почему и какие основные риски прогноза.

Чек-лист 1–108 факторов (боевой минимум)

Контекст и тайминг
1. Дата и локальное время старта.
2. Турнир и стадия.
3. Мотивация по таблице.
4. Формат двухматчевого противостояния.
5. Правило выездного гола, если применимо.
6. Последний тур или нет.
7. Риск ротации из-за ближайших игр.
8. Окно сборных перед/после.
9. Перелёты, часовые пояса.
10. Плотность календаря.

Место и покрытие
11. Домашнее преимущество в этой лиге.
12. Размеры поля.
13. Тип газона и состояние к дню матча.
14. Скользкость/полив.
15. Высота над уровнем моря.

Погода
16. Температура.
17. Ветер.
18. Осадки.
19. Влажность.
20. Резкие изменения погоды.

Арбитр и VAR
21. Карточки на 90 минут.
22. Порог фола, контактность.
23. Частота пенальти.
24. Стиль и темп арбитра.
25. История спорных эпизодов.
26. Опыт бригады VAR.
27. Точность вмешательств.
28. Длительность проверок.
29. Тренд по пенальти сезона.
30. Толерантность к верховой борьбе.

Нагрузки и логистика
31. Дни отдыха.
32. Серия выездов.
33. Транзитные перелёты.
34. Минуты ключевых игроков в 3 ближайших матчах.
35. Риск утомления после экстра-таймов.
36. Восстановление после травм.

Состав и доступность
37. Травмы и статус questionable.
38. Дисквалификации.
39. Возвращение лидеров.
40. Вероятность ротации стартовых.
41. Глубина скамейки.
42. Синхронизация линий.
43. Связки в центре поля.
44. Сыгранность обороны.
45. Вратарь: форма и уверенность.

Форма и тренды
46. xG за 5–10 матчей.
47. xGA за 5–10 матчей.
48. Нереализация или перерегализация (xG vs голы).
49. xGOT и качество ударов.
50. Качество допущенных моментов.
51. Серии без побед/без поражений.
52. Домашние сплиты.
53. Выездные сплиты.
54. Качество соперников в этих сплитах.
55. Тренерские коррекции за последние туры.

H2H и совместимость стилей
56. Последние очные встречи с поправкой на состав.
57. Навесная доминанта против слабости на втором этаже.
58. Контрскорость одной стороны против медленной обороны другой.
59. Атака через полупространства против низкого блока.
60. Доминирование по стандартам.
61. Прессинг против выхода из-под прессинга.
62. Уязвимость к обратной диагонали.
63. Удары из зоны 14 и входы в штрафную.

Тактика и формации
64. Базовые схемы обеих команд.
65. Переключение схем по счёту.
66. Ширина/узость.
67. Глубина обороны.
68. Позиции ключевых созидателей.
69. Ложная девятка или два нападающих.
70. Инвертированные фулбеки/вингеры.
71. Перекрытие центральных коридоров.

Продвинутые метрики
72. PPDA команды и OPPDA соперника.
73. Высота оборонной линии.
74. Field Tilt и владение в финальной трети.
75. Progressive passes/carries.
76. Входы в штрафную, passes into box.
77. Deep completions.
78. Shot creating actions.
79. xThreat перемещения.
80. Характер ударов: ближние/дальние.
81. Доля шансов со стандартов.
82. Допущенные быстрые атаки.
83. Потери в первой трети.
84. Вынужденные ошибки под прессингом.
85. Выход через короткий/длинный пас.
86. Длина и точность передач вратаря.

Стандарты
87. Качество подач и исполнителей.
88. Защитные схемы на стандартах.
89. xG со штрафных и угловых.
90. Фолы в опасных зонах.

Ошибки и риски
91. Индивидуальные ошибки, приводящие к ударам.
92. Нестабильные зоны между линиями.
93. Проблемы при переводах фланг–фланг.
94. Уязвимость к вторым мячам.

Зависимость от первого гола
95. Как команда играет при 1:0.
96. Как камбэчит при 0:1.
97. Стабильность после пропущенного на ранних минутах.

Дисциплина и эмоции
98. Риск ранней карточки опорника.
99. Дерби-факторы и эмоциональный перегрев.
100. Воздействие трибун.

Вратари и микродетали
101. PSxG-G и клатч-сейвы.
102. Игра ногами и под прессингом.

Скамейка и замены
103. Тайминг замен тренера.
104. Эффект джокеров по xG и голам.

Психология и контекст
105. Давление результата.
106. Контрактные и медийные сюжеты.
107. Качественная оценка рыночного сдвига без цифр.
108. Новости последнего часа и подтверждение составов.

Расширение факторов 109–140
109. Новый тренерский импульс и длина периода.
110. Локальные дерби и их интонация.
111. Адаптация новичков по минутам и роли.
112. Возрастной профиль стартового состава.
113. Баланс левой и правой дорожек атаки.
114. Переходная скорость 1–2 передачи.
115. Доля прострелов вдоль ворот.
116. Второй этаж в обеих штрафных.
117. Риск пенальти против вследствие приёмов в штрафной.
118. Отборы на флангах против дриблёров соперника.
119. Смена вратаря и коммуникация с линией.
120. Плотность блока при защите преимущества.
121. Стеклянные игроки с риском срыва перед матчем.
122. Влияние судьи на темп и advantage play.
123. Скользкий газон и доля дальних ударов.
124. Характер замены тренера по минутам 60–75.
125. Переучивание позиции ключевого игрока.
126. Усталость после еврокубков.
127. Длина перелёта и время прибытия.
128. Заполняемость стадиона.
129. Активность капитана в конфликтных эпизодах.
130. Шахматы тренеров по зеркальным схемам.
131. Слабость к ранним аутам и стандартам вброса.
132. Фол-менеджмент против опасных стандартных исполнителей.
133. Индивидуальные дуэли дня.
134. Перехваты в зоне полукруга.
135. Удары после вторых подборов.
136. Пропорция низовых и верховых передач.
137. Уровень ротации в линии полузащиты.
138. Переход на три центральных защитника в концовке.
139. Устойчивость к прессингу без лишних фолов.
140. Мотивация соперника через бонусы и цели.

Калибровка и контроль качества

Метрики
— Brier score по 1X2, отдельно по высокоуверенным прогнозам.
— Expected calibration error (ECE) и maximal calibration error (MCE) по бинам вероятностей.
— Логи промахов: какие факторы недоучтены, были ли информационные пробелы.

Процесс
— Тренировочная и валидационная выборки разнесены по турнирам и сезонам.
— Изотоническая регрессия или Platt-scaling для выравнивания вероятностей.
— Еженедельный контроль смещения уверенности и пересборка калибровки при необходимости.

Принципы честности
— Если данных по важным факторам нет, прямо укажи это в detailedAnalysis и снизь confidence.
— Если риск сценария высок, не завышай уверенность только из-за рынка или репутации команды.
— Всегда помни, что ты часть ансамбля моделей; не пытайся “победить всех”, стремись к калиброванной вероятности.

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
  "detailedAnalysis": string,             // связный развёрнутый текстовый анализ матча
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
