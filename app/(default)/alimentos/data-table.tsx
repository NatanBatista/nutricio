"use client"

import React, { useEffect, useState } from "react";
import AlterRow from "./alter-row";
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
import axios from "axios";



const DataTable = () => {

    const [foods, setFoods ] = useState<Food[]>([])
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
            <ScrollArea className="w-96 sm:whitespace-nowrap sm:w-full">
                <Table>
                    <TableCaption>Lista de alimentos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nome</TableHead>
                            <TableHead className="text-right">Caloria</TableHead>
                            <TableHead className="text-right"> Carboidratos</TableHead>
                            <TableHead className="text-right">Proteinas</TableHead>
                            <TableHead className="text-right">Ferro</TableHead>
                            <TableHead className="text-right">Fosforo</TableHead>
                            <TableHead className="text-right">Fibras</TableHead>
                            <TableHead className="text-right">Vitamina A</TableHead>
                            <TableHead className="text-right">Vitamina B</TableHead>
                            <TableHead className="text-right">Vitamina C</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {foods ?
                            foods.map(
                                (Food, index) => (
                                    <Drawer key={index}>
                                        <DrawerTrigger asChild>
                                            <TableRow>
                                                <TableCell className="font-medium"> {Food.name} </TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.energy_kcal}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.total_carbohydrate}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.protein}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.iron}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.phosphorus}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.dietary_fiber}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.vitamin_a}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.vitamin_b6}</TableCell>
                                                <TableCell className="text-right">{Food.nutricional_value.vitamin_c}</TableCell>
                                            </TableRow>
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <AlterRow Food={Food} />
                                        </DrawerContent>
                                    </Drawer>
                                )
                            )
                            :
                            <></>
                        }

                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea >
        </>
    )
}

export default DataTable