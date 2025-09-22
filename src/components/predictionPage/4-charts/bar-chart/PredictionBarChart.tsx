'use client'

import React from 'react';
import {ModelForDetailedPrediction} from "@/types/predictionTypes";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import CustomBarChartTooltip from "@/components/predictionPage/4-charts/bar-chart/CustomBarChartTooltip";

const PredictionBarChart = ({models}: { models: ModelForDetailedPrediction[] }) => {

  const data = models.map(model => ({
    name: model.modelTitle,
    precision: model.historicPrecision,
    predictionsNumber: model.predictionsNumber
  }));

  return (
    <div className="w-full h-80" role="region" aria-label="Диаграмма исторической точности">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{top: 5, right: 20, bottom: 5, left: 0}}
        >

          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3"/>

          <Bar
            dataKey="precision"
            fill="var(--primary)"          // основной цвет темы
            radius={[0, 4, 4, 0]}               // скругление правых углов
            barSize={20}
          />

          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            stroke="var(--color-muted-foreground)"
            fontSize={14}
          />

          <YAxis
            dataKey="name"
            type="category"
            width={100}
            stroke="var(--color-muted-foreground)"
            fontSize={14}
          />

          <Tooltip
            cursor={{fill: 'var(--color-border)', opacity: 0.1}}
            formatter={(value: number) => `${value}%`}
            content={<CustomBarChartTooltip/>}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


export default PredictionBarChart;