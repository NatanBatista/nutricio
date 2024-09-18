"use client"

import axios from "axios"
import React, { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { DialogClose } from "@radix-ui/react-dialog"

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog"
import { getAxiosClient } from "@/services/fetchClient/axiosClient"

interface ExclusionButtonProps {
    ids: number[]
}

const ExclusionButton: React.FC<ExclusionButtonProps> = ({
    ids
}) => {
    
    const router = useRouter()
    const axiosClient = getAxiosClient()
    const [loading, setLoading] = useState<boolean>(false)

    const deleteFood = async (ids: number[]) => {
        try {
            setLoading(true)
            await axiosClient.delete(`${process.env.NEXT_PUBLIC_API_URL}/foods/bulk_destroy`,
            {
                data: { ids: ids }
            }
            )
            router.push("/")
            toast({
                description: "Item excluído com sucesso.",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Algo deu errado.",
                description: "Houve um problema e não conseguimos deletar o alimento.",
              })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button className="mr-3" variant="destructive">Excluir</Button></DialogTrigger>
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
                        <Button className="w-24" onClick={() => deleteFood(ids)} variant="destructive">Excluir </Button>
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