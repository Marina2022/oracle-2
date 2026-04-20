import React from 'react';
import {TryItNowModelType} from "@/types/tryItNowModelType";
import {PredictionModel} from "@/features/prediction/types/PredictionType";
import {PredictionCardModel} from "@/features/prediction/types/PredictionCard";


const TryItNowModel = ({model}: { model: PredictionCardModel }) => {
  return (
    <li className="flex items-center justify-between p-3  bg-muted/90 dark:bg-muted/50 rounded-lg ">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">{model.title}:</span>
        <span className="font-medium">{model.title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-1000"
               style={{width: `${Math.round(model.precision * 100)}%`}}></div>
        </div>
        <div className="text-sm font-medium">{model.precision}%</div>
      </div>
    </li>
  );
};

export default TryItNowModel;