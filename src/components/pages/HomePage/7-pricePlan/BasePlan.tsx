import React from 'react';
import {Card} from "@/components/ui/card";
import {Check, Star} from 'lucide-react';
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

const BasePlan = () => {

  const services = [
    "Доступ к 3 ИИ-моделям",
    "5 прогнозов в день",
    "Базовая аналитика",
    "Участие в общих турнирах",
    "Социальные функции",
    "Экспорт результатов"
  ]

  return (
    <Card className="relative glassmorphism p-8 hover:scale-105 transition-all duration-300 ">
      <div className="text-center">
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-muted/20 text-muted-foreground">
          <Star className="h-6 w-6"/>
        </div>
        <h3 className="text-2xl font-bold mb-2">Базовый</h3>
        <p className="text-muted-foreground mb-4">Для начинающих прогнозистов</p>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-4xl font-medium">0₽</span>
          <span className="text-muted-foreground">/ навсегда</span>
        </div>
      </div>

      <ul className="space-y-3">
        {
          services.map((service, i) => <li key={i} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-chart-4 flex-shrink-0"/>
            <span>{service}</span>
          </li>)
        }
      </ul>
      <Separator/>
      <div className="text-sm text-muted-foreground">
        <p className="font-medium mb-2">Ограничения:</p>
        <div className="mb-1">• Без приоритетной поддержки</div>
        <div className="mb-1">• Ограниченная история</div>
        <div className="mb-1">• Базовые уведомления</div>
      </div>
      <Button className="h-10 rounded-md px-6">Начать бесплатно</Button>
    </Card>
  );
};

export default BasePlan;