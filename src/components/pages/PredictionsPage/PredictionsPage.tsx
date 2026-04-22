'use client'

import s from './PredictionsPage.module.scss';
import TopBarPredictions from "@/components/pages/PredictionsPage/1-top-bar-predictions/TopBarPredictions";
import React, {useEffect, useRef, useState} from "react";
import {Badge} from "@/components/ui/badge";
import PredictionCard from "@/components/pages/HomePage/4-predictions/PredictionCard";

import {PredictionCardType} from "@/features/prediction/types/PredictionCard";
import {getMatches} from "@/features/prediction/actions/getMatches";
import {PAGE_LIMIT} from "@/features/prediction/consts";

type Props = {
  predictions: PredictionCardType[];
  count: number;
}

const PredictionsPage = ({predictions: initialPredictions, count}: Props) => {

  const observerRef = useRef<HTMLDivElement>(null)
  const [predictions, setPredictions] = useState(initialPredictions)
  const [isLoading, setIsLoading] = useState(false)


  console.log("initialPredictions = ", initialPredictions)
  console.log("predictions = ", predictions)

  // это чтобы не отправлялись старые данные, если быстро сработает handleObserverReached, а стейт с товарами еще не обновится
  const predictionsCountRef = useRef(0);
  predictionsCountRef.current = predictions.length;
  const isFetchingRef = useRef(false);


  // подгрузка по скроллу
  const handleObserverReached = async () => {

    if (isFetchingRef.current) return;
    if (isLoading || predictions.length >= count) return

    isFetchingRef.current = true;


    try {
      setIsLoading(true)

      let filtersString = ""

      // вычисляем независимо от перерендеров, т.к. иногда не успевают перерендеры за событием
      const currentOffset = predictionsCountRef.current;

      console.log('грузим: ', `size=${PAGE_LIMIT}&page=${currentOffset / PAGE_LIMIT + 1}`)
      const newPredictions = await getMatches(`size=${PAGE_LIMIT}&page=${currentOffset / PAGE_LIMIT + 1}`)

      console.log("newPredictions = ", newPredictions)

      if (newPredictions.data.length > 0) {
        setPredictions(prev => [...prev, ...newPredictions.data]);
        // Обновляем реф сразу, чтобы следующий вызов (до рендера) видел новое число
        predictionsCountRef.current += newPredictions.length;
      }

    } catch (err: unknown) {
      console.log('err = ', err)
      const e = err as { type?: string; url?: string, message?: string };
      // showErrorToast(e.message ?? 'Ошибка');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }


  // useEffect для обзервера - для infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && predictionsCountRef.current < count) {
          handleObserverReached();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0 // Сработает когда 10% элемента видно
      }
    );

    observer.observe(observerRef.current);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };

  }, []);


  return (
    <div className="pt-28">
      <TopBarPredictions totalCount={count}/>

      <section id="predictions" className="py-20 container">
        <div className="text-center mb-16">
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-6 pulse-animation">● LIVE</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 gradient-text !leading-[1.3]">Актуальные прогнозы</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Следите за развитием событий в реальном
            времени.
            ИИ-модели обновляют свои прогнозы каждые 15 минут.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {
            predictions.map((prediction, i) => <PredictionCard key={i} prediction={prediction}/>)
          }
        </div>

        {
          <div ref={observerRef}>
            {
              // isLoading && <MiniSpinner middle={true}/>
              isLoading && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-4"></div>
                </div>
              )
            }
          </div>
        }

      </section>
    </div>
  );
};

export default PredictionsPage;