"use client"

import { z } from "zod"
import { LoaderCircle, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter, DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import { useState } from "react"
import { getAxiosClient } from "@/services/fetchClient/axiosClient"

const FormSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    calorie: z.number().min(0, ""),
    carbohydrate: z.number().min(0, ""),
    protein: z.number().min(0, ""),
    lipids: z.number().min(0, ""),
    iron: z.number().min(0, ""),
    phosphorus: z.number().min(0, ""),
    fiber: z.number().min(0, ""),
    vitaminA: z.number().min(0, ""),
    vitaminB0: z.number().min(0, ""),
    vitaminB3: z.number().min(0, ""),
    vitaminB6: z.number().min(0, ""),
    vitaminC: z.number().min(0, ""),
    magnesium: z.number().min(0, ""),
    manganese: z.number().min(0, ""),
    copper: z.number().min(0, ""),
    zinc: z.number().min(0, ""),
    sodium: z.number().min(0, ""),
    potassium: z.number().min(0, ""),
    calcium: z.number().min(0, ""),
});

const CreateItem = () => {
    const axiosClient = getAxiosClient();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            calorie: 0,
            carbohydrate: 0,
            protein: 0,
            lipids: 0,
            iron: 0,
            phosphorus: 0,
            fiber: 0,
            vitaminA: 0,
            vitaminB0: 0,
            vitaminB3: 0,
            vitaminB6: 0,
            vitaminC: 0,
            magnesium: 0,
            manganese: 0,
            copper: 0,
            zinc: 0,
            sodium: 0,
            potassium: 0,
            calcium: 0,
        },
    })

    // async function onSubmit(data: z.infer<typeof FormSchema>) {
    //     // await signIn(data)
    //     console.log(JSON.stringify(data, null, 2))
    // }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setLoading(true)
            const response = await axiosClient.post(
                `/foods` , {
                name: data.name,
                table: "CADASTRO_PROPRIO",
                scientific_name: "",
                code: "",
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

            setTimeout(() => {
                window.location.reload();
            }, 700);

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
    };




    return (
        <>
            <Form {...form}>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost"> <Plus /> </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Criar alimento</DialogTitle>
                                <DialogDescription>
                                    Adicione um alimento especifico a lista.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="col-span-4">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nome" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                        )}
                                    />
                                    <FormField
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
                            <DialogFooter>
                                {
                                    loading ?
                                        <Button type="submit"> <LoaderCircle className="mr-2 h-6 w-6 animate-spin" /> </Button>
                                        :
                                        <Button type="submit">Criar alimento</Button>
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </Form>
        </>
    )
}

export default CreateItem