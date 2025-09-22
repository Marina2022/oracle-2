import React from 'react';
import Logo from "@/components/shared/Logo";
import {Github, Linkedin, Mail, MapPin, Phone, Twitter} from 'lucide-react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 border-t border-border" role="contentinfo" aria-label="Подвал сайта">
      <div className="container">
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <Logo big={true}/>
            <p className="text-muted-foreground leading-relaxed">Первая в России платформа сравнения прогнозов от ИИ.
              Объединяем 7 ведущих ИИ-моделей для получения максимально точных прогнозов.</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" aria-hidden="true"/>
                <span>Москва, Россия</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" aria-hidden="true"/>
                <a href="mailto:hello@oracle-ai.ru"
                   className="hover:text-primary transition-colors"
                   aria-label="Написать на email hello@oracle-ai.ru">hello@oracle-ai.ru</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" aria-hidden="true"/>
                <a href="tel:+74951234567" aria-label="Позвонить по телефону +7 (495) 123-45-67">+7 (495) 123-45-67</a>
              </div>
            </div>

            <ul className="flex space-x-4" aria-label="Социальные сети">
              <li>
                <Button asChild
                        className="bg-transparent hover:bg-accent dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-muted-foreground hover:text-primary">
                  <a target="_blank" href="https://www.twitter.com" aria-label="Перейти в Twitter"><Twitter
                    aria-hidden="true"/></a>
                </Button>
              </li>
              <li>
                <Button asChild
                        className="bg-transparent hover:bg-accent dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-muted-foreground hover:text-primary">
                  <a target="_blank" href="https://www.linkedin.com" aria-label="Перейти в LinkedIn"><Linkedin
                    aria-hidden="true"/></a>
                </Button>
              </li>
              <li>
                <Button asChild
                        className="bg-transparent hover:bg-accent dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-muted-foreground hover:text-primary">
                  <a target="_blank" href="https://www.github.com" aria-label="Перейти в GitHub"><Github
                    aria-hidden="true"/></a>
                </Button>
              </li>
              <li>
                <Button asChild
                        className="bg-transparent hover:bg-accent dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-muted-foreground hover:text-primary">
                  <a href="mailto:hello@oracle-ai.ru" aria-label="Написать на email"><Mail aria-hidden="true"/></a>
                </Button>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Продукт</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#working-process"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Как это
                  работает</Link>
              </li>
              <li>
                <Link href="/#models"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">ИИ Модели</Link>
              </li>
              <li>
                <Link href="/#predictions"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Прогнозы</Link>
              </li>
              <li>
                <Link href="/#working-process"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Цены</Link>
              </li>
              <li>
                <a href="#"
                   className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                   aria-label="Открыть документацию API в новом окне">
                  <span>Документация API</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="lucide lucide-external-link w-3 h-3" aria-hidden="true">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Компания</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">О
                  нас</Link>
              </li>
              <li>
                <Link href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Карьера</Link>
              </li>
              <li>
                <Link href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Блог</Link>
              </li>
              <li>
                <Link href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Пресс-центр</Link>
              </li>
              <li>
                <Link href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Инвесторы</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Центр
                  помощи</Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Связаться
                  с нами</Link>
              </li>
              <li>
                <a href="#"
                   className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                   aria-label="Проверить статус системы (открывается в новом окне)">
                  <span>Статус системы</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="lucide lucide-external-link w-3 h-3" aria-hidden="true">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Сообщить
                  об ошибке</Link>
              </li>
              <li>
                <Link href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Обучение</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Правовая информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Пользовательское
                  соглашение</Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Политика
                  конфиденциальности</Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Обработка
                  персональных данных</Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Политика
                  cookies</Link>
              </li>
              <li>
                <Link href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">Лицензия</Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="mb-7"/>
        <Card className="glassmorphism p-6 text-center" role="region" aria-label="Подписка на обновления">
          <div className="flex flex-col items-start md:flex-row gap-6 md:justify-between md:items-center">
            <div className="text-left">
              <h4 className="font-medium mb-2">Подписаться на обновления</h4>
              <p className="text-sm text-muted-foreground">Получайте новости о новых ИИ-моделях и функциях платформы</p>
            </div>

            <form className="flex space-x-3 w-full md:w-auto" aria-label="Форма подписки на обновления">
              <input type="email"
                     placeholder="Ваш email"
                     aria-label="Введите ваш email"
                     className="px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-[193px]"/>
              <Button type="submit"
                      className="text-primary-foreground h-9 px-4 py-2 has-[>svg]:px-3 bg-primary hover:bg-primary/90">
                Подписаться
              </Button>
            </form>
          </div>
        </Card>
        <Separator className="my-7"/>
        <div
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-muted-foreground">
          <span>© 2024 Oracle AI. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;