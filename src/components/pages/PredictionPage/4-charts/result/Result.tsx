import React from 'react';
import {Card} from "@/components/ui/card";
import {CheckCircle} from "lucide-react";

import {isTimestampPast} from "@/utils/common";
import {PredictionType} from "@/features/prediction/types/PredictionType";

const Result = ({prediction}: { prediction: PredictionType }) => {

  // если result в API == null или дата (timeline) еще не наступила - не рисуем блок
  if (!prediction.result || !isTimestampPast(prediction.timeline) ) return null

  return (
    <Card className="p-4 sm:p-6 glassmorphism gap-6">
      <div className="flex items-center gap-2 mb-2 text-sm sm:text-base">
        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Результат</span>
      </div>
      <div className="flex flex-col gap-3">
        <p><span className="font-medium">Счет:</span> {prediction.result.home_score} : {prediction.result.away_score}</p>
        <p><span className="font-medium">Выиграл: </span> {prediction.result.won}</p>
        <p><span className="font-medium">Источник: </span> {prediction.result.source}</p>
      </div>

    </Card>
  );
};

export default Result;



