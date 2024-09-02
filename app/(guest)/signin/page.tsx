import React from "react"
import FormSignIn from "./formSignIn"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const SignIn = async () => {

    const session = await auth()

    if (session) {
        redirect('/alimentos')
    }
    
    return (
        <>
        <FormSignIn />
        </>
    )
}

export default SignIn