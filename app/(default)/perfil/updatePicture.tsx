"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAxiosClient } from "@/services/fetchClient/axiosClient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface UpdatePictureProps {
    image: string;
    name: string;
}

const UpdatePicture: React.FC<UpdatePictureProps> = ({ image, name }) => {
    const axiosClient = getAxiosClient();
    const { update } = useSession();
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o dialog

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpdatePicture = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("user[image]", selectedFile);

        try {
            const res = await axiosClient.patch("/users/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 200) {
                await update({
                    image: res.data.image_url,
                });

                router.refresh(); // Atualiza a página para refletir as mudanças

                // Fecha o Dialog após o sucesso da operação
                setIsDialogOpen(false);

                // Exibe a mensagem de sucesso
                toast({
                    description: "Imagem atualizada com sucesso",
                });
            }
        } catch (error) {
            console.error("Error updating picture:", error);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Avatar
                        className="w-36 h-36 ml-10"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <AvatarImage src={`${image ?? ""}`} alt="@shadcn" />
                        <AvatarFallback className="text-3xl">
                            {name
                                .split(" ")
                                .map((word) => word[0])
                                .join("") ?? ""}
                        </AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Alterar imagem?</DialogTitle>
                        <DialogDescription className="flex flex-col gap-4">
                            <Input
                                className="mt-4"
                                id="picture"
                                type="file"
                                onChange={handleFileChange}
                            ></Input>
                            <Button
                                className="w-1/3"
                                onClick={handleUpdatePicture}
                            >
                                Alterar
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdatePicture;
