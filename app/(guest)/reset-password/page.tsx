"use client";

import { z } from "zod";
import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { getAxiosClient } from "@/services/fetchClient/axiosClient";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";

const FormSchema = z
    .object({
        password: z.string().min(8, {
            message: "A senha deve ter pelo menos 8 caracteres",
        }),
        password_confirmation: z.string().min(8, {
            message: "A confirmação senha deve ter pelo menos 8 caracteres",
        }),
    })
    .refine(data => data.password === data.password_confirmation, {
        message: "As senhas não coincidem",
        path: ["password_confirmation"],
    });

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const axiosClient = getAxiosClient();
    const searchParams = useSearchParams();

    // Ensure that searchParams is handled in a way that respects Suspense
    const accessToken = searchParams.get("access-token");
    const client = searchParams.get("client");
    const uid = searchParams.get("uid");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);
            const response = await axiosClient.put("/auth/password", {
                password: data.password,
                password_confirmation: data.password_confirmation,
            }, {
                headers: {
                    "access-token": accessToken,
                    client: client,
                    uid: uid,
                },
            });
            toast({
                variant: "default",
                title: "Sucesso",
                description: response.data.message,
            });
            router.replace("/signin");
        } catch (error: unknown) {
            console.error(error);
            if (axios.isAxiosError(error) && error.response) {
                const errors = error.response.data.errors;
                if (errors.full_messages) {
                    toast({
                        variant: "destructive",
                        title: "Erro",
                        description: "Se você recebeu um e-mail para redefinir sua senha, por favor, certifique-se de estar usando a URL correta.",
                    });
                } else {
                    errors.forEach((message: string) => {
                        toast({
                            variant: "destructive",
                            title: "Erro",
                            description: message,
                        });
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center my-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmação de senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirmar senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
                                Alterando...
                            </>
                        ) : (
                            "Alterar"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

const ResetPasswordWrapper = () => {
    return (
        <Suspense fallback={<LoaderCircle className="h-6 w-6 animate-spin" />}>
            <ResetPassword />
        </Suspense>
    );
};

export default ResetPasswordWrapper;
