'use server'
import { headers } from "next/headers"

export async function getUserEmail() {
    const headerRequest = headers()
    const user = JSON.parse(headerRequest.get('user'))
    console.log(user)
    return user.email
}