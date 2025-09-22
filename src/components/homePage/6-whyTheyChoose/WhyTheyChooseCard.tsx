import React from 'react';
import {WhyTheyChooseType} from "@/types/whyTheyChooseType";
import {Card} from "@/components/ui/card";

const WhyTheyChooseCard = ({item}: { item: WhyTheyChooseType }) => {
  return (
    <li>
      <Card
        className="glassmorphism p-6 hover:scale-105 transition-all duration-300 hover:neon-glow group space-y-4 gap-0 flex flex-col h-full ">
        {item.icon}
        <h3 className="text-xl font-bold mb-3">
          {item.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {item.text}
        </p>
        <ul className="space-y-2">
          {
            item.list.map((listItem, i) => <li key={i} className="flex items-center space-x-3">
              <div className="space-x-3 flex items-center">
                <div className={`w-2 h-2 bg-${item.colorClass}/20 rounded-full`}></div>
                <div>{listItem}</div>
              </div>
            </li>)
          }
        </ul>
      </Card>
    </li>
  );
};

export default WhyTheyChooseCard;