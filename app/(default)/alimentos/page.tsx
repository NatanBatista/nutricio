"use client";

import axios from 'axios'
import DataTable from "./data-table";
import CreateItem from "./create-item";
import React, { useEffect, useState } from "react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Alimentos = () => {
    const [foods, setFoods] = useState<Food[]>([]);


    async function fetchData() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/foods`);
            setFoods(response.data); // Popula o estado 'food' com os dados da resposta
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData(); // Chama a função fetchData quando o componente monta
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-10"> Alimentos </h1>
                <CreateItem />
            </div>
            <DataTable Foods={foods} />
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