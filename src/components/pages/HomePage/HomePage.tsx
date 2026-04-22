import React from 'react';
import Hero from "@/components/pages/HomePage/1-hero/Hero";
import Models from "@/components/pages/HomePage/2-models/Models";
import WorkingProcess from "@/components/pages/HomePage/3-working-process/WorkingProcess";
import Predictions from "@/components/pages/HomePage/4-predictions/Predictions";
import Trust from "@/components/pages/HomePage/5-trust/Trust";
import WhyTheyChoose from "@/components/pages/HomePage/6-whyTheyChoose/WhyTheyChoose";
import PricePlan from "@/components/pages/HomePage/7-pricePlan/PricePlan";
import Ready from "@/components/pages/HomePage/8-ready/Ready";
import {PredictionCardType} from "@/features/prediction/types/PredictionCard";

type Props = {
  predictions: PredictionCardType[]
}

const HomePage = ({predictions}: Props) => {
  return (
    <main>
      <Hero predictionId={predictions[0].id} />
      <Models />
      <WorkingProcess prediction={predictions[0]} />
      <Predictions predictions={predictions} />
      <Trust />
      <WhyTheyChoose />
      <PricePlan  />
      <Ready predictionId={predictions[0].id} />
    </main>
  );
};

export default HomePage;