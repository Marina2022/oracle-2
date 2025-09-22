import React from 'react';
import {Badge} from "@/components/ui/badge";
import BasePlan from "@/components/homePage/7-pricePlan/BasePlan";
import ProfiPlan from "@/components/homePage/7-pricePlan/ProfiPlan";
import TeamPlan from "@/components/homePage/7-pricePlan/TeamPlan";
import Special from "@/components/homePage/7-pricePlan/Special";
import Faq from "@/components/homePage/7-pricePlan/Faq";

const PricePlan = () => {
  return (
    <section id="prices" className="py-20 bg-gradient-to-b from-background to-muted/10 dark:to-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-6">Тарифные планы</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Выберите
            <span className="gradient-text"> план</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Начните с бесплатного плана или выберите Профи для полного доступа ко всем возможностям платформы
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          <BasePlan/>
          <ProfiPlan/>
          <TeamPlan/>
        </div>
        <Special/>
        <Faq/>
      </div>
    </section>
  );
};

export default PricePlan;