import React from 'react';
import {Card} from "@/components/ui/card";
import {PredictionDetailed} from "@/types/predictionTypes";
import {ChartColumn} from "lucide-react";
import {Badge} from '@/components/ui/badge';
import {Progress} from "@/components/ui/progress";

const ComparePredictions = ({prediction}: { prediction: PredictionDetailed } ) => {
  return (
    <Card className="p-4 sm:p-6 glassmorphism gap-6">
      <div className="flex items-center gap-2 mb-4 text-sm sm:text-base">
        <ChartColumn className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Прогноз нейросетей</span>
      </div>
      <ul className="space-y-4" role="region" aria-label="Диаграмма сравнения уверенности моделей">
        {
          prediction.models.map((model, i) => <li key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{model.modelTitle}</div>
              <div className="flex items-center gap-2">
                <Badge
                  className={`border-transparent text-primary-foreground text-xs ${model.answerIsPositive ? "bg-primary" : "bg-destructive dark:bg-destructive/60"}`}>
                  {model.answerIsPositive ? prediction.consensus[0].title : prediction.consensus[1].title}
                </Badge>
                <div className="text-xs text-muted-foreground">{model.confidence}%</div>
              </div>
            </div>
            <Progress value={model.confidence} max={100} className="h-2 w-full rounded-full"/>
          </li>)
        }
      </ul>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-sm font-medium mb-3">Консенсус-алгоритм</div>
        <div className="grid grid-cols-2 gap-4">

          {
            prediction.consensus?.map((item, i)=>(
              <div className="text-center" key={i}>
                <div className={`text-2xl font-bold ${i === 0 ? "text-primary" : "text-destructive"}`}>
                  {item.value}%
                </div>
                <div className="text-xs text-muted-foreground">{item.title}</div>
              </div>
            ))    }
        </div>
      </div>
    </Card>
  );
};

export default ComparePredictions;