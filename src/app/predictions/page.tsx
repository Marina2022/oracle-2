import React from 'react';
import TopBarPredictions from "@/components/PredictionsPage/1-top-bar-predictions/TopBarPredictions";
import PredictionsPage from "@/components/pages/PredictionsPage/PredictionsPage";
import {getMatches} from "@/features/predictionCard/actions/getMatches";


const Page = async () => {

  const predictions = await getMatches()

  if (predictions?.error ) {
    const errorMsg = predictions?.error || 'Неизвестная ошибка'
    throw new Error(errorMsg)
  }

  return (
    <PredictionsPage predictions={predictions}/>
  )
}

export default Page;