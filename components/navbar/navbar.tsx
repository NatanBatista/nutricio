"use client"

import React from "react";
import SlideBar from "./slidebar";
import { Moon, Sun } from "lucide-react"
import UserMenu from "./userMenu";
import Link from "next/link";
import { Separator } from "../ui/separator";


import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {

    const { theme, setTheme } = useTheme()
    const isAuthenticated = false

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <ul className="flex justify-between items-center">
                    <div className="sm:hidden" >
                        <SlideBar />
                    </div>
                    <h1 className="text-2xl font-bold"> Nutricio </h1>
                    <div className="flex items-center gap-2">
                    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
                        {isAuthenticated ? (
                            <>
                                <UserMenu></UserMenu>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2 ml-10">
                                    <Link href="/auth/signin">
                                        <Button> Entrar </Button>
                                    </Link>

                                    <Link href={"/auth/signup"} >
                                        <Button> Registrar </Button>
                                    </Link>
                                </div>
                            </>
                        )}

                    </div>
                </ul>
            </div>
            <Separator className="mb-10"/>

        </>
    )
}

export default Navbar