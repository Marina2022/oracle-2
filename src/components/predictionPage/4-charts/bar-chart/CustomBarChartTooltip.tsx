import {Card} from "@/components/ui/card";
import {formatNumber} from "@/utils/common";

type ModelItem = {
  precision: number,
  predictionsNumber: number,
  fill: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: ModelItem }>
}

const CustomBarTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload; // наш объект из voting

    return (
      <Card
        className="p-3 glassmorphism dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm gap-1">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full bg-primary`}></div>
          <div className="font-medium">Точность {item.precision}%</div>
        </div>
        <div>Прогнозов: {formatNumber(item.predictionsNumber)}</div>
      </Card>
    )
  }
  return null;
};

export default CustomBarTooltip;

