import React from 'react';
import {Card} from "@/components/ui/card";
import {Brain} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import TabContent from "@/components/predictionPage/3-analysis/TabContent";
import {PredictionType} from "@/features/prediction/types/PredictionType";

const Analysis = ({prediction}: { prediction: PredictionType }) => {



  return (
    <Card className="border p-4 sm:p-6 glassmorphism">
      <h2 className="flex items-center gap-2 mb-4 sm:mb-6 text-base sm:text-lg">
        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Анализ от AI-моделей ChatGPT-4o | DeepSeek | Grok | Gemini</span>
      </h2>
      <Tabs defaultValue={prediction.models[0].model_title}>
        <TabsList
          className="bg-muted/20 dark:bg-muted text-muted-foreground w-fit items-center justify-center rounded-xl p-[3px] grid grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
          {
            prediction.models.map((model, i) => (
              <TabsTrigger
                key={i}
                value={model.model_title}
                className="!shadow-none text-xs p-2 !py-2.5 sm:p-3 border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:bg-card rounded-xl font-medium"
              >
                {model.model_title}
              </TabsTrigger>
            ))
          }
        </TabsList>
        <div>
          {
            prediction.models.map((model, i) => (
              <TabsContent value={model.model_title} key={i}>
                <TabContent model={model} key={i}/>
              </TabsContent>
            ))
          }
        </div>
      </Tabs>
    </Card>
  );
};

export default Analysis;