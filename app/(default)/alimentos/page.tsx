import React from "react";
import DataTable from "./data-table";


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateItem from "./create-item";

const Alimentos = () => {
    const Alimentos = [
        {
            nome: "Pao",
            caloria: 265,
            carboitrado: 12,
            proteina: 15,
            ferro: 0.456,
            fosforo: 23.1,
            fibra: 2.7,
            vitamina_a: 0,
            vitamina_b: 0.15,
            vitamina_c: 0
        },
        {
            nome: "Arroz",
            caloria: 130,
            carboitrado: 28,
            proteina: 2.7,
            ferro: 0.2,
            fosforo: 43,
            fibra: 1.8,
            vitamina_a: 0,
            vitamina_b: 0.12,
            vitamina_c: 0
        },
        {
            nome: "Feijao",
            caloria: 347,
            carboitrado: 21,
            proteina: 9,
            ferro: 2.1,
            fosforo: 142,
            fibra: 15.2,
            vitamina_a: 0,
            vitamina_b: 0.5,
            vitamina_c: 0
        },
        {
            nome: "Carne",
            caloria: 250,
            carboitrado: 0,
            proteina: 26,
            ferro: 2.7,
            fosforo: 198,
            fibra: 0,
            vitamina_a: 0,
            vitamina_b: 0.2,
            vitamina_c: 0
        },
        {
            nome: "Leite",
            caloria: 42,
            carboitrado: 5,
            proteina: 3.4,
            ferro: 0.03,
            fosforo: 101,
            fibra: 0,
            vitamina_a: 47,
            vitamina_b: 0.04,
            vitamina_c: 0
        },
        {
            nome: "Ovo",
            caloria: 155,
            carboitrado: 1.1,
            proteina: 13,
            ferro: 1.2,
            fosforo: 86,
            fibra: 0,
            vitamina_a: 64,
            vitamina_b: 0.06,
            vitamina_c: 0
        },
        {
            nome: "Banana",
            caloria: 89,
            carboitrado: 23,
            proteina: 1.3,
            ferro: 0.3,
            fosforo: 26,
            fibra: 2.6,
            vitamina_a: 3,
            vitamina_b: 0.4,
            vitamina_c: 8.7
        },
        {
            nome: "Maçã",
            caloria: 52,
            carboitrado: 14,
            proteina: 0.3,
            ferro: 0.1,
            fosforo: 11,
            fibra: 2.4,
            vitamina_a: 3,
            vitamina_b: 0.02,
            vitamina_c: 4.6
        }
    ];


    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-10"> Alimentos </h1>
                <CreateItem />
            </div>
            <DataTable alimentos={Alimentos} />
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