import React from 'react';
import {Globe} from "lucide-react";
import {Button} from "@/components/ui/button";

const ToggleLang = () => {
  return (
    <div className="hidden lg:block">
      <Button variant="purplish" className="cursor-pointer duration-50 !h-8 flex gap-2" >
        <span>RU</span>
        <Globe className="h-[1.2rem] w-[1.2rem] " />
      </Button>
    </div>
  );
};

export default ToggleLang;