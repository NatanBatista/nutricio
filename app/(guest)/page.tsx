import { auth } from "@/auth"
import { redirect } from "next/navigation"
import * as React from "react"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect('/alimentos')
  }
  return (
    <>
    </>
  )
}
