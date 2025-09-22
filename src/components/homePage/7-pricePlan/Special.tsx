import {Card} from '@/components/ui/card';
import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const Special = () => {
  return (
    <Card className="glassmorphism p-8 text-center mb-12 border-secondary neon-glow">
      <div className="space-y-4">
        <Badge className="text-secondary pulse-animation bg-secondary/20">🎉 Специальное предложение</Badge>
        <h3 className="text-2xl font-bold">
          Первые 1000 пользователей получают <span className="text-secondary">Профи бесплатно</span>
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Зарегистрируйтесь сейчас и получите доступ ко всем возможностям платформы абсолютно бесплатно на первые
          3&nbsp;месяца. Без автопродления.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span>Осталось: 247 мест</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>До 31 декабря</span>
          </div>
        </div>
        <Button className="px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow">Получить
          бесплатный доступ</Button>
      </div>
    </Card>
  );
};

export default Special;