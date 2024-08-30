"use client"

import React from "react";
import Link from "next/link";
import SlideBar from "./slidebar";
import UserMenu from "./userMenu";
import { Separator } from "../../ui/separator";
import { Button } from "@/components/ui/button";
import ButtonTheme from "@/components/buttonTheme";

const Navbar = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <ul className="flex justify-between items-center">
          <div className="sm:hidden" >
            <SlideBar />
          </div>
          <h1 className="text-2xl font-bold"> Nutricio </h1>
          <div className="flex items-center gap-2">
            <ButtonTheme />
            <UserMenu></UserMenu>
            <div className="flex gap-2 ml-10">
              <Link href="/signin">
                <Button> Entrar </Button>
              </Link>
              <Link href={"/signup"} >
                <Button> Registrar </Button>
              </Link>
            </div>
          </div>
        </ul >
      </div >
      <Separator />
    </>
  )
}

export default Navbar