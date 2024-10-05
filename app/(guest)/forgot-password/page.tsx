/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { z } from "zod"
import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { getAxiosClient } from "@/services/fetchClient/axiosClient"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email incorreto."
    }),
})

const ForgotPassword = () => {
    const router = useRouter()
    const axiosClient = getAxiosClient()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function ForgotPassword(data: z.infer<typeof FormSchema>) {
        try {
            const response = await axiosClient.post("auth/password", {
                "email": data.email
            })

            toast({
                variant: "default",
                title: "Email enviado com sucesso!",
                description: response.data.message

            })
            router.push("/signin")
        } catch (error: any) {
            const errors = error.response.data.errors
            if (errors) {
                errors.forEach((message: string) => {
                    toast({
                        variant: "destructive",
                        title: "Erro",
                        description: message,
                    })
                })
            }
        }
    }

    return (
        <div className="flex justify-center items-center my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(ForgotPassword)} className="w-2/3 space-y-6">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="e-mail" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <Button type="submit">
                        Recuperar senha
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ForgotPassword