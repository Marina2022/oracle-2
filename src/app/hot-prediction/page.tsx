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
            description: "Анализ от AI-моделей ChatGPT-4o mini | Claude | Gemini | YandexGPT",
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

        setPredictionData({
          ...predictionDetailed,
          category: "Спорт • Футбол",
          title: "Кто станет чемпионом РФПЛ в сезоне 2025-2026? Зенит или ЦСКА",
          description: "Анализ от AI-моделей ChatGPT-4o mini | Claude | Gemini | YandexGPT",
          voting: [
            {
              label: "Зенит (станет #1)",
              percent: 67,
              peopleNumber: 1247
            },
            {
              label: "ЦСКА (станет #1)",
              percent: 33,
              peopleNumber: 613
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