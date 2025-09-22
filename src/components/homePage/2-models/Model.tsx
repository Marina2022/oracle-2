import React from 'react';
import {Card} from "@/components/ui/card";
import {Model as ModelType} from "@/types/model";
import {Progress} from "@/components/ui/progress"
import {Badge} from "@/components/ui/badge";

const Model = ({model}: { model: ModelType }) => {

  const hight = model.precision >= 90 ? true : false
  return (
    <li>
      <Card
        className="gap-0 text-left flex flex-col h-full rounded-xl border glassmorphism p-6 hover:scale-105 transition-all duration-300 hover:neon-glow group cursor-pointer">
        <div className="flex-1 space-y-4 flex flex-col">
          {model.icon}
          <h2 className="text-xl font-bold mb-2">{model.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
        </div>
        <div className="space-y-3 mt-auto">
          <div className="flex justify-between items-center ">
            <div className="text-sm text-muted-foreground">Точность</div>
            <div className="font-bold text-lg">{model.precision}%</div>
          </div>
          <Progress value={model.precision}/>
          <div className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground">Прогнозов</div>
            <div className="font-medium">{new Intl.NumberFormat('ru-RU').format(model.predictionNumber)}</div>
          </div>
          <Badge
            className={hight ? "bg-chart-4/20 text-chart-4 w-full" : "bg-chart-5/20 text-chart-5 w-full"}>{hight ? "Высокая" : "Хорошая"} точность</Badge>
        </div>
      </Card>
    </li>
  );
};

export default Model;