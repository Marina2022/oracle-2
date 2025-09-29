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
            question: "Кто станет чемпионом РФПЛ в сезоне 2025-2026?",
            description: "Анализируем шансы на чемпионство в российском футболе на основе текущих позиций команд, экспертных мнений, букмекерских коэффициентов и трансферной политики клубов.",
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate prediction');
        }

        const aiResponse = await response.json();

        // Replace the first model (ChatGPT-4) with AI-generated data
        const updatedModels = [...predictionDetailed.models];
        updatedModels[0] = {
          modelTab: "ChatGPT-4o-mini",
          modelTitle: "ChatGPT-4o-mini",
          answerIsPositive: aiResponse.prediction.toLowerCase().includes('да') || aiResponse.prediction.toLowerCase().includes('зенит') || Math.random() > 0.5, // Simple heuristic
          confidence: aiResponse.confidence,
          historicPrecision: 75, // Placeholder
          predictionsNumber: 50, // Placeholder
          sources: aiResponse.sources,
          reasonings: aiResponse.reasonings,
          detailedAnalysis: aiResponse.detailedAnalysis,
          resume: aiResponse.resume,
        };

        setPredictionData({
          ...predictionDetailed,
          category: "Спорт • Футбол",
          title: "Кто станет чемпионом РФПЛ в сезоне 2025-2026?",
          description: "Анализируем шансы на чемпионство в российском футболе на основе текущих позиций команд, экспертных мнений, букмекерских коэффициентов и трансферной политики клубов.",
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