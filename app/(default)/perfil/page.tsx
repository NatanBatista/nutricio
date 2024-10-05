import { redirect } from "next/navigation"
import AlterData from "./alter-data"
import React from "react";
import UpdatePicture from "./updatePicture"
import { auth } from "@/auth";

const Perfil = async () => {
    const session = await auth()

    if (!session) {
        redirect('/')
    }
    console.log(session)

    

    return (
        <div className="w-1/4 space-y-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-10"> Perfil </h1>
            </div>

            <div>
                <UpdatePicture image={session.user?.image ?? ""} name={session.user?.name ?? ""}/>
            </div>
            <AlterData />
        </div>
    )
}

export default Perfil