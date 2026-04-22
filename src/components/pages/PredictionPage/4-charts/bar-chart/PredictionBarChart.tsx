'use client'

import React from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import CustomBarChartTooltip from "@/components/pages/PredictionPage/4-charts/bar-chart/CustomBarChartTooltip";
import {PredictionModel} from "@/features/prediction/types/PredictionType";

const PredictionBarChart = ({models}: { models: PredictionModel[] }) => {

  const data = models.map(model => ({
    name: model.model_title,
    precision: model.historic_precision * 100,
    predictionsNumber: model.predictions_number
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
            formatter={(value) => (value == null ? '' : `${value}%`)}
            content={<CustomBarChartTooltip/>}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


export default PredictionBarChart;