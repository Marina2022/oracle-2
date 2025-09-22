import React from 'react';
import FindOutYourFuture from "@/components/homePage/1-hero/FindOutYourFuture";
import RealTimePrediction from './RealTimePrediction';

const Hero = () => {
  return (
    <section className="pt-0 pb-12 min-h-screen flex items-center
                    bg-gradient-to-br from-primary/5 via-background to-accent/5
                    dark:from-primary/10 dark:via-background dark:to-accent/10 relative">

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20  sm:gap-12 xl:gap-24 items-center container pt-22">
        <FindOutYourFuture/>
        <RealTimePrediction/>
      </div>
    </section>
  );
};

export default Hero;