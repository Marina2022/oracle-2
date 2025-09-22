import {Gamepad2, MapPin, Share2, Shield, Users, Zap} from "lucide-react";

const Icon1 = () => {
  return <div
    className="w-16 h-16 bg-chart-4/10 rounded-2xl flex items-center justify-center text-chart-4 group-hover:scale-110 transition-transform duration-300">
    <Shield className="w-8 h-8 text-chart-4"/>
  </div>
}

const Icon2 = () => {
  return <div
    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <Users className="w-8 h-8 text-primary"/>
  </div>
}

const Icon3 = () => {
  return <div
    className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <Share2 className="w-8 h-8 text-secondary"/>
  </div>
}

const Icon4 = () => {
  return <div
    className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <MapPin className="w-8 h-8 text-accent"/>
  </div>
}

const Icon5 = () => {
  return <div
    className="w-16 h-16 bg-chart-5/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <Gamepad2 className="w-8 h-8 text-chart-5"/>
  </div>
}

const Icon6 = () => {
  return <div
    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
    <Zap className="w-8 h-8 text-primary"/>
  </div>
}


export const whyTheyChoose = [
  {
    title: "Без азарта, только интеллект",
    text: "Никаких ставок и финансовых рисков. Только прогнозы, анализ и развитие аналитических навыков.",
    list: [
      "Образовательная платформа", "Без финансовых рисков", "Фокус на анализе"],
    icon: <Icon1/>,
    colorClass: "chart-4"
  },
  {
    title: "Социальная механика",
    text: "Система рейтингов, достижений и командных прогнозов. Соревнуйтесь с друзьями и коллегами.",
    list: [
      "Рейтинги пользователей",
      "Командные прогнозы",
      "Система достижений"
      ],
    icon: <Icon2/>,
    colorClass: "primary"
  },
  {
    title: "Вирусные инфографики",
    text: "Автоматическое создание красивых инфографик с результатами прогнозов для соцсетей.",
    list: [
      "Авто-генерация контента",
      "Готовые шаблоны",
      "Брендинг платформы"
    ],
    icon: <Icon3/>,
    colorClass: "secondary"
  },
  {
    title: "Российская повестка",
    text: "Специальный фокус на российских событиях: политика, экономика, спорт, культура.",
    list: [
      "Локальные события",
      "Российская специфика",
      "YandexGPT интеграция"
    ],
    icon: <Icon4/>,
    colorClass: "accent"
  },
  {
    title: "Геймификация процесса",
    text: "Уровни, очки опыта, достижения и турниры. Превращаем анализ в увлекательную игру.",
    list: [
      "Система уровней",
      "Еженедельные турниры",
      "Награды и призы"
    ],
    icon: <Icon5/>,
    colorClass: "chart-5"
  },
  {
    title: "ИИ-консенсус в реальном времени",
    text: "Мгновенное обновление прогнозов от 7 моделей. Отслеживание изменений в реальном времени.",
    list: [
      "Обновления каждые 15 минут",
      "История изменений",
      "Алерты на смену трендов"
    ],
    icon: <Icon6/>,
    colorClass: "primary"
  }
]