"use client"

import axios from "axios"
import React, { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface ExclusionButtonProps {
    id: number
}

const ExclusionButton: React.FC<ExclusionButtonProps> = ({
    id
}) => {
    
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)

    const deleteFood = async (id: number) => {
        try {
            setLoading(true)
            await axios.delete('http://localhost:3001/foods/' + id)
            toast({
                description: "Item excluído com sucesso.",
            })
            setTimeout(() => {
                window.location.reload();
            }, 700);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Algo deu errado.",
                description: "Houve um problema e não conseguimos deletar o alimento.",
                action: <ToastAction altText="Tente novamente" onClick={() => deleteFood}>Tente novamente!</ToastAction>,
              })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button variant="destructive">Excluir</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Você tem certeza??</DialogTitle>
                        <DialogDescription>
                            Essa ação não pode ser desfeita!
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        {loading ?
                        <Button className="w-24" variant="destructive"> <LoaderCircle className="mr-2 h-6 w-6 animate-spin" /> </Button> 
                        :
                        <Button className="w-24" onClick={() => deleteFood(id)} variant="destructive">Excluir </Button>
                        }
                        <DialogClose asChild>
                            <Button variant="outline"> Cancelar </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </>
    )
}


export default ExclusionButton