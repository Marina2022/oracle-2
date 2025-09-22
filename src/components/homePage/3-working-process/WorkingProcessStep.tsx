import React from 'react';
import {Card} from "@/components/ui/card";
import {ArrowRight} from "lucide-react";
import {WorkingStep} from "@/types/workingSteps";

const WorkingProcessStep = ({step, index}: { step: WorkingStep, index: number }) => {
  return (
    <li className="relative flex flex-col gap-4">
      <Card
        className="gap-6 rounded-xl border glassmorphism p-8 h-full hover:scale-105 transition-all duration-300 hover:neon-glow group ">
        <div className="flex items-center justify-between">
          {step.icon}
          <span className="text-6xl font-bold text-muted-foreground/20">0{index + 1}</span>
        </div>
        <h3 className="text-2xl font-semibold ">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed mt-auto">{step.text}</p>
        <ul className="space-y-3">
          {
            step.list.map((item, i) => <li key={i} className="text-sm text-muted-foreground">
              <div className="space-x-3 flex items-center">
                <div className={`w-2 h-2 bg-${step.color}/20 rounded-full`}></div>
                <div>{item}</div>
              </div>
            </li>)
          }
        </ul>
      </Card>

      {/* условие index !== 2 - чтобы стрелку у последней карточки не показывать  */}
      {
        index !== 2 && <div className="hidden lg:block absolute top-1/2 -right-9 transform -translate-y-1/2 z-10">
          <ArrowRight className="w-8 h-8 text-muted-foreground/50"/>
        </div>
      }
    </li>
  );
};

export default WorkingProcessStep;