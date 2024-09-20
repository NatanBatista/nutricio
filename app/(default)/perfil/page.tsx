import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation"
import AlterData from "./alter-data"
import { Input } from "@/components/ui/input"

const Perfil = async () => {
    const session = await auth()
 
    if (!session) {
        redirect('/')
    }
    return (
        <div className="w-1/4 space-y-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-10"> Perfil </h1>
            </div>

            <div>
            <Avatar className="w-36 h-36 ml-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>NB </AvatarFallback>
            </Avatar>
            <Input className="mt-4" id="picture" type="file"></Input>
            </div>
            <AlterData />
        </div>
    )
}

export default Perfil