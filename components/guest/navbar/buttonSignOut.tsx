"use client"

import React from "react";
import { signOut } from "next-auth/react";

import {
    DropdownMenuItem,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";

const ButtonSignOut = () => {
    return (
        <>
            <DropdownMenuItem onClick={() => signOut()}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </>
    )
}

export default ButtonSignOut

