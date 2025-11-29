// src/app/api/predictions/[id]/route.ts

import { NextResponse } from 'next/server';
import { predictionsDetailed as mockPredictions } from '@/mocks/one-prediction-page/new-predictions-detailed';
import type { PredictionDetailed } from '@/types/predictionTypes';
import { generateDetailedPrediction } from '@/server/predictions/generateDetailedPrediction';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let prediction: PredictionDetailed | undefined;

  // 1. Пробуем собрать прогноз через нейронки
  try {
    prediction = await generateDetailedPrediction(id);
  } catch (e) {
    console.error(
      'Failed to generate prediction via LLM, falling back to mock:',
      e,
    );
  }

  // 2. Если не получилось — пробуем взять из моков
  if (!prediction) {
    prediction = mockPredictions.find((p) => p.id === id);
  }

  if (!prediction) {
    return NextResponse.json(
      { error: 'Prediction not found' },
      { status: 404 },
    );
  }

  return NextResponse.json(prediction);
}
