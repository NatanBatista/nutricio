"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { Button } from "@/components/ui/button"

// import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
// import axios from "axios"
// import { useState } from "react"
// import { LoaderCircle } from "lucide-react"


    const FormSchema = z.object({
        name: z.string().min(3, {
            message: "Seu Nome deve ter pelo menos 3 caracteres"
        }),
        nickname: z.string().min(3, {
            message: "Seu Apelido deve ter pelo menos 3 caracteres"
        }),
    })
const AlterData = () => {
    // const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            nickname: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
    }

    return (
        <>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apelido</FormLabel>
                                <FormControl>
                                    <Input type="" placeholder="Apelido" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* {isLoading ? (
                        <Button >
                            <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
                            Alterando...
                        </Button>
                    ) :
                        (
                            <Button type="submit">
                                Alterar
                            </Button>
                        )} */}
                </form>
            </Form>
        </>
    )
}

export default AlterData