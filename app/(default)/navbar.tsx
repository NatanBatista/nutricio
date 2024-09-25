import ButtonTheme from "@/components/buttonTheme";
import UserMenu from "@/components/guest/navbar/userMenu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";


const elementosBarra = [
    { nome: "Alimentos", pathIcon: "/path/to/icon1.svg", path: "/alimentos" },
    { nome: "Sobre", pathIcon: "/path/to/icon2.svg", path: "/"},
    { nome: "Contato", pathIcon: "/path/to/icon3.svg", path: "/"}
];

type NavbarDefaultProps = {
    children: React.ReactNode
}

const NavbarDefault: React.FC<NavbarDefaultProps> = ({
    children
}) => {

    return (
        <div className="flex">
            <aside className="h-screen w-[150px] fixed">
                <div className="m-3 mb-10 flex items-center gap-2 font-extrabold">
                    <span>{"Nutricio"}</span>
                </div>
                <nav className="flex flex-col flex-grow items-start">
                    {elementosBarra.map((item, index) => (
                        <Link href={item.path}
                            key={index}
                            className="relative flex pl-4 h-12 w-full transition hover:bg-gray-100 dark:hover:bg-gray-700 items-center">
                            {/* <Image src={item.path} width={14} height={16} alt="logo" /> */}
                            <span>{item.nome}</span>
                            {/* Pseudo-elemento para a borda interna */}
                            <div className="absolute inset-0 border-l-4 dark:border-gray-800 opacity-0 transition duration-200 hover:opacity-100" />
                        </Link>
                    ))}
                <Separator orientation="vertical" />
                </nav>
            </aside>
            
            {/* Conteúdo Principal */}
            <div className="ml-[150px] flex-1">
                <div className="container mx-auto p-4">
                    <ul className="flex justify-end items-center mb-10">
                        <div className="flex items-center gap-2">
                            <ButtonTheme />
                            <UserMenu></UserMenu>

                        </div>
                    </ul>
                    <div className="min-h-screen">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarDefault;
