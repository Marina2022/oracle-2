import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Award, Target, TrendingUp, Users} from "lucide-react";
import {reviews} from '@/mocks/home-page/reviews';
import Review from "@/components/homePage/5-trust/Review";

const Trust = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/10 to-background dark:from-muted/20 dark:to-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30 mb-6">Наши достижения</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Платформе <span className="gradient-text">доверяют</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Растущее сообщество пользователей выбирает Оракул для получения точных прогнозов от ИИ
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 2xl:px-20">
          <li>
            <Card className="border glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 gap-2 ">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/20 text-primary mb-3 mx-auto">
                <Users className="w-8 h-8"/>
              </div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="!text-base lg:text-sm text-muted-foreground">активных пользователей</div>
            </Card>
          </li>

          <li>
            <Card className="border glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 gap-2 ">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/20 text-secondary mb-3 mx-auto">
                <Target className="w-8 h-8"/>
              </div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="!text-base lg:text-sm text-muted-foreground">точных прогнозов</div>
            </Card>
          </li>

          <li>
            <Card className="border glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 gap-2 ">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/20 text-accent mb-3 mx-auto">
                <TrendingUp className="w-8 h-8"/>
              </div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="!text-base lg:text-sm text-muted-foreground">точность ИИ-консенсуса
              </div>
            </Card>
          </li>

          <li>
            <Card className="border glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 gap-2 ">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/20 text-chart-4 mb-3 mx-auto">
                <Award className="w-8 h-8"/>
              </div>
              <div className="text-4xl font-bold mb-2">7</div>
              <div className="!text-base lg:text-sm text-muted-foreground">ведущих ИИ-моделей</div>
            </Card>
          </li>

        </ul>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Что говорят пользователи</h3>
          <p className="text-muted-foreground">Отзывы от реальных пользователей платформы Оракул</p>
        </div>
        <ul className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {
            reviews.map((review, i) => <Review key={i} review={review}/>)
          }
        </ul>
        <Card className="glassmorphism p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-secondary mb-2">99.9%</div>
              <div className="text-sm xl:text-md text-muted-foreground">Время работы платформы</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm xl:text-md text-muted-foreground">Техническая поддержка</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm xl:text-md text-muted-foreground">Безопасность данных</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Trust;