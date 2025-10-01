'use client'
import React from 'react';
import TopBar from "@/components/predictionPage/1-top-bar/TopBar";

const Loading = () => {
  return (
    <>
      <TopBar prediction={null}/>
      <div className="pt-36 container pb-4 sm:pb-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Генерируем прогноз с помощью AI...</p>
        </div>
      </div>
    </>
  );
};

export default Loading;