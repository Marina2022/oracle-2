import React from 'react';
import {TryItNowModelType} from "@/types/tryItNowModelType";


const TryItNowModel = ({model}: { model: TryItNowModelType }) => {
  return (
    <li className="flex items-center justify-between p-3  bg-muted/90 dark:bg-muted/50 rounded-lg ">
      <span>{model.title}</span>
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-1000"
               style={{width: `${model.precision}%`}}></div>
        </div>
        <div className="text-sm font-medium">{model.precision}%</div>
      </div>
    </li>
  );
};

export default TryItNowModel;