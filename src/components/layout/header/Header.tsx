'use client'

import Link from "next/link";
import ToggleTheme from './ToggleTheme';
import UserMenu from "@/components/layout/header/UserMenu";
import Logo from "@/components/shared/Logo";
import ToggleLang from "@/components/layout/header/ToggleLang";
import {Bell, Bot, ChartColumn, Crown, Eye, House, MessageSquare, Settings, Trophy, User, Users} from "lucide-react"
import {useState} from "react";
import MobileMenu from "@/components/layout/header/MobileMenu";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

  const loggedInMenu = [
    {title: "Главная", link: "/", icon: <House className="h-4 w-4" aria-hidden="true"/>},
    {title: "Мои прогнозы", link: "/predictions", icon: <Eye className="h-4 w-4" aria-hidden="true"/>},
    {title: "Турниры", link: "#", icon: <Trophy className="h-4 w-4" aria-hidden="true"/>},
    {title: "Лиги", link: "#", icon: <Crown className="h-4 w-4" aria-hidden="true"/>},
    {title: "Профиль", link: "#", icon: <User className="h-4 w-4" aria-hidden="true"/>},
    {title: "Сообщество", link: "#", icon: <MessageSquare className="h-4 w-4" aria-hidden="true"/>},
    {title: "Аналитика", link: "#", icon: <ChartColumn className="h-4 w-4" aria-hidden="true"/>},
    {title: "Битва AI", link: "#", icon: <Bot className="h-4 w-4" aria-hidden="true"/>},
    {title: "Друзья", link: "#", icon: <Users className="h-4 w-4" aria-hidden="true"/>},
    {title: "Настройки", link: "#", icon: <Settings className="h-4 w-4" aria-hidden="true"/>},
  ];

  const loggedOutMenu = [
    {title: "Главная", link: "/", icon: <House className="h-4 w-4" aria-hidden="true"/>},
    {title: "Модели ИИ", link: "/#models"},
    {title: "Как работает", link: "/#working-process"},
    {title: "Прогнозы", link: "/#predictions"},
    {title: "Цены", link: "/#prices"},
  ];

  return (
    <header>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border glassmorphism"
           aria-label="Главная навигация">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <MobileMenu loggedInMenu={loggedInMenu} loggedOutMenu={loggedOutMenu} isLoggedIn={isLoggedIn}/>
            <Link href="/" className="md:mr-8" aria-label="На главную">
              <Logo/>
            </Link>
          </div>
          {!isLoggedIn &&
            <div className="hidden 2xl:flex items-center space-x-10" role="navigation" aria-label="Основное меню">
              {loggedOutMenu.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="text-foreground whitespace-nowrap hover:text-primary transition-colors"
                  aria-current={item.link === "/" ? "page" : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          }

          {isLoggedIn &&
            <div className="hidden 2xl:flex items-center gap-7 justify-between flex-1 text-sm" role="navigation"
                 aria-label="Меню пользователя">
              {loggedInMenu.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="text-foreground whitespace-nowrap hover:text-primary transition-colors"
                  aria-current={item.link === "/" ? "page" : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          }

          <div className="flex gap-1 md:ml-6 items-center">
            <ToggleTheme/>
            <ToggleLang/>
            <div className="flex gap-2 items-center">
              {isLoggedIn && (
                <div className="relative mr-2" role="status" aria-label="Уведомления">
                  <div
                    className="-top-1 -right-1 absolute rounded-full bg-primary h-3 w-3 text-primary-foreground z-10 text-[8px] flex justify-center items-center"
                    aria-label="2 непрочитанных уведомления">
                    2
                  </div>
                  <Bell className="h-4 w-4 text-foreground" aria-hidden="true"/>
                </div>
              )}
              <UserMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;