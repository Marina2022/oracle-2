import React from 'react';
import {Card} from "@/components/ui/card";
import {Bell, Brain, ChartColumn, Download, Sparkles, Trophy} from "lucide-react";

const MoreCapabilities = () => {
  return (
    <Card className=" shadow-none glassmorphism p-8 mb-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Дополнительные возможности</h3>
        <p className="text-muted-foreground">Еще больше инструментов для эффективного прогнозирования</p>
      </div>

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <Brain className="w-6 h-6"/>
          </div>
          <div>
            <h4 className="font-medium mb-1">Объяснение логики ИИ</h4>
            <p className="text-sm text-muted-foreground">Понимайте, почему ИИ делает тот или иной прогноз</p>
          </div>
        </li>

        <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <Trophy className="w-6 h-6"/>
          </div>
          <div>
            <h4 className="font-medium mb-1">Турниры прогнозистов</h4>
            <p className="text-sm text-muted-foreground">Еженедельные соревнования с призами</p>
          </div>
        </li>

        <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <Bell className="w-6 h-6"/>
          </div>
          <div>
            <h4 className="font-medium mb-1">Умные уведомления</h4>
            <p className="text-sm text-muted-foreground">Персонализированные алерты о важных событиях </p>
          </div>
        </li>

        <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <Download className="w-6 h-6"/>
          </div>
          <div>
            <h4 className="font-medium mb-1">Экспорт данных</h4>
            <p className="text-sm text-muted-foreground">Выгружайте результаты в удобных форматах</p>
          </div>
        </li>

        <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <ChartColumn className="w-6 h-6"/>
          </div>
          <div>
            <h4 className="font-medium mb-1">Детальная аналитика</h4>
            <p className="text-sm text-muted-foreground">Подробная статистика по вашим прогнозам</p>
          </div>
        </li>

        <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <Sparkles className="w-6 h-6"/>
          </div>
          <div>
            <h4 className="font-medium mb-1">Персонализация</h4>
            <p className="text-sm text-muted-foreground">ИИ адаптируется под ваши интересы</p>
          </div>
        </li>
      </ul>
    </Card>
  );
};

export default MoreCapabilities;