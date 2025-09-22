'use client'

import React from 'react';
import {Card} from "@/components/ui/card";
import {PredictionType} from "@/types/predictionTypes";
import {Badge} from "@/components/ui/badge";
import {ChevronRight, Clock, TrendingDownIcon, TrendingUpIcon, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {formatParticipants} from "@/utils/common";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useRouter} from "next/navigation";
import ShareButtons from "@/components/shared/Share";
import {BASE_URL} from "../../../../consts";

const PredictionCard = ({prediction}: { prediction: PredictionType }) => {

  const router = useRouter()
  let precisionText = "Очень высокая"
  let precisionClass = "bg-chart-4/20 text-chart-4"

  if (prediction.consensus < 90) {
    precisionText = "Высокая"
    precisionClass = "bg-secondary/20 text-secondary"
  }

  if (prediction.consensus < 80) {
    precisionText = "Средняя"
    precisionClass = "bg-chart-5/20 text-chart-5"
  }

  return (
    <Card
      onClick={() => {
        router.push(`/predictions/${prediction.id}`)
      }}
      className="glassmorphism p-6 gap-0 hover:scale-[1.02] transition-all duration-300 hover:neon-glow group cursor-pointer ">

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge
              className="text-xs text-foreground bg-transparent border border-border ">{prediction.category}</Badge>
            {
              prediction.growing ? <TrendingUpIcon className="w-4 h-4 text-chart-4"/> :
                <TrendingDownIcon className="w-4 h-4 text-chart-5"/>
            }
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{prediction.title}</h3>
          <p className="text-sm text-muted-foreground mb-5">{prediction.content}</p>
        </div>
        <ShareButtons url={`${BASE_URL}/predictions/${prediction.id}`}/>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Консенсус ИИ</span>
          <span className="text-2xl font-bold text-secondary">{prediction.consensus}%</span>
        </div>
        <Progress value={prediction.consensus} className="h-3"/>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground"/>
            <span>{prediction.timeline}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground"/>
              <span>{formatParticipants(prediction.participantsNumber)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Топ модели:</span>
            <Badge className={precisionClass}>{precisionText}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs">
            {
              prediction.models.map((model, i) => <div key={i} className="flex justify-between items-center">
                <span className="text-muted-foreground">{model.title}</span>
                <span className="font-medium">{model.precision}%</span>
              </div>)
            }
          </div>
        </div>
      </div>
      <Separator className="mt-4"/>
      <Button asChild
              className="bg-transparent mt-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3 w-full justify-between text-sm">
        <Link href={`/predictions/${prediction.id}`}>
          <span>Подробный анализ</span>
          <ChevronRight className="w-4 h-4"/>
        </Link>
      </Button>
    </Card>
  );
};

export default PredictionCard;