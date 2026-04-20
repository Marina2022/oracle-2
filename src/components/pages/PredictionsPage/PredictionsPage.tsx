import s from './PredictionsPage.module.scss';
import TopBarPredictions from "@/components/pages/PredictionsPage/1-top-bar-predictions/TopBarPredictions";
import React from "react";
import {Badge} from "@/components/ui/badge";
import PredictionCard from "@/components/pages/HomePage/4-predictions/PredictionCard";

import {PredictionCardType} from "@/features/prediction/types/PredictionCard";

type Props = {
  predictions: PredictionCardType[]
}

const PredictionsPage = ({predictions}: Props) => {

  const predictionCount = predictions.length  // TODO - потом по-другому будем получать, т.к. тут для одной страницы приходят данные

  return (
    <div className="pt-28">
      <TopBarPredictions totalCount={predictionCount} />


      <section id="predictions" className="py-20 container">
        <div className="text-center mb-16">
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-6 pulse-animation">● LIVE</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 gradient-text !leading-[1.3]">Актуальные прогнозы</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Следите за развитием событий в реальном времени.
            ИИ-модели обновляют свои прогнозы каждые 15 минут.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {
            predictions.map((prediction, i) => <PredictionCard key={i} prediction={prediction}/>)
          }
        </div>
      </section>
    </div>
  );
};

export default PredictionsPage;