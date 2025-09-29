'use client'

import React from 'react';
import {Card} from "@/components/ui/card";
import {Users} from "lucide-react";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts"
import {Voting} from '@/types/predictionTypes';
import CustomTooltip from "@/components/predictionPage/4-charts/pie-chart/CustomTooltip";
import {formatNumber} from "@/utils/common";


const PredictionPieChart = ({voting}: { voting: Voting }) => {

  const COLORS = ["var(--primary)", "#ef4444"] // Red for CSKA

  return (
    <Card className="p-4 sm:p-6 glassmorphism gap-2">
      <div className="flex items-center gap-2 mb-4 text-sm sm:text-base">
        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary"/>
        <span>Голосование сообщества</span>
      </div>
      <div className="h-48 sm:h-56 mb-4" role="region" aria-label="Диаграмма голосования">
        <ResponsiveContainer width="100%" height="100%" className="mx-auto">
          <PieChart
            margin={{top: 20, right: 20, bottom: 20, left: 20}}
          >
            <Pie
              data={voting}
              dataKey="percent"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="90%"
              paddingAngle={2}
              label={({x, y, index}) => {
                const item = voting[index];
                const color = COLORS[index % COLORS.length];
                return (
                  <text
                    x={x}
                    y={y}
                    fill={color}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{fontSize: "14px", fontWeight: 500}}
                  >
                    {item.label} {item.percent}%
                  </text>
                );
              }}
              labelLine={false}
            >
              {voting.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-3">
        {
          voting.map((item, i) => <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
              <div className="font-medium">{item.label}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">{formatNumber(item.peopleNumber)}</div>
              <div className="text-xs text-muted-foreground">{item.percent}%</div>
            </div>
          </li>)
        }
      </ul>
    </Card>
  );
};

export default PredictionPieChart;