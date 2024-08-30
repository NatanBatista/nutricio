
import ButtonTheme from "@/components/buttonTheme";
import SlideBar from "@/components/guest/navbar/slidebar";
import UserMenu from "@/components/guest/navbar/userMenu";
import { Separator } from "@/components/ui/separator";


const elementosBarra = [
    { nome: "Início", path: "/path/to/icon1.svg" },
    { nome: "Sobre", path: "/path/to/icon2.svg" },
    { nome: "Contato", path: "/path/to/icon3.svg" }
];

const NavbarDefault = () => {
    return (
        <div className="flex h-screen">
            {/* Barra Lateral */}
            <aside className="flex flex-col h-screen w-[220px] fixed">
                <div className="m-3 mb-10 flex items-center gap-2 font-extrabold">
                    <span>{"Nutricio"}</span>
                </div>
                {/* NavBar */}
                <nav className="flex flex-col flex-grow items-start">
                    {elementosBarra.map((item, index) => (
                        <li
                            key={index}
                            className="relative flex pl-4 h-12 w-full transition hover:bg-gray-100 dark:hover:bg-gray-700 items-center">
                            {/* <Image src={item.path} width={14} height={16} alt="logo" /> */}
                            <span>{item.nome}</span>
                            {/* Pseudo-elemento para a borda interna */}
                            <div className="absolute inset-0 border-l-4 dark:border-gray-800 opacity-0 transition duration-200 hover:opacity-100" />
                        </li>
                    ))}
                </nav>
            </aside>

            {/* Conteúdo Principal */}
            <div className="ml-[220px] pl-[100px] flex-1">
                <div className="container mx-auto p-4">
                    <ul className="flex justify-between items-center">
                        <div className="sm:hidden" >
                            <SlideBar />
                        </div>
                        <h1 className="text-2xl font-bold"> Alimentos </h1>
                        <div className="flex items-center gap-2">
                            <ButtonTheme />
                            <UserMenu></UserMenu>

                        </div>
                    </ul>
                </div>
                <Separator orientation="vertical" />
                {/* Aqui vai o conteúdo principal */}
            </div>
        </div>
    );
}

export default NavbarDefault;
