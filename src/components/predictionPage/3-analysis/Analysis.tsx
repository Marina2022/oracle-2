import React from 'react';
import {Card} from "@/components/ui/card";
import {Brain} from "lucide-react";
import {PredictionDetailed} from "@/types/predictionTypes";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import TabContent from "@/components/predictionPage/3-analysis/TabContent";

const Analysis = ({prediction}: { prediction: PredictionDetailed }) => {

  const models = prediction.models

  return (
    <Card className="border p-4 sm:p-6 glassmorphism">
      <h2 className="flex items-center gap-2 mb-4 sm:mb-6 text-base sm:text-lg">
        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Анализ от AI-моделей ChatGPT-4o | DeepSeek | Grok | Gemini</span>
      </h2>
      <Tabs defaultValue={models[0].modelTab}>
        <TabsList
          className="bg-muted/20 dark:bg-muted text-muted-foreground w-fit items-center justify-center rounded-xl p-[3px] grid grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
          {
            models.map((model, i) => (
              <TabsTrigger
                key={i}
                value={model.modelTab}
                className="!shadow-none text-xs p-2 !py-2.5 sm:p-3 border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:bg-card rounded-xl font-medium"
              >
                {model.modelTab}
              </TabsTrigger>
            ))
          }
        </TabsList>
        <div>
          {
            models.map((model, i) => (
              <TabsContent value={model.modelTab} key={i}>
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