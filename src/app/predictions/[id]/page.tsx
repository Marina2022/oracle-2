import React from 'react';
import TopBar from '@/components/predictionPage/1-top-bar/TopBar';
import YourPrediction from "@/components/predictionPage/2-your-prediction/YourPrediction";
import {predictionDetailed} from "@/mocks/one-prediction-page/prediction-detailed";
import Analysis from "@/components/predictionPage/3-analysis/Analysis";
import CommentsBlock from "@/components/predictionPage/3-analysis/comments/CommentsBlock";
import ChartsAll from "@/components/predictionPage/4-charts/ChartsAll";

const Page = () => {

  // потом будет приходить из API по запросу на определенный id прогноза
  const predictionData = predictionDetailed;

  return (
    <>
      <TopBar/>
      <div className="pt-36 container pb-4 sm:pb-8">
        <div className=" py-4 sm:py-8 space-y-4 sm:space-y-8">
          <YourPrediction prediction={predictionData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Analysis prediction={predictionData} />
            <CommentsBlock comments={predictionData.comments} />
          </div>
          <div>
            <ChartsAll prediction={predictionData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;