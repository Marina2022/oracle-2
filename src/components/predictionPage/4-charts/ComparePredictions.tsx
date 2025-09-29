import React from 'react';
import {Card} from "@/components/ui/card";
import {ModelForDetailedPrediction} from "@/types/predictionTypes";
import {ChartColumn} from "lucide-react";
import {Badge} from '@/components/ui/badge';
import {Progress} from "@/components/ui/progress";

const ComparePredictions = ({models}: { models: ModelForDetailedPrediction[] }) => {
  return (
    <Card className="p-4 sm:p-6 glassmorphism gap-6">
      <div className="flex items-center gap-2 mb-4 text-sm sm:text-base">
        <ChartColumn className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Голосование сообщества</span>
      </div>
      <ul className="space-y-4" role="region" aria-label="Диаграмма сравнения уверенности моделей">
        {
          models.map((model, i) => <li key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{model.modelTitle}</div>
              <div className="flex items-center gap-2">
                <Badge
                  className={`border-transparent text-primary-foreground text-xs ${model.answerIsPositive ? "bg-primary" : "bg-destructive dark:bg-destructive/60"}`}>
                  {model.answerIsPositive ? "Зенит" : "ЦСКА"}
                </Badge>
                <div className="text-xs text-muted-foreground">{model.confidence}%</div>
              </div>
            </div>
            <Progress value={model.confidence} max={100} className="h-2 w-full rounded-full"/>
          </li>)
        }
      </ul>
    </Card>
  );
};

export default ComparePredictions;