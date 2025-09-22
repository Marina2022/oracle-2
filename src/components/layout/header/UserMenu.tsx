import React, {Dispatch, SetStateAction} from 'react';
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ChartColumn, LogOut, Users} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/utils/common";

interface AuthStateProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

// из API
const user = {
  name: "Александр",
  avatar: null
}

const UserMenu = ({isLoggedIn, setIsLoggedIn}: AuthStateProps) => {
  return (
    <div className="justify-end gap-4 flex">
      {
        !isLoggedIn && <>
          <Link className={buttonVariants({variant: 'outline'}) + " font-medium !h-8 !hidden lg:block"}
                href="#">Войти</Link>
          <Button asChild onClick={() => setIsLoggedIn(true)}>
            <Link className={buttonVariants({variant: 'default'}) + "font-medium !h-8"} href="#">Регистрация</Link>
          </Button>
        </>
      }

      {
        isLoggedIn && <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <div className="hidden md:flex items-center gap-2 border border-border rounded-md px-3 py-1 !text-sm">
                <Users className="w-4 h-4"/>
                <span>{user.name}</span>
              </div>
              <Avatar className="w-8 h-8 md:hidden">
                {
                  user.avatar && <AvatarImage src={user.avatar} alt="avatar"/>
                }
                <AvatarFallback
                  className="w-8 h-8 bg-input text-foreground">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border border-border">
              <DropdownMenuItem className="flex gap-4">
                <ChartColumn/>
                Панель управления
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className="flex gap-4" onClick={() => setIsLoggedIn(false)}>
                <LogOut/>
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      }
    </div>
  );
};

export default UserMenu;