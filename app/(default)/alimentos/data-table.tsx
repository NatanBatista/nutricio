"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import ExclusionButton from "./exclusion-button";
import { FilePenLine } from "lucide-react";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";


import {
    Table,
    TableCaption,
    TableHeader, TableRow,
    TableHead, TableBody,
    TableCell
} from "@/components/ui/table";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";

interface NutricionalValue {
    id: number;
    protein: number;
    total_carbohydrate: number;
    lipids: number;
    dietary_fiber: number;
    energy_kcal: number;
    vitamin_a: number;
    vitamin_c: number;
    thiamine: number;
    niacin: number;
    vitamin_b6: number;
    phosphorus: number;
    iron: number;
    sodium: number;
    potassium: number;
    calcium: number;
    magnesium: number;
    manganese: number;
    copper: number;
    zinc: number;
    food_id: number;
    created_at: string;
    updated_at: string;
}

interface Food {
    id: number;
    name: string;
    table: string;
    scientific_name: string;
    code: string;
    created_at: string;
    updated_at: string;
    nutricional_value: NutricionalValue;
}

type DataTableProps = {
    Foods: Food[]
}

const DataTable: React.FC<DataTableProps> = ({
    Foods
}) => {

    const [edit, setEdit] = useState(true)

    const EditingValues = () => {
        setEdit(!edit)
    }

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
                        {Foods ?
                            Foods.map(
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
                                            <div className="mx-auto w-full max-w-md">
                                                <DrawerHeader className="flex justify-between">
                                                    <div>
                                                        <DrawerTitle>{Food.name}</DrawerTitle>
                                                        <DrawerDescription>Alterar dados do alimento</DrawerDescription>
                                                    </div>
                                                    <Button onClick={EditingValues} variant="outline"> <FilePenLine /> </Button>
                                                </DrawerHeader>
                                                <div className="grid grid-cols-4 gap-4">
                                                    <Input disabled={edit} className="col-span-2" placeholder="Caloria" defaultValue={Food.nutricional_value.energy_kcal} />
                                                    <Input disabled={edit} type="number" placeholder="Carboitrado" defaultValue={Food.nutricional_value.total_carbohydrate} />
                                                    <Input disabled={edit} type="number" placeholder="Proteina" defaultValue={Food.nutricional_value.protein} />
                                                    <Input disabled={edit} type="number" placeholder="Lipidios" defaultValue={Food.nutricional_value.lipids} />
                                                    <Input disabled={edit} type="number" placeholder="Ferro" defaultValue={Food.nutricional_value.iron} />
                                                    <Input disabled={edit} type="number" placeholder="Fósforo" defaultValue={Food.nutricional_value.phosphorus} />
                                                    <Input disabled={edit} type="number" placeholder="Fibra" defaultValue={Food.nutricional_value.dietary_fiber} />
                                                    <Input disabled={edit} type="number" placeholder="Vitamina a" defaultValue={Food.nutricional_value.vitamin_a} />
                                                    <Input disabled={edit} type="number" placeholder="Vitamina b1" defaultValue={Food.nutricional_value.thiamine} />
                                                    <Input disabled={edit} type="number" placeholder="Vitamina b3" defaultValue={Food.nutricional_value.niacin} />
                                                    <Input disabled={edit} type="number" placeholder="Vitamina b6" defaultValue={Food.nutricional_value.vitamin_b6} />
                                                    <Input disabled={edit} type="number" placeholder="Vitamnia c" defaultValue={Food.nutricional_value.vitamin_c} />
                                                    <Input disabled={edit} type="number" placeholder="Magnesio" defaultValue={Food.nutricional_value.magnesium} />
                                                    <Input disabled={edit} type="number" placeholder="Mânganes" defaultValue={Food.nutricional_value.manganese} />
                                                    <Input disabled={edit} type="number" placeholder="Cobre" defaultValue={Food.nutricional_value.copper} />
                                                    <Input disabled={edit} type="number" placeholder="Zinco" defaultValue={Food.nutricional_value.zinc} />
                                                    <Input disabled={edit} type="number" placeholder="Sodio" defaultValue={Food.nutricional_value.sodium} />
                                                    <Input disabled={edit} type="number" placeholder="Potassio" defaultValue={Food.nutricional_value.potassium} />
                                                    <Input disabled={edit} type="number" placeholder="Calcio" defaultValue={Food.nutricional_value.calcium} />
                                                </div>
                                                <DrawerFooter>
                                                    <Button disabled={edit}>Alterar</Button>
                                                    <ExclusionButton id={Food.id} />
                                                    <DrawerClose asChild>
                                                        <Button variant="outline"> Cancelar </Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                                            </div>

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