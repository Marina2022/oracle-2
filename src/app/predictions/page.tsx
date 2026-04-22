import React from 'react';
import TopBarPredictions from "@/components/pages/PredictionsPage/1-top-bar-predictions/TopBarPredictions";
import PredictionsPage from "@/components/pages/PredictionsPage/PredictionsPage";
import {getMatches} from "@/features/prediction/actions/getMatches";
import { PAGE_LIMIT } from '@/features/prediction/consts';


const Page = async () => {

  const predictions = await getMatches(`page=1&size=${PAGE_LIMIT}`)

  console.log("predictions = ", predictions)

  if (predictions?.error ) {
    const errorMsg = predictions?.error || 'Неизвестная ошибка'
    throw new Error(errorMsg)
  }

  return (
    <PredictionsPage predictions={predictions.data} count={predictions.meta.total} />
  )
}

export default Page;