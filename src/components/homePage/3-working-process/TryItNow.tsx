import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import React from 'react';
import {tryItNowModels} from "@/mocks/home-page/tryItNowModels";
import TryItNowModel from "@/components/homePage/3-working-process/TryItNowModel";
import Link from "next/link";

const TryItNow = () => {
  return (
    <Card className=" rounded-xl border glassmorphism p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Попробуйте прямо сейчас</h3>
        <p className="text-muted-foreground">Проверьте, как работает консенсус ИИ на примере актуального события</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Кто станет чемпионом РФПЛ в сезоне 2025-2026? Зенит или ЦСКА</h4>
              <Badge className="bg-primary/20 text-primary">Активно</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Участников:</span>
                <span>4 ИИ моделей</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Консенсус:</span>
                <span className="text-secondary font-medium">Формируется...</span>
              </div>
            </div>
          </div>
          <Button asChild className="w-full">
            <Link href="/hot-prediction">Посмотреть полный анализ</Link>
          </Button>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground mb-4">Прогнозы ИИ в реальном времени:</div>
          <ul className="space-y-3">
            {
              tryItNowModels.map((model, i) => <TryItNowModel key={i} model={model}/>)
            }
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default TryItNow;