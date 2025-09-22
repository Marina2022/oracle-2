import Hero from "@/components/homePage/1-hero/Hero";
import Models from "@/components/homePage/2-models/Models";
import WorkingProcess from "@/components/homePage/3-working-process/WorkingProcess";
import Predictions from "@/components/homePage/4-predictions/Predictions";
import Trust from "@/components/homePage/5-trust/Trust";
import WhyTheyChoose from "@/components/homePage/6-whyTheyChoose/WhyTheyChoose";
import PricePlan from "@/components/homePage/7-pricePlan/PricePlan";
import Ready from "@/components/homePage/8-ready/Ready";

export default function Home() {
  return (

      <main>
        <Hero />
        <Models />
        <WorkingProcess />
        <Predictions />
        <Trust />
        <WhyTheyChoose />
        <PricePlan />
        <Ready />
      </main>


  );
}
