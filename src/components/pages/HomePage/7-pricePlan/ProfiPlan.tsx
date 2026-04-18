import React from 'react';
import {Card} from "@/components/ui/card";
import {Check, Crown} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const ProfiPlan = () => {

  const services = [
    "Доступ ко всем 7 ИИ-моделям",
    "Безлимитные прогнозы",
    "Расширенная аналитика",
    "Приоритетные турниры",
    "Персональные рекомендации",
    "API доступ",
    "Приоритетная поддержка",
    "Полная история прогнозов",
    "Кастомные уведомления",
    "Экспорт в Excel/PDF"
  ]

  return (
    <Card className="relative glassmorphism p-8 hover:scale-105 transition-all duration-300 neon-glow">
      <Badge
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">Популярный</Badge>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-primary/20 text-primary">
          <Crown className="h-6 w-6"/>
        </div>
        <h3 className="text-2xl font-bold mb-2">Профи</h3>
        <p className="text-muted-foreground mb-4">Для серьезных аналитиков</p>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-4xl font-medium">990₽</span>
          <span className="text-muted-foreground">/ в месяц</span>
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
      <Button className="h-10 rounded-md px-6">Выбрать Профи</Button>
    </Card>
  );
};

export default ProfiPlan;