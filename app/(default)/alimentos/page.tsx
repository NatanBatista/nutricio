import DataTable from "./data-table";
import CreateItem from "./create-item";
import React from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </>
    )
}

export default Alimentos