'use client'

import React, {useState} from 'react';
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from '@/components/ui/button';
import {TrendingDown, TrendingUp} from "lucide-react";
import {PredictionDetailed} from "@/types/predictionTypes";

const YourPrediction = ({prediction}:{prediction: PredictionDetailed }) => {

  const [yourPrediction, setYourPrediction] = useState<boolean | null>(null)

  let firstBtnClass
  if (yourPrediction ===null || yourPrediction === false) firstBtnClass = "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 shadow-none border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[>svg]:px-4 gap-2 w-full sm:w-auto sm:px-8"
  if (yourPrediction ===true) firstBtnClass = "bg-primary text-primary-foreground hover:bg-primary/90  border hover:text-accent-foreground border-border h-10 rounded-md px-6 has-[>svg]:px-4 gap-2 w-full sm:w-auto sm:px-8"

  let secondBtnClass
  if (yourPrediction ===null || yourPrediction === true) secondBtnClass = "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 shadow-none border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[>svg]:px-4 gap-2 w-full sm:w-auto sm:px-8"
  if (yourPrediction ===false) secondBtnClass = "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 h-10 rounded-md px-6 has-[>svg]:px-4 gap-2 w-full sm:w-auto sm:px-8"

  return (
    <Card className="p-4 sm:p-8 glassmorphism items-center">
      <Badge className="bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 mb-2 sm:mb-4 text-xs">
        {prediction.category}
      </Badge>
      <h1 className="gradient-text text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-[1.3]">
        {prediction.title}
      </h1>
      <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto text-center">
        {prediction.description}
      </p>
      <div className="mt-4 sm:mt-8 p-4 sm:p-6 bg-muted/20 rounded-lg w-full text-center">
        <p className="font-medium mb-4 text-sm sm:text-base">Ваш прогноз</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button className={firstBtnClass} onClick={() => {
            if (yourPrediction !==null) return
            setYourPrediction(true)
          }}>
            <TrendingUp/>
            <span className="text-sm sm:text-base">Зенит</span>
          </Button>
          <Button className={secondBtnClass} onClick={() => {
            if (yourPrediction !==null) return
            setYourPrediction(false)
          }}>
            <TrendingDown/>
            <span className="text-sm sm:text-base">ЦСКА</span>
          </Button>
        </div>
        {
          yourPrediction  !== null && <p className="text-xs sm:text-sm text-muted-foreground mt-4">Ваш голос учтен! Спасибо за участие в прогнозе.</p>
        }
      </div>
    </Card>
  );
};

export default YourPrediction;