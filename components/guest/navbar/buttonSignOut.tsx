"use client"

import React from "react";
import { destroyCookie } from "nookies";
import { signOut } from "next-auth/react";

import {
    DropdownMenuItem,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";

const ButtonSignOut = () => {

    const handleSignOut = () => {
        try {
            signOut()
            destroyCookie(undefined, "authorization")
        } catch (e) {

        }
    }
    return (
        <>
            <DropdownMenuItem onClick={handleSignOut}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </>
    )
}

export default ButtonSignOut

