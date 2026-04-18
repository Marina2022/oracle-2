// src/app/predictions/[id]/page.tsx

// import { predictionsDetailed as mockPredictions } from '@/mocks/one-prediction-page/new-predictions-detailed';

// флаг: берём из ENV, по умолчанию false
import {getMatches} from "@/features/prediction/actions/getMatches";
import {getPrediction} from "@/features/prediction/actions/getPrediction";
import PredictionPage from "@/components/pages/PredictionPage/PredictionPage";

const USE_LLM = process.env.NEXT_PUBLIC_USE_LLM === 'true';

export default async function Page({
                                               params,
                                             }: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;

  const prediction = await getPrediction(id)

  if (prediction?.error) {
    const errorMsg = prediction?.error || 'Неизвестная ошибка'
    throw new Error(errorMsg)
  }


  // let prediction: PredictionDetailed | undefined;

  // 1. Если флаг включён — пробуем получить прогноз через LLM (OpenRouter)
  // if (USE_LLM) {
  //   try {
  //     prediction = await generateDetailedPrediction(id);
  //   } catch (e) {
  //     console.error('Ошибка при генерации прогноза через LLM, fallback к mock:', e);
  //   }
  // }

  // 2. Если флаг выключен ИЛИ LLM упал — берём из моков, как было раньше
  // if (!prediction) {
  // prediction = mockPredictions.find((p) => p.id === id);
  // }

  // if (!prediction) {
  //   return <div>Прогноз не найден</div>;
  // }

  // Твой искусственный "лоадер" по времени матча
  // if (!isTimestampPast(prediction.timeline)) {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  // } else {
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  // }

  return <PredictionPage prediction={prediction}/>


}
