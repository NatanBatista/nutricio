import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    // DropdownMenuSub,
    // DropdownMenuSubContent,
    // DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    // AvatarImage
} from "../../ui/avatar"

import React from "react"
import { Button } from "../../ui/button"
import { useContext } from "react"
import ButtonSignOut from "./buttonSignOut"
import { redirect } from "next/navigation"
import Link from "next/link"
// import { AuthContext } from "@/app/contexts/AuthContext"

const UserMenu = async () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="clean">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>NB </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href="/perfil">
                            <DropdownMenuItem>
                                Perfil
                                <DropdownMenuShortcut>
                                    ⇧⌘P
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem disabled>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {/* <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Email</DropdownMenuItem>
                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        
                    </DropdownMenuGroup> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem disabled>Support</DropdownMenuItem>
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ButtonSignOut />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserMenu