import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import {PredictionModel, PredictionType} from "@/features/prediction/types/PredictionType";

type Props = {
  model: PredictionModel;
  prediction: PredictionType;
}

const OneModelPrediction = ({model, prediction}: Props) => {

  let predictionText = ""
  let badgeBg = ""

  if (model.prediction === "home") {
    predictionText = prediction.home;
    badgeBg = "bg-primary"
  }

  if (model.prediction === "away") {
    predictionText = prediction.away;
    badgeBg = "bg-destructive"
  }

  if (model.prediction === "dray") {
    predictionText = "Ничья"
    badgeBg = "bg-secondary"
  }


  return (
    <li className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{model.model_title}</div>
        <div className="flex items-center gap-2">

          <Badge
            // className={`border-transparent text-primary-foreground text-xs ${model.answerIsPositive ? "bg-primary" : "bg-destructive dark:bg-destructive/60"}`}>
            className={`border-transparent text-primary-foreground text-xs  max-w-[250px] ${badgeBg}`}>

            {predictionText}
          </Badge>


          <div className="text-xs text-muted-foreground">{Math.round(model.confidence * 100)}%</div>
        </div>
      </div>
      <Progress value={model.confidence * 100} max={100} className="h-2 w-full rounded-full"/>
    </li>
  );
};

export default OneModelPrediction;