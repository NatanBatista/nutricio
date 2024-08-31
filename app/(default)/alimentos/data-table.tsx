import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import React from "react";
import ExclusionButton from "./exclusion-button";


type Alimentos = {
    nome: string
    caloria: number
    carboitrado: number
    proteina: number
    ferro: number
    fosforo: number
    fibra: number
    vitamina_a: number
    vitamina_b: number
    vitamina_c: number
};

type DataTableProps = {
    alimentos: Alimentos[]
};


const DataTable: React.FC<DataTableProps> = ({
    alimentos
}) => {
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
                        {alimentos.map(
                            (alimento, index) => (
                                <Drawer key={index}>
                                    <DrawerTrigger asChild>
                                        <TableRow>
                                            <TableCell className="font-medium"> {alimento.nome} </TableCell>
                                            <TableCell className="text-right">{alimento.caloria}</TableCell>
                                            <TableCell className="text-right">{alimento.carboitrado}</TableCell>
                                            <TableCell className="text-right">{alimento.proteina}</TableCell>
                                            <TableCell className="text-right">{alimento.ferro}</TableCell> 
                                            <TableCell className="text-right">{alimento.fosforo}</TableCell> 
                                            <TableCell className="text-right">{alimento.fibra}</TableCell> 
                                            <TableCell className="text-right">{alimento.vitamina_a}</TableCell> 
                                            <TableCell className="text-right">{alimento.vitamina_b}</TableCell> 
                                            <TableCell className="text-right">{alimento.vitamina_c}</TableCell> 
                                        </TableRow>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div className="mx-auto w-full max-w-md">
                                            <DrawerHeader >
                                                <DrawerTitle>{alimento.nome}</DrawerTitle>
                                                <DrawerDescription>Alterar dados do alimento</DrawerDescription>
                                            </DrawerHeader>
                                            <div className="grid grid-cols-4 gap-4">
                                                <Input type="" placeholder="Caloria" defaultValue={alimento.caloria} />
                                                <Input type="" placeholder="Carboitrado" defaultValue={alimento.carboitrado} />
                                                <Input type="" placeholder="Proteina" defaultValue={alimento.proteina} />
                                                <Input type="" placeholder="Ferro" defaultValue={alimento.ferro} />
                                                <Input type="" placeholder="Fósforo" defaultValue={alimento.fosforo} />
                                                <Input type="" placeholder="Fibra" defaultValue={alimento.fibra} />
                                                <Input type="" placeholder="Vitamina a" defaultValue={alimento.vitamina_a} />
                                                <Input type="" placeholder="Vitamina b" defaultValue={alimento.vitamina_b} />
                                                <Input type="" placeholder="Vitamnia c" defaultValue={alimento.vitamina_c} />
                                            </div>
                                            <DrawerFooter>
                                                <Button>Alterar</Button>
                                                <ExclusionButton />
                                                <DrawerClose asChild>
                                                    <Button variant="outline"> Cancelar </Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </div>

                                    </DrawerContent>
                                </Drawer>
                            )
                        )}

                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea >
        </>
    )
}

export default DataTable