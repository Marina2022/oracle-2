'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {ArrowLeft, Eye} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {predictions} from "@/mocks/home-page/predictions";

const TopBarPredictions = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="fixed top-20 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border glassmorphism"
         role="navigation" aria-label="Верхняя панель навигации">
      <div className="container py-4 flex items-center justify-between">
        <Button onClick={handleBack}
                aria-label="Вернуться назад"
                className="bg-background dark:bg-transparent  text-foreground hover:bg-accent hover:text-accent-foreground shadow-none  border border-border dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2 self-start">
          <ArrowLeft className="h-4 w-4" aria-hidden="true"/>
          <span className="hidden sm:inline">Назад</span>
        </Button>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 items-end ">

          <Badge className="gap-2 text-xs flex">
            <Eye aria-hidden="true"/>
            <span>{predictions.length} активных прогнозов</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TopBarPredictions;