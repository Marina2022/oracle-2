import React from 'react';
import {Badge} from "@/components/ui/badge";
import {whyTheyChoose} from "@/mocks/home-page/whyTheyChoose";
import WhyTheyChooseCard from "@/components/homePage/6-whyTheyChoose/WhyTheyChooseCard";
import MoreCapabilities from "@/components/homePage/6-whyTheyChoose/MoreCapabilities";
import OracleVsTraditional from "@/components/homePage/6-whyTheyChoose/OracleVsTraditional";

const WhyTheyChoose = () => {
  return (
    <section className="py-20 container">
      <div className="text-center mb-16">
        <Badge className="bg-accent/20 text-accent border-accent/30 mb-6">
          Возможности платформы
        </Badge>
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Почему выбирают <span className="gradient-text">Оракул</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Уникальное сочетание развлечения, образования и
          высоких технологий для получения точных прогнозов от искусственного интеллекта</p>
      </div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {
          whyTheyChoose.map((item, i) => <WhyTheyChooseCard key={i} item={item}/>)
        }
      </ul>
      <MoreCapabilities/>
      <OracleVsTraditional/>
    </section>
  );
};

export default WhyTheyChoose;