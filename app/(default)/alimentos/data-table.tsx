"use client"

import AlterRow from "./alter-row";
import React, { useEffect, useState } from "react";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger
} from "@/components/ui/drawer";

import {
    Table,
    TableCaption,
    TableHeader, TableRow,
    TableHead, TableBody,
    TableCell
} from "@/components/ui/table";

import { getAxiosClient } from "@/services/fetchClient/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationGlobal from "@/components/pagination";

interface Meta {
    current_page: number
    total_pages: number
    total_count: number
}

interface Response {
    foods: Food[]
    meta: Meta
}

const DataTable = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const axiosClient = getAxiosClient();

    const [response, setResponse] = useState<Response | null>(null);
    const pageFromQuery = searchParams.get('page') || '1';
    const [page, setPage] = useState<number>(parseInt(pageFromQuery));

    async function fetchData() {
        try {
            const res = await axiosClient.get(`/foods?page=${page}`);
            setResponse(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
            <ScrollArea >
                <Table className="w-96 sm:whitespace-nowrap sm:w-full">
                    <TableCaption>Lista de alimentos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nome</TableHead>
                            <TableHead className="text-right">Caloria</TableHead>
                            <TableHead className="text-right">Carboidratos</TableHead>
                            <TableHead className="text-right">Proteínas</TableHead>
                            <TableHead className="text-right">Ferro</TableHead>
                            <TableHead className="text-right">Fósforo</TableHead>
                            <TableHead className="text-right">Fibras</TableHead>
                            <TableHead className="text-right">Vitamina A</TableHead>
                            <TableHead className="text-right">Vitamina B6</TableHead>
                            <TableHead className="text-right">Vitamina C</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {response ? (
                            response.foods.map((food, index) => (
                                <Drawer key={index}>
                                    <DrawerTrigger asChild>
                                        <TableRow>
                                            <TableCell className="font-medium">{food.name}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.energy_kcal}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.total_carbohydrate}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.protein}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.iron}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.phosphorus}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.dietary_fiber}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.vitamin_a}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.vitamin_b6}</TableCell>
                                            <TableCell className="text-right">{food.nutricional_value.vitamin_c}</TableCell>
                                        </TableRow>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <AlterRow Food={food} />
                                    </DrawerContent>
                                </Drawer>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center">
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            <PaginationGlobal page={page} total_pages={response?.meta.total_pages ?? 1} setPage={setPage}/>
            
        </>
    );
};

export default DataTable;
