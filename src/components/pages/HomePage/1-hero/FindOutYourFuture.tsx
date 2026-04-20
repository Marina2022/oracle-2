import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from 'next/link';

const FindOutYourFuture = () => {
  return (
    <div>
      <div className="space-y-6 mb-8">
        <Badge variant="blueBig">
          <span className="max-sm:hidden">🚀 </span>Первая в России платформа сравнения ИИ-прогнозов
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="gradient-text">Узнай будущее</span>
          <br/>
          с помощью ИИ
        </h1>
        <p className="lg:text-xl text-lg text-muted-foreground leading-relaxed">
          Сравнивайте прогнозы от 7 ведущих AI-моделей, участвуйте в предсказаниях и зарабатывайте очки за точность.
          Развлечение встречается с интеллектом.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-7">
        <Button asChild variant="default" className="px-8 py-6">
          <Link href="/predictions/1">
            Начать прогнозировать
          </Link>
        </Button>
        <Button variant="secondary" className="px-8 py-6">Смотреть демо</Button>
      </div>
      <div className="flex items-center space-x-8">
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text">7</div>
          <div className="text-sm text-muted-foreground">AI моделей</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text">10К+</div>
          <div className="text-sm text-muted-foreground">Активных пользователей</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text">95%</div>
          <div className="text-sm text-muted-foreground">Точность консенсуса</div>
        </div>
      </div>
    </div>
  )
}

export default FindOutYourFuture;