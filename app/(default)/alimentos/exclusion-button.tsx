import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

import React from "react"

const ExclusionButton = () => {

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
                        <Button variant="destructive">Excluir </Button>
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