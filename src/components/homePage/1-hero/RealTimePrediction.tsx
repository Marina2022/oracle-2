import {Card} from '@/components/ui/card';
import {Bot, Brain, TrendingUp, Zap} from 'lucide-react';
import React from 'react';
import {Separator} from "@/components/ui/separator";

const RealTimePrediction = () => {
  return (
    <div className="relative">
      <Card
        className="flex flex-col gap-0 items-center rounded-xl border absolute -top-18 sm:-top-4 -right-4 glassmorphism p-3 px-2 w-28 float-animation z-20 shadow-none">
        <Brain className="h-8 w-8 text-primary mb-2 "/>
        <div className="text-xs font-medium">YandexGPT</div>
        <div className="text-sm font-bold text-secondary">НЕТ</div>
      </Card>
      <Card
        className="flex flex-col gap-0 items-center rounded-xl border absolute md:-bottom-16 -bottom-22 -left-4 sm:left-86 glassmorphism p-3 px-2 w-34 float-animation delay-1000 z-20 shadow-none">
        <TrendingUp className="h-8 w-8 text-accent mb-1 "/>
        <div className="text-xs font-medium text-center">Точность за месяц</div>
        <div className="text-sm font-bold text-green-500">87%</div>
      </Card>
      <Card className="flex flex-col gap-4 rounded-xl border glassmorphism p-6 relative overflow-hidden shadow-none">
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
        <h3 className="text-lg font-semibold">Прогноз в реальном времени</h3>
        <p className="font-medium">Биткоин достигнет $100,000 до конца 2025?</p>
        <div className="">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm">Консенсус AI</div>
            <div className="font-bold text-primary">73%</div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{width: "73%"}}></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2  ">
              <Bot className="h-4 w-4 text-primary"/>
              <span className="text-sm">ChatGPT</span>
            </div>
            <div className="text-lg font-bold text-green-500">
              ДА (85%)
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="flex items-center space-x-2  ">
              <Bot className="h-4 w-4 text-secondary"/>
              <span className="text-sm">Claude</span>
            </div>
            <div className="text-lg font-bold text-green-500">
              ДА (78%)
            </div>
          </div>
        </div>
        <Separator/>
        <div className="flex items-center space-x-4 ">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500"/>
            <span>1,234 участника</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500"/>
            <span>Активен 2 дня</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RealTimePrediction;