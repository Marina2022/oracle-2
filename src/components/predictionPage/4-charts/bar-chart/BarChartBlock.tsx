import {Card} from '@/components/ui/card';
import React from 'react';
import {Star} from "lucide-react";
import {ModelForDetailedPrediction} from "@/types/predictionTypes";
import PredictionBarChart from "@/components/predictionPage/4-charts/bar-chart/PredictionBarChart";

const BarChartBlock = ({models}: { models: ModelForDetailedPrediction[] }) => {
  return (
    <Card className="p-4 sm:p-6 glassmorphism gap-6">
      <div className="flex items-center gap-2 mb-4 text-sm sm:text-base">
        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Историческая точность</span>
      </div>
      <PredictionBarChart models={models}/>
    </Card>
  );
};

export default BarChartBlock;