import axios from "axios"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { use } from "react"
// Your own logic for dealing with plaintext password strings; be careful!
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "email", placeholder: "email"},
        password: {label:"password", placeholder: "password"},
      },
      authorize: async (credentials) => {

        if (!credentials) {
            return null
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          const user = await res.json()

          console.log("AQUI O USER: ", user.data.id)

          if (user.data.id) {
            return {
              email: user.data.uid,
              name: user.data.name,
              id: user.data.id
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error authenticating:", error);
          return null;
        }


        // return user object with their profile data
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
})