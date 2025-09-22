import {Badge} from '@/components/ui/badge';
import React from 'react';
import {models} from "@/mocks/home-page/models";
import Model from "@/components/homePage/2-models/Model";
import {Card} from "@/components/ui/card";

const Models = () => {
  return (
    <section id="models" className="container py-20 ">
      <div className="text-center">
        <Badge className="bg-accent/20 text-accent border-accent/30 mb-6 text-center">
          ИИ модели
        </Badge>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">7 ИИ-моделей </span>
          работают для вас
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
          Мы интегрировали лучшие мировые и российские ИИ-модели для получения максимально точных прогнозов через
          консенсус
          искусственного интеллекта.
        </p>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {
            models.map(model => <Model key={model.id} model={model}/>)
          }
        </ul>
        <div className="mt-12 text-center">
          <Card className="flex flex-col gap-6 rounded-xl border glassmorphism p-8 max-w-2xl 2xl:max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Консенсус-алгоритм</h3>
            <p className="text-muted-foreground mb-6">
              Наш уникальный алгоритм анализирует прогнозы всех 7 моделей, учитывает их историческую точность и
              формирует итоговый консенсус-прогноз с точностью до 95%.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  95%
                </div>
                <div className="text-sm text-muted-foreground">
                  Точность консенсуса
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">
                  13K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Общих прогнозов
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">
                  2.3с
                </div>
                <div className="text-sm text-muted-foreground">
                  Время анализа
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Models;