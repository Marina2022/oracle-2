'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowLeft, Clock, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {PredictionDetailed} from "@/types/predictionTypes";


const TopBar = ({prediction}: { prediction: PredictionDetailed | null }) => {

  console.log('prediction = ', prediction)

  const router = useRouter()

  const handleBack = () => {
    router.back();
  }

  let dateToShow
  if (prediction) {
    const date = new Date(prediction.timeline * 1000); // преобразуем в миллисекунды
    dateToShow = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }

  return (
    <div className="fixed top-20 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border glassmorphism">
      <div className="container py-4 flex items-center justify-between">

        <Button onClick={handleBack}
                className="bg-background dark:bg-transparent  text-foreground hover:bg-accent hover:text-accent-foreground shadow-none  border border-border dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2 self-start">
          <ArrowLeft className="h-4 w-4"/>
          <span className="hidden sm:inline">Назад</span>
        </Button>

        {
          prediction && <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 items-end ">
            <Badge className="gap-2 text-xs flex bg-transparent border border-border text-foreground">
              <Clock/>
              <span>Активно до: {dateToShow}</span>
            </Badge>
            <Badge className="gap-2 text-xs flex">
              <Users/>
              <span>{prediction.participantsNumber.toLocaleString('ru-RU')} участников</span>
            </Badge>
          </div>
        }

      </div>
    </div>
  );
};

export default TopBar;