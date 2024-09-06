import DataTable from "./data-table";
import CreateItem from "./create-item";
import React from "react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Alimentos = async () => {
    const session = await auth()
 
    if (!session) {
        redirect('/')
    }

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-10"> Alimentos </h1>
                <CreateItem />
            </div>
            <DataTable />
        </>
    )
}

export default Alimentos