import React from 'react';
import {ModelForDetailedPrediction} from "@/types/predictionTypes";
import {Brain, CircleCheckBig, ExternalLink} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";

const TabContent = ({model}: { model: ModelForDetailedPrediction }) => {
  return (
    <div className="flex-1 outline-none space-y-4 sm:space-y-6">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-3 ">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Brain className="w-4 sm:h-5 sm:w-5 text-white"/>
          </div>
          <div>
            <h3 className="font-medium text-sm sm:text-base">{model.modelTitle}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="px-2 py-0.5 font-medium">{model.answerIsPositive ? "ДА" : "НЕТ"}</Badge>
              <span className="text-xs sm:text-sm text-muted-foreground">Уверенность: {model.confidence}%</span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right ">
          <div className="text-xs sm:text-sm text-muted-foreground">Историческая точность</div>
          <div className="flex items-center gap-2">
            <Progress className="w-16 sm:w-20 h-2" value={model.historicPrecision}/>
            <span className="text-xs sm:text-sm font-medium">{model.historicPrecision}%</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4"/>
          <span>Источники данных</span>
        </h4>
        <ul className="space-y-2">
          {
            model.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <CircleCheckBig className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0"/>
                <span>{source}</span>
              </li>
            ))
          }
        </ul>
      </div>
      <Separator/>
      <div>
        <h4 className="font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
          <Brain className="h-3 w-3 sm:h-4 sm:w-4"/>
          <span>Логика рассуждений</span>
        </h4>
        <ul className="bg-muted/20 p-3 sm:p-4 rounded-lg space-y-3">
          {
            model.reasonings.map((source, i) => {
                const colors = ["primary", "secondary", "accent"]
                const currentColor = colors[i % colors.length]

                return <li key={i} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 bg-${currentColor}/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className={`text-xs font-medium text-${currentColor}`}>{i + 1}</span>
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-medium mb-1">{source.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{source.text}</p>
                  </div>
                </li>
              }
            )
          }
        </ul>
        <Separator className="my-4"/>
        <div>
          <h4 className="font-medium mb-3 text-sm sm:text-base">Детальный анализ</h4>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{model.detailedAnalysis}</p>
        </div>
        <Separator className="my-4"/>
        <div>
          <h4 className="font-medium mb-3 text-sm sm:text-base">Заключение</h4>
          <p className="text-xs sm:text-sm leading-relaxed">{model.resume}</p>
        </div>
      </div>
    </div>
  );
};

export default TabContent;