import React from 'react';
import PredictionPieChart from "@/components/pages/PredictionPage/4-charts/pie-chart/PredictionPieChart";
import ComparePredictions from "@/components/pages/PredictionPage/4-charts/ComparePredictions";
import BarChartBlock from "@/components/pages/PredictionPage/4-charts/bar-chart/BarChartBlock";
import Result from "@/components/pages/PredictionPage/4-charts/result/Result";
import {PredictionType} from "@/features/prediction/types/PredictionType";


const ChartsAll = ({prediction}: { prediction: PredictionType }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PredictionPieChart voting={prediction.voiting}/>
      <ComparePredictions prediction={prediction}/>
      <BarChartBlock models={prediction.models}/>
      <Result prediction={prediction} />
    </div>
  );
};

export default ChartsAll;