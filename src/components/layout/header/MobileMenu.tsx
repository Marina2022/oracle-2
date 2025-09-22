'use client'

import * as React from "react"
import {ReactNode, useState} from "react"
import Link from "next/link"
import {Menu, Shield} from "lucide-react"
import {usePathname} from "next/navigation";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger,} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {Progress} from "@/components/ui/progress";
import {DialogTitle} from "@radix-ui/react-dialog";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";

type MenuItemsType = { title: string, link: string, icon?: ReactNode }[]

const MobileMenu = ({loggedInMenu, loggedOutMenu, isLoggedIn}: {
  loggedInMenu: MenuItemsType,
  loggedOutMenu: MenuItemsType,
  isLoggedIn: boolean
}) => {

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)
  const handleLinkClick = () => {
    setIsOpen(false) // закрываем меню при клике
  }

  return (
    <div className="2xl:hidden"> {/* прячем на больших экранах */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Открыть меню">
            <Menu className="h-6 w-6"/>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-74 border border-sidebar-border bg-sidebar-accent p-6">
          <SheetHeader className="p-0 mt-4">
            <DialogTitle className="hidden"></DialogTitle>
            <SheetDescription className="sr-only">
              Мобильное меню
            </SheetDescription>

            {
              isLoggedIn && (
                <div className="rounded-lg mobile-menu-gradient p-4">
                  <div className="flex items-center justify-between text-sm w-full">
                    <div className="font-medium">Прогресс</div>
                    <div>1250/1400 XP</div>
                  </div>
                  <Progress value={90} className="h-1.5 my-2"/>
                  <p className="text-sm">До следующего уровня 150 XP</p>
                </div>
              )
            }
          </SheetHeader>

          {
            isLoggedIn && (
              <nav className="mt-4 flex flex-col" role="navigation">
                {
                  loggedInMenu.map((item, i) => <Link
                    key={i}
                    href={item.link}
                    className={`text-sm text-foreground p-2 py-3 rounded-md flex items-center gap-2 ${item.link === pathname ? 'bg-muted-foreground/5 text-primary font-medium ' : ''} `}
                    onClick={handleLinkClick}
                  >
                    {item.icon}
                    {item.title}
                  </Link>)
                }

                <Separator className="mt-4 mb-3"/>
                <div>
                  <p className="text-sm">АДМИНИСТРИРОВАНИЕ</p>
                  <Link href="#"
                        className="text-sm text-chart-5 border border-chart-5 p-2 py-3 rounded-md flex items-center gap-2 ${item.link === pathname ? 'bg-muted-foreground/5 font-medium mt-2">
                    <Shield className="h-4 w-4"/>
                    <span>Админ-панель</span>
                    <Badge className="ml-auto bg-chart-5/20 text-chart-5">NEW</Badge>
                  </Link>
                </div>
              </nav>
            )
          }

          {
            !isLoggedIn && (
              <nav className="-mt-4 flex flex-col" role="navigation">
                {
                  loggedOutMenu.map((item, i) => <Link
                    key={i}
                    href={item.link}
                    className={`text-sm text-foreground p-2 py-3 rounded-md flex items-center gap-2 ${item.link === pathname ? 'bg-muted-foreground/5 text-primary font-medium ' : ''} `}
                    onClick={handleLinkClick}
                  >
                    {item.icon}
                    {item.title}
                  </Link>)
                }
              </nav>
            )
          }
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu