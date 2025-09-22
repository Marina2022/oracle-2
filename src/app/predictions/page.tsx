import React from 'react';
import TopBarPredictions from "@/components/PredictionsPage/1-top-bar-predictions/TopBarPredictions";
import Predictions from "@/components/homePage/4-predictions/Predictions";

const Page = () => {
  return (
    <div className="pt-28">
      <TopBarPredictions/>
      <Predictions all={true}/>
    </div>
  );
};

export default Page;