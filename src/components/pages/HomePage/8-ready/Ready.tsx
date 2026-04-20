import React from 'react';
import {Sparkles, TrendingUp, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import Link from "next/link";

const Ready = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:via-background dark:to-accent/20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="container relative z-10 text-center space-y-12 ">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Готовы узнать
            <span className="gradient-text"> будущее</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Присоединяйтесь к тысячам пользователей,
            которые уже используют силу ИИ для точных предсказаний</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 neon-glow text-lg px-8 py-6">
            {/*<Link href="/hot-prediction">*/}
            <Link href="/predictions/1">
              <Sparkles className="w-5 h-5"/>
              <span>Начать прогнозировать</span>
            </Link>
          </Button>
          <Button
            className="border bg-background dark:hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md has-[>svg]:px-4 border-secondary text-secondary  hover:bg-secondary/20 text-lg px-8 py-6">
            Узнать больше
          </Button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
          <li>
            <Card className="glassmorphism p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary"/>
              </div>
              <p className="font-semibold mb-2">Точные прогнозы</p>
              <p className="text-sm text-muted-foreground">Консенсус 7 ИИ-моделей для максимальной точности</p>
            </Card>
          </li>
          <li>
            <Card className="glassmorphism p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary"/>
              </div>
              <p className="font-semibold mb-2">Социальные функции</p>
              <p className="text-sm text-muted-foreground">Соревнуйтесь с друзьями и делитесь успехами</p>
            </Card>
          </li>
          <li>
            <Card className="glassmorphism p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-accent"/>
              </div>
              <p className="font-semibold mb-2">Геймификация</p>
              <p className="text-sm text-muted-foreground">Зарабатывайте очки и повышайте уровень</p>
            </Card>
          </li>
        </ul>
        <p className="text-center pt-8 text-sm text-muted-foreground">
          🚀 Более 10,000 активных пользователей • 95% точность консенсуса • Первая платформа в России
        </p>
      </div>
    </section>
  );
};

export default Ready;