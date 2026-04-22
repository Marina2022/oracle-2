'use client'


import TopBar from "@/components/pages/PredictionPage/1-top-bar/TopBar";
import {useEffect} from "react";

const Loading = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopBar prediction={null}/>
      <div className="pt-36 container pb-4 sm:pb-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;