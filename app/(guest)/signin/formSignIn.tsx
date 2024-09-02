"use client"
import { z } from "zod" 
import React, { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { LoaderCircle } from "lucide-react"
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
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email incorreto."
    }),
    password: z.string().min(6, {
        message: "A senha deve ter pelo menos 6 caracteres",
    }),
})

const FormSignIn = () => {
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false)
    

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setisLoading(true)
            // Realizando o sign-in com o NextAuth.js
            const result = await signIn("credentials", {
              redirect: false, // Impede o redirecionamento automático após o login
              email: data.email,
              password: data.password,
            });

            router.push('/alimentos')
        } catch (error: any) {
            const errors = error.response.data.errors
            if (errors.full_messages) {
                errors.full_messages.forEach((message: string) => {
                    toast({
                        variant: "destructive",
                        title: "Erro",
                        description: message,
                    })
                })
            }
        } finally {
            setisLoading(false)
        }
    
      } 

    return (
        <div className="flex justify-center items-center my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Link className="tracking-tight text-xs underline hover:text-gray-300" href={"/auth/forgot-password"} > esqueceu a senha?</Link>
                    </div>
                    {isLoading ? (
                        <Button >
                            <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
                            Entrando...
                        </Button>
                    ) :
                        (
                            <Button type="submit">
                                Entrar
                            </Button>
                        )}
                </form>
            </Form>
        </div>
    )
}

export default FormSignIn