import {Brain, Target, Bot, Zap, Sparkles, Globe, Cpu} from "lucide-react"


const BotIcon = ()=>{
  return <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
    <Bot />
  </div>
}

const BrainIcon = ()=>{
  return <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300"><Brain /></div>
}

const TargetIcon = ()=>{
  return <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
    <Target />
  </div>
}

const ZapIcon = ()=>{
  return <div className="w-16 h-16 bg-chart-4/10 rounded-xl flex items-center justify-center text-chart-4 group-hover:scale-110 transition-transform duration-300">
    <Zap />
  </div>
}

const SparklesIcon = ()=>{
  return <div className="w-16 h-16 bg-chart-5/10 rounded-xl flex items-center justify-center text-chart-5 group-hover:scale-110 transition-transform duration-300">
    <Sparkles />
  </div>
}

const GlobeIcon = ()=>{
  return <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
    <Globe />
  </div>
}

const GPT4oIcon = ()=>{
  return <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
    <Cpu />
  </div>
}

export const models = [
  {
    id: "1",
    title: "ChatGPT",
    description: "Самый популярный ИИ в мире",
    precision: 92,
    predictionNumber: 2847,
    icon: <BotIcon />
  },
  {
    id: "2",
    title: "Claude",
    description: "Антропическая модель для анализа",
    predictionNumber: 2156,
    precision: 89,
    icon: <BrainIcon />
  },  {
    id: "3",
    title: "YandexGPT",
    description: "Российская модель для локального контекста",
    predictionNumber: 1923,
    precision: 94,
    icon: <TargetIcon />
  },
  {
    id: "4",
    title: "GigaChat",
    description: "Сбер ИИ для российского рынка",
    predictionNumber: 1456,
    precision: 87,
    icon: <ZapIcon />
  },
  {
    id: "5",
    title: "Gemini",
    description: "Google AI для комплексного анализа",
    predictionNumber: 2234,
    precision: 91,
    icon: <SparklesIcon />
  },
  {
    id: "6",
    title: "Perplexity",
    description: "ИИ поисковик для актуальных данных",
    predictionNumber: 1789,
    precision: 88,
    icon: <GlobeIcon />
  },
  {
    id: "7",
    title: "GPT-4o",
    description: "Самая продвинутая модель OpenAI",
    predictionNumber: 3124,
    precision: 95,
    icon: <GPT4oIcon />
  }
]