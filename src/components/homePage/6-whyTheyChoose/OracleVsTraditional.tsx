import React from 'react';
import {Card} from "@/components/ui/card";

const OracleVsTraditional = () => {

  const withOracle = [
    "7 ИИ-моделей работают одновременно",
    "Обновления каждые 15 минут",
    "95% точность консенсуса",
    "Объяснение логики прогноза",
    "Геймификация и развлечение"
  ]
  const withoutOracle = [
    "Один источник информации",
    "Редкие обновления",
    "Субъективные мнения",
    "Отсутствие объяснений",
    "Скучная подача информации"
  ]

  return (
    <Card className=" shadow-none glassmorphism p-8 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center mb-8">Оракул vs Традиционные прогнозы</h3>
      <div className="grid md:grid-cols-2 gap-10 md:gap-8">
        <div>
          <h4 className="font-bold text-primary mb-4">✓ С Оракул</h4>
          <ul className="space-y-3">
            {
              withOracle.map((item, i) => <li key={i} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                <div className="text-sm">{item}</div>
              </li>)
            }
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-muted-foreground mb-4">✗ Без Оракул</h4>
          <ul className="space-y-3">
            {
              withoutOracle.map((item, i) => <li key={i} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <div className="text-sm text-muted-foreground">{item}</div>
              </li>)
            }
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default OracleVsTraditional;