'use client'

import React, { useState, useEffect } from 'react';
import TopBar from '@/components/predictionPage/1-top-bar/TopBar';
import YourPrediction from "@/components/predictionPage/2-your-prediction/YourPrediction";
import {predictionDetailed} from "@/mocks/one-prediction-page/prediction-detailed";
import Analysis from "@/components/predictionPage/3-analysis/Analysis";
import CommentsBlock from "@/components/predictionPage/3-analysis/comments/CommentsBlock";
import ChartsAll from "@/components/predictionPage/4-charts/ChartsAll";

const Page = () => {
  const [predictionData, setPredictionData] = useState(predictionDetailed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePrediction = async () => {
      try {
        const response = await fetch('/api/generate-prediction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: "Кто станет чемпионом РФПЛ в сезоне 2025-2026? Зенит или ЦСКА",
            description: "Анализ от AI-моделей ChatGPT-4o | DeepSeek | Grok | Gemini",
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate prediction');
        }

        const aiResponse = await response.json();

        // Replace the first model (ChatGPT-4) with AI-generated data
        const updatedModels = [...predictionDetailed.models];
        updatedModels[0] = {
          modelTab: "ChatGPT-4o",
          modelTitle: "ChatGPT-4o",
          answerIsPositive: aiResponse.prediction.toLowerCase().includes('зенит'), // True if Zenit
          prediction: aiResponse.prediction,
          confidence: aiResponse.confidence,
          historicPrecision: 76, // As per example
          predictionsNumber: 50, // Placeholder
          sources: aiResponse.sources,
          reasonings: aiResponse.reasonings,
          detailedAnalysis: aiResponse.detailedAnalysis,
          resume: aiResponse.resume,
        };

        // Replace the second model (Claude) with DeepSeek data
        updatedModels[1] = {
          modelTab: "DeepSeek",
          modelTitle: "DeepSeek",
          answerIsPositive: true, // Zenit
          prediction: "ЗЕНИТ",
          confidence: 65,
          historicPrecision: 70,
          predictionsNumber: 40,
          sources: [
            "Турнирное положение РФПЛ: По состоянию на конец сентября 2025 года после 10 туров ЦСКА лидирует в таблице (21 очко), «Зенит» находится на 4-й позиции (19 очков).",
            "Результаты личных встреч: В 3-м туре сезона 2025-2026 зафиксирована ничья 1:1. В трех последних домашних матчах РПЛ против ЦСКА «Зенит» не победил. В мае 2025 года ЦСКА выбил «Зенит» из плей-офф Кубка России.",
            "Экспертные оценки: Бывший игрок обеих команд Владислав Радимов публично заявил, что, несмотря на текущую ситуацию, «Зенит» остается фаворитом на титул в силу состава и работы тренерского штаба."
          ],
          reasonings: [
            {
              title: "Основная логика",
              text: "Логика строится на дистанционном факторе и ресурсах клуба. «Зенит» обладает наиболее сбалансированным и глубоким составом в лиге, а также проверенным временем тренерским штабом во главе с Сергеем Семаком."
            },
            {
              title: "Историческая стабильность",
              text: "Исторически команда демонстрирует умение набирать форму и показывать высокую стабильность во второй половине чемпионата. Текущее отставание в 2 очка после 10 туров не является критическим в гонке длиной в 30 туров."
            },
            {
              title: "Анализ конкурентов",
              text: "Несмотря на текущее психологическое преимущество ЦСКА, «Зенит» обладает опытом, чтобы переломить эту тенденцию. При этом другие конкуренты будут активно отбирать очки у всех претендентов."
            }
          ],
          detailedAnalysis: "Кадровый ресурс и глубина состава: «Зенит» традиционно имеет более широкую ротацию качественных игроков, что критически важно для преодоления всего чемпионата и борьбы во всех турнирах. Это позволяет команде лучше справляться с травмами и выдерживать плотный график.\n\nТренерская стабильность и опыт: Сергей Семак имеет многолетний опыт успешного ведения чемпионских гонок. Его система работы хорошо отлажена, а команда психологически устойчива при давлении в концовке сезона.\n\nПсихологический фактор и конкуренты: Несмотря на текущее психологическое преимущество ЦСКА, подтвержденное недавними результатами, «Зенит» обладает опытом, чтобы переломить эту тенденцию. При этом другие конкуренты («Спартак», «Динамо» и др.) будут активно отбирать очки у всех претендентов, включая ЦСКА, что играет на руку более стабильному «Зениту» на дистанции.",
          resume: "На основе анализа данных и ключевых факторов, «Зенит» рассматривается как наиболее вероятный чемпион РФПЛ в сезоне 2025-2026. Вероятность его победы оценивается в 65%. Решающими аргументами являются глубокий состав, тренерский опыт и проверенная временем способность команды добиваться результата на длинной дистанции, несмотря на текущее незначительное отставание и сильную конкуренцию со стороны ЦСКА."
        };

        // Replace the third model (YandexGPT) with Grok data
        updatedModels[2] = {
          modelTab: "Grok",
          modelTitle: "Grok",
          answerIsPositive: true, // Zenit
          prediction: "Зенит",
          confidence: 65,
          historicPrecision: 70,
          predictionsNumber: 35,
          sources: [
            "Результаты предыдущего сезона РФПЛ 2024-2025, где чемпионом стал Краснодар, прервав доминацию Зенита.",
            "Текущие таблицы и прогнозы на сезон 2025-2026 из различных источников, показывающие Зенит и ЦСКА в топ-5, с близкими шансами на титул.",
            "Исторические сравнения силы команд Зенит и ЦСКА, включая head-to-head матчи, где Зенит имеет преимущество в последних встречах."
          ],
          reasonings: [
            {
              title: "Прогноз основан на комбинации исторических данных",
              text: "Текущего положения в таблице на ранней стадии сезона (конец сентября 2025, после 8-10 туров) и сравнительного анализа силы команд."
            },
            {
              title: "Зенит исторически доминирует в РФПЛ",
              text: "Выиграв 6 титулов подряд до 2024-2025, когда уступил Краснодару. ЦСКА, хотя и является традиционно сильным клубом, не выигрывал лигу с 2015/16."
            },
            {
              title: "Текущие standings показывают обе команды в лидерах",
              text: "Но Зенит имеет более стабильный состав, больший бюджет и лучшую форму в ключевых матчах. Уверенность 65% отражает неопределенность раннего сезона."
            }
          ],
          detailedAnalysis: "Исторический контекст: Зенит выиграл РФПЛ в 2018/19, 2019/20, 2020/21, 2021/22, 2022/23 и 2023/24, демонстрируя доминацию благодаря поддержке Газпрома, сильному составу и тренерскому штабу. ЦСКА выиграл последний титул в 2015/16, но с тех пор финишировал в топ-4, но без доминации. В head-to-head Зенит имеет рекорд 30 побед против 21 у ЦСКА в 72 матчах, с преимуществом в последних сезонах.\n\nТекущий сезон 2025-2026: На момент сентября 2025, после стартовых туров, таблицы варьируются по источникам, но Зенит и ЦСКА в топ-5. Прогнозы шансов: Зенит ~60%, ЦСКА ~57%, что делает Зенит slight фаворитом.\n\nСравнение команд: Зенит имеет более глубокий состав, лучшие показатели в атаке и обороне в прошлых сезонах, плюс домашнее преимущество. ЦСКА силен в дисциплине и молодежи, но страдает от нестабильности. Трансферы: Зенит усилился в межсезонье, ЦСКА полагается на академию.\n\nВнешние факторы: Экономика РФПЛ favors Зениту с большим бюджетом (~€150 млн vs ~€80 млн у ЦСКА). Тренеры: Семак у Зенита доказал success, Федотов у ЦСКА – solid, но без титулов lately. Ранний сезон значит, что форма может измениться, но статистика favors Зениту в длинной дистанции.",
          resume: "На основе исторической доминации, текущих показателей и сравнительного анализа, Зенит имеет edge над ЦСКА и, вероятно, вернет себе титул в сезоне 2025-2026. Однако лига конкурентна, с Краснодаром как defending чемпионом, так что исход не гарантирован. Если сезон продолжит развиваться в текущем темпе, Зенит должен финишировать первым с вероятностью около 65%."
        };

        // Replace the fourth model (Gemini) with Gemini (Qwen) data
        updatedModels[3] = {
          modelTab: "Gemini",
          modelTitle: "Gemini",
          answerIsPositive: false, // CSKA
          prediction: "ЦСКА",
          confidence: 65,
          historicPrecision: 85,
          predictionsNumber: 30,
          sources: [
            "Итоги сезона РПЛ 2024/25",
            "Текущая турнирная таблица РПЛ 2025/26",
            "Информация о травмах игроков",
            "Данные о трансферах лета 2025 года"
          ],
          reasonings: [
            {
              title: "Результаты прошлого сезона",
              text: "«Зенит» уступил чемпионство «Краснодару», что свидетельствует о снижении его абсолютного превосходства."
            },
            {
              title: "Текущая форма",
              text: "В начале сезона 2025/26 ЦСКА занимает 1-е место в турнирной таблице, опережая «Зенит», который находится на 4-м месте."
            },
            {
              title: "Трансферы",
              text: "ЦСКА провёл активную трансферную кампанию, усилившись защитниками и полузащитниками. «Зенит» в основном вернул игроков из аренды."
            },
            {
              title: "Травмы",
              text: "У «Зенита» есть проблемы со здоровьем у ключевых игроков. У ЦСКА также есть травмы, но в целом состав выглядит более стабильным."
            }
          ],
          detailedAnalysis: "ЦСКА демонстрирует стабильную игру под руководством тренера. Команда укрепила оборону и полузащиту, что критически важно для борьбы на два фронта.\n\n«Зенит», несмотря на наличие сильного состава, столкнулся с проблемами мотивации после нескольких лет доминирования и, возможно, испытывает эффект «чемпионской усталости».\n\nПоявление «Краснодара» как нового сильного игрока на рынке также оттягивает внимание и ресурсы, что может сыграть на руку ЦСКА в борьбе с «Зенитом».",
          resume: "Хотя «Зенит» остаётся одним из фаворитов чемпионата, ЦСКА на текущий момент выглядит более организованно и мотивированно. Если армейцы сохранят текущую форму и избегнут серьёзных травм ключевых игроков, они имеют все шансы стать чемпионами России в сезоне 2025-2026."
        };

        setPredictionData({
          ...predictionDetailed,
          category: "Спорт • Футбол",
          title: "Кто станет чемпионом РФПЛ в сезоне 2025-2026? Зенит или ЦСКА",
          description: "Анализ от AI-моделей ChatGPT-4o | DeepSeek | Grok | Gemini",
          voting: [
            {
              label: "Зенит (станет #1)",
              percent: 67,
              peopleNumber: 1347
            },
            {
              label: "ЦСКА (станет #1)",
              percent: 33,
              peopleNumber: 653
            }
          ],
          models: updatedModels,
        });
      } catch (err) {
        console.error('Error generating prediction:', err);
        setError('Failed to load AI prediction');
      } finally {
        setLoading(false);
      }
    };

    generatePrediction();
  }, []);

  if (loading) {
    return (
      <>
        <TopBar/>
        <div className="pt-36 container pb-4 sm:pb-8 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Генерируем прогноз с помощью AI...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopBar/>
        <div className="pt-36 container pb-4 sm:pb-8 flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar/>
      <div className="pt-36 container pb-4 sm:pb-8">
        <div className=" py-4 sm:py-8 space-y-4 sm:space-y-8">
          <YourPrediction prediction={predictionData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Analysis prediction={predictionData} />
            <CommentsBlock comments={predictionData.comments} />
          </div>
          <div>
            <ChartsAll prediction={predictionData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;