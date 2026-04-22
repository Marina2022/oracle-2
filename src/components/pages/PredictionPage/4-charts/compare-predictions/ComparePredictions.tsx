import React from 'react';
import {Card} from "@/components/ui/card";
import {ChartColumn} from "lucide-react";
import {Badge} from '@/components/ui/badge';
import {Progress} from "@/components/ui/progress";
import {PredictionType} from "@/features/prediction/types/PredictionType";
import OneModelPrediction from "@/components/pages/PredictionPage/4-charts/compare-predictions/OneModelPrediction";

const ComparePredictions = ({prediction}: { prediction: PredictionType }) => {


  return (
    <Card className="p-4 sm:p-6 glassmorphism gap-6">
      <div className="flex items-center gap-2 mb-4 text-sm sm:text-base">
        <ChartColumn className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Прогноз нейросетей</span>
      </div>
      <ul className="space-y-4" role="region" aria-label="Диаграмма сравнения уверенности моделей">
        {
          prediction.models.map((model, i) => <OneModelPrediction model={model} prediction={prediction} key={i} />)
        }
      </ul>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-sm font-medium mb-3">Консенсус-алгоритм</div>
        <div className="grid grid-cols-2 gap-4">

          <div className="text-center">
            <div className={`text-2xl font-bold text-primary`}>
              {Math.round(prediction.consensus.p_home * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">{prediction.home}</div>
          </div>


          <div className="text-center">
            <div className={`text-2xl font-bold text-destructive`}>
              {Math.round(prediction.consensus.p_away * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">{prediction.away}</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold text-primary`}>
              {Math.round(prediction.consensus.p_draw * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Ничья</div>
          </div>


          <div className="text-center">
            <div className={`text-2xl font-bold text-primary`}>
              {Math.round(prediction.consensus.oracul_score * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Oracul Score</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold text-primary`}>
              {Math.round(prediction.consensus.p_book * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Вероятность букмекера</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold text-primary`}>
              {Math.round(prediction.consensus.p_ai_selected * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Выбор нейросети</div>
          </div>


        </div>
      </div>
    </Card>
  );
};

export default ComparePredictions;