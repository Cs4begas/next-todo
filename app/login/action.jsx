'use server'

import { isRedirectError, redirect } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { SignJWT, importJWK} from 'jose'

export async function login(prevState, formData) {
    const validEmails = ['mike@test.com', 'p@test.com']
    try {
        let email = formData.get('email');
        let password = formData.get('password')

        

        if (validEmails.includes(email) && password === '1234') {
            // Login pass
            const secretJWK = {
                kty: 'oct',
                k: 'EN5DHZ8ZX4EU+khjhtfw0A==' // Replace with your actual base64 encoded secret key
            }

            const secretKey = await importJWK(secretJWK, 'HS256')
            const token = await new SignJWT({ email: email })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1h') // Token expires in 1 hour
                .sign(secretKey)

            cookies().set('token', token, { maxAge: 1000 })
            redirect('/todo')
        } else {
            throw new Error('Login fail')
        }
    } catch (error) {
        if (isRedirectError(error)) throw error
        console.log('error', error)
        return { message: 'Failed to create' }
    }
}