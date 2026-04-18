import HomePage from "@/components/pages/HomePage/HomePage";
import {getMatches} from "@/features/prediction/actions/getMatches";


export default async function Home() {

  const predictions = await getMatches("page=1&size=4")

  if (predictions?.error ) {
    const errorMsg = predictions?.error || 'Неизвестная ошибка'
    throw new Error(errorMsg)
  }

  return <HomePage predictions={predictions} />
}
