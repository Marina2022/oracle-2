import React from 'react';
import PredictionPieChart from "@/components/predictionPage/4-charts/pie-chart/PredictionPieChart";
import {PredictionDetailed} from "@/types/predictionTypes";
import ComparePredictions from "@/components/predictionPage/4-charts/ComparePredictions";
import BarChartBlock from "@/components/predictionPage/4-charts/bar-chart/BarChartBlock";
import Result from "@/components/predictionPage/4-charts/result/Result";


const ChartsAll = ({prediction}: { prediction: PredictionDetailed }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PredictionPieChart voting={prediction.voting}/>
      <ComparePredictions prediction={prediction}/>
      <BarChartBlock models={prediction.models}/>
      <Result prediction={prediction} />
    </div>
  );
};

export default ChartsAll;