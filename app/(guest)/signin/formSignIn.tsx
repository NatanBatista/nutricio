/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { z } from "zod" 
import React, { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
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
            }) as { error?: string };

            if (result.error) {
                console.log("passei aqui error", result.error)
                toast({
                    variant: "destructive",
                    title: "Falha ao efetuar login",
                    description: `E-mail/senha incorretos ou conta não confirmada. Cheque a sua caixa de span: ${data.email}.`
                })
            }

            // // Redirecionando para a página de alimentos
            router.push("/alimentos")
            
        } catch (error: unknown) {
            console.log("passei aqui catch")
        if (error instanceof Error) {
            const errorMessage = error.message || "Ocorreu um erro desconhecido.";
            toast({
                variant: "destructive",
                title: "Erro",
                description: errorMessage,
            });
        }
        } finally {
            setisLoading(false)
        }
    
      } 

    return (
        <div className="flex justify-center items-center my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/4 space-y-6">
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
                        <Link className="tracking-tight text-xs underline hover:text-gray-300" href={"/forgot-password"} > esqueceu a senha?</Link>
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