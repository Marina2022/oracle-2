import React from 'react';
import {Card} from "@/components/ui/card";
import {formatNumber} from "@/utils/common";

type VotingItem = {
  label: string
  percent: number
  peopleNumber: number,
  fill: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: VotingItem }>
}

const CustomBarChartTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload; // наш объект из voting
    return (
      <Card
        className="p-3 glassmorphism dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm gap-1">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full`} style={{backgroundColor: payload[0].payload.fill}}></div>
          <div className="font-medium">{item.label}</div>
        </div>
        <div>Голосов: {formatNumber(item.peopleNumber)}</div>
        <div>{item.percent}% от общего числа)</div>
      </Card>
    )
  }
  return null;
};

export default CustomBarChartTooltip;