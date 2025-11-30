// src/app/predictions/[id]/page.tsx

import TopBar from '@/components/predictionPage/1-top-bar/TopBar';
import YourPrediction from '@/components/predictionPage/2-your-prediction/YourPrediction';
import Analysis from '@/components/predictionPage/3-analysis/Analysis';
import CommentsBlock from '@/components/predictionPage/3-analysis/comments/CommentsBlock';
import ChartsAll from '@/components/predictionPage/4-charts/ChartsAll';

import { predictionsDetailed as mockPredictions } from '@/mocks/one-prediction-page/new-predictions-detailed';
import type { PredictionDetailed } from '@/types/predictionTypes';
import { isTimestampPast } from '@/utils/common';
import { generateDetailedPrediction } from '@/server/predictions/generateDetailedPrediction';

// ВАЖНО: никакого 'use client' в этом файле

// флаг: берём из ENV, по умолчанию false
const USE_LLM = process.env.NEXT_PUBLIC_USE_LLM === 'true';

export default async function PredictionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // так Next 15 хочет работать с params

  let prediction: PredictionDetailed | undefined;

  // 1. Если флаг включён — пробуем получить прогноз через LLM (OpenRouter)
  if (USE_LLM) {
    try {
      prediction = await generateDetailedPrediction(id);
    } catch (e) {
      console.error('Ошибка при генерации прогноза через LLM, fallback к mock:', e);
    }
  }

  // 2. Если флаг выключен ИЛИ LLM упал — берём из моков, как было раньше
  if (!prediction) {
    prediction = mockPredictions.find((p) => p.id === id);
  }

  if (!prediction) {
    return <div>Прогноз не найден</div>;
  }

  // Твой искусственный "лоадер" по времени матча
  if (!isTimestampPast(prediction.timeline)) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return (
    <>
      <TopBar prediction={prediction} />
      <div className="pt-36 container pb-4 sm:pb-8">
        <div className="py-4 sm:py-8 space-y-4 sm:space-y-8">
          <YourPrediction prediction={prediction} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Analysis prediction={prediction} />
            <CommentsBlock comments={prediction.comments} />
          </div>
          <div>
            <ChartsAll prediction={prediction} />
          </div>
        </div>
      </div>
    </>
  );
}
