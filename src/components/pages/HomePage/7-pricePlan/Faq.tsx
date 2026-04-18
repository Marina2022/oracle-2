import React from 'react';
import {Card} from "@/components/ui/card";
import {Check} from "lucide-react";

const Faq = () => {

  const faqItems = [
    {
      question: "Можно ли изменить план в любое время?",
      answer: "Да, вы можете повысить или понизить план в любое время. При понижении новый план начнет действовать с следующего периода."
    },
    {
      question: "Есть ли скидки для студентов?",
      answer: "Да, студенты и преподаватели получают скидку 50% на план Профи при предоставлении справки из учебного заведения."
    },
    {
      question: "Что происходит с данными при отмене подписки?",
      answer: "Ваши данные сохраняются в течение 90 дней после отмены. Вы можете экспортировать их в любое время."
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-8">Часто задаваемые вопросы</h3>
      <ul className="space-y-6">
        {
          faqItems.map((item, i) => <li key={i}>
            <Card className="glassmorphism p-6">
              <p className="font-medium mb-3">
                {item.question}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.answer}
              </p>
            </Card>
          </li>)
        }
      </ul>
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-3 bg-chart-4/10 text-chart-4 px-6 py-3 rounded-full">
          <Check className="w-5 h-5"/>
          <span>30 дней гарантии возврата средств</span>
        </div>
      </div>
    </div>
  );
};

export default Faq;