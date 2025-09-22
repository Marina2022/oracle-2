import React from 'react';
import {Badge} from "@/components/ui/badge";
import {howItWorksSteps} from "@/mocks/home-page/howItWorksSteps";
import WorkingProcessStep from "@/components/homePage/3-working-process/WorkingProcessStep";
import TryItNow from "@/components/homePage/3-working-process/TryItNow";

const WorkingProcess = () => {
  return (
    <section id="working-process"
             className="pb-20 lg:pt-20 bg-gradient-to-b from-background to-muted/10 dark:to-muted/20">
      <div className="container ">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-6">Простой процесс</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Как это
            <span className="gradient-text"> работает</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Три простых шага от выбора события до получения
            точного прогноза от искусственного интеллекта</p>
        </div>
        <ul className="grid lg:grid-cols-3 gap-10 mb-16">
          {
            howItWorksSteps.map((step, i) => <WorkingProcessStep key={i} step={step} index={i}/>)
          }
        </ul>
        <TryItNow/>
      </div>
    </section>
  );
};

export default WorkingProcess;