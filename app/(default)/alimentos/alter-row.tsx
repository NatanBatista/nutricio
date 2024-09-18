"use client"

import { z } from "zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FilePenLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { getAxiosClient } from "@/services/fetchClient/axiosClient"

import {
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    calorie: z.number({ message: "" }).min(0, ""),
    carbohydrate: z.number({ message: "" }).min(0, ""),
    protein: z.number({ message: "" }).min(0, ""),
    lipids: z.number({ message: "" }).min(0, ""),
    iron: z.number({ message: "" }).min(0, ""),
    phosphorus: z.number({ message: "" }).min(0, ""),
    fiber: z.number({ message: "" }).min(0, ""),
    vitaminA: z.number({ message: "" }).min(0, ""),
    vitaminB0: z.number({ message: "" }).min(0, ""),
    vitaminB3: z.number({ message: "" }).min(0, ""),
    vitaminB6: z.number({ message: "" }).min(0, ""),
    vitaminC: z.number({ message: "" }).min(0, ""),
    magnesium: z.number({ message: "" }).min(0, ""),
    manganese: z.number({ message: "" }).min(0, ""),
    copper: z.number({ message: "" }).min(0, ""),
    zinc: z.number({ message: "" }).min(0, ""),
    sodium: z.number({ message: "" }).min(0, ""),
    potassium: z.number({ message: "" }).min(0, ""),
    calcium: z.number({ message: "" }).min(0, ""),
})

interface AlterRowProps {
    Food: Food
}

const AlterRow: React.FC<AlterRowProps> = ({
    Food
}) => {
    const router = useRouter()
    const axiosClient = getAxiosClient()
    const [edit, setEdit] = useState(true)
    const [loading, setLoading] = useState(true)

    const EditingValues = () => {
        setEdit(!edit)
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            calorie: Food.nutricional_value.energy_kcal,
            carbohydrate: Food.nutricional_value.total_carbohydrate,
            protein: Food.nutricional_value.protein,
            lipids: Food.nutricional_value.lipids,
            iron: Food.nutricional_value.iron,
            phosphorus: Food.nutricional_value.phosphorus,
            fiber: Food.nutricional_value.dietary_fiber,
            vitaminA: Food.nutricional_value.vitamin_a,
            vitaminB0: Food.nutricional_value.thiamine,
            vitaminB3: Food.nutricional_value.niacin,
            vitaminB6: Food.nutricional_value.vitamin_b6,
            vitaminC: Food.nutricional_value.vitamin_c,
            magnesium: Food.nutricional_value.magnesium,
            manganese: Food.nutricional_value.manganese,
            copper: Food.nutricional_value.copper,
            zinc: Food.nutricional_value.zinc,
            sodium: Food.nutricional_value.sodium,
            potassium: Food.nutricional_value.potassium,
            calcium: Food.nutricional_value.calcium,
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        // console.log(JSON.stringify(data, null, 2))
        try {
            setLoading(true)
            const response = await axiosClient.put(
                `/foods/${Food.id}`, {
                nutricional_value_attributes: {
                    energy_kcal: data.calorie,
                    total_carbohydrate: data.carbohydrate,
                    protein: data.protein,
                    lipids: data.lipids,
                    iron: data.iron,
                    phosphorus: data.phosphorus,
                    dietary_fiber: data.fiber,
                    vitamin_a: data.vitaminA,
                    thiamine: data.vitaminB0,
                    niacin: data.vitaminB3,
                    vitamin_b6: data.vitaminB6,
                    vitamin_c: data.vitaminC,
                    magnesium: data.magnesium,
                    manganese: data.manganese,
                    copper: data.copper,
                    zinc: data.zinc,
                    sodium: data.sodium,
                    potassium: data.potassium,
                    calcium: data.calcium,
                }
            }
            )

            router.push("/")

            toast({
                variant: "default",
                title: "Item alterado com sucesso!",
            })

            console.log(response)
        } catch (error) {
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: any) => void
    ) => {
        // Substitui vírgulas por pontos para permitir a entrada de valores decimais
        const inputValue = e.target.value.replace(',', '.');
        const floatValue = parseFloat(inputValue);

        // Verifica se o valor inserido é um número positivo
        if (!isNaN(floatValue) && floatValue >= 0) {
            onChange(floatValue); // Atualiza o valor no estado do formulário
        } else {
            onChange(''); // Define um valor vazio ou pode lançar um erro
            // Ou, se preferir lançar um erro:
            // setError("calorie", { type: "manual", message: "O valor inserido deve ser um número positivo." });
        }
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="calorie"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Caloria</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Caloria"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="carbohydrate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Carboidrato</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Carboidrato"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="protein"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Proteína</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Proteína"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="lipids"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lipidio</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Lipidio"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="iron"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ferro</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Ferro"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="phosphorus"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fósforo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Fósforo"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="fiber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fibra</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Fibra"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="vitaminA"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vitamina A</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Vitamina A"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="vitaminB0"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vitamina B0</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Vitamina B0"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="vitaminB3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vitamina B3</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Vitamina B3"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="vitaminB6"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vitamina B6</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Vitamina B6"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="vitaminC"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vitamina C</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Vitamina C"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="magnesium"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Magnésio</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Magnésio"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="manganese"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Manganês</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Manganês"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="copper"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cobre</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Cobre"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="zinc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zinco</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Zinco"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="sodium"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sódio</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Sódio"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="potassium"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Potássio</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Potássio"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={edit}
                                    control={form.control}
                                    name="calcium"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cálcio</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Cálcio"
                                                    {...field}
                                                    onChange={(e) => handleNumberChange(e, field.onChange)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button disabled={edit}>Alterar</Button>
                            <DrawerClose asChild>
                                <Button variant="outline"> Cancelar </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default AlterRow