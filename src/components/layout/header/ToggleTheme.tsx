'use client'

import {Moon, Sun} from "lucide-react";
import {useTheme} from 'next-themes'
import React from 'react';
import {Button} from "@/components/ui/button";

const ToggleTheme = () => {

  const {theme, setTheme} = useTheme()

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
      <Button variant="purplish" size="icon" className="cursor-pointer duration-300 !h-8" onClick={handleTheme}>
        <Moon className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
        <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100"/>
      </Button>
  );
};

export default ToggleTheme;