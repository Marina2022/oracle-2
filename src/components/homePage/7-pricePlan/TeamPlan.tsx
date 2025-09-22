import React from 'react';
import {Card} from "@/components/ui/card";
import {Check, Crown} from 'lucide-react';
import {Button} from "@/components/ui/button";

const TeamPlan = () => {

  const services = [
    "Все возможности Профи",
    "До 50 пользователей",
    "Командные прогнозы",
    "Корпоративная аналитика",
    "Брендинг компании",
    "Интеграция с CRM",
    "Персональный менеджер",
    "SLA 99.9%",
    "Обучение команды",
    "Белый лейбл"
  ]

  return (
    <Card className="relative glassmorphism p-8 hover:scale-105 transition-all duration-300">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-muted/20 text-muted-foreground">
          <Crown className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Команда</h3>
        <p className="text-muted-foreground mb-4">Для корпораций и команд</p>
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-4xl font-medium">4 990₽</span>
          <span className="text-muted-foreground">/ в месяц</span>
        </div>
      </div>
      <ul className="space-y-3">
        {
          services.map((service, i) => <li key={i} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-chart-4 flex-shrink-0" />
            <span>{service}</span>
          </li>)
        }
      </ul>
      <Button className="h-10 rounded-md px-6">Связаться с нами</Button>
    </Card>
  );
};

export default TeamPlan;