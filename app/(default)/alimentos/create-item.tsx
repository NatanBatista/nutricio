import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CreateItem = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost"> <Plus /> </Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Criar alimento</DialogTitle>
                        <DialogDescription>
                            Adicione um alimento especifico a lista.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input className="col-span-3" type="" placeholder="Nome" />
                            <Input type="" placeholder="Caloria" />
                            <Input type="" placeholder="Carboitrado" />
                            <Input type="" placeholder="Proteina" />
                            <Input type="" placeholder="Ferro" />
                            <Input type="" placeholder="Fósforo" />
                            <Input type="" placeholder="Fibra" />
                            <Input type="" placeholder="Vitamina a" />
                            <Input type="" placeholder="Vitamina b" />
                            <Input type="" placeholder="Vitamina c" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Criar alimento</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateItem