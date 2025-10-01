import React from 'react';
import {Badge} from "@/components/ui/badge";
import {predictions} from "@/mocks/home-page/predictions";
import PredictionCard from "@/components/homePage/4-predictions/PredictionCard";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronRight} from 'lucide-react';

const Predictions = ({all = false}: { all?: boolean }) => {

  let predictionsToShow
  if (all) {
    predictionsToShow = predictions
  } else {
    predictionsToShow = predictions.slice(0, 4)
  }

  return (
    <section id="predictions" className="py-20 container">
      <div className="text-center mb-16">
        <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-6 pulse-animation">● LIVE</Badge>
        <h2 className="text-4xl lg:text-5xl font-bold mb-5 gradient-text !leading-[1.3]">Актуальные прогнозы</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Следите за развитием событий в реальном времени.
          ИИ-модели обновляют свои прогнозы каждые 15 минут.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {
          predictionsToShow.map((prediction, i) => <PredictionCard key={i} prediction={prediction}/>)
        }
      </div>

      <ul className="grid md:grid-cols-4 lg:gap-8 gap-6 mb-12">
        <li>
          <Card className="border glassmorphism p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              47
            </div>
            <div className="xl:text-lg text-md text-muted-foreground">
              Активных событий
            </div>
          </Card>
        </li>

        <li>
          <Card className="border glassmorphism p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">
              5.2K
            </div>
            <div className="xl:text-lg text-md text-muted-foreground">
              Участников онлайн
            </div>
          </Card>
        </li>
        <li>
          <Card className="border glassmorphism p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              15м
            </div>
            <div className="xl:text-lg text-md text-muted-foreground">
              Интервал обновлений
            </div>
          </Card>
        </li>

        <li>
          <Card className="border glassmorphism p-6 text-center">
            <div className="text-3xl font-bold text-char-4 mb-2">
              92%
            </div>
            <div className="xl:text-lg text-md text-muted-foreground">
              Средняя точность
            </div>
          </Card>
        </li>
      </ul>

      {
        !all && (
          <div className="text-center">
            <Button asChild className="max-md:w-full max-w-[400px]">
              <Link href="/predictions">
                <span>Посмотреть все прогнозы</span>
                <ChevronRight/>
              </Link>
            </Button>
          </div>
        )
      }
    </section>
  );
};

export default Predictions;