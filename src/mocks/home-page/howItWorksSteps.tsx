import React from "react";
import {Brain, ChartColumn, Search} from "lucide-react";

const Step1Icon = () => {
  return <div
    className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
    <Search className="w-8 h-8 md:w-12 md:h-12"/>
  </div>
}

const Step2Icon = () => {
  return <div
    className="w-16 h-16 md:w-20 md:h-20 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
    <Brain className="w-8 h-8 md:w-12 md:h-12"/>
  </div>
}

const Step3Icon = () => {
  return <div
    className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
    <ChartColumn className="w-8 h-8 md:w-12 md:h-12"/>
  </div>
}

export const howItWorksSteps = [
  {
    icon: <Step1Icon/>,
    title: "Выберите событие или добавьте свой вопрос",
    text: "Выбирайте из категорий: спорт, политика, экономика, криптовалюты, погода и многое другое",
    list: [
      "500+ активных событий",
      "Ежедневные обновления",
      "Российская повестка"
    ],
    color: "primary"
  },
  {
    icon: <Step2Icon/>,
    title: "Сравните прогнозы ИИ",
    text: "Смотрите предсказания от 7 ведущих ИИ-моделей и анализируйте их консенсус в реальном времени",
    list: [
      "Консенсус в реальном времени",
      "Индивидуальная точность",
      "Объяснение логики ИИ",
    ],
    color: "secondary"
  },
  {
    icon: <Step3Icon/>,
    title: "Следите за результатами",
    text: "Отслеживайте исполнение прогнозов, зарабатывайте очки опыта и делитесь результатами",
    list: [
      "Система достижений",
      "Социальные инфографики",
      "Рейтинг пользователей"
    ],
    color: "accent"
  },
]