import { Button } from "@/components/ui/button"
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { FilePenLine } from "lucide-react"
import ExclusionButton from "./exclusion-button"
import React, { useState } from "react";

interface AlterRowProps {
    Food: Food
}

const AlterRow: React.FC<AlterRowProps> = ({
    Food
}) => {

    const [edit, setEdit] = useState(true)

    const EditingValues = () => {
        setEdit(!edit)
    }

    return (
        <>
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
        </>
    )
}

export default AlterRow